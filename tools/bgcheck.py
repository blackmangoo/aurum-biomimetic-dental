"""Background-match checker for Aurum Biomimetic Dental Atelier scene assets."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from skimage.color import deltaE_ciede2000, rgb2lab

IMAGE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".avif"}
BORDER_FRAC = 0.06


def hex_to_rgb(h: str) -> np.ndarray:
    h = h.lstrip("#")
    if len(h) != 6:
        raise argparse.ArgumentTypeError(f"bad hex: {h}")
    return np.array([int(h[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float64)


def probe(path: Path) -> dict:
    out = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-count_packets",
            "-show_entries",
            "stream=width,height,nb_read_packets,r_frame_rate,color_space,color_transfer,color_primaries,color_range,pix_fmt",
            "-show_entries",
            "format=duration",
            "-of",
            "json",
            str(path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    data = json.loads(out.stdout)
    s = data["streams"][0]
    s["duration"] = float(data["format"].get("duration", 0) or 0)
    return s


def read_video_frame(path: Path, t: float, w: int, h: int) -> np.ndarray:
    vf = "scale=in_color_matrix=bt709:in_range=limited:out_range=full,format=rgb24"
    raw = subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-ss",
            f"{t:.3f}",
            "-i",
            str(path),
            "-frames:v",
            "1",
            "-vf",
            vf,
            "-f",
            "rawvideo",
            "-",
        ],
        capture_output=True,
        check=True,
    ).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w, 3)


def read_image(path: Path) -> np.ndarray:
    from PIL import Image

    return np.asarray(Image.open(path).convert("RGB"))


def border_mask(h: int, w: int) -> np.ndarray:
    b = max(2, int(round(min(h, w) * BORDER_FRAC)))
    m = np.zeros((h, w), bool)
    m[:b, :] = m[-b:, :] = True
    m[:, :b] = m[:, -b:] = True
    return m


def analyse(frame: np.ndarray, target: np.ndarray) -> dict:
    h, w, _ = frame.shape
    f = frame.astype(np.float64)
    mask = border_mask(h, w)
    border = f[mask]
    med = np.median(border, axis=0)

    lab_t = rgb2lab((target / 255.0).reshape(1, 1, 3))
    lab_med = rgb2lab((med / 255.0).reshape(1, 1, 3))
    de = float(deltaE_ciede2000(lab_t, lab_med)[0, 0])

    lab_b = rgb2lab((border / 255.0).reshape(-1, 1, 3))
    de_px = deltaE_ciede2000(np.broadcast_to(lab_t, lab_b.shape), lab_b).ravel()
    p95 = float(np.percentile(de_px, 95))

    c = max(4, int(min(h, w) * 0.04))
    corners = np.concatenate(
        [q.reshape(-1, 3) for q in (f[:c, :c], f[:c, -c:], f[-c:, :c], f[-c:, -c:])]
    )
    mids = np.concatenate(
        [
            f[:c, w // 2 - c : w // 2 + c].reshape(-1, 3),
            f[-c:, w // 2 - c : w // 2 + c].reshape(-1, 3),
            f[h // 2 - c : h // 2 + c, :c].reshape(-1, 3),
            f[h // 2 - c : h // 2 + c, -c:].reshape(-1, 3),
        ]
    )
    vignette = float(np.mean(mids) - np.mean(corners))

    if de <= 2.0 and p95 <= 4.0:
        verdict = "PASS"
    elif de <= 10.0 and p95 <= de + 6.0 and abs(vignette) <= 6.0:
        verdict = "GRADE"
    else:
        verdict = "REGENERATE"
    return {
        "median_rgb": med.round().astype(int).tolist(),
        "median_hex": "#" + "".join(f"{int(round(v)):02X}" for v in med),
        "dE": round(de, 2),
        "dE_p95": round(p95, 2),
        "vignette": round(vignette, 1),
        "verdict": verdict,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("file", type=Path)
    ap.add_argument("--bg", required=True)
    a = ap.parse_args()
    target = hex_to_rgb(a.bg)
    res = analyse(read_image(a.file), target)
    print(res)
    return 0 if res["verdict"] != "REGENERATE" else 2


if __name__ == "__main__":
    sys.exit(main())
