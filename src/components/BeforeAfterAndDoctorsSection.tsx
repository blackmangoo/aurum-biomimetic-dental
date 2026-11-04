"use client";

import React, { useState } from "react";
import { TRANSFORMATION_CASES, DOCTORS } from "@/data/clinicData";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";

const SHADE_SWATCHES = [
  {
    code: "OM1",
    name: "Zurich Refractory Pearl",
    bg: "linear-gradient(135deg, #FFFFFF 0%, #F4F7FA 55%, #E4EEF2 100%)",
    halo: "Blue-Amber Opalescent Incisal Halo",
    reflectance: "94% Specular Gloss · 0.2mm Foil",
  },
  {
    code: "B1",
    name: "Natural Biomimetic Ivory",
    bg: "linear-gradient(135deg, #FAF8F2 0%, #F2ECE1 60%, #E5DCCB 100%)",
    halo: "Warm Hydroxyapatite Subsurface",
    reflectance: "91% Specular Gloss · 0.2mm Foil",
  },
  {
    code: "A1",
    name: "European Warm Enamel",
    bg: "linear-gradient(135deg, #F7F2E7 0%, #EBE1CE 60%, #DDD0B8 100%)",
    halo: "Organic Mamelon Translucency",
    reflectance: "88% Specular Gloss · 0.3mm Foil",
  },
] as const;

export function BeforeAfterAndDoctorsSection() {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [selectedShadeIdx, setSelectedShadeIdx] = useState(0);
  const [teethCount, setTeethCount] = useState<8 | 10 | 20>(10);

  const activeCase = TRANSFORMATION_CASES[selectedCaseIdx];
  const activeShade = SHADE_SWATCHES[selectedShadeIdx];

  return (
    <section
      id="transformations"
      aria-labelledby="transformations-heading"
      className="bg-[#EDE6DA] text-[#181210] py-24 sm:py-32 border-t border-b border-[#D8CFC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: Swiss Case Dossiers + Interactive Shade & Veneer Planner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Clinical Case Dossier Ledger */}
          <div className="lg:col-span-6">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E1B2B] mb-2">
              SECTION 05 // ARCHIVAL CLINICAL DOSSIERS
            </span>
            <h2
              id="transformations-heading"
              className="font-serif text-3xl sm:text-5xl font-normal uppercase tracking-tight text-[#181210] leading-[1.05]"
            >
              Documented Conservation.
              <br />
              <span className="italic font-normal text-[#6E1B2B]">
                Zero Stump Grinding.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5C5349]">
              Inspect our archival case dossiers and configure your target VITA
              ceramic shade and tooth count in the interactive laboratory
              planner.
            </p>

            <div
              className="mt-8 border border-[#D8CFC0] divide-y divide-[#D8CFC0] bg-[#FAF6EE]"
              role="tablist"
              aria-label="Clinical Dossiers"
            >
              {TRANSFORMATION_CASES.map((c, idx) => {
                const isSelected = selectedCaseIdx === idx;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`w-full text-left p-5 sm:p-6 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#6E1B2B] text-[#FAF6EE]"
                        : "bg-[#FAF6EE] text-[#181210] hover:bg-[#EDE6DA]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em]">
                      <span
                        className={
                          isSelected ? "text-[#C6A46C]" : "text-[#8C6B37]"
                        }
                      >
                        {c.code} · {c.category}
                      </span>
                      <span
                        className={
                          isSelected ? "text-[#FAF6EE]" : "text-[#6E1B2B]"
                        }
                      >
                        {c.enamelSaved} ENAMEL SAVED
                      </span>
                    </div>
                    <div className="mt-1.5 font-serif text-xl sm:text-2xl">
                      {c.title}
                    </div>
                    <p
                      className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                        isSelected ? "text-[#FAF6EE]/85" : "text-[#5C5349]"
                      }`}
                    >
                      {c.summary}
                    </p>
                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="block text-[9px] uppercase tracking-wider text-[#C6A46C]">
                            Initial State ({c.beforeShade})
                          </span>
                          <span className="text-[#FAF6EE]/90">
                            {c.beforeDetails}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase tracking-wider text-[#C6A46C]">
                            Completed ({c.afterShade})
                          </span>
                          <span className="text-[#FAF6EE]/90">
                            {c.afterDetails}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Zurich Ceramic Shade & Fly-In Dossier Planner */}
          <div className="lg:col-span-6 border border-[#D8CFC0] bg-[#FAF6EE] p-7 sm:p-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8CFC0]">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6B37]">
                  ZURICH CERAMIC CALIBRATOR
                </span>
                <h3 className="font-serif text-2xl text-[#181210]">
                  Optical Shade &amp; Arch Configurator
                </h3>
              </div>
              <span className="border border-[#6E1B2B]/30 px-3 py-1 text-[10px] font-mono font-semibold text-[#6E1B2B]">
                {activeCase.code}
              </span>
            </div>

            {/* 1. Optical Ceramic Swatch Selector */}
            <div className="mt-6">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6B37] mb-3">
                01 // Select Refractory Porcelain Shade &amp; Opalescence
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SHADE_SWATCHES.map((sw, idx) => {
                  const active = selectedShadeIdx === idx;
                  return (
                    <button
                      key={sw.code}
                      type="button"
                      onClick={() => setSelectedShadeIdx(idx)}
                      className={`p-3.5 text-left border transition-all cursor-pointer ${
                        active
                          ? "border-[#6E1B2B] bg-[#EDE6DA] shadow-sm"
                          : "border-[#D8CFC0] bg-[#FAF6EE] hover:bg-[#EDE6DA]/50"
                      }`}
                    >
                      <div
                        className="h-10 w-full border border-[#D8CFC0] mb-2.5"
                        style={{ background: sw.bg }}
                      />
                      <div className="font-serif text-lg font-semibold text-[#181210]">
                        VITA {sw.code}
                      </div>
                      <div className="text-[11px] text-[#5C5349] truncate">
                        {sw.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Smile Arch Scope Selector */}
            <div className="mt-6">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6B37] mb-3">
                02 // Select Smile Corridor Restoration Scope
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    [8, "8 Anterior Units", "Central to 1st Premolar"],
                    [10, "10-Unit Broad Arc", "Full Buccal Smile Corridor"],
                    [20, "20-Unit Full Rehab", "Upper & Lower Occlusal Arc"],
                  ] as const
                ).map(([count, title, sub]) => {
                  const active = teethCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setTeethCount(count)}
                      className={`p-3.5 text-left border transition-all cursor-pointer ${
                        active
                          ? "border-[#6E1B2B] bg-[#6E1B2B] text-[#FAF6EE]"
                          : "border-[#D8CFC0] bg-[#FAF6EE] text-[#181210] hover:bg-[#EDE6DA]"
                      }`}
                    >
                      <div className="font-serif text-xl">{title}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          active ? "text-[#C6A46C]" : "text-[#5C5349]"
                        }`}
                      >
                        {sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Live Calculated Biomimetic Dossier Readout */}
            <div className="mt-6 border border-[#D8CFC0] bg-[#120E0D] p-5 text-[#FAF6EE]">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-[#C6A46C] pb-3 border-b border-white/10">
                <span>COMPUTED LABORATORY SPECIFICATION</span>
                <span>{teethCount} REFRACTORY UNITS</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-[10px] uppercase text-[#FAF6EE]/60">
                    Optical Profile
                  </span>
                  <span className="font-serif text-base text-[#FAF6EE]">
                    VITA {activeShade.code} · {activeShade.halo}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#FAF6EE]/60">
                    Completion Itinerary
                  </span>
                  <span className="font-serif text-base text-[#C6A46C]">
                    2 Visits · {teethCount === 20 ? "14 Days" : "10 Days"} Total
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#FAF6EE]/60">
                    Surface Physics
                  </span>
                  <span className="text-[#FAF6EE]/90">
                    {activeShade.reflectance}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#FAF6EE]/60">
                    Enamel Preservation
                  </span>
                  <span className="text-[#5CE6C4] font-semibold">
                    96.4% Intact · 0 Root Canals
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-[#5C5349]">
                Includes 3D reversible Trial Smile before final bonding
              </span>
              <button
                type="button"
                onClick={() => smoothScrollTo("#booking")}
                className="inline-flex h-11 items-center gap-2 bg-[#6E1B2B] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-[#181210] transition-colors cursor-pointer"
              >
                <span>Lock Specification</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Part 2: Horizontal Editorial Magazine-Spread Faculty Dossiers */}
        <div className="mt-24 pt-20 border-t border-[#D8CFC0]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E1B2B] mb-2">
                CLINICAL FACULTY // ZURICH · GENEVA · BEVERLY HILLS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal uppercase tracking-tight text-[#181210]">
                Architects of Living Enamel.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#5C5349]">
              Each patient is treated personally by our founding Swiss- and
              Ivy-trained prosthodontists in a single-patient penthouse suite.
            </p>
          </div>

          <div className="divide-y divide-[#D8CFC0] border border-[#D8CFC0] bg-[#FAF6EE]">
            {DOCTORS.map((doc) => (
              <article
                key={doc.id}
                className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                <div className="lg:col-span-4 flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#C6A46C] bg-[#6E1B2B] font-serif text-2xl text-[#FAF6EE]">
                    {doc.monogram}
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6B37]">
                      {doc.code}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl text-[#181210]">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6E1B2B] mt-0.5">
                      {doc.credentials}
                    </p>
                    <p className="text-xs text-[#5C5349] mt-1">
                      {doc.education}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <blockquote className="border-l-2 border-[#6E1B2B] pl-4 font-serif text-lg italic text-[#181210] leading-relaxed">
                    “{doc.quote}”
                  </blockquote>
                </div>

                <div className="lg:col-span-3 flex flex-col lg:items-end justify-between gap-3">
                  <div className="flex flex-wrap lg:justify-end gap-1.5">
                    {doc.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="border border-[#D8CFC0] bg-[#EDE6DA] px-2.5 py-1 text-[11px] font-medium text-[#181210]"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#booking")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6E1B2B] hover:text-[#181210] cursor-pointer"
                  >
                    <span>Request Dossier with {doc.name.split(",")[0]}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
