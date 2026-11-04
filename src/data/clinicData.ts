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
  /** Normalized horizontal coordinate [0..1] inside the drawn 16:9 canvas box */
  u: number;
  /** Normalized vertical coordinate [0..1] inside the drawn 16:9 canvas box */
  v: number;
  spec: string;
  detail: string;
}

export interface ScrollSceneConfig {
  id: "scene-01-hero" | "scene-02-implant" | "scene-03-scan-whitening";
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
    title: "Biomimetic Dentistry Engineered Around Living Enamel",
    eyebrow: "AURUM BIOMIMETIC ATELIER · BEVERLY HILLS & ZURICH",
    sectionBgHex: "#0E2622",
    spotlightHex: "#1F5249",
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
        badge: "01 / HISTOLOGICAL PRESERVATION",
        title: "Zero-Crown Enamel Conservation",
        subtitle:
          "Traditional dentistry amputates 70% of healthy tooth structure for crowns. Our biomimetic protocol preserves vital pulp and natural dentin elasticity.",
        metricValue: "96.4%",
        metricLabel: "Natural Tooth Structure Saved",
        range: [0.0, 0.33],
      },
      {
        id: "hero-act-2",
        badge: "02 / DENTINO-ENAMEL BIO-RIM",
        title: "51.5 MPa Gold-Standard Bond Seal",
        subtitle:
          "Immediate Dentin Sealing (IDS) and stress-reduced fiber-reinforced layers replicate the natural Dentino-Enamel Junction (DEJ) tension bridge.",
        metricValue: "51.5 MPa",
        metricLabel: "Tensile DEJ Adhesion",
        range: [0.34, 0.67],
      },
      {
        id: "hero-act-3",
        badge: "03 / 0.2MM LITHIUM DISILICATE",
        title: "Hand-Layered Swiss Porcelain Veils",
        subtitle:
          "Crafted by master ceramists in Zurich at 0.2mm contact-lens thickness — reproducing natural hydroxyapatite light refraction and incisal halo.",
        metricValue: "0.2 mm",
        metricLabel: "No-Drill Ceramic Thickness",
        range: [0.68, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-enamel-veil",
        label: "0.2mm Swiss Lithium Disilicate Veil",
        category: "OPTICAL CERAMIC LAYER",
        u: 0.62,
        v: 0.34,
        spec: "530 MPa Biaxial Flexural Strength",
        detail:
          "Hand-sintered feldspathic & lithium disilicate porcelain mimicking natural enamel prism opalescence without drilling healthy tooth structure.",
      },
      {
        id: "hs-dej-seal",
        label: "Immediate Dentin Bio-Seal (IDS)",
        category: "BIOMIMETIC TENSION BRIDGE",
        u: 0.50,
        v: 0.50,
        spec: "51.5 MPa Micro-Tensile Bond",
        detail:
          "Reconstructs the natural Dentino-Enamel Junction with polyethylene fiber ribbond and gold-standard fourth-generation monomer adhesives.",
      },
      {
        id: "hs-vital-pulp",
        label: "Preserved Vital Pulp Chamber",
        category: "LIVING BIO-CORE",
        u: 0.38,
        v: 0.58,
        spec: "Zero Root Canal Amputation",
        detail:
          "By sealing structural micro-cracks biomimetically rather than grinding down to a stump, the living neuro-vascular pulp stays 100% intact.",
      },
    ],
  },
  "scene-02-implant": {
    id: "scene-02-implant",
    title: "Swiss Ceramic-Zirconia & 24k Gold Bio-Implant Architecture",
    eyebrow: "METAL-FREE & BIOCOMPATIBLE IMPLANTOLOGY",
    sectionBgHex: "#EAE3D5",
    spotlightHex: "#FBF8F1",
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
        badge: "ACT I · BIO-INERT ROOT FIXTURE",
        title: "ATZ Alumina-Toughened Zirconia & Grade-5 Ti",
        subtitle:
          "Laser-microgrooved root geometry promotes rapid osteoblast attachment with zero galvanic currents or metal-ion release.",
        metricValue: "99.2%",
        metricLabel: "10-Year Osseointegration Rate",
        range: [0.0, 0.35],
      },
      {
        id: "implant-act-2",
        badge: "ACT II · 24K GOLD MUCOSAL SEAL",
        title: "Warm 24k Gold-Hue Hemidesmosomal Collar",
        subtitle:
          "Soft gingival tissue bonds directly to our warm gold-anodized transgingival neck, eliminating dark gumline shadows and peri-implantitis.",
        metricValue: "2.4 µm",
        metricLabel: "Zero-Microgap Morse Taper",
        range: [0.36, 0.70],
      },
      {
        id: "implant-act-3",
        badge: "ACT III · OCCLUSAL HARMONY",
        title: "Gradient-Modulus Biomimetic Molar Crown",
        subtitle:
          "Milled with a shock-absorbing internal dentin core and hard outer enamel glaze so bite forces cushion naturally like a real root.",
        metricValue: "1,200 MPa",
        metricLabel: "Fracture Toughness Rating",
        range: [0.71, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-crown-cusp",
        label: "Gradient-Modulus Porcelain Crown",
        category: "OCCLUSAL BIOMIMICRY",
        u: 0.50,
        v: 0.28,
        spec: "20 GPa Dentin Core / 80 GPa Enamel Shell",
        detail:
          "Dual-density ceramic crown that flexes at the exact elastic modulus of human dentin underneath a wear-proof enamel exterior.",
      },
      {
        id: "hs-gold-collar",
        label: "24k Gold-Anodized Morse Taper Collar",
        category: "SOFT-TISSUE BIO-SEAL",
        u: 0.50,
        v: 0.50,
        spec: "2.4 µm Bacterial-Impervious Seal",
        detail:
          "Warm champagne-gold emergence profile illuminates the surrounding gingiva with natural pink vitality.",
      },
    ],
  },
  "scene-03-scan-whitening": {
    id: "scene-03-scan-whitening",
    title: "Photon-Counting 3D Neural Scan & Enamel Crystallization",
    eyebrow: "OPTICAL DIAGNOSTICS & HYDROXYAPATITE REMINERALIZATION",
    sectionBgHex: "#050A09",
    spotlightHex: "#0F2924",
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
        badge: "STEP 01 · NEAR-INFRARED TRANSILLUMINATION",
        title: "Zero-Radiation Sub-Surface Caries & Crack Map",
        subtitle:
          "Laser optical coherence tomography sees 4mm inside translucent enamel at 8,000 frames per second — detecting micro-fractures years before X-rays.",
        metricValue: "8,000 fps",
        metricLabel: "Optical Coherence Capture",
        range: [0.0, 0.34],
      },
      {
        id: "scan-act-2",
        badge: "STEP 02 · AIRWAY-FIRST ORTHODONTICS",
        title: "Craniofacial & TMJ-Guided Aligner Shells",
        subtitle:
          "Rather than retracting teeth inward, our 3D-printed shells expand the palatal vault to optimize nasal airway volume and facial profile.",
        metricValue: "+18%",
        metricLabel: "Pharyngeal Airway Volume",
        range: [0.35, 0.66],
      },
      {
        id: "scan-act-3",
        badge: "STEP 03 · NANO-HYDROXYAPATITE LIFT",
        title: "Biomimetic B1 Enamel Remineralization",
        subtitle:
          "Medical-grade 15% nano-hydroxyapatite crystals fuse into open enamel tubules under cold 480nm light — lifting 9 shades while thickening enamel.",
        metricValue: "+9 Shades",
        metricLabel: "Zero-Sensitivity Crystal Lift",
        range: [0.67, 1.0],
      },
    ],
    hotspots: [
      {
        id: "hs-oct-beam",
        label: "8,000 fps Optical Coherence Array",
        category: "SUB-SURFACE IMAGING",
        u: 0.38,
        v: 0.42,
        spec: "7 µm Voxel Resolution · 0 mSv Radiation",
        detail:
          "Maps internal dentin-enamel cracks and occlusal force vectors in real time without ionizing radiation.",
      },
      {
        id: "hs-nhap-crystal",
        label: "Nano-Hydroxyapatite (nHAp) Lattice",
        category: "ENAMEL REGROWTH",
        u: 0.62,
        v: 0.42,
        spec: "20 nm Biomimetic Apatite Rods",
        detail:
          "Identical in crystal structure to natural human enamel, permanently sealing exposed dentin tubules and restoring mirror gloss.",
      },
    ],
  },
};

export interface DentalServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  comfortNote: string;
  accentTag: string;
  accentTone: "emerald" | "gold" | "terracotta";
  linkedSceneAnchor: string;
  highlights: string[];
  longevityYears: number;
  toothPreservationPct: number;
}

export const DENTAL_SERVICES: DentalServiceItem[] = [
  {
    id: "biomimetic-veneers",
    number: "01",
    title: "0.2mm No-Prep Biomimetic Veneers",
    tagline: "Swiss hand-layered lithium disilicate veils bonded without drilling healthy enamel.",
    description:
      "Master ceramists in Zurich layer feldspathic and lithium disilicate porcelains to replicate natural mamelons, surface perikymata, and incisal opalescence.",
    duration: "2 unhurried atelier visits",
    comfortNote: "100% reversible 3D Trial Smile · Zero shots required",
    accentTag: "Swiss Master Ceramist",
    accentTone: "gold",
    linkedSceneAnchor: "#hero-stage",
    highlights: [
      "0.2mm contact-lens gauge preserves 96%+ natural enamel",
      "51.5 MPa DEJ-mimetic adhesion prevents debonding",
    ],
    longevityYears: 25,
    toothPreservationPct: 96,
  },
  {
    id: "zirconia-implants",
    number: "02",
    title: "Swiss Ceramic & 24k Gold Bio-Implants",
    tagline: "Metal-free ATZ zirconia and 24k gold-neck implants engineered for lifelong tissue harmony.",
    description:
      "Guided by 3D robotic surgical stents, our bio-inert implants integrate rapidly with bone while warm gold transgingival collars preserve pink gumline vitality.",
    duration: "60 min 3D-guided keyhole placement",
    comfortNote: "Platelet-Rich Fibrin (PRF) accelerated healing · Twilight sedation",
    accentTag: "Bio-Inert & Metal-Free",
    accentTone: "emerald",
    linkedSceneAnchor: "#craftsmanship",
    highlights: [
      "Zero dark grey metal shadows at the gumline",
      "Autologous PRF stem-cell membrane cuts healing time in half",
    ],
    longevityYears: 30,
    toothPreservationPct: 100,
  },
  {
    id: "airway-aligners",
    number: "03",
    title: "Airway-First 3D Clear Aligners",
    tagline: "Broaden your smile arc while expanding nasal breathing and TMJ balance.",
    description:
      "Planned from an 8,000 fps optical scan and 3D airway volume study, our scalloped aligners widen the buccal corridor without premolar extractions.",
    duration: "45 min digital onboarding",
    comfortNote: "Zero putty trays · Laser-polished gingival scallops",
    accentTag: "Craniofacial & Airway",
    accentTone: "emerald",
    linkedSceneAnchor: "#technology",
    highlights: [
      "Expands arch width for a full 12-tooth radiant smile",
      "Includes infrared photobiomodulation to accelerate movement by 40%",
    ],
    longevityYears: 25,
    toothPreservationPct: 100,
  },
  {
    id: "laser-endodontics",
    number: "04",
    title: "Vital Pulp Therapy & Laser Micro-Endo",
    tagline: "Save compromised teeth from root canals using biomimetic crack-sealing under 25× Leica optics.",
    description:
      "Using Er:YAG photoacoustic laser disinfection and bioactive calcium-silicate capping, we preserve living pulp in 85% of deep-caries teeth.",
    duration: "60 min microscopic session",
    comfortNote: "Computer-buffered wand anesthesia · Binaural acoustic suite",
    accentTag: "25× Leica Microscope",
    accentTone: "gold",
    linkedSceneAnchor: "#hero-stage",
    highlights: [
      "Avoids full-coverage crown amputation via biomimetic onlays",
      "PIPS laser irrigation sterilizes microscopic lateral tubules",
    ],
    longevityYears: 22,
    toothPreservationPct: 92,
  },
  {
    id: "hydroxyapatite-enamel",
    number: "05",
    title: "Nano-Hydroxyapatite Crystal Lift",
    tagline: "Up to 9 VITA shades brighter while remineralizing and thickening translucent enamel.",
    description:
      "Unlike harsh peroxide bleaches that dehydrate teeth, our cold-light 480nm protocol infuses 20nm biomimetic apatite crystals directly into enamel prisms.",
    duration: "60 min longevity lounge session",
    comfortNote: "Zero nerve zings · Immediate coffee/wine stain shield",
    accentTag: "Enamel Regrowth",
    accentTone: "emerald",
    linkedSceneAnchor: "#technology",
    highlights: [
      "Increases surface micro-hardness by 34% post-treatment",
      "Natural B1/OM1 opalescent pearl finish — never chalky",
    ],
    longevityYears: 10,
    toothPreservationPct: 100,
  },
  {
    id: "tmj-neuromuscular",
    number: "06",
    title: "TMJ, Bite Deprogramming & Longevity Sanctuary",
    tagline: "Resolve clenching, migraine tension, and worn incisors through digital T-Scan occlusal engineering.",
    description:
      "We measure bite force timing to the millisecond with digital pressure sensors and craft invisible carbon-ceramic night orthotics that relax jaw musculature.",
    duration: "75 min neuromuscular audit",
    comfortNote: "Warm craniofacial myofascial release · Private suite",
    accentTag: "Digital T-Scan Bite",
    accentTone: "terracotta",
    linkedSceneAnchor: "#longevity-sanctuary",
    highlights: [
      "Balances left/right bite force within 0.01 seconds",
      "Protects veneers and natural enamel from nocturnal bruxism",
    ],
    longevityYears: 20,
    toothPreservationPct: 98,
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
  beforeDetails: string;
  afterDetails: string;
  enamelSaved: string;
}

export const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: "case-biomimetic-rehab",
    title: "10 No-Prep 0.2mm Swiss Lithium Disilicate Veils",
    category: "Biomimetic Veneers",
    duration: "14 Days · 2 Atelier Visits",
    summary:
      "Lengthened acid-eroded central incisors, rebuilt canine guidance, and restored natural OM1 incisal halo with zero enamel drilling.",
    beforeShade: "Acid Erosion & Wear · VITA A3",
    afterShade: "Zurich Layered Porcelain · OM1",
    beforeDetails: "Flattened incisal edges, thinned labial enamel, and shadowed buccal corridors.",
    afterDetails: "Translucent incisal halo, delicate surface perikymata texture, and balanced lip dynamics.",
    enamelSaved: "98.2% Intact Enamel",
  },
  {
    id: "case-airway-arch",
    title: "Airway Aligner Expansion + Nano-Hydroxyapatite Lift",
    category: "Airway Orthodontics + nHAp",
    duration: "6 Months · 16 Aligners",
    summary:
      "Expanded narrow maxillary arch by 4.2mm, eliminated nocturnal airway resistance, and remineralized enamel to B1 pearl.",
    beforeShade: "lingual Tipping · VITA A2.5",
    afterShade: "Expanded 12-Tooth Arc · VITA B1",
    beforeDetails: "Crowded anterior arch, dark lateral corridors, and cervical abfraction notches.",
    afterDetails: "Broad architectural smile arc, sealed cervical enamel, and effortless nasal breathing.",
    enamelSaved: "100% Intact Enamel",
  },
  {
    id: "case-zirconia-gold-implant",
    title: "Anterior ATZ Zirconia Implant & 24k Gold Bio-Collar",
    category: "Ceramic-Gold Implant",
    duration: "12 Weeks PRF Integration",
    summary:
      "Replaced a failed root-canaled lateral incisor with an immediate 3D-guided ceramic fixture, 24k gold collar, and custom layered crown.",
    beforeShade: "Dark Root-Canal Shadow",
    afterShade: "Pink Gingival Zenith & Bio-Crown",
    beforeDetails: "Grey cyanotic gumline shadow from old metal post and resorbed interdental papilla.",
    afterDetails: "Vibrant pink stippled gingiva with indistinguishable light transmission across adjacent teeth.",
    enamelSaved: "100% Adjacent Teeth Untouched",
  },
];

export interface DoctorProfile {
  id: string;
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
    name: "Dr. Julian Sørensen, DMD, Dr. med. dent.",
    credentials: "Founder & Master of Biomimetic Prosthodontics",
    role: "Biomimetic Ceramics & Occlusal Engineering",
    education: "University of Zurich Center of Dental Medicine · Harvard School of Dental Medicine",
    quote:
      "Nature engineered the dentino-enamel junction to flex without fracturing for eighty years. When we copy nature's histology instead of amputating it, restorations last decades.",
    specialties: [
      "0.2mm Swiss Porcelain Veils",
      "Immediate Dentin Sealing (IDS)",
      "Full-Mouth Bite Reconstruction",
    ],
    monogram: "JS",
  },
  {
    id: "dr-valmont",
    name: "Dr. Céleste Valmont, DDS, MS, FACP",
    credentials: "Director of Bio-Ceramic Implantology & PRF",
    role: "Robotic Guided Implants & Microsurgery",
    education: "UCLA School of Dentistry · Fellowship in Ceramic Implantology (Geneva)",
    quote:
      "Soft tissue loves warm gold and ultra-pure zirconia. By banishing grey metal collars, the gumline stays healthy, stippled, and luminous for life.",
    specialties: [
      "ATZ Zirconia & 24k Gold Implants",
      "PRF Stem-Cell Regeneration",
      "25× Leica Microsurgery",
    ],
    monogram: "CV",
  },
  {
    id: "dr-kuroda",
    name: "Dr. Kenji Kuroda, DDS, MSD",
    credentials: "Director of Craniofacial Airway & TMJ",
    role: "Airway Orthodontics & Neuromuscular Bite",
    education: "UCSF School of Dentistry · Stanford Sleep & Airway Fellowship",
    quote:
      "A beautiful smile arc is inseparable from how you breathe and sleep. Expanding the arch unlocks both facial harmony and deep restorative rest.",
    specialties: [
      "Airway-First Clear Aligners",
      "Digital T-Scan Bite Balancing",
      "TMJ & Bruxism Deprogramming",
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
    question: "What makes Biomimetic Dentistry different from traditional cosmetic or restorative dentistry?",
    answer:
      "Traditional dentistry relies on mechanical retention — grinding away 60% to 75% of healthy tooth structure to fit a full-coverage crown, which frequently triggers nerve death and root canals. Biomimetic ('life-mimicking') dentistry uses 25× Leica magnification, Immediate Dentin Sealing (IDS), and stress-reduced composite/ceramic layers to bond directly to your remaining enamel and dentin at 51.5 MPa — conserving 95%+ of your living tooth.",
  },
  {
    question: "How can your 0.2mm Swiss veneers be placed without drilling my healthy teeth?",
    answer:
      "Our master ceramists in Zurich hand-bake lithium disilicate and feldspathic porcelain on refractory dies down to 0.2mm — thinner than a contact lens. After a gentle micro-air abrasion cleaning of the enamel prism surface, the veil bonds seamlessly into your natural tooth architecture, making the procedure 100% additive and pain-free.",
  },
  {
    question: "Why do you pair Swiss ATZ Zirconia implants with a 24k gold-anodized transgingival collar?",
    answer:
      "Conventional grey titanium abutments cast a dark, lifeless shadow through thin gum tissue and can trigger mucosal recession. Our alumina-toughened zirconia (ATZ) root fixtures and warm 24k gold-hue Morse-taper collars are 100% bio-inert, encouraging hemidesmosomal soft-tissue attachment and keeping your gums vibrant pink.",
  },
  {
    question: "Does your Photon-Counting 3D Optical Scan replace X-rays and putty impressions?",
    answer:
      "Yes. Our near-infrared optical coherence scanner captures 8,000 surface and sub-surface frames per second with zero ionizing radiation and zero gag-inducing putty trays. It reveals micro-cracks and early demineralization up to 4mm beneath the enamel surface.",
  },
  {
    question: "How do insurance, concierge reimbursement, and transparent pricing work at Aurum?",
    answer:
      "Before any clinical step begins, you receive a bound architectural treatment dossier detailing every biomimetic material, appointment timeline, and exact fee. Our concierge team files all PPO out-of-network claims electronically for maximum reimbursement, and we offer 0% APR longevity financing.",
  },
  {
    question: "Where is Aurum Biomimetic Atelier located, and do you host fly-in patients?",
    answer:
      "Our flagship sanctuary is located at 436 North Bedford Drive (Penthouse Suite 500) in the Golden Triangle of Beverly Hills, with private subterranean valet. Over 40% of our patients fly in nationally or internationally — our concierge coordinates 2-visit accelerated ceramic completions with partner residences.",
  },
];
