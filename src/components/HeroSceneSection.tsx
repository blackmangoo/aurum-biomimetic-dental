"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PILLARS = [
  {
    metric: "96%",
    title: "Enamel Preserved",
    note: "Additive restorations without aggressive crown grinding",
  },
  {
    metric: "0.2 mm",
    title: "No-Prep Veneers",
    note: "Contact-lens thin porcelain hand-layered on platinum foil",
  },
  {
    metric: "60 sec",
    title: "Optical 3D Scan",
    note: "Radiation-free light imaging with zero putty impressions",
  },
  {
    metric: "Calm-First",
    title: "Private Penthouse",
    note: "One patient at a time with warm buffered numbing",
  },
] as const;

export function HeroSceneSection() {
  const scene = SCROLL_SCENES["scene-01-hero"];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const copyColRef = useRef<HTMLDivElement | null>(null);

  // Choreographed entrance animation on mount
  useGSAP(
    () => {
      if (!copyColRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(copyColRef.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: pinSectionRef }
  );

  const applyActDom = useCallback((actIdx: 0 | 1 | 2) => {
    const root = pinSectionRef.current;
    if (!root) return;
    root.dataset.act = String(actIdx);

    root.querySelectorAll<HTMLElement>("[data-hero-act-panel]").forEach((el) => {
      el.classList.toggle("hidden", el.dataset.heroActPanel !== String(actIdx));
    });

    root
      .querySelectorAll<HTMLButtonElement>("[data-hero-act-pill]")
      .forEach((btn) => {
        const active = btn.dataset.heroActPill === String(actIdx);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        btn.className = active
          ? "flex-1 rounded-full py-1.5 px-3 text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer bg-[#C6A46C] text-[#140B0A] shadow-sm"
          : "flex-1 rounded-full py-1.5 px-3 text-[11px] font-medium tracking-wider uppercase transition-all cursor-pointer bg-white/10 text-[#FAF6EE]/80 hover:bg-white/20";
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
    <section id="hero-stage" aria-label="Aurum Atelier — Biomimetic Dentistry">
      <div
        ref={trackRef}
        className="scene-sticky-track relative"
        style={
          {
            backgroundColor: scene.sectionBgHex,
            "--mobile-track-h": "330svh",
          } as React.CSSProperties
        }
      >
        <div
          ref={pinSectionRef}
          data-act="0"
          className="scene-sticky-stage w-full overflow-hidden flex items-center pt-[74px] pb-5 lg:pt-[84px] lg:pb-6"
          style={{ backgroundColor: scene.sectionBgHex, color: "#FAF6EE" }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Left Column (5 Cols): Restrained, Breathing Editorial Copy */}
            <div
              ref={copyColRef}
              className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C6A46C] mb-2">
                  {scene.eyebrow}
                </p>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[42px] xl:text-[54px] font-normal leading-[1.04] tracking-tight text-[#FAF6EE]">
                  Living enamel,
                  <br />
                  <span className="italic text-[#C6A46C]">
                    left untouched.
                  </span>
                </h1>

                <p className="scene-compact-hide hidden sm:block mt-3 text-sm sm:text-base leading-relaxed text-[#FAF6EE]/85 max-w-md">
                  We preserve your natural teeth with contact-lens thin 0.2mm
                  porcelain veils, clear aligners, and calm single-patient
                  suites in Beverly Hills.
                </p>
              </div>

              {/* Minimal Single-Card Chapter Switcher */}
              <div className="mt-4 lg:mt-6 rounded-2xl border border-white/15 bg-black/20 p-4 sm:p-5">
                {scene.acts.map((act, idx) => (
                  <div
                    key={act.id}
                    data-hero-act-panel={String(idx)}
                    className={idx === 0 ? "" : "hidden"}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="font-serif text-lg sm:text-xl text-[#FAF6EE]">
                        {act.title}
                      </h2>
                      <span className="shrink-0 font-serif text-lg text-[#C6A46C]">
                        {act.metricValue}{" "}
                        <span className="font-sans text-[11px] text-[#FAF6EE]/70">
                          {act.metricLabel}
                        </span>
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#FAF6EE]/80">
                      {act.subtitle}
                    </p>
                  </div>
                ))}

                <div
                  className="mt-3.5 flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Restorative Chapters"
                >
                  {scene.acts.map((act, idx) => (
                    <button
                      key={act.id}
                      type="button"
                      role="tab"
                      data-hero-act-pill={String(idx)}
                      aria-selected={idx === 0}
                      onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                      className={
                        idx === 0
                          ? "flex-1 rounded-full py-1.5 px-3 text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer bg-[#C6A46C] text-[#140B0A] shadow-sm"
                          : "flex-1 rounded-full py-1.5 px-3 text-[11px] font-medium tracking-wider uppercase transition-all cursor-pointer bg-white/10 text-[#FAF6EE]/80 hover:bg-white/20"
                      }
                    >
                      {act.tabLabel}
                    </button>
                  ))}
                </div>

                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    ref={progressBarRef}
                    className="h-full w-full origin-left rounded-full bg-[#C6A46C] will-change-transform"
                    style={{ transform: "scaleX(0.05)" }}
                  />
                </div>
              </div>

              {/* Clean CTA Row */}
              <div className="mt-4 lg:mt-5 flex items-center gap-3">
                <MagneticButton
                  type="button"
                  onClick={() => smoothScrollTo("#services")}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FAF6EE] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#140B0A] hover:bg-[#C6A46C] transition-colors cursor-pointer whitespace-nowrap shadow-md"
                >
                  <span>Explore Treatments</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </MagneticButton>
                <MagneticButton
                  type="button"
                  onClick={() => smoothScrollTo("#booking")}
                  className="inline-flex h-11 items-center rounded-full border border-white/35 bg-white/5 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EE] hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book a Visit
                </MagneticButton>
              </div>
            </div>

            {/* Right Column (7 Cols): Seamless 16:9 Burgundy-Crimson Studio Stage */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-[540px] lg:max-w-[880px] aspect-[16/9] max-h-[28svh] sm:max-h-[38svh] lg:max-h-[calc(100vh-116px)]">
                <ScrollSequenceStage
                  scene={scene}
                  eager={true}
                  onActChange={applyActDom}
                  progressBarRef={progressBarRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calm 4-Pillar Strip on Warm Travertine (#DFD3C3) */}
      <div className="border-b border-[#C8B9A6] bg-[#DFD3C3] text-[#181210]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <div className="font-serif text-3xl sm:text-4xl text-[#4B1917]">
                {p.metric}
              </div>
              <div className="mt-1 text-sm sm:text-base font-semibold text-[#181210]">
                {p.title}
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-[#544A40]">
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
