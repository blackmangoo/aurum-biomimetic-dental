"""Snap the background of a Google Whisk keyframe still to an exact website hex."""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage
from skimage.color import deltaE_ciede2000, rgb2lab

sys.path.insert(0, str(Path(__file__).parent))
from bgcheck import analyse, border_mask, hex_to_rgb  # noqa: E402


def fit_background_field(f: np.ndarray, mask: np.ndarray) -> np.ndarray:
    h, w, _ = f.shape
    yy, xx = np.mgrid[0:h, 0:w]
    x, y = xx / w - 0.5, yy / h - 0.5
    basis = np.stack([np.ones_like(x), x, y, x * x, y * y, x * y], -1)
    A = basis[mask][::7]
    field = np.empty_like(f)
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, f[..., c][mask][::7], rcond=None)
        field[..., c] = basis @ coef
    return field


def snap(img: np.ndarray, target: np.ndarray, thr: float, feather: float) -> tuple[np.ndarray, dict]:
    h, w, _ = img.shape
    f = img.astype(np.float64)
    bmask = border_mask(h, w)
    measured = np.median(f[bmask], axis=0)

    field = fit_background_field(ndimage.gaussian_filter(f, (1.5, 1.5, 0)), bmask)
    lab = rgb2lab(ndimage.gaussian_filter(f, (1.0, 1.0, 0)) / 255.0)
    de = deltaE_ciede2000(rgb2lab(np.clip(field, 0, 255) / 255.0), lab)
    noise = float(np.percentile(de[bmask], 99))
    thr = min(thr, max(2.0, 2.5 * noise))

    lum = lab[..., 0]
    grad = np.hypot(ndimage.sobel(lum, 0), ndimage.sobel(lum, 1))
    edge = grad > max(4.0, float(np.percentile(grad[bmask], 99.5)) * 3)

    cand = (de < thr) & ~edge
    labels, _ = ndimage.label(cand)
    edge_labels = np.unique(labels[bmask & cand])
    edge_labels = edge_labels[edge_labels != 0]
    region = np.isin(labels, edge_labels)

    soft = np.clip((thr - de) / (0.4 * thr), 0.0, 1.0) * region
    sigma = max(1.0, feather * w)
    matte = ndimage.gaussian_filter(soft, sigma)
    matte = np.minimum(matte, ndimage.gaussian_filter(region.astype(float), sigma * 0.5))
    core = ndimage.binary_erosion(soft >= 0.999, iterations=max(1, int(sigma)))
    matte[core] = 1.0

    out = f * (1 - matte[..., None]) + target[None, None, :] * matte[..., None]
    out = np.clip(np.round(out), 0, 255).astype(np.uint8)
    stats = {
        "thr": round(thr, 2),
        "measured_hex": "#" + "".join(f"{int(round(v)):02X}" for v in measured),
        "bg_coverage": round(float(region.mean()) * 100, 1),
    }
    return out, stats


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("file", type=Path)
    ap.add_argument("--bg", required=True)
    ap.add_argument("-o", "--out", type=Path)
    ap.add_argument("--thr", type=float, default=8.0)
    ap.add_argument("--feather", type=float, default=0.012)
    a = ap.parse_args()

    target = hex_to_rgb(a.bg)
    img = np.asarray(Image.open(a.file).convert("RGB"))
    out, stats = snap(img, target, a.thr, a.feather)
    after = analyse(out, target)
    dst = a.out or a.file.with_name(a.file.stem + ".fixed.png")
    Image.fromarray(out).save(dst, optimize=True)
    print(f"Wrote {dst} ({stats['measured_hex']} -> #{a.bg.lstrip('#').upper()}, verdict={after['verdict']})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
