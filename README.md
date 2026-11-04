# Aurum Biomimetic Dental Atelier — Beverly Hills & Zurich

Architectural 3D scroll-sequence web experience for **Aurum Biomimetic Dental Atelier**, featuring:

1. **Three 60/120Hz 3D Scroll-Sequence Stages (`ScrollSequenceStage.tsx` + `useSceneScrollScrub.ts`):**
   - **Scene 01 (`#hero-stage`):** Biomimetic Enamel Histological Deconstruction & 0.2mm Swiss Lithium Disilicate Veil (`#0E2622`).
   - **Scene 02 (`#craftsmanship`):** Swiss ATZ Ceramic-Zirconia & 24k Gold Bio-Seal Implant Assembly (`#EAE3D5`).
   - **Scene 03 (`#technology`):** 8,000 fps Photon-Counting 3D Neural Arch Scan & Nano-Hydroxyapatite Crystallization (`#050A09`).
2. **Zero-Reflow Mobile Sticky Damper & Windows 125%/150% DPI Layout Compliance:**
   - Synchronized media split between Desktop GSAP `pin: true, scrub: 0.35` (`(min-width: 1024px) and (hover: hover)`) and Mobile/Tablet native CSS `position: sticky; top: 0` driven by a zero-reflow `window.scrollY` exponential `rAF` damper.
   - Opaque `{ alpha: false }` GPU canvas with a static radial vignette overlay and zero `backdrop-blur` over canvas stages.
   - Built-in 60/120fps procedural 3D anatomical renderer (`biomimeticSynthRenderer.ts`) paired with `.bin` (`ReadableStream`) and `.webp` progressive `createImageBitmap` streaming.
3. **Interactive Clinical Tools & HIPAA-Safe Booking API:**
   - **Biomimetic Structural Conservation Audit** comparing intact tooth preservation (96% vs. 28% traditional crown amputation).
   - **Interactive Before / After Optical Shade Comparator** with keyboard and pointer drag accessibility.
   - **3-Step Penthouse Suite Booking System** (`POST /api/bookings`, `GET /api/health`) with Zod validation, IP rate-limiting, `ElegantCalendarPicker`, and direct concierge routing to `ammar.akbar2002@gmail.com`.

## Quick Start

```bash
npm install
npm run dev
```
