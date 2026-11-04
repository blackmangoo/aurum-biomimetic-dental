#!/usr/bin/env python3
"""
Builds desktop .webp sequences (1920x1080, 180 frames) and mobile v3 binary packs
(mobile-pack-v3.bin + mobile-pack-v3.json, 854x480, 144 frames) for
Aurum Biomimetic Dental Atelier's 3 scroll-sequence stages.
"""

import io
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent / "public" / "frames"

SCENES = [
    ("scene-01-hero", (14, 38, 34)),
    ("scene-02-implant", (234, 227, 213)),
    ("scene-03-scan-whitening", (5, 10, 9)),
]


def smoothstep(edge0: float, edge1: float, x: float) -> float:
    t = max(0.0, min(1.0, (x - edge0) / max(1e-6, (edge1 - edge0))))
    return t * t * (3.0 - 2.0 * t)


def render_frame_pil(scene_id: str, bg_rgb: tuple[int, int, int], w: int, h: int, p: float) -> Image.Image:
    img = Image.new("RGB", (w, h), bg_rgb)
    draw = ImageDraw.Draw(img)
    cx, cy = w // 2, h // 2
    min_dim = min(w, h)
    r = int(min_dim * 0.27)

    if scene_id == "scene-01-hero":
        # Concentric horology/histology precision rings
        for ring in range(1, 4):
            rr = int(min_dim * 0.14 * ring)
            draw.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=(34, 78, 69), width=2)

        explode = smoothstep(0.05, 0.65, p)
        bond_lock = smoothstep(0.68, 0.98, p)
        sep = explode * (1.0 - bond_lock * 0.82)
        shift_x = int(sep * min_dim * 0.17)
        shift_y = int(sep * min_dim * 0.06)

        # Layer 1: Vital Pulp Chamber
        px, py = cx - shift_x, cy + shift_y
        pw, ph = int(r * 0.42), int(r * 0.68)
        draw.rounded_rectangle(
            [px - pw, py - ph, px + pw, py + ph],
            radius=int(pw * 0.7),
            fill=(184, 59, 43),
            outline=(235, 165, 135),
            width=3,
        )

        # Layer 2: Dentin Core + 24k Gold DEJ Bio-Rim
        dw, dh = int(r * 0.72), int(r * 0.92)
        draw.rounded_rectangle(
            [cx - dw, cy - dh, cx + dw, cy + dh],
            radius=int(dw * 0.65),
            fill=(216, 179, 119),
            outline=(212, 175, 106),
            width=5,
        )

        # Layer 3: 0.2mm Swiss Lithium Disilicate Porcelain Veil
        ex, ey = cx + shift_x, cy - shift_y
        ew, eh = int(r * 0.84), int(r * 1.02)
        draw.rounded_rectangle(
            [ex - ew, ey - eh, ex + ew, ey + eh],
            radius=int(ew * 0.68),
            fill=(242, 249, 247),
            outline=(255, 255, 255),
            width=4,
        )

    elif scene_id == "scene-02-implant":
        assemble = smoothstep(0.02, 0.92, p)
        gap = int((1.0 - assemble) * min_dim * 0.19)

        # Reticle
        rr = int(min_dim * 0.34)
        draw.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=(214, 205, 190), width=2)

        # 1. Bottom: ATZ Zirconia Helical Fixture
        ry = cy + int(min_dim * 0.16) + int(gap * 0.85)
        rw, rh = int(r * 0.36), int(r * 0.56)
        draw.rounded_rectangle(
            [cx - rw, ry - rh, cx + rw, ry + rh],
            radius=int(rw * 0.45),
            fill=(182, 192, 189),
            outline=(82, 96, 92),
            width=3,
        )
        for ty in range(ry - int(rh * 0.7), ry + int(rh * 0.7), max(8, int(rh * 0.28))):
            draw.line([(cx - rw - 4, ty), (cx + rw + 4, ty + 4)], fill=(72, 84, 81), width=3)

        # 2. Middle: 24k Gold-Anodized Mucosal Bio-Collar
        gy = cy + int(gap * 0.1)
        gw, gh = int(r * 0.44), int(r * 0.28)
        draw.rounded_rectangle(
            [cx - gw, gy - gh, cx + gw, gy + gh],
            radius=int(gh * 0.4),
            fill=(212, 175, 106),
            outline=(140, 103, 35),
            width=3,
        )

        # 3. Top: Multilayered Zirconia-Porcelain Crown
        cy_top = cy - int(min_dim * 0.15) - int(gap * 0.9)
        cw_top, ch_top = int(r * 0.68), int(r * 0.52)
        draw.rounded_rectangle(
            [cx - cw_top, cy_top - ch_top, cx + cw_top, cy_top + ch_top],
            radius=int(cw_top * 0.52),
            fill=(252, 250, 245),
            outline=(154, 116, 50),
            width=3,
        )

    else:
        # Scene 03: Photon-Counting 3D Neural Arch Scan & Hydroxyapatite Lift
        arch_rx = int(min_dim * 0.34)
        arch_ry = int(min_dim * 0.24)
        scan_wave = smoothstep(0.0, 0.55, p)
        pearl_lift = smoothstep(0.55, 0.98, p)
        tooth_count = 12

        for i in range(tooth_count):
            u = i / float(tooth_count - 1)
            angle = math.pi * (0.12 + 0.76 * u)
            tx = int(cx + math.cos(angle) * arch_rx)
            ty = int(cy + math.sin(angle) * arch_ry * 0.65 - min_dim * 0.05)
            ts = max(8, int((1.0 - abs(u - 0.5) * 0.42) * (min_dim * 0.044)))

            tr = int(222 + pearl_lift * 31)
            tg = int(206 + pearl_lift * 46)
            tb = int(174 + pearl_lift * 76)
            outline_col = (76, 230, 196) if u <= scan_wave else (212, 175, 106)

            draw.rounded_rectangle(
                [tx - ts // 2, ty - int(ts * 0.72), tx + ts // 2, ty + int(ts * 0.72)],
                radius=max(3, ts // 3),
                fill=(tr, tg, tb),
                outline=outline_col,
                width=2,
            )

        if p < 0.88:
            beam_x = int(cx - arch_rx * 1.1 + p * arch_rx * 2.2)
            draw.line(
                [(beam_x, cy - int(min_dim * 0.32)), (beam_x, cy + int(min_dim * 0.32))],
                fill=(76, 230, 196),
                width=4,
            )

    return img


def build_all() -> None:
    for scene_id, bg_rgb in SCENES:
        scene_dir = ROOT / scene_id
        desktop_dir = scene_dir / "desktop"
        desktop_dir.mkdir(parents=True, exist_ok=True)

        # 1. Build Desktop 180 frames (1280x720 crisp high-speed WebP) + poster-desktop.webp
        desktop_count = 180
        for i in range(desktop_count):
            p = i / max(1, desktop_count - 1)
            im = render_frame_pil(scene_id, bg_rgb, 1280, 720, p)
            frame_path = desktop_dir / f"frame_{i + 1:04d}.webp"
            im.save(frame_path, format="WEBP", quality=82)
            if i == 0:
                im.save(scene_dir / "poster-desktop.webp", format="WEBP", quality=85)

        # 2. Build Mobile streaming binary pack (144 frames @ 854x480)
        frames_meta = []
        bin_chunks = []
        offset = 0
        mobile_count = 144

        for i in range(mobile_count):
            p = i / max(1, mobile_count - 1)
            im = render_frame_pil(scene_id, bg_rgb, 854, 480, p)
            buf = io.BytesIO()
            im.save(buf, format="WEBP", quality=80)
            data = buf.getvalue()
            if i == 0:
                (scene_dir / "poster-mobile-v3.webp").write_bytes(data)
            frames_meta.append({"o": offset, "l": len(data)})
            bin_chunks.append(data)
            offset += len(data)

        pack_bin = b"".join(bin_chunks)
        (scene_dir / "mobile-pack-v3.bin").write_bytes(pack_bin)
        (scene_dir / "mobile-pack-v3.json").write_text(
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
        print(
            f"[OK] Built {scene_id}: {desktop_count} desktop frames + mobile-pack-v3.bin ({len(pack_bin)} bytes)"
        )


if __name__ == "__main__":
    build_all()
