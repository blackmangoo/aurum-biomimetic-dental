"use client";

import React, { useState, useEffect, useRef } from "react";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";

const MONOGRAPH_CHAPTERS = [
  { code: "01", label: "Monograph", href: "#hero-stage" },
  { code: "02", label: "Matrix", href: "#services" },
  { code: "03", label: "Bio-Implant", href: "#craftsmanship" },
  { code: "04", label: "OCT Scan", href: "#technology" },
  { code: "05", label: "Dossiers", href: "#transformations" },
  { code: "06", label: "Longevity", href: "#longevity-sanctuary" },
  { code: "07", label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Zero-React-re-render scroll state via data-scrolled (opaque surface, zero backdrop-blur)
  useEffect(() => {
    let lastState = false;
    const onScroll = () => {
      const isPast = window.scrollY > 36;
      if (isPast !== lastState && headerRef.current) {
        lastState = isPast;
        headerRef.current.dataset.scrolled = isPast ? "true" : "false";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className="fixed top-0 left-0 right-0 z-50 bg-[#3B1311]/95 text-[#FAF6EE] border-b border-[#C6A46C]/25 transition-colors duration-200 data-[scrolled=true]:bg-[#0E0C08] data-[scrolled=true]:border-[#C6A46C]/30 data-[scrolled=true]:shadow-xl"
    >
      <div className="mx-auto flex h-16 lg:h-[68px] max-w-[1440px] items-center justify-between gap-2 sm:gap-4 px-4 sm:px-8 lg:px-8 xl:px-12">
        {/* Left: Swiss Monograph Brand Index */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero-stage")}
          className="group flex shrink-0 items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A46C] cursor-pointer"
          aria-label="KRONOS Aurum Biomimetic Atelier — Return to top"
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center border border-[#C6A46C]/60 bg-[#181210] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#C6A46C]">
            KR
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-sm sm:text-base xl:text-lg tracking-[0.14em] uppercase text-[#FAF6EE] leading-none whitespace-nowrap">
              KRONOS <span className="text-[#C6A46C]">//</span> AURUM
            </span>
            <span className="hidden 2xl:block mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#C6A46C]/90 whitespace-nowrap">
              GENEVA · BEVERLY HILLS BIOMIMETIC LAB
            </span>
          </span>
        </button>

        {/* Center: Numbered Swiss Architectural Index Bar */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center divide-x divide-white/10 rounded-full border border-white/15 bg-black/25 px-1.5 py-1"
        >
          {MONOGRAPH_CHAPTERS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="px-2.5 2xl:px-3 py-1 text-[10px] 2xl:text-[11px] font-medium uppercase tracking-[0.1em] 2xl:tracking-[0.12em] text-[#FAF6EE]/85 hover:text-[#C6A46C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="hidden 2xl:inline text-[#C6A46C] mr-1">{item.code}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: Coordinates & Commission Trigger */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden 2xl:flex flex-col text-right text-[10px] tracking-[0.14em] uppercase text-[#FAF6EE]/75 whitespace-nowrap">
            <span>436 N BEDFORD · PH 500</span>
            <span className="text-[#C6A46C]">(310) 555-0148</span>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick("#booking")}
            className="inline-flex h-9 sm:h-10 items-center gap-1.5 border border-[#C6A46C] bg-[#C6A46C] px-3 sm:px-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#120E0D] hover:bg-[#FAF6EE] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="sm:hidden">Reserve</span>
            <span className="hidden sm:inline">Commission Dossier</span>
            <ArrowUpRightIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex lg:hidden h-10 w-10 shrink-0 items-center justify-center border border-[#C6A46C]/50 bg-black/30 text-[#FAF6EE]"
          >
            <span className="text-xs font-mono">{mobileOpen ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-label="Mobile Navigation"
          className="lg:hidden border-b border-[#C6A46C]/30 bg-[#0E0C08] px-6 py-6 text-[#FAF6EE] shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-1.5">
            {MONOGRAPH_CHAPTERS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="flex h-11 items-center justify-between border-b border-white/10 px-2 text-left text-sm uppercase tracking-[0.14em] text-[#FAF6EE] hover:text-[#C6A46C]"
              >
                <span>
                  <strong className="text-[#C6A46C] mr-2">{item.code}</strong>
                  {item.label}
                </span>
                <ArrowUpRightIcon className="w-4 h-4 text-[#C6A46C]" />
              </button>
            ))}
            <div className="mt-4 pt-3 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+13105550148"
                className="flex h-11 items-center justify-center border border-white/25 px-4 text-xs uppercase tracking-[0.15em] text-[#FAF6EE]"
              >
                Call Lab · (310) 555-0148
              </a>
              <button
                type="button"
                onClick={() => handleNavClick("#booking")}
                className="flex h-11 items-center justify-center gap-2 bg-[#C6A46C] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#120E0D]"
              >
                <span>Commission Dossier</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
