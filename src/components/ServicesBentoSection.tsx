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

  // GSAP ScrollTrigger staggered entrance for header, cards, and visual showcase
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

  // Interactive 3D perspective tilt on the visual showcase card
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
      className="bg-[#FAF6EE] text-[#181210] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Clean, Restrained Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1917] mb-2">
              Restorative Specialties
            </span>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-[#181210] leading-[1.06]"
            >
              Gentle on living teeth.
              <br />
              <span className="italic text-[#4B1917]">
                Crafted to last decades.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#544A40]">
            Every suite is reserved for one patient at a time — pairing 25×
            microscopic precision with unhurried comfort.
          </p>
        </div>

        {/* Interactive Split Showcase: Left 3D Visual Stage + Right Tactile Treatment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left (5 Cols): Interactive 3D-Tilting Visual Preview Card */}
          <div className="lg:col-span-5 flex">
            <div
              ref={previewCardRef}
              onPointerMove={handleTiltMove}
              onPointerLeave={handleTiltLeave}
              className="w-full rounded-[28px] bg-[#140B0A] text-[#FAF6EE] p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#C6A46C]/20 border border-[#C6A46C]/40 px-3.5 py-1 text-xs font-medium text-[#C6A46C]">
                    {activeService.accentTag}
                  </span>
                  <span className="text-xs text-[#FAF6EE]/70">
                    {activeService.duration}
                  </span>
                </div>

                {/* High-Resolution 3D Frame Preview */}
                <div className="mt-5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0E0C08] border border-white/10">
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
                <p className="mt-2 text-sm leading-relaxed text-[#FAF6EE]/80">
                  {activeService.description}
                </p>
              </div>

              {/* Enamel Conservation Meter + Actions */}
              <div className="mt-6 pt-5 border-t border-white/15">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#FAF6EE]/75">
                    Natural Tooth Structure Preserved
                  </span>
                  <span className="font-serif text-lg text-[#C6A46C]">
                    {activeService.enamelSavedPct}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#C6A46C] transition-all duration-500"
                    style={{ width: `${activeService.enamelSavedPct}%` }}
                  />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <MagneticButton
                    type="button"
                    onClick={() => {
                      onSelectServiceForBooking(activeService.id);
                      smoothScrollTo("#booking");
                    }}
                    className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#C6A46C] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#140B0A] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                  >
                    <span>Book {activeService.title.split(" ")[0]}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </MagneticButton>
                  <button
                    type="button"
                    onClick={() =>
                      smoothScrollTo(activeService.linkedSceneAnchor)
                    }
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 px-4 text-xs font-semibold text-[#FAF6EE] hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    3D View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right (7 Cols): Clean 2x3 Interactive Specialty Grid (Zero robotic numbers) */}
          <div
            ref={cardsWrapRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {DENTAL_SERVICES.map((srv) => {
              const isSelected = srv.id === activeId;
              return (
                <article
                  key={srv.id}
                  data-srv-card
                  onClick={() => setActiveId(srv.id)}
                  className={`group rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#4B1917] bg-[#4B1917] text-[#FAF6EE] shadow-xl -translate-y-1"
                      : "border-[#D8CFC0] bg-[#DFD3C3]/45 text-[#181210] hover:bg-[#DFD3C3]/80 hover:-translate-y-1"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                          isSelected
                            ? "bg-[#C6A46C] text-[#140B0A]"
                            : "bg-[#4B1917]/10 text-[#4B1917] group-hover:bg-[#4B1917] group-hover:text-[#FAF6EE]"
                        }`}
                      >
                        <ServiceIcon serviceId={srv.id} className="w-5 h-5" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                          isSelected
                            ? "bg-white/15 text-[#C6A46C]"
                            : "bg-[#FAF6EE] text-[#4B1917]"
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
                    className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs font-medium ${
                      isSelected
                        ? "border-white/15 text-[#C6A46C]"
                        : "border-[#C8B9A6] text-[#4B1917]"
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
