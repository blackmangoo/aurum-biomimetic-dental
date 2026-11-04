"use client";

import React, { useState, useEffect, useRef } from "react";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { label: "Atelier", href: "#hero-stage" },
  { label: "Treatments", href: "#services" },
  { label: "Implants", href: "#craftsmanship" },
  { label: "3D Scan", href: "#technology" },
  { label: "Results", href: "#transformations" },
  { label: "Sanctuary", href: "#longevity-sanctuary" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isPast = window.scrollY > 24;
      const el = headerRef.current;
      if (!el) return;
      el.dataset.scrolled = isPast ? "true" : "false";
      el.style.backgroundColor = isPast ? "#140B0A" : "rgba(42, 13, 12, 0.88)";
      el.style.borderBottomColor = isPast
        ? "rgba(242, 201, 138, 0.22)"
        : "rgba(255, 255, 255, 0.08)";
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
      style={{
        backgroundColor: "rgba(42, 13, 12, 0.88)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
      className="fixed top-0 left-0 right-0 z-50 text-[#FAF6EE] transition-colors duration-300"
    >
      <div className="mx-auto flex h-16 lg:h-[68px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-10 xl:px-12">
        {/* Brand Wordmark with Real Sculpted Marble & 24k Gold Medallion */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero-stage")}
          className="group flex shrink-0 items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A46C] cursor-pointer"
          aria-label="Aurum Atelier — Return to top"
        >
          <img
            src="/brand/logo-emblem.webp"
            alt="Aurum Atelier Medallion"
            width={40}
            height={40}
            className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl tracking-wide text-[#FAF6EE] leading-none whitespace-nowrap">
              Aurum Atelier
            </span>
            <span className="hidden xl:block mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A46C] whitespace-nowrap">
              Beverly Hills · Biomimetic Dentistry
            </span>
          </span>
        </button>

        {/* Clean Unnumbered Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {NAV_LINKS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="py-1.5 text-xs font-medium uppercase tracking-[0.13em] text-[#FAF6EE]/85 hover:text-[#C6A46C] transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <a
            href="tel:+13105550148"
            className="hidden 2xl:inline-flex items-center text-xs font-medium tracking-[0.08em] text-[#FAF6EE]/80 hover:text-white px-2 py-1.5 whitespace-nowrap"
          >
            (310) 555-0148
          </a>

          <MagneticButton
            type="button"
            onClick={() => handleNavClick("#booking")}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#C6A46C] px-4 sm:px-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#140B0A] hover:bg-[#FAF6EE] transition-colors cursor-pointer whitespace-nowrap shadow-md"
          >
            <span>Book a Visit</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex lg:hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/25 text-[#FAF6EE]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
              {mobileOpen ? (
                <>
                  <path d="M6 6L18 18" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8H20" />
                  <path d="M4 16H16" />
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
          className="lg:hidden border-b border-white/15 bg-[#140B0A] px-6 py-6 text-[#FAF6EE] shadow-2xl"
        >
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="flex h-11 items-center justify-between rounded-xl px-3 text-left text-base font-medium text-[#FAF6EE] hover:bg-white/10"
              >
                <span>{item.label}</span>
                <ArrowUpRightIcon className="w-4 h-4 text-[#C6A46C]" />
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+13105550148"
                className="flex h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-medium text-[#FAF6EE]"
              >
                (310) 555-0148
              </a>
              <button
                type="button"
                onClick={() => handleNavClick("#booking")}
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#C6A46C] px-6 text-sm font-semibold text-[#140B0A]"
              >
                <span>Book a Visit</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
