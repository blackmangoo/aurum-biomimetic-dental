"use client";

import React, { useRef, useCallback } from "react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";

const TRUST_METRICS = [
  {
    value: "96.4%",
    label: "Living Enamel Preserved",
    detail: "Zero full-crown tooth amputation",
  },
  {
    value: "0.2 mm",
    label: "Swiss No-Prep Porcelain Veils",
    detail: "Hand-sintered in Zurich on refractory dies",
  },
  {
    value: "51.5 MPa",
    label: "DEJ-Mimetic Tensile Bond",
    detail: "Immediate Dentin Sealing (IDS) protocol",
  },
  {
    value: "0 mSv",
    label: "8,000 fps Optical Coherence",
    detail: "Radiation-free sub-surface crack mapping",
  },
] as const;

export function HeroSceneSection() {
  const scene = SCROLL_SCENES["scene-01-hero"];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const applyActDom = useCallback((actIdx: 0 | 1 | 2) => {
    const root = pinSectionRef.current;
    if (!root) return;
    root.dataset.act = String(actIdx);

    root.querySelectorAll<HTMLElement>("[data-hero-act-panel]").forEach((el) => {
      el.classList.toggle("hidden", el.dataset.heroActPanel !== String(actIdx));
    });

    root
      .querySelectorAll<HTMLButtonElement>("[data-hero-act-tab]")
      .forEach((btn) => {
        const active = btn.dataset.heroActTab === String(actIdx);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        btn.className = active
          ? "flex-1 rounded-full py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer bg-[#D4AF6A] text-[#0B1F1C]"
          : "flex-1 rounded-full py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer bg-white/10 text-[#E6F4F1]/80 hover:bg-white/20";
      });
  }, []);

  const handleManualActClick = useCallback(
    (idx: 0 | 1 | 2) => {
      applyActDom(idx);
      const stageNode = pinSectionRef.current?.querySelector<
        HTMLDivElement & {
          __setSceneProgress?: (p: number, syncInRaf?: boolean) => void;
        }
      >('[data-scene-stage="scene-01-hero"]');
      const p = idx === 0 ? 0.04 : idx === 1 ? 0.5 : 0.96;
      stageNode?.__setSceneProgress?.(p, true);
    },
    [applyActDom]
  );

  useSceneScrollScrub({
    sceneId: "scene-01-hero",
    scrollLengthVh: scene.scrollLengthVh,
    trackRef,
    stageContainerRef: pinSectionRef,
  });

  return (
    <section id="hero-stage" aria-label="Hero — Biomimetic Enamel Architecture">
      {/* Synchronized sticky track on phone/tablet (340svh) & GSAP pin container on desktop */}
      <div
        ref={trackRef}
        className="scene-sticky-track relative"
        style={
          {
            backgroundColor: scene.sectionBgHex,
            "--mobile-track-h": "340svh",
          } as React.CSSProperties
        }
      >
        <div
          ref={pinSectionRef}
          data-act="0"
          className="scene-sticky-stage w-full overflow-hidden flex flex-col justify-evenly lg:justify-between pt-[74px] pb-4 sm:pb-6 lg:pt-[84px] lg:pb-8"
          style={{ backgroundColor: scene.sectionBgHex, color: "#FDFCF9" }}
        >
          {/* Top Editorial Row */}
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-6 items-start">
            <div className="relative z-10 lg:col-span-4 max-w-md">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF6A] mb-1 sm:mb-2">
                {scene.eyebrow}
              </p>
              <p className="hidden lg:block text-[15px] xl:text-[17px] leading-relaxed text-[#E6F4F1]/95 font-normal">
                We never grind living teeth into stumps for crowns. Experience
                Swiss 0.2mm no-prep porcelain veils, 51.5 MPa dentin bio-sealing,
                and metal-free ceramic-gold implantology in Beverly Hills.
              </p>
              <div className="mt-4 hidden lg:flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#services")}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FDFCF9] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0B1F1C] shadow-lg hover:bg-[#D4AF6A] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Biomimetic Care</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#booking")}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-[#0E2622]/80 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FDFCF9] hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Reserve Consultation</span>
                </button>
              </div>
            </div>

            {/* Unified 16:9 Centered 3D Biomimetic Histology Stage */}
            <div className="lg:col-span-4 w-full flex items-center justify-center lg:pointer-events-none lg:absolute lg:inset-0 lg:pt-[68px]">
              <div className="relative w-full max-w-[560px] lg:max-w-[1120px] aspect-[16/9] max-h-[33svh] sm:max-h-[38svh] lg:max-h-[75vh] pointer-events-auto">
                <ScrollSequenceStage
                  scene={scene}
                  eager={true}
                  onActChange={applyActDom}
                  progressBarRef={progressBarRef}
                />
              </div>
            </div>

            {/* Right Live Histological Act Switcher Card */}
            <div className="relative z-10 lg:col-span-4 lg:col-start-9 lg:justify-self-end w-full max-w-md lg:max-w-sm rounded-2xl border border-white/20 bg-[#091A17]/95 p-3.5 sm:p-4 xl:p-5">
              {scene.acts.map((act, idx) => (
                <div
                  key={act.id}
                  data-hero-act-panel={String(idx)}
                  className={idx === 0 ? "" : "hidden"}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1 sm:mb-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF6A] whitespace-nowrap">
                      {act.badge}
                    </span>
                    <span className="shrink-0 text-right whitespace-nowrap">
                      <span className="font-serif text-base sm:text-lg text-[#E6F4F1]">
                        {act.metricValue}
                      </span>{" "}
                      <span className="font-sans text-[10px] sm:text-[11px] text-[#9BB5B0]">
                        {act.metricLabel}
                      </span>
                    </span>
                  </div>
                  <h2 className="font-serif text-lg xl:text-xl font-normal text-[#FDFCF9]">
                    {act.title}
                  </h2>
                  <p className="mt-1 text-xs xl:text-sm leading-relaxed text-[#E6F4F1]/85 line-clamp-2 xl:line-clamp-none">
                    {act.subtitle}
                  </p>
                </div>
              ))}

              <div
                className="mt-3 flex items-center gap-1.5"
                role="tablist"
                aria-label="Hero 3D Biomimetic Sequence Chapters"
              >
                {scene.acts.map((act, idx) => {
                  const isSelected = idx === 0;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      role="tab"
                      data-hero-act-tab={String(idx)}
                      aria-selected={isSelected}
                      onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                      className={`flex-1 rounded-full py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#D4AF6A] text-[#0B1F1C]"
                          : "bg-white/10 text-[#E6F4F1]/80 hover:bg-white/20"
                      }`}
                    >
                      Act 0{idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  ref={progressBarRef}
                  className="h-full w-full origin-left rounded-full bg-[#D4AF6A] will-change-transform"
                  style={{ transform: "scaleX(0.05)" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Editorial Row */}
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 mt-2 lg:mt-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-5 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-[26px] sm:text-5xl lg:text-[48px] xl:text-[60px] font-normal uppercase leading-[1.03] tracking-[-0.02em] text-[#FDFCF9]">
                Living Enamel
                <br />
                Preserved By
                <br />
                <span className="text-[#D4AF6A]">Biomimetic Art</span>
              </h1>
              <div className="mt-2.5 flex lg:hidden items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#services")}
                  className="inline-flex h-10 sm:h-11 items-center gap-2 rounded-full bg-[#FDFCF9] px-4 sm:px-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#0B1F1C]"
                >
                  <span>Explore Specialties</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#booking")}
                  className="inline-flex h-10 sm:h-11 items-center rounded-full border border-white/40 px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#FDFCF9]"
                >
                  Reserve Suite
                </button>
              </div>
            </div>

            <div className="hidden sm:flex lg:col-span-4 lg:text-right flex-col lg:items-end justify-end">
              <p className="max-w-xs text-sm xl:text-base leading-relaxed text-[#E6F4F1]/90">
                Scroll to separate our 3D histological tooth layers — from the
                living neuro-vascular pulp to the golden DEJ tension bridge and
                0.2mm Swiss porcelain veil.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D4AF6A]">
                <span>Scroll to deconstruct 3D enamel</span>
                <span aria-hidden="true">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Architectural Metrics Bar on Warm Alabaster */}
      <div className="border-b border-[#DFD8C8] bg-[#FDFCF9] text-[#11221F]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DFD8C8]">
            {TRUST_METRICS.map((item, idx) => (
              <div
                key={item.label}
                className={`py-5 sm:py-2 ${
                  idx === 0
                    ? "sm:pr-8"
                    : idx === TRUST_METRICS.length - 1
                    ? "sm:pl-8"
                    : "sm:px-8"
                }`}
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EFE7D6] text-xs font-semibold text-[#9A7432]">
                  0{idx + 1}
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#11221F]">
                  {item.value}
                </div>
                <div className="mt-1 text-base font-semibold text-[#11221F]">
                  {item.label}
                </div>
                <p className="mt-0.5 text-sm text-[#4A5E5A]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
