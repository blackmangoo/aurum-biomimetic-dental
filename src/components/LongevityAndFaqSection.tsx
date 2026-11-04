"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/clinicData";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import type { ServiceId } from "@/lib/bookingSchema";

interface LongevityAndFaqSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

const LONGEVITY_PILLARS = [
  {
    code: "01 // MILLISECOND OCCLUSION",
    title: "Digital T-Scan 0.01s Bite Calibration",
    body: "Ultrathin electronic pressure sensors balance left and right molar contact timing to 0.01 seconds, preventing micro-fractures, migraines, and porcelain overload.",
  },
  {
    code: "02 // NEURO-ACOUSTIC ISOLATION",
    title: "Binaural Alpha-Wave & Zero-Pinch Suites",
    body: "Acoustically floated penthouse suites with warm pH-buffered computer-controlled wand anesthesia, binaural soundscapes, and MD anesthesiologist twilight options.",
  },
  {
    code: "03 // BIOCOMPATIBILITY AUDIT",
    title: "100% Metal-Free & Monomer-Pure Materials",
    body: "We test salivary pH, galvanic currents, and airway volume — ensuring every Swiss ceramic and adhesive supports long-term systemic and immune health.",
  },
] as const;

export function LongevityAndFaqSection({
  onSelectServiceForBooking,
}: LongevityAndFaqSectionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <>
      {/* 1. Oral Longevity & TMJ Engineering Section on Deep Burgundy-Rose (#6E1B2B) */}
      <section
        id="longevity-sanctuary"
        aria-labelledby="longevity-heading"
        className="bg-[#6E1B2B] text-[#FAF6EE] py-24 sm:py-28 border-b border-[#C6A46C]/30"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="inline-block border border-[#C6A46C]/50 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6A46C] mb-4">
                SECTION 06 // ORAL LONGEVITY &amp; TMJ SANCTUARY
              </span>
              <h2
                id="longevity-heading"
                className="font-serif text-3xl sm:text-5xl font-normal uppercase tracking-tight text-[#FAF6EE] leading-[1.04]"
              >
                Built For Eighty Years
                <br />
                <span className="italic font-normal text-[#C6A46C]">
                  Of Effortless Bite.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#FAF6EE]/85">
                True prosthodontic luxury is a restoration you never have to
                replace. By harmonizing TMJ condylar position, nasal airway
                volume, and biomimetic dentin elasticity, we engineer smiles to
                last for decades.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectServiceForBooking("tmj-neuromuscular");
                    smoothScrollTo("#booking");
                  }}
                  className="inline-flex h-11 items-center gap-2 bg-[#C6A46C] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#120E0D] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                >
                  <span>Commission T-Scan Bite Audit</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4">
              {LONGEVITY_PILLARS.map((item) => (
                <div
                  key={item.code}
                  className="border border-[#C6A46C]/30 bg-black/25 p-6"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6A46C]">
                    {item.code}
                  </div>
                  <h3 className="mt-1 font-serif text-2xl text-[#FAF6EE]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#FAF6EE]/80">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAQ & Transparent Written Dossier Guarantee on Warm Alabaster (#FAF6EE) */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-[#FAF6EE] text-[#181210] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6E1B2B] mb-2">
                SECTION 07 // TECHNICAL INQUIRIES
              </span>
              <h2
                id="faq-heading"
                className="font-serif text-3xl sm:text-4xl font-normal uppercase text-[#181210]"
              >
                Architectural Transparency.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C5349]">
                For direct fly-in coordination or clinical record transfers,
                contact our Beverly Hills penthouse desk at{" "}
                <a
                  href="tel:+13105550148"
                  className="font-semibold text-[#6E1B2B] underline"
                >
                  (310) 555-0148
                </a>
                .
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#D8CFC0] border border-[#D8CFC0] bg-[#EDE6DA]/45 px-6 sm:px-8">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                const panelId = `faq-panel-${idx}`;
                const btnId = `faq-btn-${idx}`;
                return (
                  <div key={item.question} className="py-5">
                    <h3>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenFaqIdx((prev) => (prev === idx ? null : idx))
                        }
                        className="flex w-full items-center justify-between gap-4 text-left font-serif text-lg sm:text-xl font-normal text-[#181210] hover:text-[#6E1B2B] cursor-pointer py-1"
                      >
                        <span>{item.question}</span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center border border-[#D8CFC0] text-sm transition-transform duration-200 ${
                            isOpen
                              ? "rotate-45 bg-[#6E1B2B] text-[#FAF6EE]"
                              : "bg-[#FAF6EE] text-[#181210]"
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="mt-3 pr-8 text-sm sm:text-[15px] leading-relaxed text-[#5C5349]"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
