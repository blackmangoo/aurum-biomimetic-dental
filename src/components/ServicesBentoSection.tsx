"use client";

import React, { useState } from "react";
import { DENTAL_SERVICES } from "@/data/clinicData";
import { ServiceIcon, ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { smoothScrollTo } from "@/lib/scrollBus";
import type { ServiceId } from "@/lib/bookingSchema";

interface ServicesBentoSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

/**
 * Swiss Prosthodontic Protocol Matrix & Interactive Histological Specification Workbench.
 * Replaces generic Bento card grids with an architectural tabular specification ledger on the left
 * and a live Biomimetic Blueprint Dossier on the right.
 */
export function ServicesBentoSection({
  onSelectServiceForBooking,
}: ServicesBentoSectionProps) {
  const [activeId, setActiveId] = useState<ServiceId>("biomimetic-veneers");
  const activeSpec =
    DENTAL_SERVICES.find((s) => s.id === activeId) || DENTAL_SERVICES[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#FAF6EE] text-[#181210] py-24 sm:py-32 border-b border-[#D8CFC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Swiss Monograph Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#D8CFC0]">
          <div className="lg:col-span-7">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E1B2B] mb-2">
              SECTION 02 // SWISS PROSTHODONTIC PROTOCOL MATRIX
            </span>
            <h2
              id="services-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal uppercase tracking-tight text-[#181210] leading-[1.04]"
            >
              Histological Engineering.
              <br />
              <span className="italic font-normal text-[#6E1B2B]">
                Six Additive Disciplines.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-[#5C5349]">
              Select any clinical protocol in the ledger below to inspect its
              material composition, Dentino-Enamel Junction (DEJ) tensile bond
              rating, and intact enamel conservation ratio.
            </p>
          </div>
        </div>

        {/* Interactive Split Ledger + Live Architectural Specification Sheet */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 border border-[#D8CFC0] bg-[#EDE6DA]">
          {/* Left Column (5 Cols): Interactive Swiss Tabular Ledger */}
          <div
            className="lg:col-span-5 divide-y divide-[#D8CFC0] border-b lg:border-b-0 lg:border-r border-[#D8CFC0]"
            role="tablist"
            aria-label="Biomimetic Clinical Protocols"
          >
            {DENTAL_SERVICES.map((srv) => {
              const isSelected = srv.id === activeId;
              return (
                <button
                  key={srv.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(srv.id)}
                  className={`w-full text-left p-5 sm:p-6 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? "bg-[#6E1B2B] text-[#FAF6EE]"
                      : "bg-[#FAF6EE] text-[#181210] hover:bg-[#EDE6DA]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-xs font-semibold px-2 py-1 border ${
                        isSelected
                          ? "border-[#C6A46C] text-[#C6A46C]"
                          : "border-[#D8CFC0] text-[#8C6B37]"
                      }`}
                    >
                      {srv.number}
                    </span>
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                          isSelected ? "text-[#C6A46C]" : "text-[#8C6B37]"
                        }`}
                      >
                        {srv.code}
                      </div>
                      <div className="mt-1 font-serif text-xl sm:text-2xl font-normal">
                        {srv.title}
                      </div>
                      <div
                        className={`mt-1 text-xs ${
                          isSelected ? "text-[#FAF6EE]/80" : "text-[#5C5349]"
                        }`}
                      >
                        {srv.duration} · {srv.accentTag}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`mt-1 text-xs font-mono ${
                      isSelected ? "text-[#C6A46C]" : "text-[#8C6B37]"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column (7 Cols): Live Biomimetic Blueprint & Telemetry Dossier */}
          <div className="lg:col-span-7 bg-[#FAF6EE] p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Top Dossier Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CFC0]">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 items-center justify-center border border-[#6E1B2B]/30 bg-[#6E1B2B] text-[#FAF6EE]">
                    <ServiceIcon serviceId={activeSpec.id} className="w-6 h-6" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6B37]">
                      {activeSpec.code}
                    </span>
                    <span className="font-serif text-lg text-[#6E1B2B]">
                      {activeSpec.materialSpec}
                    </span>
                  </div>
                </div>
                <span className="border border-[#6E1B2B]/30 bg-[#6E1B2B]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6E1B2B]">
                  {activeSpec.accentTag}
                </span>
              </div>

              {/* Main Protocol Title & Narrative */}
              <h3 className="mt-6 font-serif text-3xl sm:text-4xl font-normal text-[#181210]">
                {activeSpec.title}
              </h3>
              <p className="mt-2 text-base font-medium text-[#6E1B2B]">
                {activeSpec.tagline}
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5C5349]">
                {activeSpec.description}
              </p>

              {/* 3-Column Quantitative Telemetry Readout */}
              <div className="mt-8 grid grid-cols-3 border border-[#D8CFC0] bg-[#EDE6DA] divide-x divide-[#D8CFC0]">
                <div className="p-4">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C6B37]">
                    Enamel Saved
                  </span>
                  <span className="mt-1 block font-serif text-2xl sm:text-3xl text-[#6E1B2B]">
                    {activeSpec.toothPreservationPct}%
                  </span>
                  <span className="text-[11px] text-[#5C5349]">
                    vs. 28% traditional crown
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C6B37]">
                    Interface Spec
                  </span>
                  <span className="mt-1 block font-serif text-2xl sm:text-3xl text-[#181210]">
                    {activeSpec.bondStrengthMpa}
                  </span>
                  <span className="text-[11px] text-[#5C5349]">
                    Biomimetic tolerance
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C6B37]">
                    Design Horizon
                  </span>
                  <span className="mt-1 block font-serif text-2xl sm:text-3xl text-[#181210]">
                    {activeSpec.longevityYears}+ Yrs
                  </span>
                  <span className="text-[11px] text-[#5C5349]">
                    Clinical warranty tier
                  </span>
                </div>
              </div>

              {/* Structural Conservation Comparison Bar */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="uppercase tracking-wider text-[#181210]">
                    KRONOS Additive Conservation ({activeSpec.toothPreservationPct}% Intact Tooth)
                  </span>
                  <span className="text-[#6E1B2B]">
                    Conventional Amputation (28% Stump)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#D8CFC0] overflow-hidden flex">
                  <div
                    className="h-full bg-[#6E1B2B] transition-all duration-500"
                    style={{ width: `${activeSpec.toothPreservationPct}%` }}
                  />
                </div>
              </div>

              {/* Clinical Highlights Checklist */}
              <div className="mt-6 space-y-2">
                {activeSpec.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 border-b border-[#D8CFC0]/70 pb-2 text-xs sm:text-sm text-[#181210]"
                  >
                    <span className="h-1.5 w-1.5 bg-[#6E1B2B]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#D8CFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#5C5349]">
                <strong className="text-[#181210] uppercase tracking-wider">
                  {activeSpec.duration}
                </strong>{" "}
                · {activeSpec.comfortNote}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => smoothScrollTo(activeSpec.linkedSceneAnchor)}
                  className="inline-flex h-11 items-center justify-center border border-[#181210]/30 bg-[#EDE6DA] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#181210] hover:border-[#6E1B2B] hover:text-[#6E1B2B] transition-colors cursor-pointer"
                >
                  View 3D Stage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectServiceForBooking(activeSpec.id);
                    smoothScrollTo("#booking");
                  }}
                  className="inline-flex h-11 items-center gap-2 bg-[#6E1B2B] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-[#181210] transition-colors cursor-pointer"
                >
                  <span>Commission Protocol</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
