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
    badgeBg: "bg-[#F7E3DF]",
    badgeText: "text-[#7A2825]",
    metricColor: "text-[#7A2825]",
    dotColor: "bg-[#E59888]",
  },
  {
    metric: "0.2 mm",
    title: "No-Prep Veneers",
    note: "Contact-lens thin porcelain hand-layered on platinum foil",
    badgeBg: "bg-[#F9EED8]",
    badgeText: "text-[#9A6B26]",
    metricColor: "text-[#9A6B26]",
    dotColor: "bg-[#C6A46C]",
  },
  {
    metric: "60 sec",
    title: "Optical 3D Scan",
    note: "Radiation-free light imaging with zero putty impressions",
    badgeBg: "bg-[#DFF0EC]",
    badgeText: "text-[#164239]",
    metricColor: "text-[#1F5C4F]",
    dotColor: "bg-[#5CE6C4]",
  },
  {
    metric: "Calm-First",
    title: "Private Penthouse",
    note: "One patient at a time with warm buffered numbing",
    badgeBg: "bg-[#E3ECF7]",
    badgeText: "text-[#1E3F66]",
    metricColor: "text-[#1E3F66]",
    dotColor: "bg-[#68B8F8]",
  },
] as const;

export function HeroSceneSection() {
  const scene = SCROLL_SCENES["scene-01-hero"];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const copyColRef = useRef<HTMLDivElement | null>(null);

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
          ? "flex-1 rounded-full py-1.5 px-3 text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer bg-gradient-to-r from-[#F2C98A] via-[#C6A46C] to-[#E59888] text-[#140B0A] shadow-sm"
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
            {/* Left Column (5 Cols): Elegant Playfair Display Editorial Copy */}
            <div
              ref={copyColRef}
              className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center rounded-full border border-[#E59888]/35 bg-[#7A2825]/45 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F2C98A] mb-3">
                  <span>{scene.eyebrow}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[44px] xl:text-[56px] font-normal leading-[1.06] tracking-tight text-[#FAF6EE]">
                  Living enamel,
                  <br />
                  <span className="italic font-normal text-rose-gold">
                    left untouched.
                  </span>
                </h1>

                <p className="scene-compact-hide hidden sm:block mt-3 text-sm sm:text-base leading-relaxed text-[#FAF6EE]/85 max-w-md">
                  We preserve your natural teeth with contact-lens thin 0.2mm
                  porcelain veils, clear aligners, and calm single-patient
                  suites in Beverly Hills.
                </p>
              </div>

              {/* Minimal Single-Card Chapter Switcher with Multi-Tonal Accents */}
              <div className="mt-4 lg:mt-6 rounded-2xl border border-[#E59888]/25 bg-[#2A0E0D]/85 p-4 sm:p-5 shadow-xl">
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
                      <span className="shrink-0 font-serif italic text-lg text-[#5CE6C4]">
                        {act.metricValue}{" "}
                        <span className="not-italic font-sans text-[11px] text-[#F2C98A]">
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
                          ? "flex-1 rounded-full py-1.5 px-3 text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer bg-gradient-to-r from-[#F2C98A] via-[#C6A46C] to-[#E59888] text-[#140B0A] shadow-sm"
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
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#F2C98A] via-[#5CE6C4] to-[#E59888] will-change-transform"
                    style={{ transform: "scaleX(0.05)" }}
                  />
                </div>
              </div>

              {/* Clean CTA Row */}
              <div className="mt-4 lg:mt-5 flex items-center gap-3">
                <MagneticButton
                  type="button"
                  onClick={() => smoothScrollTo("#services")}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#FAF6EE] via-[#F9EED8] to-[#F7E3DF] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#140B0A] hover:brightness-105 transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  <span>Explore Treatments</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </MagneticButton>
                <MagneticButton
                  type="button"
                  onClick={() => smoothScrollTo("#booking")}
                  className="inline-flex h-11 items-center rounded-full border border-[#F2C98A]/45 bg-white/5 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EE] hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap"
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

      {/* Multi-Tonal 4-Pillar Bar on Warm Pearl Ivory (#FFFDF9) */}
      <div className="border-b border-[#E6DEC8] bg-[#FFFDF9] text-[#181210]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[#EAE2D3] bg-[#FAF6EE]/65 p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${p.badgeBg} ${p.badgeText}`}
                >
                  <span>{p.title}</span>
                </span>
              </div>
              <div
                className={`font-serif italic text-3xl sm:text-4xl ${p.metricColor}`}
              >
                {p.metric}
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-[#544A40] leading-relaxed">
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
