"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  children: React.ReactNode;
}

/**
 * Tactile magnetic cursor-pull button (desktop fine pointer only; zero overhead on touch).
 */
export function MagneticButton({
  strength = 0.28,
  className = "",
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    const el = btnRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width * 0.5)) * strength;
    const dy = (e.clientY - (rect.top + rect.height * 0.5)) * strength;
    gsap.to(el, {
      x: dx,
      y: dy,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    const el = btnRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}
