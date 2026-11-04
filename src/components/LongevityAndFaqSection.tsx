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
  },
  {
    title: "Acoustic Private Suites",
    body: "Noise-canceling audio, cashmere throws, and one-patient-at-a-time calm.",
  },
  {
    title: "Upfront Written Pricing",
    body: "We verify your PPO benefits in advance and hand you a clear summary before care begins.",
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
      {/* 1. Calm Sanctuary Band on Deep Burgundy-Crimson (#4B1917) */}
      <section
        id="longevity-sanctuary"
        aria-labelledby="longevity-heading"
        className="bg-[#4B1917] text-[#FAF6EE] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#C6A46C] mb-2">
                Unhurried Comfort
              </span>
              <h2
                id="longevity-heading"
                className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF6EE] leading-[1.06]"
              >
                Designed for nervous patients.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#FAF6EE]/80">
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
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#C6A46C] px-6 text-xs font-semibold uppercase tracking-[0.13em] text-[#140B0A] hover:bg-[#FAF6EE] transition-colors cursor-pointer shadow-md"
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
                  className="rounded-3xl border border-white/15 bg-black/20 p-6 flex flex-col justify-between"
                >
                  <h3 className="font-serif text-2xl text-[#C6A46C]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#FAF6EE]/85">
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
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1917] mb-2">
                Common Questions
              </span>
              <h2
                id="faq-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-[#181210]"
              >
                Clear answers before you visit.
              </h2>
              <p className="mt-3 text-base text-[#544A40]">
                Prefer to speak with us directly? Call our Beverly Hills studio
                at{" "}
                <a
                  href="tel:+13105550148"
                  className="font-semibold text-[#4B1917] underline"
                >
                  (310) 555-0148
                </a>
                .
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#D8CFC0] rounded-3xl border border-[#D8CFC0] bg-[#DFD3C3]/35 px-6 sm:px-8">
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
                        className="flex w-full items-center justify-between gap-4 text-left font-serif text-lg sm:text-xl font-normal text-[#181210] hover:text-[#4B1917] cursor-pointer py-1"
                      >
                        <span>{item.question}</span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D8CFC0] text-sm transition-transform duration-200 ${
                            isOpen
                              ? "rotate-45 bg-[#4B1917] text-[#FAF6EE]"
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
