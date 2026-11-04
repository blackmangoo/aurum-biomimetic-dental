#!/usr/bin/env python3
"""
Extracts and perimeter-calibrates the 3 flagship 1080p Google Flow MP4 videos into:
  1. Desktop 1920x1080 WebP sequences (180 frames/scene + poster-desktop.webp)
  2. Mobile 854x480 V3 Streaming Binary Packs (144 frames/scene in mobile-pack-v3.bin + mobile-pack-v3.json + poster-mobile-v3.webp)
  3. High-resolution Before/After comparison frames for the Optical Comparator slider.
"""

from __future__ import annotations

import glob
import io
import json
import os
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "assets" / "raw"
PUBLIC_FRAMES = ROOT / "public" / "frames"
AUDIT_DIR = ROOT / "docs" / "video-audit"

SCENE_SPECS = [
    {
        "id": "scene-01-hero",
        "pattern": "*802bd022*.mp4",
        "filename": "scene-01-hero.mp4",
        "target_rgb": (75, 25, 23),  # #4B1917 Deep Burgundy-Crimson
        "target_hex": "#4B1917",
        "inner_rx": 0.38,
        "inner_ry": 0.40,
    },
    {
        "id": "scene-02-implant",
        "pattern": "*dc125e1d*.mp4",
        "filename": "scene-02-implant.mp4",
        "target_rgb": (223, 211, 195),  # #DFD3C3 Warm Travertine Stone
        "target_hex": "#DFD3C3",
        "inner_rx": 0.36,
        "inner_ry": 0.42,
    },
    {
        "id": "scene-03-scan-whitening",
        "pattern": "*fd220ae3*.mp4",
        "filename": "scene-03-scan-whitening.mp4",
        "target_rgb": (14, 12, 8),  # #0E0C08 Deep Obsidian Espresso
        "target_hex": "#0E0C08",
        "inner_rx": 0.40,
        "inner_ry": 0.42,
    },
]


def build_perimeter_alpha_matte(w: int, h: int, inner_rx: float, inner_ry: float) -> np.ndarray:
    """
    Builds a smooth float32 [H, W, 1] blend mask:
      - 0.0 inside the central subject ellipse (100% original video pixels + studio spotlight)
      - Smoothly ramps to 1.0 across the outer perimeter so all 4 edges lock to exact `target_rgb`.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = (xx - w * 0.5) / (w * 0.5)
    ny = (yy - h * 0.5) / (h * 0.5)

    # Elliptical distance + smooth rectangular edge guard
    ell_d = np.sqrt((nx / max(0.1, inner_rx * 2.0)) ** 2 + (ny / max(0.1, inner_ry * 2.0)) ** 2)
    edge_d = np.maximum(np.abs(nx), np.abs(ny))
    d = np.maximum(ell_d * 0.88, edge_d)

    t = np.clip((d - 0.68) / (0.96 - 0.68), 0.0, 1.0)
    matte = t * t * (3.0 - 2.0 * t)
    return matte[..., None]


def decode_all_frames_bt709(mp4_path: Path) -> tuple[list[np.ndarray], int, int]:
    pr = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_entries",
            "stream=width,height",
            "-of",
            "json",
            str(mp4_path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    meta = json.loads(pr.stdout)["streams"][0]
    w, h = int(meta["width"]), int(meta["height"])

    vf = "scale=in_color_matrix=bt709:in_range=limited:out_range=full,format=rgb24"
    proc = subprocess.Popen(
        [
            "ffmpeg",
            "-v",
            "error",
            "-i",
            str(mp4_path),
            "-vf",
            vf,
            "-f",
            "rawvideo",
            "-",
        ],
        stdout=subprocess.PIPE,
    )
    frame_bytes = w * h * 3
    frames: list[np.ndarray] = []
    assert proc.stdout is not None
    while True:
        buf = proc.stdout.read(frame_bytes)
        if len(buf) < frame_bytes:
            break
        frames.append(np.frombuffer(buf, dtype=np.uint8).reshape((h, w, 3)).copy())
    proc.wait()
    return frames, w, h


def process_scene(spec: dict, desktop_count: int = 180, mobile_count: int = 144) -> None:
    downloads = Path(r"C:\Users\ammar\Downloads")
    matches = list(downloads.glob(spec["pattern"]))
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    raw_dst = RAW_DIR / spec["filename"]

    if matches:
        shutil.copy2(matches[0], raw_dst)
    if not raw_dst.exists():
        raise FileNotFoundError(f"Missing video for {spec['id']}: {raw_dst}")

    src_frames, w, h = decode_all_frames_bt709(raw_dst)
    n_src = len(src_frames)
    print(f"[{spec['id']}] Decoded {n_src} frames ({w}x{h}) from {raw_dst.name}")

    matte = build_perimeter_alpha_matte(w, h, spec["inner_rx"], spec["inner_ry"])
    target_arr = np.array(spec["target_rgb"], dtype=np.float32).reshape((1, 1, 3))

    # Normalize temporal border brightness drift (especially important for scene-02-implant)
    bh, bw = max(4, int(h * 0.05)), max(4, int(w * 0.05))
    bmask = np.zeros((h, w), dtype=bool)
    bmask[:bh, :] = bmask[-bh:, :] = bmask[:, :bw] = bmask[:, -bw:] = True

    cleaned_frames: list[Image.Image] = []
    for f_u8 in src_frames:
        f = f_u8.astype(np.float32)
        if spec["id"] == "scene-02-implant":
            # Compensate global exposure shift across the timeline so interior & border stay uniform
            cur_border_med = np.median(f[bmask], axis=0)
            shift = target_arr.reshape(3) - cur_border_med
            f = np.clip(f + shift.reshape((1, 1, 3)) * 0.55, 0.0, 255.0)
        blended = f * (1.0 - matte) + target_arr * matte
        cleaned_frames.append(Image.fromarray(np.clip(np.round(blended), 0, 255).astype(np.uint8)))

    out_dir = PUBLIC_FRAMES / spec["id"]
    desktop_dir = out_dir / "desktop"
    desktop_dir.mkdir(parents=True, exist_ok=True)

    # 1. Write 180 Desktop 1920x1080 WebP frames + poster-desktop.webp
    for i in range(desktop_count):
        src_idx = min(n_src - 1, round(i * (n_src - 1) / max(1, desktop_count - 1)))
        im = cleaned_frames[src_idx]
        if im.size != (1920, 1080):
            im = im.resize((1920, 1080), Image.Resampling.LANCZOS)
        dst = desktop_dir / f"frame_{i + 1:04d}.webp"
        im.save(dst, format="WEBP", quality=84, method=4)
        if i == 0:
            im.save(out_dir / "poster-desktop.webp", format="WEBP", quality=86, method=4)

    # 2. Write 144 Mobile 854x480 frames into mobile-pack-v3.bin + mobile-pack-v3.json + poster-mobile-v3.webp
    frames_meta = []
    bin_chunks = []
    offset = 0
    for i in range(mobile_count):
        src_idx = min(n_src - 1, round(i * (n_src - 1) / max(1, mobile_count - 1)))
        im = cleaned_frames[src_idx].resize((854, 480), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, format="WEBP", quality=80, method=4)
        data = buf.getvalue()
        if i == 0:
            (out_dir / "poster-mobile-v3.webp").write_bytes(data)
        frames_meta.append({"o": offset, "l": len(data)})
        bin_chunks.append(data)
        offset += len(data)

    pack_bin = b"".join(bin_chunks)
    (out_dir / "mobile-pack-v3.bin").write_bytes(pack_bin)
    (out_dir / "mobile-pack-v3.json").write_text(
        json.dumps(
            {
                "version": 3,
                "width": 854,
                "height": 480,
                "count": mobile_count,
                "totalBytes": len(pack_bin),
                "frames": frames_meta,
            }
        ),
        encoding="utf-8",
    )

    # Save cleaned audit contact sheet
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    sheet = Image.new("RGB", (640 * 3, 360 * 2))
    for k, frac in enumerate([0.0, 0.2, 0.4, 0.6, 0.8, 0.98]):
        idx = min(n_src - 1, int(round(frac * (n_src - 1))))
        thumb = cleaned_frames[idx].resize((640, 360), Image.Resampling.LANCZOS)
        sheet.paste(thumb, ((k % 3) * 640, (k // 3) * 360))
    sheet.save(AUDIT_DIR / f"{spec['id']}_cleaned_sheet.jpg", quality=90)

    print(
        f"[OK] {spec['id']} locked to {spec['target_hex']}: {desktop_count} desktop frames + mobile-pack-v3.bin ({len(pack_bin) / 1024:.1f} KB)"
    )


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--desktop-frames", type=int, default=180)
    parser.add_argument("--mobile-frames", type=int, default=144)
    args = parser.parse_args()

    for spec in SCENE_SPECS:
        process_scene(
            spec,
            desktop_count=args.desktop_frames,
            mobile_count=args.mobile_frames,
        )


if __name__ == "__main__":
    main()
