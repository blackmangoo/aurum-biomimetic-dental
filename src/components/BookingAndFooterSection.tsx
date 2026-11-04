"use client";

import React, { useState, useEffect } from "react";
import { DENTAL_SERVICES } from "@/data/clinicData";
import {
  BookingRequestSchema,
  TIME_SLOTS,
  type ServiceId,
  type BookingConfirmation,
} from "@/lib/bookingSchema";
import { ArrowUpRightIcon } from "@/components/icons/DentalIcons";
import { smoothScrollTo } from "@/lib/scrollBus";
import { ElegantCalendarPicker } from "@/components/ui/ElegantCalendarPicker";

interface BookingAndFooterSectionProps {
  selectedService: ServiceId;
  onChangeService: (serviceId: ServiceId) => void;
}

const CONCIERGE_EMAIL = "ammar.akbar2002@gmail.com";

function getDefaultTomorrowIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function BookingAndFooterSection({
  selectedService,
  onChangeService,
}: BookingAndFooterSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [patientType, setPatientType] = useState<
    "new-consultation" | "returning-atelier" | "international-fly-in"
  >("new-consultation");
  const [preferredDate, setPreferredDate] = useState<string>("2026-11-06");
  const [preferredSlot, setPreferredSlot] = useState<(typeof TIME_SLOTS)[number]>(
    TIME_SLOTS[1]
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comfortPreference, setComfortPreference] = useState<
    | "acoustic-calm-suite"
    | "binaural-neuro-relaxation"
    | "unhurried-step-by-step"
    | "twilight-anesthesiologist"
  >("acoustic-calm-suite");
  const [coverageType, setCoverageType] = useState<
    | "ppo-concierge-reimbursement"
    | "atelier-longevity-membership"
    | "private-bespoke-retainer"
  >("ppo-concierge-reimbursement");
  const [websiteUrlHoneypot, setWebsiteUrlHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  useEffect(() => {
    setPreferredDate(getDefaultTomorrowIso());
  }, []);

  const activeServiceObj =
    DENTAL_SERVICES.find((s) => s.id === selectedService) || DENTAL_SERVICES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const payload = {
      serviceId: selectedService,
      patientType,
      preferredDate,
      preferredSlot,
      fullName,
      email,
      phone,
      comfortPreference,
      coverageType,
      websiteUrlHoneypot,
    };

    const parsed = BookingRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setErrorMessage(
        firstIssue?.message ?? "Please verify your dossier details."
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(
          data.error ??
            "Could not complete reservation. Please call (310) 555-0148."
        );
      } else {
        setConfirmation(data as BookingConfirmation);
      }
    } catch {
      setErrorMessage(
        "Network connection interrupted. Please try again or call (310) 555-0148."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Split Architectural Concierge Desk with Live Printed Treatment Dossier Ticket */}
      <section
        id="booking"
        aria-labelledby="booking-heading"
        className="bg-[#EDE6DA] text-[#181210] py-24 sm:py-32 border-t border-[#D8CFC0]"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (5 Cols): Live Printed Swiss Treatment Dossier Ticket */}
            <div className="lg:col-span-5">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E1B2B] mb-2">
                COMMISSION DOSSIER // BEVERLY HILLS PENTHOUSE
              </span>
              <h2
                id="booking-heading"
                className="font-serif text-3xl sm:text-5xl font-normal uppercase tracking-tight text-[#181210] leading-[1.04]"
              >
                Reserve Your
                <br />
                <span className="italic font-normal text-[#6E1B2B]">
                  Private Lab Suite.
                </span>
              </h2>

              {/* Live Updating Architectural Dossier Ticket */}
              <div className="mt-8 border border-[#181210] bg-[#120E0D] text-[#FAF6EE] p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/15 text-[10px] font-mono uppercase tracking-[0.2em] text-[#C6A46C]">
                  <span>LIVE DOSSIER SPEC</span>
                  <span>PH-500 // 1-AT-A-TIME</span>
                </div>

                <div className="mt-5 space-y-4 text-xs">
                  <div>
                    <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#FAF6EE]/55">
                      SELECTED PROTOCOL
                    </span>
                    <div className="mt-0.5 font-serif text-xl text-[#FAF6EE]">
                      {activeServiceObj.title}
                    </div>
                    <div className="text-[11px] text-[#C6A46C]">
                      {activeServiceObj.materialSpec} ·{" "}
                      {activeServiceObj.toothPreservationPct}% Enamel Saved
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
                    <div>
                      <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#FAF6EE]/55">
                        TARGET DATE
                      </span>
                      <span className="font-mono text-sm text-[#FAF6EE]">
                        {preferredDate}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#FAF6EE]/55">
                        SUITE WINDOW
                      </span>
                      <span className="font-mono text-xs text-[#C6A46C]">
                        {preferredSlot.split("—")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
                    <div>
                      <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#FAF6EE]/55">
                        PATIENT TIER
                      </span>
                      <span className="uppercase text-[11px] text-[#FAF6EE]">
                        {patientType.replace(/-/g, " ")}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#FAF6EE]/55">
                        ACOUSTIC SUITE
                      </span>
                      <span className="uppercase text-[11px] text-[#5CE6C4]">
                        {comfortPreference.replace(/-/g, " ")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px]">
                    <span className="text-[#FAF6EE]/65">CONCIERGE DESK:</span>
                    <a
                      href={`mailto:${CONCIERGE_EMAIL}`}
                      className="font-mono text-[#C6A46C] hover:underline"
                    >
                      {CONCIERGE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): 3-Step Swiss Booking Ledger */}
            <div className="lg:col-span-7">
              <div className="border border-[#D8CFC0] bg-[#FAF6EE] p-6 sm:p-10 shadow-xl">
                {confirmation ? (
                  <div role="status" aria-live="polite" className="py-4">
                    <div className="inline-flex items-center gap-2 border border-[#6E1B2B] bg-[#6E1B2B]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6E1B2B]">
                      <span>✓ Penthouse Dossier Logged</span>
                      <span>· #{confirmation.referenceCode}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl text-[#181210]">
                      Thank you, {confirmation.summary.fullName}.
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-[#5C5349]">
                      Your biomimetic consultation dossier has been routed to{" "}
                      <strong className="text-[#6E1B2B]">
                        {confirmation.notifyEmail || CONCIERGE_EMAIL}
                      </strong>
                      .
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={
                          confirmation.mailtoUrl || `mailto:${CONCIERGE_EMAIL}`
                        }
                        className="inline-flex h-11 items-center gap-2 bg-[#6E1B2B] px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] hover:bg-[#181210] transition-colors cursor-pointer"
                      >
                        <span>Dispatch Direct Email to {CONCIERGE_EMAIL}</span>
                        <ArrowUpRightIcon className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmation(null);
                          setStep(1);
                        }}
                        className="inline-flex h-11 items-center justify-center border border-[#181210]/30 px-5 text-xs font-semibold uppercase tracking-wider text-[#181210] cursor-pointer"
                      >
                        New Dossier
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Step Tabs */}
                    <div className="mb-8 grid grid-cols-3 border border-[#D8CFC0] divide-x divide-[#D8CFC0]">
                      {(
                        [
                          [1, "01 // PROTOCOL"],
                          [2, "02 // CALENDAR"],
                          [3, "03 // DOSSIER"],
                        ] as const
                      ).map(([sNum, label]) => (
                        <button
                          key={sNum}
                          type="button"
                          onClick={() => setStep(sNum)}
                          className={`py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors ${
                            step === sNum
                              ? "bg-[#6E1B2B] text-[#FAF6EE]"
                              : "bg-[#EDE6DA] text-[#5C5349] hover:text-[#181210]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {step === 1 && (
                      <div>
                        <h3 className="font-serif text-2xl text-[#181210] mb-4">
                          Select your clinical protocol
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {DENTAL_SERVICES.map((srv) => {
                            const active = selectedService === srv.id;
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => onChangeService(srv.id)}
                                className={`border p-4 text-left transition-colors cursor-pointer ${
                                  active
                                    ? "border-[#6E1B2B] bg-[#6E1B2B] text-[#FAF6EE]"
                                    : "border-[#D8CFC0] bg-[#EDE6DA]/50 text-[#181210] hover:bg-[#EDE6DA]"
                                }`}
                              >
                                <div
                                  className={`text-[10px] font-mono uppercase ${
                                    active ? "text-[#C6A46C]" : "text-[#8C6B37]"
                                  }`}
                                >
                                  {srv.code}
                                </div>
                                <div className="mt-1 font-serif text-lg">
                                  {srv.title}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-6">
                          <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-2">
                            Patient Category
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {(
                              [
                                ["new-consultation", "New Consultation"],
                                ["returning-atelier", "Returning Patient"],
                                ["international-fly-in", "2-Visit Fly-In"],
                              ] as const
                            ).map(([val, label]) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setPatientType(val)}
                                className={`h-10 border text-xs font-semibold transition-colors cursor-pointer ${
                                  patientType === val
                                    ? "border-[#6E1B2B] bg-[#6E1B2B] text-[#FAF6EE]"
                                    : "border-[#D8CFC0] bg-[#EDE6DA] text-[#181210]"
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-7 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="inline-flex h-11 items-center gap-2 bg-[#6E1B2B] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-[#181210] cursor-pointer"
                          >
                            <span>Select Suite Date</span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <ElegantCalendarPicker
                          value={preferredDate}
                          onChange={(d) => setPreferredDate(d)}
                        />

                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-2">
                            Preferred Penthouse Window
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {TIME_SLOTS.map((slot) => {
                              const active = preferredSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setPreferredSlot(slot)}
                                  className={`h-10 border px-3 text-left text-xs font-medium transition-colors cursor-pointer ${
                                    active
                                      ? "border-[#6E1B2B] bg-[#6E1B2B] text-[#FAF6EE] font-semibold"
                                      : "border-[#D8CFC0] bg-[#EDE6DA] text-[#181210]"
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="booking-comfort"
                            className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-2"
                          >
                            Neuro-Acoustic Suite Protocol
                          </label>
                          <select
                            id="booking-comfort"
                            value={comfortPreference}
                            onChange={(e) =>
                              setComfortPreference(
                                e.target.value as typeof comfortPreference
                              )
                            }
                            className="h-11 w-full border border-[#D8CFC0] bg-[#EDE6DA] px-4 text-sm text-[#181210]"
                          >
                            <option value="acoustic-calm-suite">
                              Standard Acoustically Isolated Penthouse Suite
                            </option>
                            <option value="binaural-neuro-relaxation">
                              Binaural Alpha-Wave Audio + Weighted Cashmere
                            </option>
                            <option value="unhurried-step-by-step">
                              High-Sensitivity Protocol (Micro-Pauses)
                            </option>
                            <option value="twilight-anesthesiologist">
                              MD Anesthesiologist Twilight Sedation
                            </option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="h-10 border border-[#181210]/30 px-5 text-xs font-semibold uppercase tracking-wider text-[#181210] cursor-pointer"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="inline-flex h-11 items-center gap-2 bg-[#6E1B2B] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-[#181210] cursor-pointer"
                          >
                            <span>Patient Coordinates</span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <label
                            htmlFor="booking-name"
                            className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-1.5"
                          >
                            Full Name
                          </label>
                          <input
                            id="booking-name"
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Victoria Kensington"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-11 w-full border border-[#D8CFC0] bg-[#EDE6DA] px-4 text-base text-[#181210]"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="booking-email"
                              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-1.5"
                            >
                              Email Address
                            </label>
                            <input
                              id="booking-email"
                              type="email"
                              autoComplete="email"
                              placeholder="victoria@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-11 w-full border border-[#D8CFC0] bg-[#EDE6DA] px-4 text-base text-[#181210]"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="booking-phone"
                              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-1.5"
                            >
                              Direct Telephone
                            </label>
                            <input
                              id="booking-phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="(310) 555-0199"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="h-11 w-full border border-[#D8CFC0] bg-[#EDE6DA] px-4 text-base text-[#181210]"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C5349] mb-2">
                            Coverage &amp; Retainer Option
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {(
                              [
                                ["ppo-concierge-reimbursement", "PPO Concierge"],
                                ["atelier-longevity-membership", "$65/mo Club"],
                                ["private-bespoke-retainer", "Private / 0% APR"],
                              ] as const
                            ).map(([val, label]) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setCoverageType(val)}
                                className={`h-10 border text-xs font-semibold transition-colors cursor-pointer ${
                                  coverageType === val
                                    ? "border-[#6E1B2B] bg-[#6E1B2B] text-[#FAF6EE]"
                                    : "border-[#D8CFC0] bg-[#EDE6DA] text-[#181210]"
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="hidden" aria-hidden="true">
                          <label htmlFor="booking-website-hp">Website</label>
                          <input
                            id="booking-website-hp"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={websiteUrlHoneypot}
                            onChange={(e) => setWebsiteUrlHoneypot(e.target.value)}
                          />
                        </div>

                        {errorMessage && (
                          <div
                            role="alert"
                            className="border border-[#6E1B2B] bg-[#6E1B2B]/10 px-4 py-3 text-sm font-medium text-[#6E1B2B]"
                          >
                            {errorMessage}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="h-10 border border-[#181210]/30 px-5 text-xs font-semibold uppercase tracking-wider text-[#181210] cursor-pointer"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex h-11 items-center gap-2 bg-[#6E1B2B] px-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF6EE] hover:bg-[#181210] disabled:opacity-60 cursor-pointer"
                          >
                            <span>
                              {submitting
                                ? "Logging Dossier..."
                                : "Transmit Penthouse Dossier"}
                            </span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Obsidian Espresso Footer (#120E0D) */}
      <footer
        aria-label="Site Footer"
        className="bg-[#120E0D] text-[#FAF6EE] py-16 sm:py-20 border-t border-[#C6A46C]/30"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-6">
              <div className="font-serif text-2xl tracking-[0.14em] uppercase text-[#FAF6EE]">
                KRONOS <span className="text-[#C6A46C]">//</span> AURUM BIOMIMETIC
              </div>
              <p className="mt-3 max-w-md text-sm text-[#FAF6EE]/70 leading-relaxed">
                Swiss biomimetic enamel conservation, 0.2mm platinum-foil
                porcelain veils, and ATZ ceramic-gold implantology in Beverly
                Hills &amp; Geneva.
              </p>
              <p className="mt-3 text-xs font-mono text-[#C6A46C]">
                436 N BEDFORD DR, PENTHOUSE 500 · BEVERLY HILLS, CA 90210 ·{" "}
                {CONCIERGE_EMAIL}
              </p>
            </div>

            <div className="md:col-span-6 flex flex-col md:items-end justify-between gap-4">
              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] text-[#FAF6EE]/75">
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#hero-stage")}
                  className="hover:text-[#C6A46C] cursor-pointer"
                >
                  01 Monograph
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#services")}
                  className="hover:text-[#C6A46C] cursor-pointer"
                >
                  02 Matrix
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#craftsmanship")}
                  className="hover:text-[#C6A46C] cursor-pointer"
                >
                  03 Bio-Implant
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollTo("#technology")}
                  className="hover:text-[#C6A46C] cursor-pointer"
                >
                  04 OCT Scan
                </button>
              </div>

              <a
                href="https://ammar.works"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#C6A46C]/45 bg-white/[0.03] px-4 py-1.5 text-xs text-[#FAF6EE] hover:border-[#C6A46C]"
              >
                <span className="text-[#FAF6EE]/65">Architecture by</span>
                <span className="font-serif font-semibold text-[#C6A46C]">
                  Ammar
                </span>
                <span className="font-mono text-[11px] text-[#FAF6EE]/75">
                  ammar.works
                </span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#C6A46C]" />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EE]/55">
            <span>
              © {new Date().getFullYear()} KRONOS // Aurum Biomimetic Dental
              Atelier. All rights reserved.
            </span>
            <span>
              Google Whisk &amp; Flow Master Prompts in{" "}
              <code>PROMPTS_GOOGLE_WHISK_FLOW.md</code>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
