"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DENTAL_SERVICES } from "@/data/clinicData";
import { ServiceIcon, ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { smoothScrollTo } from "@/lib/scrollBus";
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
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Interactive Biomimetic Conservation Audit selector
  const [auditServiceId, setAuditServiceId] =
    useState<ServiceId>("biomimetic-veneers");
  const auditedService =
    DENTAL_SERVICES.find((s) => s.id === auditServiceId) || DENTAL_SERVICES[0];

  useGSAP(
    () => {
      const headerEl = headerRef.current;
      const gridEl = gridRef.current;
      if (!headerEl || !gridEl) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(headerEl.children, {
        scrollTrigger: {
          trigger: headerEl,
          start: "top 85%",
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });

      const cards = gridEl.querySelectorAll<HTMLElement>("[data-bento-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#F5F1E8] text-[#11221F] py-24 sm:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-18"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#9A7432]/30 bg-[#9A7432]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7432] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9A7432]" />
              <span>Six Biomimetic Disciplines · Beverly Hills Penthouse</span>
            </div>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-[#11221F] leading-[1.08]"
            >
              Copy nature’s histology.
              <br />
              <span className="text-[#14473E]">Never amputate living teeth.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg leading-relaxed text-[#4A5E5A]">
              Every procedure at Aurum is performed under 25× Leica optical
              microscopy — engineered to replicate the elastic modulus of human
              dentin and the light refraction of natural enamel.
            </p>
          </div>
        </div>

        {/* Interactive Biomimetic Enamel Preservation Comparator Bar */}
        <div className="mb-12 rounded-[26px] border border-[#DFD8C8] bg-[#FDFCF9] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A7432]">
                Interactive Structural Conservation Audit
              </span>
              <h3 className="mt-1 font-serif text-2xl text-[#11221F]">
                {auditedService.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#4A5E5A]">
                Select any specialty below to compare intact tooth structure
                preserved with our Biomimetic Protocol vs. traditional aggressive
                crown drilling.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {DENTAL_SERVICES.map((s) => {
                  const active = s.id === auditServiceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setAuditServiceId(s.id)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? "bg-[#14473E] text-[#FDFCF9]"
                          : "bg-[#F5F1E8] text-[#11221F] hover:bg-[#DFD8C8]"
                      }`}
                    >
                      {s.number} · {s.title.split(" ").slice(0, 2).join(" ")}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#14473E] uppercase tracking-wider">
                    Aurum Biomimetic Protocol (Intact Tooth Saved)
                  </span>
                  <span className="font-serif text-lg text-[#14473E]">
                    {auditedService.toothPreservationPct}% Preserved · ~{auditedService.longevityYears}+ Yr Lifespan
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#F5F1E8]">
                  <div
                    className="h-full rounded-full bg-[#14473E] transition-all duration-500"
                    style={{ width: `${auditedService.toothPreservationPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#9E4732] uppercase tracking-wider">
                    Conventional Crown Amputation (Remaining Stump)
                  </span>
                  <span className="font-serif text-base text-[#9E4732]">
                    28% Remaining · High Root-Canal Risk
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#F5F1E8]">
                  <div
                    className="h-full rounded-full bg-[#9E4732]/65"
                    style={{ width: "28%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Card Architectural Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {DENTAL_SERVICES.map((srv, idx) => {
            const isWide = idx === 0 || idx === 5;
            return (
              <article
                key={srv.id}
                data-bento-card
                onMouseMove={handleMouseMove}
                className={`group relative ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "lg:col-span-1"
                } flex flex-col justify-between rounded-[28px] border border-[#DFD8C8] bg-[#FDFCF9] p-7 sm:p-8 shadow-[0_24px_50px_-30px_rgba(14,38,34,0.14)] hover:shadow-[0_32px_70px_-25px_rgba(14,38,34,0.24)] hover:border-[#14473E]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20,71,62,0.08), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -bottom-6 right-6 font-serif text-[120px] font-bold text-[#DFD8C8]/40 leading-none select-none"
                  aria-hidden="true"
                >
                  {srv.number}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14473E]/10 text-[#14473E] border border-[#14473E]/20 group-hover:bg-[#14473E] group-hover:text-[#FDFCF9] transition-all duration-300">
                      <ServiceIcon serviceId={srv.id} className="w-6 h-6" />
                    </span>
                    <span className="rounded-full bg-[#EFE7D6] px-3.5 py-1 text-xs font-semibold text-[#9A7432]">
                      {srv.accentTag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#11221F] group-hover:text-[#14473E] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-medium text-[#11221F]/90">
                    {srv.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A5E5A]">
                    {srv.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {srv.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5F1E8] px-2.5 py-1 text-xs font-medium text-[#11221F] border border-[#DFD8C8]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#14473E]" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-[#DFD8C8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#4A5E5A]">
                    <span className="font-semibold text-[#11221F]">
                      {srv.duration}
                    </span>{" "}
                    · {srv.comfortNote}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => smoothScrollTo(srv.linkedSceneAnchor)}
                      className="inline-flex h-10 items-center justify-center rounded-full border border-[#11221F]/20 bg-[#F5F1E8] px-3.5 text-xs font-semibold text-[#11221F] hover:border-[#14473E] hover:text-[#14473E] transition-colors cursor-pointer"
                    >
                      3D Stage
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectServiceForBooking(srv.id);
                        smoothScrollTo("#booking");
                      }}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#14473E] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#FDFCF9] hover:bg-[#0B1F1C] transition-all cursor-pointer"
                    >
                      <span>Reserve</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
