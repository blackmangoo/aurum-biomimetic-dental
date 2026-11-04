"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/clinicData";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon, ServiceIcon } from "@/components/icons/DentalIcons";
import type { ServiceId } from "@/lib/bookingSchema";

interface LongevityAndFaqSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

const LONGEVITY_PILLARS = [
  {
    title: "Digital T-Scan Millisecond Bite Balancing",
    body: "Ultrathin electronic pressure sensors map every tooth contact to 0.01 seconds, eliminating premature force spikes that cause cervical abfractions, migraines, and porcelain chipping.",
  },
  {
    title: "Binaural Neuro-Acoustic & Zero-Pinch Suites",
    body: "Each penthouse suite is acoustically isolated and equipped with warm pH-buffered computer-controlled wand anesthesia, binaural soundscapes, and 4K ceiling cinema.",
  },
  {
    title: "Systemic Biocompatibility & Salivary Diagnostics",
    body: "We test oral microbiome balance, galvanic currents, and airway oxygen saturation — ensuring every ceramic and adhesive in your mouth supports whole-body longevity.",
  },
] as const;

const PATIENT_REVIEWS = [
  {
    id: "rev-1",
    quote:
      "Three dentists told me I needed four root canals and full crowns. Dr. Sørensen sealed the fractures biomimetically under a 25× microscope in two calm visits — saving 100% of my living nerves.",
    author: "Victoria M. — Beverly Hills",
    treatment: "Biomimetic Onlays & Immediate Dentin Sealing",
  },
  {
    id: "rev-2",
    quote:
      "I flew in from London for 10 no-prep 0.2mm Swiss porcelain veils. Not a single millimeter of my healthy enamel was drilled, and the incisal translucency looks completely natural in daylight.",
    author: "Alexander K. — Mayfair / Los Angeles",
    treatment: "0.2mm Swiss Lithium Disilicate Veils",
  },
  {
    id: "rev-3",
    quote:
      "Replacing my old metal-collar implant with Dr. Valmont's ATZ zirconia and 24k gold collar completely erased the dark shadow at my gumline. The attention to detail is on the level of Swiss watchmaking.",
    author: "Camille D. — Bel Air",
    treatment: "Swiss ATZ Zirconia & 24k Gold Bio-Implant",
  },
] as const;

export function LongevityAndFaqSection({
  onSelectServiceForBooking,
}: LongevityAndFaqSectionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <>
      {/* 1. Oral Longevity, TMJ & Airway Sanctuary Band */}
      <section
        id="longevity-sanctuary"
        aria-labelledby="longevity-heading"
        className="bg-[#EFE7D6] text-[#11221F] py-24 sm:py-28 border-t border-b border-[#DFD8C8]"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[32px] bg-gradient-to-br from-[#FDFCF9] via-[#F5F1E8] to-[#E6D8BC]/55 border border-[#DFD8C8] p-8 sm:p-12 lg:p-16 shadow-[0_30px_60px_-35px_rgba(154,116,50,0.2)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF6A]/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#11221F] mb-4">
                  <ServiceIcon serviceId="tmj-neuromuscular" className="w-4 h-4" />
                  <span>TMJ, Airway & Oral Longevity Sanctuary</span>
                </div>
                <h2
                  id="longevity-heading"
                  className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#11221F] leading-[1.08]"
                >
                  Engineered for eighty years
                  <br />
                  <span className="text-[#14473E]">of effortless function.</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4A5E5A]">
                  True dental luxury is a restoration you never have to replace.
                  By harmonizing jaw musculature, nasal airway volume, and
                  biomimetic enamel elasticity, we protect your smile for decades.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectServiceForBooking("tmj-neuromuscular");
                      smoothScrollTo("#booking");
                    }}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-[#11221F] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#FDFCF9] hover:bg-[#14473E] transition-colors cursor-pointer"
                  >
                    <span>Reserve Longevity & Bite Audit</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-medium text-[#9A7432]">
                    2-Visit National & International Fly-In Concierge Available
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                {LONGEVITY_PILLARS.map((item, i) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#DFD8C8] bg-[#FDFCF9] p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF6A]/40 text-xs font-bold text-[#11221F]">
                        0{i + 1}
                      </span>
                      <h3 className="font-serif text-xl text-[#11221F]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#4A5E5A]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Patient Stories + Transparent Dossier Pricing + FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-[#F5F1E8] text-[#11221F] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* Patient Stories */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7432] mb-2">
                  Patient Impressions · Beverly Hills & Fly-In
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#11221F]">
                  Restorations indistinguishable from birth enamel.
                </h2>
              </div>
              <p className="text-xs text-[#14473E] font-medium">
                Verified Atelier Patient Dossiers · 5.0 Star Clinical Rating
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PATIENT_REVIEWS.map((rev) => (
                <article
                  key={rev.id}
                  className="flex flex-col justify-between rounded-[24px] border border-[#DFD8C8] bg-[#FDFCF9] p-7 shadow-[0_24px_50px_-35px_rgba(14,38,34,0.2)]"
                >
                  <div>
                    <div
                      className="flex items-center gap-1 text-[#9A7432] text-sm mb-4"
                      aria-label="5 out of 5 stars"
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <p className="font-serif text-lg leading-relaxed text-[#11221F]">
                      “{rev.quote}”
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#DFD8C8]">
                    <div className="text-xs font-semibold text-[#11221F]">
                      {rev.author}
                    </div>
                    <div className="text-xs text-[#14473E] mt-0.5">
                      {rev.treatment}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Transparent Dossier & Longevity Membership Trio */}
          <div className="mb-24 rounded-[28px] border border-[#DFD8C8] bg-[#FDFCF9] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#14473E] mb-2">
                  Written Architectural Dossier
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#11221F]">
                  Every fee & material documented upfront.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#4A5E5A]">
                  Before treatment begins, you receive a bound clinical blueprint
                  detailing your 3D optical scan findings, biomimetic materials,
                  PPO reimbursement calculation, and warranty.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#F5F1E8] p-5 border border-[#DFD8C8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#14473E]">
                    01 · PPO Concierge
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl text-[#11221F]">
                    Electronic PPO Filing
                  </h3>
                  <p className="mt-2 text-sm text-[#4A5E5A]">
                    We maximize and file all PPO dental benefits (Delta, Cigna,
                    Aetna, MetLife, Guardian) on your behalf.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5F1E8] p-5 border border-[#DFD8C8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9A7432]">
                    02 · Longevity Club
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl text-[#11221F]">
                    $65 / mo Enamel Club
                  </h3>
                  <p className="mt-2 text-sm text-[#4A5E5A]">
                    Includes 2 ultrasonic biofilm cleanings, annual 8,000 fps 3D
                    optical scan, nHAp serum, and 15% off restorations.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5F1E8] p-5 border border-[#DFD8C8]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9E4732]">
                    03 · 10-Year Warranty
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl text-[#11221F]">
                    0% APR & Bond Guarantee
                  </h3>
                  <p className="mt-2 text-sm text-[#4A5E5A]">
                    12–24 month 0% APR financing plus a 10-year structural bond
                    warranty on all Swiss biomimetic porcelains.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Item Accessible FAQ Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7432] mb-2">
                Frequently Asked Questions
              </span>
              <h2
                id="faq-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-[#11221F]"
              >
                Clarity before every decision.
              </h2>
              <p className="mt-3 text-base text-[#4A5E5A]">
                Speak directly with our Beverly Hills patient concierge at{" "}
                <a
                  href="tel:+13105550148"
                  className="font-semibold text-[#14473E] underline"
                >
                  (310) 555-0148
                </a>
                .
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#DFD8C8] rounded-[24px] border border-[#DFD8C8] bg-[#FDFCF9] px-6 sm:px-8">
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
                        className="flex w-full items-center justify-between gap-4 text-left font-serif text-lg sm:text-xl font-normal text-[#11221F] hover:text-[#14473E] cursor-pointer py-1"
                      >
                        <span>{item.question}</span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFD8C8] text-sm transition-transform duration-200 ${
                            isOpen
                              ? "rotate-45 bg-[#14473E] text-[#FDFCF9]"
                              : "bg-[#F5F1E8] text-[#11221F]"
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
                        className="mt-3 pr-8 text-[15px] leading-relaxed text-[#4A5E5A]"
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
