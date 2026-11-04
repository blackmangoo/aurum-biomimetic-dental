"use client";

import React, { useRef, useCallback } from "react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ServiceId } from "@/lib/bookingSchema";

interface TechnologyWhiteningSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

export function TechnologyWhiteningSection({
  onSelectServiceForBooking,
}: TechnologyWhiteningSectionProps) {
  const scene = SCROLL_SCENES["scene-03-scan-whitening"];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const activeActRef = useRef<0 | 1 | 2>(0);

  const applyActDom = useCallback((actIdx: 0 | 1 | 2) => {
    activeActRef.current = actIdx;
    const root = pinRef.current;
    if (!root) return;
    root.dataset.act = String(actIdx);

    root.querySelectorAll<HTMLElement>("[data-s3-panel]").forEach((el) => {
      el.classList.toggle("hidden", el.dataset.s3Panel !== String(actIdx));
    });

    root
      .querySelectorAll<HTMLButtonElement>("[data-s3-pill]")
      .forEach((btn) => {
        const active = btn.dataset.s3Pill === String(actIdx);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        btn.className = active
          ? "flex-1 rounded-full py-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider cursor-pointer bg-[#C6A46C] text-[#0E0C08]"
          : "flex-1 rounded-full py-1.5 px-3 text-[11px] font-medium uppercase tracking-wider cursor-pointer bg-white/10 text-[#FAF6EE]/80 hover:bg-white/20";
      });

    const ctaSpan = root.querySelector<HTMLElement>("[data-s3-cta-label]");
    if (ctaSpan) {
      ctaSpan.textContent =
        actIdx === 2 ? "Book Mineral Whitening" : "Book 3D Optical Scan";
    }
  }, []);

  const handleManualActClick = useCallback(
    (idx: 0 | 1 | 2) => {
      applyActDom(idx);
      const stageNode = pinRef.current?.querySelector<
        HTMLDivElement & {
          __setSceneProgress?: (p: number, syncInRaf?: boolean) => void;
        }
      >('[data-scene-stage="scene-03-scan-whitening"]');
      const p = idx === 0 ? 0.04 : idx === 1 ? 0.5 : 0.96;
      stageNode?.__setSceneProgress?.(p, true);
    },
    [applyActDom]
  );

  useSceneScrollScrub({
    sceneId: "scene-03-scan-whitening",
    scrollLengthVh: scene.scrollLengthVh,
    trackRef,
    stageContainerRef: pinRef,
  });

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      style={{ backgroundColor: scene.sectionBgHex, color: "#FAF6EE" }}
    >
      {/* Atmospheric Descent Gradient from Warm Travertine (#DFD3C3) into Espresso Midnight (#0E0C08) */}
      <div
        className="h-24 sm:h-32 w-full"
        style={{
          background:
            "linear-gradient(180deg, #DFD3C3 0%, #4B1917 48%, #0E0C08 100%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={trackRef}
        className="scene-sticky-track relative"
        style={
          {
            backgroundColor: scene.sectionBgHex,
            "--mobile-track-h": "310svh",
          } as React.CSSProperties
        }
      >
        <div
          ref={pinRef}
          data-act="0"
          className="scene-sticky-stage w-full overflow-hidden flex items-center pt-[74px] pb-5 lg:pt-[84px] lg:pb-6"
          style={{ backgroundColor: scene.sectionBgHex }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Left Column (5 Cols): Restrained Midnight Copy & Single-Card Switcher */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#5CE6C4] mb-2">
                {scene.eyebrow}
              </span>
              <h2
                id="technology-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[48px] font-normal tracking-tight text-[#FAF6EE] leading-[1.05]"
              >
                Mapped by light.
                <br />
                <span className="italic text-[#C6A46C]">
                  Brightened with minerals.
                </span>
              </h2>
              <p className="scene-compact-hide hidden sm:block mt-3 text-sm sm:text-base leading-relaxed text-[#FAF6EE]/80 max-w-md">
                Our optical scanner captures your teeth in seconds without putty
                trays, followed by custom clear aligners and sensitivity-free
                mineral whitening.
              </p>

              {/* Single Active Chapter Card */}
              <div className="mt-4 lg:mt-6 rounded-2xl border border-white/15 bg-white/[0.04] p-4 sm:p-5">
                {scene.acts.map((act, idx) => (
                  <div
                    key={act.id}
                    data-s3-panel={String(idx)}
                    className={idx === 0 ? "" : "hidden"}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl text-[#FAF6EE]">
                        {act.title}
                      </h3>
                      <span className="shrink-0 font-serif text-lg text-[#5CE6C4]">
                        {act.metricValue}{" "}
                        <span className="font-sans text-[11px] text-[#FAF6EE]/65">
                          {act.metricLabel}
                        </span>
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#FAF6EE]/75">
                      {act.subtitle}
                    </p>
                  </div>
                ))}

                <div
                  className="mt-3.5 flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Digital Care Chapters"
                >
                  {scene.acts.map((act, idx) => (
                    <button
                      key={act.id}
                      type="button"
                      role="tab"
                      data-s3-pill={String(idx)}
                      aria-selected={idx === 0}
                      onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                      className={
                        idx === 0
                          ? "flex-1 rounded-full py-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider cursor-pointer bg-[#C6A46C] text-[#0E0C08]"
                          : "flex-1 rounded-full py-1.5 px-3 text-[11px] font-medium uppercase tracking-wider cursor-pointer bg-white/10 text-[#FAF6EE]/80 hover:bg-white/20"
                      }
                    >
                      {act.tabLabel}
                    </button>
                  ))}
                </div>

                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    ref={progressBarRef}
                    className="h-full w-full origin-left rounded-full bg-[#5CE6C4] will-change-transform"
                    style={{ transform: "scaleX(0.05)" }}
                  />
                </div>
              </div>

              <div className="mt-4 lg:mt-5 flex items-center gap-3">
                <MagneticButton
                  type="button"
                  onClick={() => {
                    onSelectServiceForBooking(
                      activeActRef.current === 2
                        ? "hydroxyapatite-enamel"
                        : "airway-aligners"
                    );
                    smoothScrollTo("#booking");
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#C6A46C] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0E0C08] hover:bg-[#FAF6EE] transition-colors cursor-pointer whitespace-nowrap shadow-md"
                >
                  <span data-s3-cta-label>Book 3D Optical Scan</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>

            {/* Right Column (7 Cols): Seamless Obsidian Espresso 16:9 Stage (#0E0C08) */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
              <div className="w-full max-w-[540px] lg:max-w-[860px] aspect-[16/9] max-h-[28svh] sm:max-h-[37svh] lg:max-h-[calc(100vh-116px)]">
                <ScrollSequenceStage
                  scene={scene}
                  eager={false}
                  onActChange={applyActDom}
                  progressBarRef={progressBarRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rise Gradient back into Warm Alabaster (#FAF6EE) */}
      <div
        className="h-24 sm:h-32 w-full"
        style={{
          background:
            "linear-gradient(180deg, #0E0C08 0%, #4B1917 48%, #FAF6EE 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
