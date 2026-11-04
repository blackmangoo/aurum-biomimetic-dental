"use client";

import React, { useRef, useCallback } from "react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";

const MONOGRAPH_SPECS = [
  {
    code: "SPEC 01 // CONSERVATION",
    metric: "96.4%",
    title: "Virgin Enamel Retained",
    note: "Zero full-crown tooth stump grinding",
  },
  {
    code: "SPEC 02 // CERAMIC GAUGE",
    metric: "0.2 mm",
    title: "Platinum-Foil Swiss Veils",
    note: "Hand-sintered in Geneva & Zurich",
  },
  {
    code: "SPEC 03 // ADHESION",
    metric: "51.5 MPa",
    title: "DEJ-Mimetic Bio-Seal",
    note: "Immediate Dentin Sealing (IDS)",
  },
  {
    code: "SPEC 04 // DIAGNOSTICS",
    metric: "8,000 fps",
    title: "Near-Infrared OCT",
    note: "0 mSv radiation sub-surface map",
  },
] as const;

const ACTIVE_ACT_ROW =
  "w-full text-left border-l-2 border-[#C6A46C] bg-black/25 px-4 py-2.5 transition-colors cursor-pointer";
const INACTIVE_ACT_ROW =
  "hidden lg:block w-full text-left border-l-2 border-white/15 bg-transparent px-4 py-2 hover:bg-black/15 transition-colors cursor-pointer opacity-75";

export function HeroSceneSection() {
  const scene = SCROLL_SCENES["scene-01-hero"];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const applyActDom = useCallback((actIdx: 0 | 1 | 2) => {
    const root = pinSectionRef.current;
    if (!root) return;
    root.dataset.act = String(actIdx);

    root
      .querySelectorAll<HTMLButtonElement>("[data-hero-act-row]")
      .forEach((row) => {
        const active = row.dataset.heroActRow === String(actIdx);
        row.setAttribute("aria-selected", active ? "true" : "false");
        row.className = active ? ACTIVE_ACT_ROW : INACTIVE_ACT_ROW;
        const sub = row.querySelector<HTMLElement>("[data-hero-act-sub]");
        if (sub) sub.classList.toggle("hidden", !active);
      });

    root
      .querySelectorAll<HTMLButtonElement>("[data-hero-mob-pill]")
      .forEach((btn) => {
        const active = btn.dataset.heroMobPill === String(actIdx);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        btn.className = active
          ? "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#C6A46C] text-[#120E0D] cursor-pointer"
          : "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] bg-black/25 text-[#FAF6EE]/80 cursor-pointer";
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
    <section
      id="hero-stage"
      aria-label="Monograph 01 — Burgundy-Rose Biomimetic Arch Stage"
    >
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
        {/* Asymmetric Swiss Monograph Split Stage on Deep Burgundy-Rose (#6E1B2B) */}
        <div
          ref={pinSectionRef}
          data-act="0"
          className="scene-sticky-stage w-full overflow-hidden flex items-center pt-[74px] pb-4 lg:pt-[82px] lg:pb-6"
          style={{ backgroundColor: scene.sectionBgHex, color: "#FAF6EE" }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Left Column (5 Cols): Swiss Architectural Monograph Index & Vertical Act Ledger */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#C6A46C]/45 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6A46C]">
                  <span>MONOGRAPH N° 01 // GENEVA &amp; BEVERLY HILLS</span>
                </div>

                <h1 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[50px] font-normal uppercase leading-[1.02] tracking-tight text-[#FAF6EE]">
                  We Never Grind
                  <br />
                  Living Teeth{" "}
                  <span className="italic font-normal text-[#C6A46C]">
                    Into Stumps.
                  </span>
                </h1>

                <p className="scene-compact-hide hidden sm:block mt-2.5 text-xs sm:text-sm leading-relaxed text-[#FAF6EE]/85">
                  Conventional crowns amputate 70% of healthy tooth structure.
                  Our Swiss biomimetic laboratory bonds 0.2mm platinum-foil
                  porcelain veils directly to intact enamel at 51.5 MPa.
                </p>
              </div>

              {/* Mobile Compact Act Switcher */}
              <div
                className="mt-3 flex lg:hidden items-center gap-1"
                role="tablist"
                aria-label="Hero Sequence Acts Mobile"
              >
                {scene.acts.map((act, idx) => (
                  <button
                    key={act.id}
                    type="button"
                    role="tab"
                    data-hero-mob-pill={String(idx)}
                    aria-selected={idx === 0}
                    onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                    className={
                      idx === 0
                        ? "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#C6A46C] text-[#120E0D] cursor-pointer"
                        : "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] bg-black/25 text-[#FAF6EE]/80 cursor-pointer"
                    }
                  >
                    Act 0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Vertical Swiss Hairline Act Ledger */}
              <div
                className="mt-3 lg:mt-4 space-y-1.5"
                role="tablist"
                aria-label="Hero Sequence Acts"
              >
                {scene.acts.map((act, idx) => {
                  const isActive = idx === 0;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      role="tab"
                      data-hero-act-row={String(idx)}
                      aria-selected={isActive}
                      onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                      className={isActive ? ACTIVE_ACT_ROW : INACTIVE_ACT_ROW}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C6A46C]">
                          {act.badge}
                        </span>
                        <span className="font-serif text-sm sm:text-base text-[#FAF6EE]">
                          {act.metricValue}{" "}
                          <span className="font-sans text-[10px] text-[#FAF6EE]/70">
                            {act.metricLabel}
                          </span>
                        </span>
                      </div>
                      <div className="mt-0.5 font-serif text-base xl:text-lg text-[#FAF6EE]">
                        {act.title}
                      </div>
                      <p
                        data-hero-act-sub
                        className={`${
                          isActive ? "" : "hidden"
                        } mt-1 text-xs leading-relaxed text-[#FAF6EE]/80`}
                      >
                        {act.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Progress Rail & Dual Actions */}
              <div className="mt-4 pt-3 border-t border-white/15">
                <div className="mb-3 h-1 w-full overflow-hidden bg-black/30">
                  <div
                    ref={progressBarRef}
                    className="h-full w-full origin-left bg-[#C6A46C] will-change-transform"
                    style={{ transform: "scaleX(0.05)" }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#services")}
                    className="inline-flex h-10 sm:h-11 items-center gap-2 bg-[#FAF6EE] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#120E0D] hover:bg-[#C6A46C] transition-colors cursor-pointer"
                  >
                    <span>Inspect Protocol Matrix</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#booking")}
                    className="inline-flex h-10 sm:h-11 items-center border border-[#C6A46C]/60 bg-black/20 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Commission Dossier
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): Framed Burgundy-Rose 16:9 Studio Aperture */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[540px] lg:max-w-[880px] aspect-[16/9] max-h-[30svh] sm:max-h-[38svh] lg:max-h-[calc(100vh-130px)] border border-[#C6A46C]/30 shadow-2xl">
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

      {/* Architectural Hairline Specification Strip on Raw Travertine (#EDE6DA) */}
      <div className="border-t border-b border-[#D8CFC0] bg-[#EDE6DA] text-[#181210]">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D8CFC0]">
          {MONOGRAPH_SPECS.map((sp) => (
            <div key={sp.code} className="px-6 py-7 lg:py-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6B37]">
                {sp.code}
              </div>
              <div className="mt-2 font-serif text-3xl sm:text-4xl text-[#6E1B2B]">
                {sp.metric}
              </div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#181210]">
                {sp.title}
              </div>
              <p className="mt-0.5 text-xs text-[#5C5349]">{sp.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
