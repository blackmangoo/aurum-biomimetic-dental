/**
 * High-Precision 3D-Shaded Biomimetic Dental Frame Renderer
 * Renders multi-layered anatomical dental visualizations onto an opaque 2D canvas
 * at 60/120Hz with zero per-frame object allocations:
 *  - Scene 01 (`scene-01-hero`): Biomimetic Enamel Histological Deconstruction (Pulp -> Dentin Tubules -> DEJ Bio-Rim -> 0.2mm Lithium Disilicate Veil)
 *  - Scene 02 (`scene-02-implant`): Swiss ATZ Ceramic-Zirconia & 24k Gold-Seal Bio-Implant Assembly in Micro-Gravity
 *  - Scene 03 (`scene-03-scan-whitening`): Photon-Counting 3D Neural Arch Topography & Nano-Hydroxyapatite Enamel Crystallization
 */

export type BiomimeticSceneId =
  | "scene-01-hero"
  | "scene-02-implant"
  | "scene-03-scan-whitening";

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Renders a single frame of the specified biomimetic 3D scene directly onto `ctx`.
 */
export function renderBiomimeticSceneFrame(
  ctx: CanvasRenderingContext2D,
  sceneId: BiomimeticSceneId,
  w: number,
  h: number,
  progress01: number,
  sectionBgHex: string
): void {
  const p = clamp01(progress01);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const minDim = Math.min(w, h);

  // 1. Opaque Background Fill
  ctx.fillStyle = sectionBgHex;
  ctx.fillRect(0, 0, w, h);

  if (sceneId === "scene-01-hero") {
    // SCENE 01: BIOMIMETIC ENAMEL HISTOLOGY & 0.2MM LITHIUM DISILICATE VEIL
    // Deep Alpine Obsidian Emerald (#0E2622) with warm 24k Champagne Gold & Opalescent Pearl
    const radGlow = ctx.createRadialGradient(cx, cy, minDim * 0.04, cx, cy, minDim * 0.56);
    radGlow.addColorStop(0, "rgba(38, 108, 94, 0.44)");
    radGlow.addColorStop(0.55, "rgba(18, 52, 46, 0.22)");
    radGlow.addColorStop(1, "rgba(14, 38, 34, 0)");
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, w, h);

    // Subtle precision coordinate grid rings
    ctx.strokeStyle = "rgba(212, 175, 106, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, minDim * (0.16 * i), 0, Math.PI * 2);
      ctx.stroke();
    }

    const explode = smoothstep(0.05, 0.65, p);
    const bondLock = smoothstep(0.68, 0.98, p);
    const sep = explode * (1 - bondLock * 0.82);

    const scale = minDim * 0.0011;

    // Layer 1 (Deepest): Vital Pulp & Micro-Vascular Core (shifts left-down on explode)
    ctx.save();
    ctx.translate(cx - sep * minDim * 0.18, cy + sep * minDim * 0.06);
    ctx.scale(scale, scale);

    const pulpGrad = ctx.createLinearGradient(-60, -140, 60, 180);
    pulpGrad.addColorStop(0, "#E06D53");
    pulpGrad.addColorStop(0.5, "#B83B2B");
    pulpGrad.addColorStop(1, "#6E1D14");
    ctx.fillStyle = pulpGrad;
    ctx.beginPath();
    ctx.moveTo(-38, -95);
    ctx.bezierCurveTo(-18, -125, 18, -125, 38, -95);
    ctx.bezierCurveTo(54, -40, 42, 65, 26, 165);
    ctx.bezierCurveTo(18, 185, 8, 165, 0, 110);
    ctx.bezierCurveTo(-8, 165, -18, 185, -26, 165);
    ctx.bezierCurveTo(-42, 65, -54, -40, -38, -95);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 214, 170, 0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Layer 2 (Middle): Elastic Dentin Core & DEJ Collagen Matrix
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    const dentinGrad = ctx.createRadialGradient(-25, -45, 15, 0, 0, 210);
    dentinGrad.addColorStop(0, "#F5E2C0");
    dentinGrad.addColorStop(0.6, "#D8B377");
    dentinGrad.addColorStop(1, "#9E7840");
    ctx.fillStyle = dentinGrad;
    ctx.beginPath();
    ctx.moveTo(-92, -145);
    ctx.bezierCurveTo(-45, -195, 45, -195, 92, -145);
    ctx.bezierCurveTo(122, -70, 108, 55, 68, 170);
    ctx.bezierCurveTo(45, 210, -45, 210, -68, 170);
    ctx.bezierCurveTo(-108, 55, -122, -70, -92, -145);
    ctx.closePath();
    ctx.fill();

    // Golden DEJ (Dentino-Enamel Junction) Bio-Seal Rim
    ctx.strokeStyle = `rgba(229, 195, 120, ${0.45 + 0.5 * bondLock})`;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();

    // Layer 3 (Outer): Translucent 0.2mm Lithium Disilicate Biomimetic Enamel Veil
    ctx.save();
    ctx.translate(cx + sep * minDim * 0.19, cy - sep * minDim * 0.07);
    ctx.scale(scale, scale);

    const enamelGrad = ctx.createLinearGradient(-115, -195, 115, 195);
    enamelGrad.addColorStop(0, "rgba(253, 252, 249, 0.94)");
    enamelGrad.addColorStop(0.45, "rgba(235, 246, 244, 0.88)");
    enamelGrad.addColorStop(0.85, "rgba(202, 226, 222, 0.82)");
    enamelGrad.addColorStop(1, "rgba(212, 175, 106, 0.65)");
    ctx.fillStyle = enamelGrad;

    ctx.beginPath();
    ctx.moveTo(-112, -168);
    ctx.bezierCurveTo(-55, -222, 55, -222, 112, -168);
    ctx.bezierCurveTo(148, -82, 134, 65, 86, 185);
    ctx.bezierCurveTo(52, 224, -52, 224, -86, 185);
    ctx.bezierCurveTo(-134, 65, -148, -82, -112, -168);
    ctx.closePath();
    ctx.fill();

    // Specular studio highlight along incisal ridge
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Micro-measurement vector lines during deconstruction
    if (sep > 0.08) {
      ctx.strokeStyle = "rgba(212, 175, 106, 0.65)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-115, -90);
      ctx.lineTo(-220, -90);
      ctx.moveTo(-115, 40);
      ctx.lineTo(-220, 40);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
    return;
  }

  if (sceneId === "scene-02-implant") {
    // SCENE 02: SWISS CERAMIC-ZIRCONIA & 24K GOLD BIO-SEAL IMPLANT ASSEMBLY
    // Warm Travertine Stone backdrop (#EAE3D5) with 3-part vertical micro-gravity assembly
    const ambGrad = ctx.createRadialGradient(cx, cy, minDim * 0.05, cx, cy, minDim * 0.52);
    ambGrad.addColorStop(0, "rgba(255, 253, 249, 0.92)");
    ambGrad.addColorStop(0.65, "rgba(242, 235, 222, 0.55)");
    ambGrad.addColorStop(1, "rgba(234, 227, 213, 0)");
    ctx.fillStyle = ambGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle watchmaking tolerance reticle
    ctx.strokeStyle = "rgba(19, 38, 34, 0.09)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, minDim * 0.34, 0, Math.PI * 2);
    ctx.moveTo(cx - minDim * 0.4, cy);
    ctx.lineTo(cx + minDim * 0.4, cy);
    ctx.moveTo(cx, cy - minDim * 0.4);
    ctx.lineTo(cx, cy + minDim * 0.4);
    ctx.stroke();

    // At p=0 parts are exploded vertically; as p -> 1 they torque & lock into a unified bio-implant
    const assemble = smoothstep(0.02, 0.92, p);
    const gap = (1 - assemble) * minDim * 0.22;
    const scale = minDim * 0.00105;

    // 1. Bottom: Helical ATZ Bio-Ceramic / Grade-5 Root Fixture
    ctx.save();
    ctx.translate(cx, cy + minDim * 0.17 + gap * 0.85);
    ctx.scale(scale, scale);

    const rootGrad = ctx.createLinearGradient(-55, -80, 55, 120);
    rootGrad.addColorStop(0, "#7D8B88");
    rootGrad.addColorStop(0.45, "#C7D0CE");
    rootGrad.addColorStop(1, "#485451");
    ctx.fillStyle = rootGrad;

    ctx.beginPath();
    ctx.moveTo(-48, -75);
    ctx.lineTo(48, -75);
    ctx.lineTo(34, 95);
    ctx.bezierCurveTo(22, 120, -22, 120, -34, 95);
    ctx.closePath();
    ctx.fill();

    // Helical bone-condensing thread flutes
    ctx.strokeStyle = "#2E3836";
    ctx.lineWidth = 3;
    for (let y = -55; y <= 75; y += 22) {
      const halfW = 46 - ((y + 55) / 130) * 12;
      ctx.beginPath();
      ctx.moveTo(-halfW - 5, y);
      ctx.lineTo(halfW + 5, y + 7);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Middle: 24k Warm Gold-Anodized Transgingival Bio-Collar & Conical Hex Abutment
    ctx.save();
    ctx.translate(cx, cy + gap * 0.1);
    ctx.scale(scale, scale);

    const goldGrad = ctx.createLinearGradient(-52, -55, 52, 55);
    goldGrad.addColorStop(0, "#F5DDA4");
    goldGrad.addColorStop(0.5, "#C89D4C");
    goldGrad.addColorStop(1, "#8C6723");
    ctx.fillStyle = goldGrad;

    ctx.beginPath();
    ctx.moveTo(-36, -55);
    ctx.lineTo(36, -55);
    ctx.lineTo(54, 10);
    ctx.lineTo(42, 42);
    ctx.lineTo(-42, 42);
    ctx.lineTo(-54, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#6E4F16";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 3. Top: Hand-Layered Multilayered Zirconia-Porcelain Molar Crown
    ctx.save();
    ctx.translate(cx, cy - minDim * 0.15 - gap * 0.9);
    ctx.scale(scale, scale);

    const crownGrad = ctx.createRadialGradient(-25, -45, 10, 0, 0, 145);
    crownGrad.addColorStop(0, "#FFFFFF");
    crownGrad.addColorStop(0.55, "#F6F1E6");
    crownGrad.addColorStop(1, "#D6CBB8");
    ctx.fillStyle = crownGrad;

    ctx.beginPath();
    ctx.moveTo(-90, -35);
    ctx.bezierCurveTo(-95, -95, -42, -118, 0, -92);
    ctx.bezierCurveTo(42, -118, 95, -95, 90, -35);
    ctx.bezierCurveTo(96, 25, 72, 68, 48, 72);
    ctx.lineTo(-48, 72);
    ctx.bezierCurveTo(-72, 68, -96, 25, -90, -35);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#8C6723";
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.restore();
    return;
  }

  // SCENE 03: PHOTON-COUNTING 3D NEURAL ARCH SCAN & HYDROXYAPATITE CRYSTALLIZATION
  // Deep Midnight Onyx (#050A09) with Bioluminescent Emerald-Cyan (#4CE6C4) & 24k Gold
  const scanGlow = ctx.createRadialGradient(cx, cy, minDim * 0.05, cx, cy, minDim * 0.55);
  scanGlow.addColorStop(0, "rgba(76, 230, 196, 0.22)");
  scanGlow.addColorStop(0.55, "rgba(15, 68, 58, 0.14)");
  scanGlow.addColorStop(1, "rgba(5, 10, 9, 0)");
  ctx.fillStyle = scanGlow;
  ctx.fillRect(0, 0, w, h);

  const archRadiusX = minDim * 0.34;
  const archRadiusY = minDim * 0.26;
  const toothCount = 12;
  const scanWave = smoothstep(0.0, 0.5, p);
  const pearlLift = smoothstep(0.55, 0.98, p);

  // Draw dental arch of 12 sculpted crowns along an elliptical parabola
  for (let i = 0; i < toothCount; i++) {
    const u = i / (toothCount - 1); // 0..1 across arch
    const angle = Math.PI * (0.12 + 0.76 * u);
    const tx = cx + Math.cos(angle) * archRadiusX;
    const ty = cy + Math.sin(angle) * archRadiusY * 0.65 - minDim * 0.06;
    const toothScale = (1 - Math.abs(u - 0.5) * 0.45) * (minDim * 0.048);

    ctx.save();
    ctx.translate(tx, ty);

    // Interpolate tooth shade from warm A3 ivory to radiant B1 nano-hydroxyapatite pearl
    const r = Math.round(224 + pearlLift * 29);
    const g = Math.round(208 + pearlLift * 44);
    const b = Math.round(176 + pearlLift * 74);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.strokeStyle =
      u <= scanWave
        ? "rgba(76, 230, 196, 0.85)"
        : "rgba(212, 175, 106, 0.35)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(-toothScale * 0.52, -toothScale * 0.75, toothScale * 1.04, toothScale * 1.5, toothScale * 0.32);
    ctx.fill();
    ctx.stroke();

    // Structured-light optical triangulation mesh nodes during scan act
    if (p < 0.72 && u <= scanWave + 0.08) {
      ctx.fillStyle = "#4CE6C4";
      ctx.beginPath();
      ctx.arc(0, -toothScale * 0.25, 2.2, 0, Math.PI * 2);
      ctx.arc(0, toothScale * 0.25, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Sweeping laser triangulation beam
  if (p < 0.85) {
    const beamX = cx - archRadiusX * 1.1 + p * archRadiusX * 2.2;
    const beamGrad = ctx.createLinearGradient(beamX - 35, 0, beamX + 35, 0);
    beamGrad.addColorStop(0, "rgba(76, 230, 196, 0)");
    beamGrad.addColorStop(0.5, "rgba(76, 230, 196, 0.55)");
    beamGrad.addColorStop(1, "rgba(76, 230, 196, 0)");
    ctx.fillStyle = beamGrad;
    ctx.fillRect(beamX - 35, cy - minDim * 0.32, 70, minDim * 0.64);
  }
}
