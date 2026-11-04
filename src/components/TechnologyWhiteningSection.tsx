"use client";

import React, { useRef, useCallback } from "react";
import { SCROLL_SCENES } from "@/data/clinicData";
import { ScrollSequenceStage } from "@/components/canvas/ScrollSequenceStage";
import { smoothScrollTo } from "@/lib/scrollBus";
import { useSceneScrollScrub } from "@/lib/useSceneScrollScrub";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import type { ServiceId } from "@/lib/bookingSchema";

interface TechnologyWhiteningSectionProps {
  onSelectServiceForBooking: (serviceId: ServiceId) => void;
}

const ACTIVE_S3_CARD_CLS =
  "block w-full text-left border-l-2 border-[#C6A46C] bg-white/[0.06] px-4 py-3 transition-colors cursor-pointer";
const INACTIVE_S3_CARD_CLS =
  "hidden lg:block w-full text-left border-l-2 border-white/15 bg-transparent px-4 py-2.5 hover:bg-white/[0.03] transition-colors cursor-pointer opacity-75";

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

    root
      .querySelectorAll<HTMLButtonElement>("[data-s3-mob-tab]")
      .forEach((btn) => {
        const active = btn.dataset.s3MobTab === String(actIdx);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        btn.className = active
          ? "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider cursor-pointer bg-[#C6A46C] text-[#120E0D]"
          : "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider cursor-pointer bg-white/10 text-[#FAF6EE]";
      });

    root
      .querySelectorAll<HTMLButtonElement>("[data-s3-card]")
      .forEach((card) => {
        const active = card.dataset.s3Card === String(actIdx);
        card.setAttribute("aria-selected", active ? "true" : "false");
        card.className = active ? ACTIVE_S3_CARD_CLS : INACTIVE_S3_CARD_CLS;
        const desc = card.querySelector<HTMLElement>("[data-s3-desc]");
        if (desc) desc.classList.toggle("hidden", !active);
      });

    const ctaSpan = root.querySelector<HTMLElement>("[data-s3-cta-label]");
    if (ctaSpan) {
      ctaSpan.textContent =
        actIdx === 2 ? "Commission nHAp Crystal Lift" : "Reserve 8,000 fps OCT Scan";
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
          className="scene-sticky-stage w-full overflow-hidden flex items-center pt-[74px] pb-5 lg:pt-[82px] lg:pb-6"
          style={{ backgroundColor: scene.sectionBgHex }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-8 xl:gap-10 items-center">
            {/* Left Column (5 Cols): Obsidian Espresso Telemetry Dossier */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 border border-[#C6A46C]/40 bg-[#C6A46C]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C6A46C] mb-2">
                {scene.eyebrow}
              </span>
              <h2
                id="technology-heading"
                className="font-serif text-2xl sm:text-3xl lg:text-[36px] xl:text-[42px] font-normal uppercase tracking-tight text-[#FAF6EE] leading-[1.05]"
              >
                8,000 fps Sub-Surface OCT.{" "}
                <span className="italic font-normal text-[#C6A46C]">
                  Zero Radiation.
                </span>
              </h2>
              <p className="scene-compact-hide hidden sm:block mt-2 text-xs sm:text-sm leading-relaxed text-[#EDE6DA]/75">
                Watch near-infrared optical coherence tomography map 4mm inside
                living enamel, seat a palatal-expansion aligner, and fuse 20nm
                nano-hydroxyapatite crystals into OM1 pearl.
              </p>

              {/* Mobile Compact Step Tabs */}
              <div
                className="mt-3 flex lg:hidden items-center gap-1"
                role="tablist"
                aria-label="OCT Scan Steps Mobile"
              >
                {scene.acts.map((act, idx) => (
                  <button
                    key={act.id}
                    type="button"
                    role="tab"
                    data-s3-mob-tab={String(idx)}
                    aria-selected={idx === 0}
                    onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                    className={
                      idx === 0
                        ? "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider cursor-pointer bg-[#C6A46C] text-[#120E0D]"
                        : "flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider cursor-pointer bg-white/10 text-[#FAF6EE]"
                    }
                  >
                    Step 0{idx + 1}
                  </button>
                ))}
              </div>

              {/* 3 Pre-Mounted Obsidian Chapter Steps */}
              <div
                className="mt-3 lg:mt-4 space-y-1.5"
                role="tablist"
                aria-label="OCT Scan and Remineralization Chapters"
              >
                {scene.acts.map((act, idx) => {
                  const isActive = idx === 0;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      role="tab"
                      data-s3-card={String(idx)}
                      aria-selected={isActive}
                      onClick={() => handleManualActClick(idx as 0 | 1 | 2)}
                      className={
                        isActive ? ACTIVE_S3_CARD_CLS : INACTIVE_S3_CARD_CLS
                      }
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5CE6C4]">
                          {act.badge}
                        </span>
                        <span className="font-serif text-sm xl:text-base text-[#C6A46C]">
                          {act.metricValue}{" "}
                          <span className="hidden sm:inline font-sans text-[10px] text-[#EDE6DA]/60">
                            {act.metricLabel}
                          </span>
                        </span>
                      </div>
                      <div className="mt-0.5 font-serif text-base xl:text-lg text-[#FAF6EE]">
                        {act.title}
                      </div>
                      <p
                        data-s3-desc
                        className={`${
                          isActive ? "" : "hidden"
                        } mt-1 text-xs leading-relaxed text-[#EDE6DA]/75`}
                      >
                        {act.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar + Action Button */}
              <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-3.5">
                <div className="h-1 flex-1 min-w-[100px] overflow-hidden bg-white/15">
                  <div
                    ref={progressBarRef}
                    className="h-full w-full origin-left bg-[#5CE6C4] will-change-transform"
                    style={{ transform: "scaleX(0.05)" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectServiceForBooking(
                      activeActRef.current === 2
                        ? "hydroxyapatite-enamel"
                        : "airway-aligners"
                    );
                    smoothScrollTo("#booking");
                  }}
                  className="inline-flex h-10 items-center gap-2 bg-[#C6A46C] px-4.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#120E0D] hover:bg-[#FAF6EE] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span data-s3-cta-label>Reserve 8,000 fps OCT Scan</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column (7 Cols): Seamless Obsidian Espresso 16:9 Stage (#0E0C08) */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
              <div className="w-full max-w-[540px] lg:max-w-[860px] aspect-[16/9] max-h-[29svh] sm:max-h-[37svh] lg:max-h-[calc(100vh-124px)]">
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
    </section>
  );
}
