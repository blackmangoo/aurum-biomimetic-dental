import type { ServiceId } from "@/lib/bookingSchema";

export interface SceneChapterAct {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  metricValue: string;
  metricLabel: string;
  range: [number, number];
}

export interface SceneHotspot {
  id: string;
  label: string;
  category: string;
  u: number;
  v: number;
  spec: string;
  detail: string;
}

export interface ScrollSceneConfig {
  id: "scene-01-hero" | "scene-02-implant" | "scene-03-scan-whitening";
  rawVideoFile: string;
  title: string;
  eyebrow: string;
  sectionBgHex: string;
  spotlightHex: string;
  scrollLengthVh: number;
  mobileScrollLengthVh: number;
  desktop: {
    width: number;
    height: number;
    frameCount: number;
    poster: string;
    dir: string;
  };
  mobile: {
    width: number;
    height: number;
    frameCount: number;
    poster: string;
    packBin: string;
    packJson: string;
  };
  acts: [SceneChapterAct, SceneChapterAct, SceneChapterAct];
  hotspots: SceneHotspot[];
}

export const SCROLL_SCENES: Record<ScrollSceneConfig["id"], ScrollSceneConfig> = {
  "scene-01-hero": {
    id: "scene-01-hero",
    rawVideoFile: "assets/raw/scene-01-hero.mp4",
    title: "Enamel-Preserving Restorative Artistry",
    eyebrow: "Beverly Hills · Biomimetic Studio",
    sectionBgHex: "#4B1917",
    spotlightHex: "#7A2825",
    scrollLengthVh: 300,
    mobileScrollLengthVh: 240,
    desktop: {
      width: 1920,
      height: 1080,
      frameCount: 180,
      poster: "/frames/scene-01-hero/poster-desktop.webp",
      dir: "/frames/scene-01-hero/desktop",
    },
    mobile: {
      width: 854,
      height: 480,
      frameCount: 144,
      poster: "/frames/scene-01-hero/poster-mobile-v3.webp",
      packBin: "/frames/scene-01-hero/mobile-pack-v3.bin",
      packJson: "/frames/scene-01-hero/mobile-pack-v3.json",
    },
    acts: [
      {
        id: "hero-act-1",
        tabLabel: "Natural Arch",
        title: "Living Enamel Left Intact",
        subtitle:
          "We conserve healthy tooth structure rather than grinding teeth down for traditional crowns.",
        metricValue: "96%",
        metricLabel: "Enamel Preserved",
        range: [0.0, 0.33],
      },
      {
        id: "hero-act-2",
        tabLabel: "Clear Aligner",
        title: "Invisible Arch Harmony",
        subtitle:
          "Laser-scalloped aligners gently guide your natural bite before final ceramic artistry.",
        metricValue: "0.02 mm",
        metricLabel: "Optical Fit",
        range: [0.34, 0.67],
      },
      {
        id: "hero-act-3",
        tabLabel: "Porcelain Veils",
        title: "Contact-Lens Thin Veneers",
        subtitle:
          "Hand-layered 0.2mm Swiss porcelain bonds seamlessly over untouched natural enamel.",
        metricValue: "0.2 mm",
        metricLabel: "No-Prep Porcelain",
        range: [0.68, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-enamel-veil",
        label: "No-Prep Porcelain Veil",
        category: "Hand-Layered Ceramic",
        u: 0.44,
        v: 0.62,
        spec: "0.2mm Contact-Lens Thickness",
        detail:
          "Crafted on platinum foil to mirror natural incisal translucency without drilling healthy enamel.",
      },
      {
        id: "hs-dej-seal",
        label: "Gold-Hue Onlay Seal",
        category: "Biomimetic Bond",
        u: 0.55,
        v: 0.78,
        spec: "Preserves Vital Nerve",
        detail:
          "Rebuilds worn molar cusps additively while keeping the living tooth core sealed and healthy.",
      },
    ],
  },
  "scene-02-implant": {
    id: "scene-02-implant",
    rawVideoFile: "assets/raw/scene-02-implant.mp4",
    title: "Ceramic & Warm Gold Implants",
    eyebrow: "Biocompatible Prosthodontics",
    sectionBgHex: "#DFD3C3",
    spotlightHex: "#F4EDE2",
    scrollLengthVh: 250,
    mobileScrollLengthVh: 210,
    desktop: {
      width: 1920,
      height: 1080,
      frameCount: 180,
      poster: "/frames/scene-02-implant/poster-desktop.webp",
      dir: "/frames/scene-02-implant/desktop",
    },
    mobile: {
      width: 854,
      height: 480,
      frameCount: 144,
      poster: "/frames/scene-02-implant/poster-mobile-v3.webp",
      packBin: "/frames/scene-02-implant/mobile-pack-v3.bin",
      packJson: "/frames/scene-02-implant/mobile-pack-v3.json",
    },
    acts: [
      {
        id: "implant-act-1",
        tabLabel: "Ceramic Root",
        title: "Bio-Inert Zirconia Foundation",
        subtitle:
          "Metal-free ceramic threads integrate naturally with bone for calm, predictable healing.",
        metricValue: "99.2%",
        metricLabel: "Bio-Integration",
        range: [0.0, 0.35],
      },
      {
        id: "implant-act-2",
        tabLabel: "Gold Collar",
        title: "Warm Tissue Emergence",
        subtitle:
          "A warm champagne-gold neck keeps the surrounding gumline healthy, pink, and shadow-free.",
        metricValue: "2.4 µm",
        metricLabel: "Precision Seal",
        range: [0.36, 0.70],
      },
      {
        id: "implant-act-3",
        tabLabel: "Porcelain Crown",
        title: "Cushioned Natural Bite",
        subtitle:
          "Hand-glazed ceramic matches the light reflection and chewing feel of neighboring teeth.",
        metricValue: "Natural",
        metricLabel: "Enamel Luster",
        range: [0.71, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-crown-cusp",
        label: "Hand-Glazed Molar Crown",
        category: "Biomimetic Ceramic",
        u: 0.50,
        v: 0.62,
        spec: "Matched Fluorescence & Bite",
        detail:
          "Custom-sculpted fissures and translucent cusps blend invisibly beside natural teeth.",
      },
      {
        id: "hs-gold-collar",
        label: "Warm Gold Collar",
        category: "Soft-Tissue Harmony",
        u: 0.50,
        v: 0.74,
        spec: "Zero Grey Gumline Shadow",
        detail:
          "Warm gold-anodized margin supports healthy pink gum attachment for decades.",
      },
    ],
  },
  "scene-03-scan-whitening": {
    id: "scene-03-scan-whitening",
    rawVideoFile: "assets/raw/scene-03-scan-whitening.mp4",
    title: "Optical Scanning & Enamel Radiance",
    eyebrow: "Touchless Digital Care",
    sectionBgHex: "#0E0C08",
    spotlightHex: "#241E15",
    scrollLengthVh: 250,
    mobileScrollLengthVh: 210,
    desktop: {
      width: 1920,
      height: 1080,
      frameCount: 180,
      poster: "/frames/scene-03-scan-whitening/poster-desktop.webp",
      dir: "/frames/scene-03-scan-whitening/desktop",
    },
    mobile: {
      width: 854,
      height: 480,
      frameCount: 144,
      poster: "/frames/scene-03-scan-whitening/poster-mobile-v3.webp",
      packBin: "/frames/scene-03-scan-whitening/mobile-pack-v3.bin",
      packJson: "/frames/scene-03-scan-whitening/mobile-pack-v3.json",
    },
    acts: [
      {
        id: "scan-act-1",
        tabLabel: "Optical Scan",
        title: "Digital Impressions in Seconds",
        subtitle:
          "A gentle ribbon of light maps every tooth in 3D — zero radiation and zero putty trays.",
        metricValue: "60 sec",
        metricLabel: "Touchless Scan",
        range: [0.0, 0.34],
      },
      {
        id: "scan-act-2",
        tabLabel: "Aligner Fit",
        title: "Custom Clear Aligners",
        subtitle:
          "Trimmed along your exact gum contour for effortless, nearly invisible daily wear.",
        metricValue: "Custom",
        metricLabel: "Scalloped Edge",
        range: [0.35, 0.66],
      },
      {
        id: "scan-act-3",
        tabLabel: "Pearl Lift",
        title: "Sensitivity-Free Whitening",
        subtitle:
          "Nano-hydroxyapatite minerals brighten your smile while sealing out cold sensitivity.",
        metricValue: "+8 Shades",
        metricLabel: "Zero Sensitivity",
        range: [0.67, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-nhap-crystal",
        label: "Mineral Enamel Gloss",
        category: "Hydroxyapatite Care",
        u: 0.48,
        v: 0.66,
        spec: "Zero-Zing Brightening",
        detail:
          "Replenishes natural enamel minerals for a luminous pearl finish without dehydration.",
      },
    ],
  },
};

export interface DentalServiceItem {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  accentTag: string;
  linkedSceneAnchor: string;
  previewImage: string;
  enamelSavedPct: number;
}

export const DENTAL_SERVICES: DentalServiceItem[] = [
  {
    id: "biomimetic-veneers",
    title: "No-Prep Porcelain Veneers",
    tagline: "Ultra-thin 0.2mm Swiss ceramic veils over untouched enamel.",
    description:
      "Hand-layered by master ceramists for natural translucency, with a reversible trial smile before bonding.",
    duration: "Two calm visits",
    accentTag: "Enamel Preserving",
    linkedSceneAnchor: "#hero-stage",
    previewImage: "/frames/scene-01-hero/desktop/frame_0145.webp",
    enamelSavedPct: 96,
  },
  {
    id: "zirconia-implants",
    title: "Ceramic & Gold Implants",
    tagline: "Biocompatible roots with warm gold collars for pink gum health.",
    description:
      "3D-guided keyhole placement eliminates freehand surgery and dark metal gumline shadows.",
    duration: "Single guided visit",
    accentTag: "3D Guided",
    linkedSceneAnchor: "#craftsmanship",
    previewImage: "/frames/scene-02-implant/desktop/frame_0175.webp",
    enamelSavedPct: 100,
  },
  {
    id: "airway-aligners",
    title: "Clear Aligner Therapy",
    tagline: "Broaden your smile arc from a 60-second touchless optical scan.",
    description:
      "Scalloped transparent aligners widen narrow arches gently without brackets or putty impressions.",
    duration: "45 min onboarding",
    accentTag: "Digital Preview",
    linkedSceneAnchor: "#technology",
    previewImage: "/frames/scene-03-scan-whitening/desktop/frame_0095.webp",
    enamelSavedPct: 100,
  },
  {
    id: "laser-endodontics",
    title: "Microscopic Tooth Saving",
    tagline: "Restore fractured or deep-decay teeth without full crowns.",
    description:
      "Under 25× optical magnification, we seal micro-cracks and protect the living nerve.",
    duration: "Single quiet visit",
    accentTag: "Pain-Free Protocol",
    linkedSceneAnchor: "#hero-stage",
    previewImage: "/frames/scene-01-hero/desktop/frame_0110.webp",
    enamelSavedPct: 92,
  },
  {
    id: "hydroxyapatite-enamel",
    title: "Mineral Pearl Whitening",
    tagline: "Brighten up to 8 shades while strengthening thin enamel.",
    description:
      "Cold-light activation infuses soothing nano-hydroxyapatite crystals with zero nerve zings.",
    duration: "60 min lounge visit",
    accentTag: "Zero Sensitivity",
    linkedSceneAnchor: "#technology",
    previewImage: "/frames/scene-03-scan-whitening/desktop/frame_0180.webp",
    enamelSavedPct: 100,
  },
  {
    id: "tmj-neuromuscular",
    title: "Bite & Jaw Sanctuary",
    tagline: "Relieve clenching, tension, and worn edges with digital balance.",
    description:
      "Digital pressure sensors harmonize your bite and protect delicate restorations while you sleep.",
    duration: "60 min calm audit",
    accentTag: "Jaw Relief",
    linkedSceneAnchor: "#longevity-sanctuary",
    previewImage: "/frames/scene-01-hero/desktop/frame_0015.webp",
    enamelSavedPct: 98,
  },
];

export interface TransformationCase {
  id: string;
  title: string;
  category: string;
  duration: string;
  summary: string;
  beforeShade: string;
  afterShade: string;
}

export const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: "case-biomimetic-rehab",
    title: "Ten No-Prep Porcelain Veneers",
    category: "Additive Ceramics",
    duration: "Two Visits",
    summary:
      "Restored worn edges and natural incisal translucency without drilling healthy enamel.",
    beforeShade: "Worn Enamel · A3",
    afterShade: "Natural Pearl · OM1",
  },
  {
    id: "case-airway-arch",
    title: "Clear Aligner Expansion & Mineral Lift",
    category: "Aligners + Whitening",
    duration: "Six Months",
    summary:
      "Widened a narrow smile arc and brightened shade with zero sensitivity.",
    beforeShade: "Crowded Arch · A2.5",
    afterShade: "Broad Arc · B1",
  },
  {
    id: "case-zirconia-gold-implant",
    title: "Ceramic Implant & Gold Collar",
    category: "Guided Implant",
    duration: "Twelve Weeks",
    summary:
      "Replaced a fractured tooth with a shadow-free warm gold collar and hand-glazed crown.",
    beforeShade: "Fractured Tooth",
    afterShade: "Seamless Crown",
  },
];

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  education: string;
  quote: string;
  monogram: string;
}

export const DOCTORS: DoctorProfile[] = [
  {
    id: "dr-sorensen",
    name: "Dr. Julian Sørensen",
    role: "Biomimetic Prosthodontist",
    education: "University of Zurich · Harvard Dental Medicine",
    quote:
      "When we respect how nature built living enamel, restorations feel and age just like your own teeth.",
    monogram: "JS",
  },
  {
    id: "dr-valmont",
    name: "Dr. Céleste Valmont",
    role: "Ceramic Implant Specialist",
    education: "University of Geneva · UCLA Implant Fellowship",
    quote:
      "Warm gold and pure ceramic keep the gumline healthy, calm, and naturally luminous for life.",
    monogram: "CV",
  },
  {
    id: "dr-kuroda",
    name: "Dr. Kenji Kuroda",
    role: "Airway & Bite Specialist",
    education: "UCSF Dentistry · Stanford Airway Fellowship",
    quote:
      "A balanced bite and an unhurried appointment turn dental care into true restoration.",
    monogram: "KK",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How is biomimetic dentistry gentler on my teeth?",
    answer:
      "Instead of grinding 70% of a tooth down into a peg for a traditional crown, we clean only the damaged area under 25× magnification and bond thin ceramic layers directly to your healthy enamel.",
  },
  {
    question: "Are your 0.2mm veneers truly placed without drilling healthy teeth?",
    answer:
      "Yes. Hand-crafted on platinum foil to contact-lens thickness, they bond additively over intact enamel — and you preview a reversible trial smile on your teeth before anything is finalized.",
  },
  {
    question: "I feel anxious at the dentist. How do you keep visits calm?",
    answer:
      "We reserve our suite for one patient at a time, use warm pH-buffered numbing you barely feel, provide noise-canceling audio, and pause the instant you raise a hand.",
  },
  {
    question: "Do you work with PPO dental insurance and show fees upfront?",
    answer:
      "Yes. We verify and file all major PPO plans electronically on your behalf, and hand you a clear written summary of every fee before care begins — never surprise bills.",
  },
  {
    question: "Where are you located in Beverly Hills, and is parking included?",
    answer:
      "We are located at 436 North Bedford Drive (Penthouse 500) in Beverly Hills, with complimentary private valet parking in the building.",
  },
];
