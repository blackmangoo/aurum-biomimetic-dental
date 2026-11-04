#!/usr/bin/env python3
"""
Extracts real Google Flow MP4 videos from `assets/raw/scene-*.mp4` into:
  1. Desktop 1920x1080 WebP sequences (`public/frames/<scene>/desktop/frame_%04d.webp` + `poster-desktop.webp`)
  2. Mobile 854x480 V3 Streaming Binary Packs (`public/frames/<scene>/mobile-pack-v3.bin` + `mobile-pack-v3.json` + `poster-mobile-v3.webp`)

NEVER generates fake or procedural shapes. If an MP4 is not yet present in `assets/raw/`,
it prints a clear status message telling you which MP4 to drop in from `PROMPTS_GOOGLE_WHISK_FLOW.md`.
"""

import argparse
import io
import json
import sys
from pathlib import Path

import cv2
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "assets" / "raw"
PUBLIC_FRAMES = ROOT / "public" / "frames"
SCENES_JSON = ROOT / "assets" / "scenes.json"


def extract_video_to_packs(
    mp4_path: Path,
    out_dir: Path,
    desktop_frames: int = 180,
    mobile_frames: int = 144,
) -> None:
    cap = cv2.VideoCapture(str(mp4_path))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {mp4_path}")

    total_src = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total_src <= 0:
        raise RuntimeError(f"Video has 0 frames: {mp4_path}")

    raw_frames: list[Image.Image] = []
    while True:
        ok, frame_bgr = cap.read()
        if not ok:
            break
        frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        raw_frames.append(Image.fromarray(frame_rgb))
    cap.release()

    if not raw_frames:
        raise RuntimeError(f"No frames decoded from {mp4_path}")

    desktop_dir = out_dir / "desktop"
    desktop_dir.mkdir(parents=True, exist_ok=True)

    # 1. Resample Desktop 1920x1080 WebP frames
    n_src = len(raw_frames)
    for i in range(desktop_frames):
        src_idx = min(n_src - 1, round(i * (n_src - 1) / max(1, desktop_frames - 1)))
        im = raw_frames[src_idx].resize((1920, 1080), Image.Resampling.LANCZOS)
        dst = desktop_dir / f"frame_{i + 1:04d}.webp"
        im.save(dst, format="WEBP", quality=86, method=4)
        if i == 0:
            im.save(out_dir / "poster-desktop.webp", format="WEBP", quality=88, method=4)

    # 2. Resample Mobile 854x480 WebP frames and pack into mobile-pack-v3.bin
    frames_meta = []
    bin_chunks = []
    offset = 0
    for i in range(mobile_frames):
        src_idx = min(n_src - 1, round(i * (n_src - 1) / max(1, mobile_frames - 1)))
        im = raw_frames[src_idx].resize((854, 480), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, format="WEBP", quality=82, method=4)
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
                "count": mobile_frames,
                "totalBytes": len(pack_bin),
                "frames": frames_meta,
            }
        ),
        encoding="utf-8",
    )
    print(
        f"[OK] {mp4_path.name} -> {desktop_frames} desktop frames (1920x1080) + mobile-pack-v3.bin ({len(pack_bin) / 1024:.1f} KB)"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--desktop-frames", type=int, default=180)
    parser.add_argument("--mobile-frames", type=int, default=144)
    args = parser.parse_args()

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    cfg = json.loads(SCENES_JSON.read_text(encoding="utf-8"))

    extracted_any = False
    for sc in cfg["scenes"]:
        scene_id = sc["id"]
        mp4_file = RAW_DIR / sc["filename"]
        if not mp4_file.exists():
            print(
                f"[PENDING] {sc['filename']} not found in assets/raw/ — generate it with PROMPTS_GOOGLE_WHISK_FLOW.md"
            )
            continue
        extract_video_to_packs(
            mp4_file,
            PUBLIC_FRAMES / scene_id,
            desktop_frames=args.desktop_frames,
            mobile_frames=args.mobile_frames,
        )
        extracted_any = True

    if not extracted_any:
        print(
            "\nNo MP4 files found in assets/raw/ yet. Drop scene-01-hero.mp4, scene-02-implant.mp4, and scene-03-scan-whitening.mp4 into assets/raw/ and re-run `npm run frames`."
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
