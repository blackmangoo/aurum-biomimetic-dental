import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FAQ_ITEMS } from "@/data/clinicData";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#4B1917",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aurumbiomimetic.com"
  ),
  title: {
    default:
      "Aurum Biomimetic Dental Atelier | Enamel-Conserving Dentistry in Beverly Hills",
    template: "%s | Aurum Biomimetic Beverly Hills",
  },
  description:
    "Swiss 0.2mm no-prep lithium disilicate veneers, 51.5 MPa Immediate Dentin Sealing, ATZ ceramic-gold bio-implants, and 8,000 fps radiation-free optical coherence scans in Beverly Hills.",
  keywords: [
    "biomimetic dentist Beverly Hills",
    "no-prep veneers Beverly Hills",
    "Swiss zirconia dental implants",
    "airway orthodontics Los Angeles",
    "nano-hydroxyapatite whitening",
    "Immediate Dentin Sealing dentist",
    "Aurum Biomimetic Dental Atelier",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurumbiomimetic.com",
    siteName: "Aurum Biomimetic Dental Atelier",
    title:
      "Aurum Biomimetic Dental Atelier | Living Enamel Preserved by Swiss Art",
    description:
      "Discover 0.2mm no-prep Swiss porcelain veils, ATZ zirconia & 24k gold bio-implants, and 8,000 fps optical coherence diagnostics in Beverly Hills.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dentistJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Aurum Biomimetic Dental Atelier",
    description:
      "Enamel-conserving biomimetic prosthodontics, Swiss ATZ ceramic-gold implants, airway orthodontics, and 8,000 fps optical diagnostics in Beverly Hills.",
    url: "https://aurumbiomimetic.com",
    telephone: "+1-310-555-0148",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "436 N Bedford Dr, Penthouse Suite 500",
      addressLocality: "Beverly Hills",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0692,
      longitude: -118.4055,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:30",
        closes: "18:00",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
