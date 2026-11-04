"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DENTAL_SERVICES } from "@/data/clinicData";
import { ServiceIcon, ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { smoothScrollTo } from "@/lib/scrollBus";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ServiceId } from "@/lib/bookingSchema";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesBentoSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

// Distinct jewel & botanical color theme per specialty card
const CARD_PALETTES: Record<
  ServiceId,
  {
    restBg: string;
    restBorder: string;
    activeBg: string;
    activeBorder: string;
    iconBg: string;
    iconText: string;
    tagBg: string;
    tagText: string;
    accentHex: string;
    showcaseGrad: string;
  }
> = {
  "biomimetic-veneers": {
    restBg: "bg-[#FDF6F4]",
    restBorder: "border-[#EED2CC]",
    activeBg: "bg-[#5C1D24]",
    activeBorder: "border-[#5C1D24]",
    iconBg: "bg-[#F7E3DF]",
    iconText: "text-[#7A2825]",
    tagBg: "bg-[#F7E3DF]",
    tagText: "text-[#7A2825]",
    accentHex: "#E59888",
    showcaseGrad: "linear-gradient(145deg, #3B1216 0%, #5C1D24 55%, #240B0D 100%)",
  },
  "zirconia-implants": {
    restBg: "bg-[#FDF9F0]",
    restBorder: "border-[#EAD9B8]",
    activeBg: "bg-[#523914]",
    activeBorder: "border-[#523914]",
    iconBg: "bg-[#F9EED8]",
    iconText: "text-[#9A6B26]",
    tagBg: "bg-[#F9EED8]",
    tagText: "text-[#9A6B26]",
    accentHex: "#F2C98A",
    showcaseGrad: "linear-gradient(145deg, #2E200B 0%, #523914 55%, #1C1306 100%)",
  },
  "airway-aligners": {
    restBg: "bg-[#F3FAF8]",
    restBorder: "border-[#C5E4DC]",
    activeBg: "bg-[#164239]",
    activeBorder: "border-[#164239]",
    iconBg: "bg-[#DFF0EC]",
    iconText: "text-[#164239]",
    tagBg: "bg-[#DFF0EC]",
    tagText: "text-[#164239]",
    accentHex: "#5CE6C4",
    showcaseGrad: "linear-gradient(145deg, #0D2923 0%, #164239 55%, #091A16 100%)",
  },
  "laser-endodontics": {
    restBg: "bg-[#F4F7FC]",
    restBorder: "border-[#C9D9EE]",
    activeBg: "bg-[#1E3F66]",
    activeBorder: "border-[#1E3F66]",
    iconBg: "bg-[#E3ECF7]",
    iconText: "text-[#1E3F66]",
    tagBg: "bg-[#E3ECF7]",
    tagText: "text-[#1E3F66]",
    accentHex: "#68B8F8",
    showcaseGrad: "linear-gradient(145deg, #11253D 0%, #1E3F66 55%, #0B1828 100%)",
  },
  "hydroxyapatite-enamel": {
    restBg: "bg-[#F2FBF9]",
    restBorder: "border-[#BCE8DE]",
    activeBg: "bg-[#184D43]",
    activeBorder: "border-[#184D43]",
    iconBg: "bg-[#D9F4EE]",
    iconText: "text-[#184D43]",
    tagBg: "bg-[#D9F4EE]",
    tagText: "text-[#184D43]",
    accentHex: "#5CE6C4",
    showcaseGrad: "linear-gradient(145deg, #0E302A 0%, #184D43 55%, #081C18 100%)",
  },
  "tmj-neuromuscular": {
    restBg: "bg-[#FDF5F0]",
    restBorder: "border-[#EED1C2]",
    activeBg: "bg-[#7A3222]",
    activeBorder: "border-[#7A3222]",
    iconBg: "bg-[#FBE6DC]",
    iconText: "text-[#9E3D28]",
    tagBg: "bg-[#FBE6DC]",
    tagText: "text-[#9E3D28]",
    accentHex: "#F2A98A",
    showcaseGrad: "linear-gradient(145deg, #421A11 0%, #7A3222 55%, #260E09 100%)",
  },
};

export function ServicesBentoSection({
  onSelectServiceForBooking,
}: ServicesBentoSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const previewCardRef = useRef<HTMLDivElement | null>(null);

  const [activeId, setActiveId] = useState<ServiceId>("biomimetic-veneers");
  const activeService =
    DENTAL_SERVICES.find((s) => s.id === activeId) || DENTAL_SERVICES[0];
  const activePalette = CARD_PALETTES[activeId];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
          y: 32,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      if (cardsWrapRef.current) {
        const items =
          cardsWrapRef.current.querySelectorAll<HTMLElement>("[data-srv-card]");
        gsap.fromTo(
          items,
          { y: 36, opacity: 0 },
          {
            scrollTrigger: {
              trigger: cardsWrapRef.current,
              start: "top 85%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const handleTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = previewCardRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    gsap.to(el, {
      rotateY: nx * 8,
      rotateX: -ny * 8,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleTiltLeave = () => {
    const el = previewCardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#FAF6EE] text-[#181210] py-24 sm:py-32 overflow-hidden"
    >
      {/* Multi-tonal ambient botanical & rose-blush background washes */}
      <div
        className="pointer-events-none absolute -top-32 right-10 h-[480px] w-[480px] rounded-full bg-[#DFF0EC]/70 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 h-[480px] w-[480px] rounded-full bg-[#F7E3DF]/70 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Clean, Restrained Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DFF0EC] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#164239] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#164239]" />
              <span>Restorative Specialties</span>
            </span>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#181210] leading-[1.06]"
            >
              Gentle on living teeth.
              <br />
              <span className="italic font-normal text-[#7A2825]">
                Crafted to last{" "}
              </span>
              <span className="italic font-normal text-[#164239]">decades.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#544A40]">
            Every suite is reserved for one patient at a time — pairing 25×
            microscopic precision with unhurried comfort.
          </p>
        </div>

        {/* Interactive Split Showcase: Left Dynamic Color-Adaptive 3D Stage + Right Multi-Tonal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left (5 Cols): Dynamic Color-Shifting 3D-Tilting Visual Preview Card */}
          <div className="lg:col-span-5 flex">
            <div
              ref={previewCardRef}
              onPointerMove={handleTiltMove}
              onPointerLeave={handleTiltLeave}
              style={{ background: activePalette.showcaseGrad }}
              className="w-full rounded-[28px] text-[#FAF6EE] p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative will-change-transform transition-all duration-500 border border-white/15"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    style={{
                      borderColor: `${activePalette.accentHex}66`,
                      color: activePalette.accentHex,
                    }}
                    className="rounded-full bg-black/25 border px-3.5 py-1 text-xs font-semibold"
                  >
                    {activeService.accentTag}
                  </span>
                  <span className="text-xs text-[#FAF6EE]/80">
                    {activeService.duration}
                  </span>
                </div>

                {/* High-Resolution 3D Frame Preview */}
                <div className="mt-5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0E0C08] border border-white/15 shadow-lg">
                  <img
                    key={activeService.previewImage}
                    src={activeService.previewImage}
                    alt={activeService.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 font-serif text-2xl sm:text-3xl text-[#FAF6EE]">
                  {activeService.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#FAF6EE]/85">
                  {activeService.description}
                </p>
              </div>

              {/* Enamel Conservation Meter + Actions */}
              <div className="mt-6 pt-5 border-t border-white/15">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#FAF6EE]/80">
                    Natural Tooth Structure Preserved
                  </span>
                  <span
                    style={{ color: activePalette.accentHex }}
                    className="font-serif italic text-xl"
                  >
                    {activeService.enamelSavedPct}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${activeService.enamelSavedPct}%`,
                      backgroundColor: activePalette.accentHex,
                    }}
                  />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <MagneticButton
                    type="button"
                    onClick={() => {
                      onSelectServiceForBooking(activeService.id);
                      smoothScrollTo("#booking");
                    }}
                    style={{ backgroundColor: activePalette.accentHex }}
                    className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#140B0A] hover:brightness-110 transition-all cursor-pointer shadow-md"
                  >
                    <span>Book {activeService.title.split(" ")[0]}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </MagneticButton>
                  <button
                    type="button"
                    onClick={() =>
                      smoothScrollTo(activeService.linkedSceneAnchor)
                    }
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-4 text-xs font-semibold text-[#FAF6EE] hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    3D View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right (7 Cols): Multi-Tonal 2x3 Interactive Specialty Grid */}
          <div
            ref={cardsWrapRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {DENTAL_SERVICES.map((srv) => {
              const isSelected = srv.id === activeId;
              const pal = CARD_PALETTES[srv.id];
              return (
                <article
                  key={srv.id}
                  data-srv-card
                  onClick={() => setActiveId(srv.id)}
                  className={`group rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? `${pal.activeBg} ${pal.activeBorder} text-[#FAF6EE] shadow-xl -translate-y-1`
                      : `${pal.restBg} ${pal.restBorder} text-[#181210] hover:shadow-md hover:-translate-y-1`
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                          isSelected
                            ? "bg-white/15 text-[#FAF6EE]"
                            : `${pal.iconBg} ${pal.iconText}`
                        }`}
                      >
                        <ServiceIcon serviceId={srv.id} className="w-5 h-5" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          isSelected
                            ? "bg-white/15 text-[#FAF6EE]"
                            : `${pal.tagBg} ${pal.tagText}`
                        }`}
                      >
                        {srv.accentTag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-normal">
                      {srv.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed ${
                        isSelected ? "text-[#FAF6EE]/85" : "text-[#544A40]"
                      }`}
                    >
                      {srv.tagline}
                    </p>
                  </div>

                  <div
                    className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs font-semibold ${
                      isSelected
                        ? "border-white/15 text-[#F2C98A]"
                        : `border-black/10 ${pal.iconText}`
                    }`}
                  >
                    <span>{srv.duration}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>Preview</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
