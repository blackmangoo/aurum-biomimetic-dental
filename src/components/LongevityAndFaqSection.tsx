"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FAQ_ITEMS } from "@/data/clinicData";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ServiceId } from "@/lib/bookingSchema";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LongevityAndFaqSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

const SANCTUARY_FEATURES = [
  {
    title: "Warm Buffered Numbing",
    body: "pH-neutral anesthetic warmed to body temperature so you never feel a pinch.",
    pill: "Zero Pinch",
    cardBg: "bg-[#F7E3DF]",
    titleColor: "text-[#7A2825]",
    pillBg: "bg-[#7A2825]",
  },
  {
    title: "Acoustic Private Suites",
    body: "Noise-canceling audio, cashmere throws, and one-patient-at-a-time calm.",
    pill: "Private Suite",
    cardBg: "bg-[#F9EED8]",
    titleColor: "text-[#9A6B26]",
    pillBg: "bg-[#9A6B26]",
  },
  {
    title: "Upfront Written Pricing",
    body: "We verify your PPO benefits in advance and hand you a clear summary before care begins.",
    pill: "No Surprise Bills",
    cardBg: "bg-[#DFF0EC]",
    titleColor: "text-[#164239]",
    pillBg: "bg-[#164239]",
  },
] as const;

export function LongevityAndFaqSection({
  onSelectServiceForBooking,
}: LongevityAndFaqSectionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards =
        sectionRef.current.querySelectorAll<HTMLElement>("[data-sanc-card]");
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      {/* 1. Botanical Cypress & Emerald Sanctuary Band (#133830 -> #1B4D43) */}
      <section
        id="longevity-sanctuary"
        aria-labelledby="longevity-heading"
        style={{
          background:
            "linear-gradient(135deg, #102E27 0%, #164239 52%, #1E3F66 100%)",
        }}
        className="text-[#FAF6EE] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-[#5CE6C4]/35 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#5CE6C4] mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5CE6C4]" />
                <span>Unhurried Comfort</span>
              </span>
              <h2
                id="longevity-heading"
                className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF6EE] leading-[1.06]"
              >
                Designed for{" "}
                <span className="italic font-normal text-emerald-gold">
                  nervous patients.
                </span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#FAF6EE]/85">
                No crowded waiting rooms, no rushed appointments, and no
                surprise bills — just quiet, attentive care at your pace.
              </p>

              <div className="mt-7">
                <MagneticButton
                  type="button"
                  onClick={() => {
                    onSelectServiceForBooking("tmj-neuromuscular");
                    smoothScrollTo("#booking");
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#5CE6C4] to-[#F2C98A] px-6 text-xs font-semibold uppercase tracking-[0.13em] text-[#102E27] hover:brightness-105 transition-all cursor-pointer shadow-lg"
                >
                  <span>Reserve a Calm Visit</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {SANCTUARY_FEATURES.map((item) => (
                <div
                  key={item.title}
                  data-sanc-card
                  className={`rounded-3xl ${item.cardBg} text-[#181210] p-6 flex flex-col justify-between shadow-xl`}
                >
                  <div>
                    <span
                      className={`inline-block rounded-full ${item.pillBg} px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#FAF6EE] mb-4`}
                    >
                      {item.pill}
                    </span>
                    <h3 className={`font-serif text-2xl ${item.titleColor}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#423A32]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Concise FAQ Accordion on Warm Alabaster (#FAF6EE) */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-[#FAF6EE] text-[#181210] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F9EED8] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A6B26] mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9A6B26]" />
                <span>Common Questions</span>
              </span>
              <h2
                id="faq-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-[#181210]"
              >
                Clear answers{" "}
                <span className="italic font-normal text-[#7A2825]">
                  before you visit.
                </span>
              </h2>
              <p className="mt-3 text-base text-[#544A40]">
                Prefer to speak with us directly? Call our Beverly Hills studio
                at{" "}
                <a
                  href="tel:+13105550148"
                  className="font-semibold text-[#7A2825] underline"
                >
                  (310) 555-0148
                </a>
                .
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#E6DEC8] rounded-3xl border border-[#E6DEC8] bg-[#FFFDF9] px-6 sm:px-8 shadow-sm">
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
                        className="flex w-full items-center justify-between gap-4 text-left font-serif text-lg sm:text-xl font-normal text-[#181210] hover:text-[#7A2825] cursor-pointer py-1"
                      >
                        <span>{item.question}</span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D8CFC0] text-sm transition-transform duration-200 ${
                            isOpen
                              ? "rotate-45 bg-[#164239] text-[#FAF6EE]"
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
                        className="mt-2.5 pr-8 text-sm sm:text-base leading-relaxed text-[#544A40]"
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
    </div>
  );
}
