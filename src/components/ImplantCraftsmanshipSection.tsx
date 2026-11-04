"use client";

import React, { useRef, useCallback } from "react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import type { ServiceId } from "@/lib/bookingSchema";

interface ImplantCraftsmanshipSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

const ACTIVE_COL_CLS =
  "text-left border-t-2 border-[#6E1B2B] bg-[#FAF6EE] px-4 py-3 transition-colors cursor-pointer";
const INACTIVE_COL_CLS =
  "text-left border-t-2 border-[#D8CFC0] bg-[#EDE6DA]/60 px-4 py-3 hover:bg-[#FAF6EE]/60 transition-colors cursor-pointer opacity-75";

/**
 * Cinema-Wide Travertine Gallery Stage (`#EDE6DA`) with Top Architectural Header
 * and Bottom 3-Column Horizontal Chronograph Bar.
 */
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
          className="scene-sticky-stage w-full overflow-hidden flex flex-col justify-between pt-[74px] pb-4 lg:pt-[80px] lg:pb-6"
          style={{ backgroundColor: scene.sectionBgHex }}
        >
          {/* Top Architectural Header Bar */}
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-[#D8CFC0]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6E1B2B]">
                SECTION 03 // {scene.eyebrow}
              </span>
              <h2
                id="craftsmanship-heading"
                className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal uppercase tracking-tight text-[#181210]"
              >
                {scene.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-36 h-1.5 bg-[#D8CFC0] overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full w-full origin-left bg-[#6E1B2B] will-change-transform"
                  style={{ transform: "scaleX(0.05)" }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectServiceForBooking("zirconia-implants");
                  smoothScrollTo("#booking");
                }}
                className="inline-flex h-9 items-center gap-1.5 bg-[#6E1B2B] px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-[#181210] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Commission Bio-Implant</span>
                <ArrowUpRightIcon className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Center Cinema-Wide 16:9 Gallery Stage */}
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 my-auto flex items-center justify-center">
            <div className="w-full max-w-[920px] aspect-[16/9] max-h-[36svh] sm:max-h-[42svh] lg:max-h-[calc(100vh-275px)] border border-[#D8CFC0] shadow-lg">
              <ScrollSequenceStage
                scene={scene}
                eager={false}
                onActChange={applyActDom}
                progressBarRef={progressBarRef}
              />
            </div>
          </div>

          {/* Bottom 3-Column Horizontal Chronograph Bar */}
          <div
            className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-3 gap-2 sm:gap-4"
            role="tablist"
            aria-label="Swiss Bio-Implant Assembly Acts"
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
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E1B2B] truncate">
                      {act.badge}
                    </span>
                    <span className="font-serif text-xs sm:text-sm text-[#181210] shrink-0">
                      {act.metricValue}
                    </span>
                  </div>
                  <div className="mt-0.5 font-serif text-xs sm:text-base text-[#181210] truncate">
                    {act.title}
                  </div>
                  <p className="scene-compact-hide hidden md:block mt-0.5 text-[11px] text-[#5C5349] line-clamp-1">
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
