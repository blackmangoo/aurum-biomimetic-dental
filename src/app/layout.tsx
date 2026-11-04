import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FAQ_ITEMS } from "@/data/clinicData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
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
    default: "Aurum Atelier | Biomimetic Dentistry in Beverly Hills",
    template: "%s | Aurum Atelier Beverly Hills",
  },
  description:
    "Enamel-preserving 0.2mm porcelain veneers, ceramic-gold dental implants, clear aligners, and 60-second touchless optical 3D scans in Beverly Hills.",
  alternates: {
    canonical: "/",
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
    name: "Aurum Atelier",
    description:
      "Enamel-preserving biomimetic prosthodontics, ceramic-gold implants, clear aligners, and optical 3D diagnostics in Beverly Hills.",
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
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
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
