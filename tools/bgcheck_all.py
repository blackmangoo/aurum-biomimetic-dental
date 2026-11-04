"""Batch background-match verification against assets/scenes.json."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from bgcheck import analyse, hex_to_rgb, probe, read_video_frame  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SCENES_FILE = ROOT / "assets" / "scenes.json"
RAW_DIR = ROOT / "assets" / "raw"


def main() -> int:
    cfg = json.loads(SCENES_FILE.read_text(encoding="utf-8"))
    for sc in cfg["scenes"]:
        fn = sc["filename"]
        path = RAW_DIR / fn
        target_hex = sc["bgHex"]
        if not path.exists():
            print(f"{fn:<28} {target_hex:<9} MISSING (generate via PROMPTS_GOOGLE_WHISK_FLOW.md)")
            continue
        meta = probe(path)
        w, h, dur = int(meta["width"]), int(meta["height"]), float(meta["duration"])
        target_rgb = hex_to_rgb(target_hex)
        samples = [0.05, dur * 0.5, max(0.05, dur - 0.1)]
        frame_reports = [analyse(read_video_frame(path, t, w, h), target_rgb) for t in samples]
        worst = max(frame_reports, key=lambda r: (r["dE"], r["dE_p95"]))
        print(f"{fn:<28} {target_hex:<9} dE={worst['dE']:<5.2f} {worst['verdict']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
