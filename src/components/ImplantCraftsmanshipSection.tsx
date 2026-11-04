"use client";

import React, { useRef, useCallback } from "react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ServiceId } from "@/lib/bookingSchema";

interface ImplantCraftsmanshipSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

const ACTIVE_COL_CLS =
  "text-left rounded-2xl border border-[#4B1917]/40 bg-[#FAF6EE] px-4 py-3 transition-all cursor-pointer shadow-sm";
const INACTIVE_COL_CLS =
  "text-left rounded-2xl border border-[#C8B9A6] bg-[#FAF6EE]/45 px-4 py-3 hover:bg-[#FAF6EE]/80 transition-all cursor-pointer opacity-80";

export function ImplantCraftsmanshipSection({
  onSelectServiceForBooking,
}: ImplantCraftsmanshipSectionProps) {
  const scene = SCROLL_SCENES["scene-02-implant"];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const applyActDom = useCallback((actIdx: 0 | 1 | 2) => {
    const root = pinRef.current;
    if (!root) return;
    root.dataset.act = String(actIdx);

    root
      .querySelectorAll<HTMLButtonElement>("[data-s2-col]")
      .forEach((col) => {
        const active = col.dataset.s2Col === String(actIdx);
        col.setAttribute("aria-selected", active ? "true" : "false");
        col.className = active ? ACTIVE_COL_CLS : INACTIVE_COL_CLS;
      });
  }, []);

  const handleManualActClick = useCallback(
    (idx: 0 | 1 | 2) => {
      applyActDom(idx);
      const stageNode = pinRef.current?.querySelector<
        HTMLDivElement & {
          __setSceneProgress?: (p: number, syncInRaf?: boolean) => void;
        }
      >('[data-scene-stage="scene-02-implant"]');
      const p = idx === 0 ? 0.04 : idx === 1 ? 0.5 : 0.96;
      stageNode?.__setSceneProgress?.(p, true);
    },
    [applyActDom]
  );

  useSceneScrollScrub({
    sceneId: "scene-02-implant",
    scrollLengthVh: scene.scrollLengthVh,
    trackRef,
    stageContainerRef: pinRef,
  });

  return (
    <section
      id="craftsmanship"
      aria-labelledby="craftsmanship-heading"
      style={{ backgroundColor: scene.sectionBgHex, color: "#181210" }}
    >
      {/* Smooth Atmospheric Gradient Bridge from Alabaster into Warm Travertine (#DFD3C3) */}
      <div
        className="h-16 w-full"
        style={{
          background: "linear-gradient(180deg, #FAF6EE 0%, #DFD3C3 100%)",
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
          className="scene-sticky-stage w-full overflow-hidden flex flex-col justify-between pt-[74px] pb-4 lg:pt-[82px] lg:pb-6"
          style={{ backgroundColor: scene.sectionBgHex }}
        >
          {/* Top Clean Header Bar */}
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1917]">
                {scene.eyebrow}
              </span>
              <h2
                id="craftsmanship-heading"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#181210]"
              >
                {scene.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-36 h-1.5 rounded-full bg-[#181210]/15 overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full w-full origin-left rounded-full bg-[#4B1917] will-change-transform"
                  style={{ transform: "scaleX(0.05)" }}
                />
              </div>
              <MagneticButton
                type="button"
                onClick={() => {
                  onSelectServiceForBooking("zirconia-implants");
                  smoothScrollTo("#booking");
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#4B1917] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EE] hover:bg-[#181210] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Plan Implant Visit</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>

          {/* Center Cinema-Wide 16:9 Gallery Stage (Seamless blend into #DFD3C3) */}
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 my-auto flex items-center justify-center">
            <div className="w-full max-w-[920px] aspect-[16/9] max-h-[36svh] sm:max-h-[42svh] lg:max-h-[calc(100vh-265px)]">
              <ScrollSequenceStage
                scene={scene}
                eager={false}
                onActChange={applyActDom}
                progressBarRef={progressBarRef}
              />
            </div>
          </div>

          {/* Bottom 3-Column Unnumbered Chapter Bar */}
          <div
            className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-3 gap-2.5 sm:gap-4"
            role="tablist"
            aria-label="Ceramic Implant Assembly Chapters"
          >
            {scene.acts.map((act, idx) => {
              const isActive = idx === 0;
              return (
                <button
                  key={act.id}
                  type="button"
                  role="tab"
                  data-s2-col={String(idx)}
                  aria-selected={isActive}
                  onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                  className={isActive ? ACTIVE_COL_CLS : INACTIVE_COL_CLS}
                >
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4B1917] truncate">
                      {act.tabLabel}
                    </span>
                    <span className="font-serif text-xs sm:text-sm text-[#181210] shrink-0">
                      {act.metricValue}
                    </span>
                  </div>
                  <div className="mt-0.5 font-serif text-xs sm:text-base text-[#181210] truncate">
                    {act.title}
                  </div>
                  <p className="scene-compact-hide hidden md:block mt-0.5 text-xs text-[#544A40] line-clamp-1">
                    {act.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
