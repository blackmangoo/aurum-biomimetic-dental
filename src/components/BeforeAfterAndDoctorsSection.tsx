"use client";

import React, { useState, useRef, useEffect } from "react";
import { TRANSFORMATION_CASES, DOCTORS } from "@/data/clinicData";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { renderBiomimeticSceneFrame } from "@/lib/biomimeticSynthRenderer";

export function BeforeAfterAndDoctorsSection() {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [sliderPct, setSliderPct] = useState(52);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const draggingRef = useRef(false);

  const activeCase = TRANSFORMATION_CASES[selectedCaseIdx];

  useEffect(() => {
    const bCanvas = beforeCanvasRef.current;
    const aCanvas = afterCanvasRef.current;
    if (bCanvas) {
      bCanvas.width = 960;
      bCanvas.height = 600;
      const ctx = bCanvas.getContext("2d", { alpha: false });
      if (ctx) {
        renderBiomimeticSceneFrame(
          ctx,
          selectedCaseIdx === 2 ? "scene-02-implant" : "scene-03-scan-whitening",
          960,
          600,
          0.12,
          "#0B1F1C"
        );
      }
    }
    if (aCanvas) {
      aCanvas.width = 960;
      aCanvas.height = 600;
      const ctx = aCanvas.getContext("2d", { alpha: false });
      if (ctx) {
        renderBiomimeticSceneFrame(
          ctx,
          selectedCaseIdx === 2 ? "scene-02-implant" : "scene-03-scan-whitening",
          960,
          600,
          0.96,
          "#050A09"
        );
      }
    }
  }, [selectedCaseIdx]);

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
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPct(10);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPct(90);
    }
  };

  return (
    <section
      id="transformations"
      aria-labelledby="transformations-heading"
      className="bg-[#F5F1E8] text-[#11221F] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: Interactive Before / After Optical Comparator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7432] mb-3">
              Zurich Ceramic & Shade Architecture
            </span>
            <h2
              id="transformations-heading"
              className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#11221F] leading-[1.08]"
            >
              Incisal opalescence.
              <br />
              <span className="text-[#14473E]">Zero tooth amputation.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4A5E5A]">
              Drag the optical comparator to inspect how 0.2mm no-prep Swiss
              lithium disilicate veils, airway arch expansion, and
              nano-hydroxyapatite remineralization restore natural OM1/B1
              translucency while saving living enamel.
            </p>

            {/* Case Selector Tabs */}
            <div
              className="mt-6 space-y-2.5"
              role="tablist"
              aria-label="Biomimetic Transformation Cases"
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
                        ? "bg-[#FDFCF9] border-[#14473E] shadow-[0_20px_45px_-28px_rgba(20,71,62,0.3)]"
                        : "bg-[#FDFCF9]/55 border-[#DFD8C8] hover:bg-[#FDFCF9]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#9A7432]">
                      <span>{c.category}</span>
                      <span className="text-[#14473E]">{c.enamelSaved}</span>
                    </div>
                    <div className="mt-1 font-serif text-lg text-[#11221F]">
                      {c.title}
                    </div>
                    {isSelected && (
                      <p className="mt-1 text-sm text-[#4A5E5A]">{c.summary}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Before / After Slider */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] border border-[#DFD8C8] bg-[#FDFCF9] p-4 sm:p-6 shadow-[0_30px_60px_-30px_rgba(14,38,34,0.22)]">
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
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#050A09] select-none cursor-ew-resize touch-none"
              >
                {/* AFTER Layer */}
                <canvas
                  ref={afterCanvasRef}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />

                {/* BEFORE Layer (Clipped to sliderPct) */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
                >
                  <canvas
                    ref={beforeCanvasRef}
                    className="block h-full w-full object-cover sepia-[0.22] brightness-90"
                  />
                </div>

                {/* Top Corner Badges */}
                <div className="pointer-events-none absolute top-4 left-4 rounded-full bg-[#081715]/90 border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-[#E6F4F1]">
                  Before · {activeCase.beforeShade}
                </div>
                <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-[#14473E]/95 border border-[#4CE6C4]/40 px-3.5 py-1.5 text-xs font-semibold text-[#FDFCF9]">
                  After · {activeCase.afterShade}
                </div>

                {/* Vertical Divider Hairline + Accessible Keyboard Slider Handle */}
                <div
                  style={{ left: `${sliderPct}%` }}
                  className="absolute top-0 bottom-0 -translate-x-1/2 w-0.5 bg-[#D4AF6A]"
                >
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Before and after biomimetic smile comparison slider"
                    aria-valuemin={5}
                    aria-valuemax={95}
                    aria-valuenow={sliderPct}
                    onKeyDown={handleKeyDown}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF6A] bg-[#0B1F1C] text-[#FDFCF9] shadow-xl focus-visible:outline-2 focus-visible:outline-[#4CE6C4]"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M7 6L3 10L7 14" />
                      <path d="M13 6L17 10L13 14" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Case Comparison Readout */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-[#F5F1E8] p-3.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9A7432]">
                    Initial Presentation
                  </span>
                  <p className="mt-1 text-[#11221F]">{activeCase.beforeDetails}</p>
                </div>
                <div className="rounded-xl bg-[#D9EAE6]/60 p-3.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#14473E]">
                    Biomimetic Outcome ({activeCase.duration})
                  </span>
                  <p className="mt-1 text-[#11221F]">{activeCase.afterDetails}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Doctors & Clinical Leadership */}
        <div className="mt-28 pt-20 border-t border-[#DFD8C8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7432] mb-3">
                Clinical Leadership · Beverly Hills & Zurich
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#11221F]">
                Pioneers of Enamel Conservation.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#4A5E5A]">
              Zurich- and Harvard-trained biomimetic prosthodontists, ceramic
              implantologists, and craniofacial airway specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {DOCTORS.map((doc) => (
              <article
                key={doc.id}
                className="flex flex-col justify-between rounded-[24px] border border-[#DFD8C8] bg-[#FDFCF9] p-7 sm:p-8 shadow-[0_30px_60px_-35px_rgba(14,38,34,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0E2622] font-serif text-2xl text-[#FDFCF9] border border-[#D4AF6A]/45">
                      {doc.monogram}
                    </div>
                    <span className="rounded-full bg-[#EFE7D6] px-3 py-1 text-xs font-semibold text-[#9A7432]">
                      {doc.role}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#11221F]">
                    {doc.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#14473E]">
                    {doc.credentials}
                  </p>
                  <p className="mt-2 text-xs text-[#4A5E5A]">{doc.education}</p>

                  <blockquote className="mt-5 border-l-2 border-[#D4AF6A] pl-4 font-serif text-base italic text-[#11221F]/90 leading-relaxed">
                    “{doc.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 pt-5 border-t border-[#DFD8C8]">
                  <div className="flex flex-wrap gap-2">
                    {doc.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="rounded-full bg-[#F5F1E8] px-3 py-1 text-xs font-medium text-[#4A5E5A]"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#booking")}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#14473E] hover:text-[#11221F] cursor-pointer"
                  >
                    <span>Consult with {doc.name.split(",")[0]}</span>
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
