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
      className="bg-[#FAF6EE] text-[#181210] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: Interactive Drag-Curtain Before/After Comparator */}
        <div
          ref={compWrapRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1917] mb-2">
              Restorative Outcomes
            </span>
            <h2
              id="transformations-heading"
              className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#181210] leading-[1.06]"
            >
              Natural translucency.
              <br />
              <span className="italic text-[#4B1917]">
                Never opaque chalk.
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#544A40]">
              Drag the optical curtain to see how clear aligner arch expansion
              and 0.2mm porcelain veils restore symmetry and natural pearl
              opalescence.
            </p>

            {/* Clean Case Selector Pills */}
            <div
              className="mt-6 space-y-2.5"
              role="tablist"
              aria-label="Restorative Cases"
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
                    className={`w-full text-left rounded-2xl p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#4B1917] border-[#4B1917] text-[#FAF6EE] shadow-lg"
                        : "bg-[#DFD3C3]/45 border-[#D8CFC0] text-[#181210] hover:bg-[#DFD3C3]/80"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span
                        className={
                          isSelected ? "text-[#C6A46C]" : "text-[#4B1917]"
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
            <div className="rounded-[28px] border border-[#D8CFC0] bg-[#DFD3C3]/55 p-4 sm:p-6 shadow-xl">
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
                <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-[#4B1917]/95 border border-[#C6A46C]/45 px-3.5 py-1 text-xs font-medium text-[#FAF6EE]">
                  {activeCase.afterShade}
                </div>

                {/* Draggable Handle */}
                <div
                  style={{ left: `${sliderPct}%` }}
                  className="absolute top-0 bottom-0 -translate-x-1/2 w-0.5 bg-[#C6A46C]"
                >
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Before and after smile comparison slider"
                    aria-valuemin={5}
                    aria-valuemax={95}
                    aria-valuenow={sliderPct}
                    onKeyDown={handleKeyDown}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C6A46C] bg-[#140B0A] text-[#FAF6EE] shadow-xl"
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

        {/* Part 2: Clean, Human Doctor Cards with Hover Lift */}
        <div className="mt-24 pt-20 border-t border-[#D8CFC0]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1917] mb-2">
                The Doctors
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#181210]">
                Specialists who listen first.
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
            {DOCTORS.map((doc) => (
              <article
                key={doc.id}
                data-doc-card
                className="group rounded-3xl border border-[#D8CFC0] bg-[#DFD3C3]/40 p-7 flex flex-col justify-between hover:bg-[#DFD3C3]/75 hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4B1917] font-serif text-xl text-[#FAF6EE] border border-[#C6A46C]/45">
                      {doc.monogram}
                    </div>
                    <span className="rounded-full bg-[#FAF6EE] px-3.5 py-1 text-xs font-medium text-[#4B1917]">
                      {doc.role}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#181210]">
                    {doc.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#544A40]">{doc.education}</p>

                  <blockquote className="mt-4 border-l-2 border-[#4B1917] pl-4 font-serif text-base italic text-[#181210]/90 leading-relaxed">
                    “{doc.quote}”
                  </blockquote>
                </div>

                <button
                  type="button"
                  onClick={() => smoothScrollTo("#booking")}
                  className="mt-6 pt-4 border-t border-[#C8B9A6] inline-flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#4B1917] hover:text-[#181210] cursor-pointer"
                >
                  <span>Book with {doc.name.split(",")[0]}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
