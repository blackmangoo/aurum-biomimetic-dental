"use client";

import React, { useState, useEffect, useRef } from "react";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";

const NAV_LINKS = [
  { label: "Atelier", href: "#hero-stage" },
  { label: "Biomimetic Care", href: "#services" },
  { label: "Ceramic-Gold Implants", href: "#craftsmanship" },
  { label: "3D Neural Scan", href: "#technology" },
  { label: "Cases & Doctors", href: "#transformations" },
  { label: "Longevity Sanctuary", href: "#longevity-sanctuary" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Zero-React-re-render scroll styling via imperative data attribute (no backdrop-blur over canvas)
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
      className="fixed top-0 left-0 right-0 z-50 bg-transparent text-[#FDFCF9] transition-colors duration-200 data-[scrolled=true]:bg-[#0B1F1C] data-[scrolled=true]:border-b data-[scrolled=true]:border-white/10 data-[scrolled=true]:shadow-lg"
    >
      <div className="mx-auto flex h-16 lg:h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 xl:px-12">
        {/* Brand Wordmark with Custom Sculpted 24k Gold Biomimetic Medallion */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero-stage")}
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4CE6C4] cursor-pointer"
          aria-label="Aurum Biomimetic Dental Atelier — Return to top"
        >
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF6A]/60 bg-[#143832] text-[#D4AF6A] shadow-md transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <path
                d="M11 11.5C11 8.5 13.2 7 15 7.6L16 8L17 7.6C18.8 7 21 8.5 21 11.5C21 15.2 19 22.5 17.4 22.5C16.6 22.5 16.3 19.5 16 19.5C15.7 19.5 15.4 22.5 14.6 22.5C13 22.5 11 15.2 11 11.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-base sm:text-lg xl:text-xl font-normal tracking-tight text-[#FDFCF9] leading-none whitespace-nowrap">
              Aurum Biomimetic
            </span>
            <span className="hidden xl:block mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#D4AF6A] whitespace-nowrap">
              Beverly Hills · Zurich Prosthodontics
            </span>
          </span>
        </button>

        {/* Desktop Navigation Links — Strictly single-line (`whitespace-nowrap`) across all laptop widths */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center lg:gap-4 xl:gap-6"
        >
          {NAV_LINKS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] xl:tracking-[0.13em] text-[#E6F4F1]/90 hover:text-[#D4AF6A] transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2.5 xl:gap-3">
          <a
            href="tel:+13105550148"
            className="hidden 2xl:inline-flex items-center text-xs font-medium tracking-[0.08em] text-[#E6F4F1]/85 hover:text-white px-2.5 py-2 whitespace-nowrap"
          >
            (310) 555-0148
          </a>

          <button
            type="button"
            onClick={() => handleNavClick("#booking")}
            className="inline-flex h-10 items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF6A]/55 bg-[#D4AF6A]/15 px-3.5 sm:px-4.5 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.11em] text-[#FDFCF9] hover:bg-[#D4AF6A] hover:text-[#0B1F1C] transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="sm:hidden">Reserve</span>
            <span className="hidden sm:inline">Reserve Atelier</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </button>

          {/* Accessible Mobile Menu Button (44x44px min target) */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <>
                  <path d="M6 6L18 18" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7H20" />
                  <path d="M4 12H20" />
                  <path d="M4 17H14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-label="Mobile Navigation"
          className="lg:hidden border-b border-white/15 bg-[#081715] px-6 py-6 text-[#FDFCF9] shadow-2xl"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="flex h-12 items-center justify-between rounded-xl px-4 text-left text-base font-medium text-[#E6F4F1] hover:bg-white/10"
              >
                <span>{item.label}</span>
                <ArrowUpRightIcon className="w-4 h-4 text-[#D4AF6A]" />
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+13105550148"
                className="flex h-12 items-center justify-center rounded-full border border-white/30 px-5 text-sm font-medium text-[#E6F4F1]"
              >
                Call Beverly Hills · (310) 555-0148
              </a>
              <button
                type="button"
                onClick={() => handleNavClick("#booking")}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF6A] px-6 text-sm font-semibold text-[#0B1F1C]"
              >
                <span>Reserve Private Suite</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
