import type { ServiceId } from "@/lib/bookingSchema";

export interface SceneChapterAct {
  id: string;
  badge: string;
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
    title: "28-Tooth Full Arch & 0.2mm Refractory Porcelain Veils",
    eyebrow: "SEQUENCE 01 // BURGUNDY-CRIMSON MONOGRAPH (#4B1917)",
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
        badge: "ACT I // INTACT OCCLUSION",
        title: "Zero-Amputation Enamel Conservation",
        subtitle:
          "Conventional crowns amputate 70% of healthy tooth structure. Our Zurich biomimetic protocol preserves 96.4% of living enamel and vital pulp.",
        metricValue: "96.4%",
        metricLabel: "Living Enamel Saved",
        range: [0.0, 0.33],
      },
      {
        id: "hero-act-2",
        badge: "ACT II // MICRO-GRAVITY RELEASE",
        title: "Laser-Scalloped Aligner & DEJ Bio-Seal",
        subtitle:
          "The jaws articulate 24mm as the optical polymer aligner elevates and Immediate Dentin Sealing (IDS) bonds at 51.5 MPa tensile strength.",
        metricValue: "51.5 MPa",
        metricLabel: "DEJ Tensile Bond",
        range: [0.34, 0.67],
      },
      {
        id: "hero-act-3",
        badge: "ACT III // 0.2MM SWISS VEILS",
        title: "Refractory Lithium Disilicate Laminates",
        subtitle:
          "Four 0.2mm contact-lens-thin porcelain veils levitate forward along the Z-axis — hand-baked in Geneva to mirror natural incisal opalescence.",
        metricValue: "0.2 mm",
        metricLabel: "No-Drill Ceramic Gauge",
        range: [0.68, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-enamel-veil",
        label: "0.2mm Swiss Lithium Disilicate Veil",
        category: "REFRACTORY CERAMIC",
        u: 0.56,
        v: 0.38,
        spec: "530 MPa Biaxial Strength · 0.2mm Gauge",
        detail:
          "Hand-sintered feldspathic & lithium disilicate porcelain mimicking natural enamel prism opalescence without drilling healthy tooth structure.",
      },
      {
        id: "hs-dej-seal",
        label: "Immediate Dentin Bio-Seal (IDS)",
        category: "BIOMIMETIC TENSION BRIDGE",
        u: 0.46,
        v: 0.56,
        spec: "51.5 MPa Micro-Tensile Adhesion",
        detail:
          "Reconstructs the natural Dentino-Enamel Junction with polyethylene fiber ribbond and gold-standard fourth-generation monomer adhesives.",
      },
    ],
  },
  "scene-02-implant": {
    id: "scene-02-implant",
    rawVideoFile: "assets/raw/scene-02-implant.mp4",
    title: "Swiss ATZ Ceramic-Zirconia Root & 24k Gold Bio-Collar",
    eyebrow: "SEQUENCE 02 // TRAVERTINE GALLERY (#DFD3C3)",
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
        badge: "01 // BIO-INERT FIXTURE",
        title: "ATZ Alumina-Toughened Zirconia Root",
        subtitle:
          "Laser-microgrooved helical root geometry promotes rapid osteoblast integration with zero galvanic currents or grey metal-ion release.",
        metricValue: "99.2%",
        metricLabel: "10-Yr Integration",
        range: [0.0, 0.35],
      },
      {
        id: "implant-act-2",
        badge: "02 // 24K GOLD COLLAR",
        title: "Warm Gold Hemidesmosomal Soft-Tissue Seal",
        subtitle:
          "Soft gingival tissue attaches directly to our warm 24k gold-anodized Morse-taper neck, banishing dark gumline shadows forever.",
        metricValue: "2.4 µm",
        metricLabel: "Zero-Microgap Taper",
        range: [0.36, 0.70],
      },
      {
        id: "implant-act-3",
        badge: "03 // GRADIENT CROWN",
        title: "Dual-Modulus Biomimetic Molar Crown",
        subtitle:
          "Engineered with a 20 GPa shock-absorbing dentin core beneath an 80 GPa glazed enamel shell so bite forces cushion like a natural root.",
        metricValue: "1,200 MPa",
        metricLabel: "Fracture Toughness",
        range: [0.71, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-crown-cusp",
        label: "Gradient-Modulus Porcelain Crown",
        category: "OCCLUSAL BIOMIMICRY",
        u: 0.50,
        v: 0.32,
        spec: "20 GPa Dentin Core / 80 GPa Enamel Shell",
        detail:
          "Dual-density ceramic crown that flexes at the exact elastic modulus of human dentin underneath a wear-proof enamel exterior.",
      },
      {
        id: "hs-gold-collar",
        label: "24k Gold-Anodized Morse Taper Collar",
        category: "SOFT-TISSUE BIO-SEAL",
        u: 0.50,
        v: 0.54,
        spec: "2.4 µm Bacterial-Impervious Seal",
        detail:
          "Warm champagne-gold emergence profile illuminates the surrounding gingiva with natural pink vitality.",
      },
    ],
  },
  "scene-03-scan-whitening": {
    id: "scene-03-scan-whitening",
    rawVideoFile: "assets/raw/scene-03-scan-whitening.mp4",
    title: "8,000 fps Near-Infrared Scan & Nano-Hydroxyapatite Lift",
    eyebrow: "SEQUENCE 03 // OBSIDIAN ESPRESSO STAGE (#0E0C08)",
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
        badge: "STEP 01 // OCT LASER LATTICE",
        title: "Sub-Surface Crack & Enamel Topography",
        subtitle:
          "Near-infrared optical coherence tomography sees 4mm inside translucent enamel at 8,000 frames per second with zero ionizing radiation.",
        metricValue: "8,000 fps",
        metricLabel: "Zero-Radiation OCT",
        range: [0.0, 0.34],
      },
      {
        id: "scan-act-2",
        badge: "STEP 02 // PALATAL EXPANSION",
        title: "Craniofacial Airway-First Clear Aligners",
        subtitle:
          "Our scalloped optical polymer shells widen the maxillary arch to unlock nasal airway volume and a broad 12-tooth smile corridor.",
        metricValue: "+18%",
        metricLabel: "Airway Volume Gain",
        range: [0.35, 0.66],
      },
      {
        id: "scan-act-3",
        badge: "STEP 03 // APATITE CRYSTALLIZATION",
        title: "OM1 Nano-Hydroxyapatite Enamel Regrowth",
        subtitle:
          "Cold-spectrum optical activation fuses 20nm biomimetic hydroxyapatite crystals into open enamel tubules — lifting 9 shades with zero nerve zings.",
        metricValue: "+9 Shades",
        metricLabel: "Crystal Enamel Lift",
        range: [0.67, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-oct-beam",
        label: "8,000 fps Optical Coherence Array",
        category: "SUB-SURFACE IMAGING",
        u: 0.42,
        v: 0.45,
        spec: "7 µm Voxel Resolution · 0 mSv Radiation",
        detail:
          "Maps internal dentin-enamel cracks and occlusal force vectors in real time without ionizing radiation.",
      },
    ],
  },
};

export interface DentalServiceItem {
  id: ServiceId;
  number: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  comfortNote: string;
  accentTag: string;
  linkedSceneAnchor: string;
  highlights: string[];
  longevityYears: number;
  toothPreservationPct: number;
  bondStrengthMpa: string;
  materialSpec: string;
}

export const DENTAL_SERVICES: DentalServiceItem[] = [
  {
    id: "biomimetic-veneers",
    number: "01",
    code: "PRO-01 // ZURICH CERAMICS",
    title: "0.2mm No-Prep Refractory Veneers",
    tagline: "Hand-layered on platinum foil in Geneva & Zurich without grinding healthy enamel.",
    description:
      "Master ceramists layer feldspathic and lithium disilicate porcelains down to 0.2mm contact-lens thickness, reproducing natural mamelons, perikymata texture, and blue-white incisal halo.",
    duration: "2 Private Visits (10 Days)",
    comfortNote: "100% Reversible 3D Trial Smile · Zero Anesthesia Required",
    accentTag: "0.2mm No-Drill Gauge",
    linkedSceneAnchor: "#hero-stage",
    highlights: [
      "96.4% of natural enamel remains completely untouched",
      "51.5 MPa fourth-generation monomer bond prevents debonding",
      "Hand-baked refractory platinum-foil internal light refraction",
    ],
    longevityYears: 25,
    toothPreservationPct: 96,
    bondStrengthMpa: "51.5 MPa",
    materialSpec: "Swiss Lithium Disilicate + Feldspathic Halo",
  },
  {
    id: "zirconia-implants",
    number: "02",
    code: "PRO-02 // BIO-IMPLANTOLOGY",
    title: "Swiss ATZ Zirconia & 24k Gold Bio-Implants",
    tagline: "Metal-free ceramic fixtures with warm 24k gold transgingival collars for pink gum vitality.",
    description:
      "Guided by 3D robotic surgical stents and Platelet-Rich Fibrin (PRF) stem-cell membranes, our bio-inert implants eliminate dark grey gumline shadows and galvanic currents.",
    duration: "60 Min Guided Keyhole Placement",
    comfortNote: "Autologous PRF Stem-Cell Healing · MD Twilight Sedation",
    accentTag: "24k Gold Mucosal Seal",
    linkedSceneAnchor: "#craftsmanship",
    highlights: [
      "2.4 µm Morse-taper seal prevents bacterial micro-leakage",
      "Warm 24k gold neck illuminates thin gingival tissue naturally",
      "Dual-modulus crown cushions bite forces like a living ligament",
    ],
    longevityYears: 30,
    toothPreservationPct: 100,
    bondStrengthMpa: "1,200 MPa",
    materialSpec: "ATZ Bio-Ceramic + 24k Gold Anodized Collar",
  },
  {
    id: "airway-aligners",
    number: "03",
    code: "PRO-03 // CRANIOFACIAL ORTHO",
    title: "Airway-First Palatal Expansion Aligners",
    tagline: "Widen the smile corridor while expanding nasal breathing and TMJ decompression.",
    description:
      "Engineered from an 8,000 fps optical scan and 3D pharyngeal airway study, our scalloped polymer shells broaden the arch without premolar extractions or retraction.",
    duration: "45 Min Digital Onboarding",
    comfortNote: "Zero Putty Impressions · Infrared Photobiomodulation",
    accentTag: "+18% Airway Volume",
    linkedSceneAnchor: "#technology",
    highlights: [
      "Broadens dark buccal corridors into a full 12-tooth smile arc",
      "Decompresses TMJ condyles and improves nocturnal oxygen saturation",
      "Laser-scalloped gingival margins eliminate soft-tissue rubbing",
    ],
    longevityYears: 25,
    toothPreservationPct: 100,
    bondStrengthMpa: "0.02 mm Fit",
    materialSpec: "Tri-Layer Elastomeric Optical Polyurethane",
  },
  {
    id: "laser-endodontics",
    number: "04",
    code: "PRO-04 // MICROSCOPIC CONSERVATION",
    title: "25× Leica Vital Pulp & Crack-Sealing Onlays",
    tagline: "Rescue structural teeth from root canals using Immediate Dentin Sealing and fiber ribbond.",
    description:
      "Under 25× Leica optical magnification, we arrest deep structural cracks using ultra-high-molecular-weight polyethylene ribbond fibers and biomimetic ceramic onlays.",
    duration: "60 Min Single-Visit Reconstruction",
    comfortNote: "Warm pH-Buffered Wand Numbing · Binaural Acoustic Suite",
    accentTag: "Saves Living Pulp",
    linkedSceneAnchor: "#hero-stage",
    highlights: [
      "Avoids root canal amputation in 85% of deep-lesion molars",
      "Polyethylene ribbond bridges internal dentin fracture lines",
      "Restores 98% of virgin tooth fracture resistance",
    ],
    longevityYears: 22,
    toothPreservationPct: 92,
    bondStrengthMpa: "51.5 MPa",
    materialSpec: "UHMWPE Fiber Ribbond + Biomimetic Ceramic Onlay",
  },
  {
    id: "hydroxyapatite-enamel",
    number: "05",
    code: "PRO-05 // ENAMEL CRYSTALLIZATION",
    title: "Nano-Hydroxyapatite (nHAp) OM1 Crystal Lift",
    tagline: "Lift 9 VITA shade steps while remineralizing and thickening translucent enamel.",
    description:
      "Cold 480nm optical activation fuses 20-nanometer biomimetic hydroxyapatite rods directly into open enamel prisms — sealing sensitivity and building mirror gloss.",
    duration: "60 Min Longevity Lounge Session",
    comfortNote: "Zero Nerve Zings · Immediate Red-Wine & Espresso Shield",
    accentTag: "+34% Enamel Hardness",
    linkedSceneAnchor: "#technology",
    highlights: [
      "Synthetic 20nm apatite matches human enamel crystallography",
      "Zero peroxide dehydration or chalky opacity",
      "Permanently plugs exposed cervical dentin tubules",
    ],
    longevityYears: 10,
    toothPreservationPct: 100,
    bondStrengthMpa: "20 nm Rods",
    materialSpec: "15% Medical Nano-Hydroxyapatite + 480nm Cold Light",
  },
  {
    id: "tmj-neuromuscular",
    number: "06",
    code: "PRO-06 // OCCLUSAL ENGINEERING",
    title: "Digital T-Scan Bite Balancing & TMJ Deprogramming",
    tagline: "Eliminate nocturnal clenching, migraines, and incisal wear to 0.01-second precision.",
    description:
      "Electronic T-Scan pressure sensors map every occlusal contact in milliseconds, paired with micro-milled carbon-ceramic night orthotics that silence masseter hyperactivity.",
    duration: "75 Min Neuromuscular Audit",
    comfortNote: "Craniofacial Myofascial Release · Zero-Interference Bite",
    accentTag: "0.01s Bite Balance",
    linkedSceneAnchor: "#longevity-sanctuary",
    highlights: [
      "Equalizes left/right molar force vectors within 0.01 seconds",
      "Protects natural enamel and porcelain veneers from bruxism",
      "Relieves chronic temporal and cervical jaw tension",
    ],
    longevityYears: 20,
    toothPreservationPct: 98,
    bondStrengthMpa: "0.01s Sync",
    materialSpec: "Digital Piezo T-Scan + Milled PMMA/Ceramic Orthotic",
  },
];

export interface TransformationCase {
  id: string;
  code: string;
  title: string;
  category: string;
  duration: string;
  summary: string;
  beforeShade: string;
  afterShade: string;
  beforeDetails: string;
  afterDetails: string;
  enamelSaved: string;
  bondMpa: string;
}

export const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: "case-biomimetic-rehab",
    code: "DOSSIER #ZH-409",
    title: "10 No-Prep 0.2mm Swiss Lithium Disilicate Veils",
    category: "Additive Refractory Veneers",
    duration: "10 Days · 2 Visits",
    summary:
      "Lengthened acid-eroded central incisors, restored canine rise, and achieved natural OM1 incisal opalescence with zero drilling of healthy enamel.",
    beforeShade: "Acid Erosion · VITA A3",
    afterShade: "Geneva Refractory · OM1",
    beforeDetails: "Flattened incisal edges, thinned labial enamel, and negative smile curve.",
    afterDetails: "Translucent blue-amber incisal halo, vertical perikymata texture, and 98.2% intact enamel.",
    enamelSaved: "98.2%",
    bondMpa: "51.5 MPa",
  },
  {
    id: "case-airway-arch",
    code: "DOSSIER #BH-812",
    title: "Palatal Airway Expansion + Nano-Hydroxyapatite Lift",
    category: "Airway Orthodontics + nHAp",
    duration: "6 Months · 16 Aligners",
    summary:
      "Expanded narrow maxillary arch by 4.2mm without extractions, increased nasal airway volume by 19%, and crystallized enamel to B1 pearl.",
    beforeShade: "Compressed Arch · VITA A2.5",
    afterShade: "12-Tooth Broad Arc · VITA B1",
    beforeDetails: "Shadowed buccal corridors, lingual incisor tipping, and nocturnal clenching.",
    afterDetails: "Full 12-tooth architectural smile arc and sealed cervical enamel prisms.",
    enamelSaved: "100%",
    bondMpa: "0.02 mm",
  },
  {
    id: "case-zirconia-gold-implant",
    code: "DOSSIER #GE-219",
    title: "ATZ Ceramic-Zirconia Implant & 24k Gold Bio-Collar",
    category: "Swiss Bio-Implantology",
    duration: "12 Weeks PRF Integration",
    summary:
      "Replaced a fractured lateral incisor with an immediate 3D-guided ATZ zirconia root, warm 24k gold transgingival collar, and layered crown.",
    beforeShade: "Cyanotic Metal-Post Shadow",
    afterShade: "Pink Gingival Zenith · OM1",
    beforeDetails: "Dark grey gumline shadow from legacy metal abutment and blunted papilla.",
    afterDetails: "Healthy stippled pink interdental papilla and seamless light transmission.",
    enamelSaved: "100%",
    bondMpa: "2.4 µm Seal",
  },
];

export interface DoctorProfile {
  id: string;
  code: string;
  name: string;
  credentials: string;
  role: string;
  education: string;
  quote: string;
  specialties: string[];
  monogram: string;
}

export const DOCTORS: DoctorProfile[] = [
  {
    id: "dr-sorensen",
    code: "FACULTY 01 // ZURICH & BEVERLY HILLS",
    name: "Dr. Julian Sørensen, DMD, Dr. med. dent.",
    credentials: "Founder & Master of Biomimetic Prosthodontics",
    role: "Refractory Ceramics & Immediate Dentin Sealing",
    education: "University of Zurich Center of Dental Medicine · Harvard School of Dental Medicine",
    quote:
      "Nature engineered the dentino-enamel junction to flex without fracturing for eighty years. When we copy nature's histology instead of amputating it, restorations last decades.",
    specialties: [
      "0.2mm Platinum-Foil Veils",
      "51.5 MPa Dentin Bio-Sealing",
      "Full-Mouth Occlusal Reconstruction",
    ],
    monogram: "JS",
  },
  {
    id: "dr-valmont",
    code: "FACULTY 02 // GENEVA & BEVERLY HILLS",
    name: "Dr. Céleste Valmont, DDS, MS, FACP",
    credentials: "Director of Bio-Ceramic Implantology & PRF",
    role: "ATZ Zirconia-Gold Implants & 25× Microsurgery",
    education: "University of Geneva · UCLA School of Dentistry Implant Fellowship",
    quote:
      "Living gum tissue loves warm 24k gold and ultra-pure zirconia. By banishing grey metal collars, the gingival architecture stays pink, stippled, and luminous for life.",
    specialties: [
      "ATZ Zirconia & 24k Gold Implants",
      "Autologous PRF Stem-Cell Healing",
      "25× Leica Microsurgery",
    ],
    monogram: "CV",
  },
  {
    id: "dr-kuroda",
    code: "FACULTY 03 // STANFORD & BEVERLY HILLS",
    name: "Dr. Kenji Kuroda, DDS, MSD",
    credentials: "Director of Craniofacial Airway & Neuromuscular Bite",
    role: "Airway Orthodontics & Digital T-Scan Occlusion",
    education: "UCSF School of Dentistry · Stanford Sleep & Craniofacial Airway Fellowship",
    quote:
      "A broad, radiant smile arc is inseparable from how you breathe and sleep. Expanding the palatal vault unlocks both facial balance and deep restorative rest.",
    specialties: [
      "Airway-First Clear Aligners",
      "0.01s Digital T-Scan Balancing",
      "TMJ Condylar Decompression",
    ],
    monogram: "KK",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How is Biomimetic Dentistry fundamentally different from traditional cosmetic or crown dentistry?",
    answer:
      "Traditional dentistry relies on mechanical retention — grinding away 60% to 75% of healthy tooth structure into a peg to fit a full-coverage crown, which frequently triggers nerve death and root canals. Biomimetic ('life-mimicking') dentistry uses 25× Leica microscopy, Immediate Dentin Sealing (IDS), and stress-reduced ceramic layers to bond directly to your intact enamel and dentin at 51.5 MPa — conserving 96%+ of your living tooth.",
  },
  {
    question: "How can your 0.2mm Swiss porcelain veils be bonded without drilling my healthy teeth?",
    answer:
      "Our master ceramists in Geneva and Zurich hand-bake lithium disilicate and feldspathic porcelain on platinum foil down to 0.2mm — thinner than a contact lens. After gentle micro-air particle cleaning of the enamel prisms, the veil bonds seamlessly into your natural tooth architecture, making the procedure 100% additive and anesthesia-free.",
  },
  {
    question: "Why do you combine Swiss ATZ Zirconia implants with a 24k gold-anodized transgingival collar?",
    answer:
      "Conventional grey titanium abutments cast a dark cyanotic shadow through thin gum tissue and can trigger mucosal recession. Our alumina-toughened zirconia (ATZ) root fixtures and warm 24k gold-hue Morse-taper collars are 100% bio-inert, encouraging hemidesmosomal soft-tissue attachment and keeping your gums vibrant pink.",
  },
  {
    question: "Does your 8,000 fps Near-Infrared Optical Coherence Scan replace X-rays and putty trays?",
    answer:
      "Yes. Our near-infrared laser scanner captures 8,000 surface and sub-surface frames per second with zero ionizing radiation and zero gag-inducing putty trays. It reveals micro-cracks and early demineralization up to 4mm beneath the enamel surface.",
  },
  {
    question: "How do the Written Architectural Dossier and PPO Concierge Reimbursement work?",
    answer:
      "Before any clinical step begins, you receive a bound architectural treatment dossier detailing every biomimetic material, appointment timeline, and exact fee. Our concierge team files all PPO out-of-network claims electronically for maximum reimbursement, and we offer 12–24 month 0% APR longevity financing.",
  },
  {
    question: "How does your 2-Visit Fly-In Concierge work for national and international patients?",
    answer:
      "Over 40% of our patients fly in to Beverly Hills from across North America, Europe, and Asia. You complete a virtual dossier review first, arrive for Visit 1 (8,000 fps 3D optical scan & reversible Trial Smile), and return for Visit 2 once our Zurich/Beverly Hills master ceramist finishes your custom 0.2mm porcelains.",
  },
];
