"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TRANSFORMATION_CASES, DOCTORS } from "@/data/clinicData";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASE_ACCENTS = [
  {
    activeBg: "bg-[#5C1D24]",
    activeBorder: "border-[#5C1D24]",
    restBg: "bg-[#FDF6F4]",
    restBorder: "border-[#EED2CC]",
    tagText: "text-[#7A2825]",
    activeTagText: "text-[#F2C98A]",
  },
  {
    activeBg: "bg-[#164239]",
    activeBorder: "border-[#164239]",
    restBg: "bg-[#F3FAF8]",
    restBorder: "border-[#C5E4DC]",
    tagText: "text-[#164239]",
    activeTagText: "text-[#5CE6C4]",
  },
  {
    activeBg: "bg-[#523914]",
    activeBorder: "border-[#523914]",
    restBg: "bg-[#FDF9F0]",
    restBorder: "border-[#EAD9B8]",
    tagText: "text-[#9A6B26]",
    activeTagText: "text-[#F2C98A]",
  },
] as const;

const DOCTOR_THEMES = [
  {
    cardBg: "bg-[#FDF6F4]",
    cardBorder: "border-[#EED2CC]",
    monogramBg: "bg-[#5C1D24]",
    roleBg: "bg-[#F7E3DF]",
    roleText: "text-[#7A2825]",
    ruleBorder: "border-[#7A2825]",
  },
  {
    cardBg: "bg-[#F3FAF8]",
    cardBorder: "border-[#C5E4DC]",
    monogramBg: "bg-[#164239]",
    roleBg: "bg-[#DFF0EC]",
    roleText: "text-[#164239]",
    ruleBorder: "border-[#164239]",
  },
  {
    cardBg: "bg-[#F4F7FC]",
    cardBorder: "border-[#C9D9EE]",
    monogramBg: "bg-[#1E3F66]",
    roleBg: "bg-[#E3ECF7]",
    roleText: "text-[#1E3F66]",
    ruleBorder: "border-[#1E3F66]",
  },
] as const;

export function BeforeAfterAndDoctorsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const compWrapRef = useRef<HTMLDivElement | null>(null);
  const docsWrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [sliderPct, setSliderPct] = useState<number>(52);

  const activeCase = TRANSFORMATION_CASES[selectedCaseIdx];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (compWrapRef.current) {
        gsap.from(compWrapRef.current.children, {
          scrollTrigger: {
            trigger: compWrapRef.current,
            start: "top 82%",
            once: true,
          },
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
        });
      }

      if (docsWrapRef.current) {
        const cards =
          docsWrapRef.current.querySelectorAll<HTMLElement>("[data-doc-card]");
        gsap.fromTo(
          cards,
          { y: 36, opacity: 0 },
          {
            scrollTrigger: {
              trigger: docsWrapRef.current,
              start: "top 85%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const updateFromClientX = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSliderPct(Math.max(5, Math.min(95, Math.round(raw))));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPct((v) => Math.max(5, v - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPct((v) => Math.min(95, v + 5));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="transformations"
      aria-labelledby="transformations-heading"
      className="bg-[#FFFDF9] text-[#181210] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: Interactive Drag-Curtain Before/After Comparator */}
        <div
          ref={compWrapRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5">
            <span className="inline-flex items-center rounded-full bg-[#F7E3DF] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A2825] mb-3">
              <span>Restorative Outcomes</span>
            </span>
            <h2
              id="transformations-heading"
              className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#181210] leading-[1.06]"
            >
              Natural translucency.
              <br />
              <span className="italic font-normal text-[#164239]">
                Never opaque chalk.
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#544A40]">
              Drag the optical curtain to see how clear aligner arch expansion
              and 0.2mm porcelain veils restore symmetry and natural pearl
              opalescence.
            </p>

            {/* Color-Coded Case Selector Pills */}
            <div
              className="mt-6 space-y-2.5"
              role="tablist"
              aria-label="Restorative Cases"
            >
              {TRANSFORMATION_CASES.map((c, idx) => {
                const isSelected = selectedCaseIdx === idx;
                const pal = CASE_ACCENTS[idx % CASE_ACCENTS.length];
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`w-full text-left rounded-2xl p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? `${pal.activeBg} ${pal.activeBorder} text-[#FAF6EE] shadow-lg`
                        : `${pal.restBg} ${pal.restBorder} text-[#181210] hover:shadow-sm`
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span
                        className={
                          isSelected ? pal.activeTagText : pal.tagText
                        }
                      >
                        {c.category}
                      </span>
                      <span
                        className={
                          isSelected ? "text-[#FAF6EE]/80" : "text-[#544A40]"
                        }
                      >
                        {c.duration}
                      </span>
                    </div>
                    <div className="mt-1 font-serif text-xl">{c.title}</div>
                    {isSelected && (
                      <p className="mt-1 text-xs sm:text-sm text-[#FAF6EE]/85">
                        {c.summary}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Pointer-Capture Drag Curtain */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] border border-[#E6DEC8] bg-gradient-to-br from-[#FAF6EE] via-[#FDF6F4] to-[#DFF0EC]/45 p-4 sm:p-6 shadow-xl">
              <div
                ref={stageRef}
                onPointerDown={(e) => {
                  draggingRef.current = true;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  updateFromClientX(e.clientX);
                }}
                onPointerMove={(e) => {
                  if (!draggingRef.current) return;
                  updateFromClientX(e.clientX);
                }}
                onPointerUp={() => {
                  draggingRef.current = false;
                }}
                onPointerCancel={() => {
                  draggingRef.current = false;
                }}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0E0C08] select-none cursor-ew-resize touch-none"
              >
                <img
                  src="/frames/scene-03-scan-whitening/desktop/frame_0180.webp"
                  alt={`After — ${activeCase.afterShade}`}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
                >
                  <img
                    src="/frames/scene-03-scan-whitening/desktop/frame_0055.webp"
                    alt={`Before — ${activeCase.beforeShade}`}
                    className="block h-full w-full object-cover"
                    draggable={false}
                  />
                </div>

                <div className="pointer-events-none absolute top-4 left-4 rounded-full bg-[#0E0C08]/85 border border-white/15 px-3.5 py-1 text-xs font-medium text-[#FAF6EE]">
                  {activeCase.beforeShade}
                </div>
                <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-[#164239]/95 border border-[#5CE6C4]/45 px-3.5 py-1 text-xs font-medium text-[#FAF6EE]">
                  {activeCase.afterShade}
                </div>

                {/* Draggable Handle */}
                <div
                  style={{ left: `${sliderPct}%` }}
                  className="absolute top-0 bottom-0 -translate-x-1/2 w-0.5 bg-[#5CE6C4]"
                >
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Before and after smile comparison slider"
                    aria-valuemin={5}
                    aria-valuemax={95}
                    aria-valuenow={sliderPct}
                    onKeyDown={handleKeyDown}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#5CE6C4] bg-[#164239] text-[#FAF6EE] shadow-xl"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4.5 h-4.5"
                    >
                      <path d="M7 6L3 10L7 14" />
                      <path d="M13 6L17 10L13 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Multi-Tonal Doctor Cards with Real Studio Photography */}
        <div className="mt-24 pt-20 border-t border-[#E6DEC8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#E3ECF7] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3F66] mb-3">
                <span>The Doctors</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#181210]">
                Specialists who{" "}
                <span className="italic font-normal text-[#7A2825]">
                  listen first.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base text-[#544A40]">
              Zurich, Geneva, and Harvard-trained clinicians dedicated to calm,
              one-on-one care in Beverly Hills.
            </p>
          </div>

          <div
            ref={docsWrapRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7"
          >
            {DOCTORS.map((doc, idx) => {
              const theme = DOCTOR_THEMES[idx % DOCTOR_THEMES.length];
              return (
                <article
                  key={doc.id}
                  data-doc-card
                  className={`group rounded-3xl border ${theme.cardBorder} ${theme.cardBg} p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                >
                  <div>
                    {/* Real Studio Portrait Photograph */}
                    <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-2xl mb-5 bg-[#EAE2D3] shadow-md">
                      <img
                        src={doc.portraitUrl}
                        alt={doc.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <span
                        className={`absolute bottom-3 left-3 rounded-full ${theme.roleBg} px-3.5 py-1 text-xs font-semibold ${theme.roleText} shadow-sm`}
                      >
                        {doc.role}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#181210]">
                      {doc.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#544A40]">
                      {doc.education}
                    </p>

                    <blockquote
                      className={`mt-4 border-l-2 ${theme.ruleBorder} pl-4 font-serif text-base italic text-[#181210]/90 leading-relaxed`}
                    >
                      “{doc.quote}”
                    </blockquote>
                  </div>

                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#booking")}
                    className={`mt-6 pt-4 border-t border-black/10 inline-flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] ${theme.roleText} hover:text-[#181210] cursor-pointer`}
                  >
                    <span>
                      Book with {doc.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
