"use client";

import React, { useState, useEffect } from "react";
import { DENTAL_SERVICES } from "@/data/clinicData";
import {
  BookingRequestSchema,
  TIME_SLOTS,
  type ServiceId,
  type BookingConfirmation,
} from "@/lib/bookingSchema";
import { ServiceIcon, ArrowUpRightIcon } from "@/components/icons/DentalIcons";
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
      setErrorMessage(firstIssue?.message ?? "Please verify your booking details.");
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
          data.error ?? "Could not complete reservation. Please call (310) 555-0148."
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
      {/* Golden-Hour Penthouse Reservation Section */}
      <section
        id="booking"
        aria-labelledby="booking-heading"
        className="py-24 sm:py-32 text-[#11221F]"
        style={{
          background:
            "linear-gradient(165deg, #EFE7D6 0%, #F5F1E8 52%, #D9EAE6 100%)",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Atelier Promise & Direct Coordinates */}
            <div className="lg:col-span-5">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7432] mb-3">
                Reserve Your Private Penthouse Suite · Beverly Hills
              </span>
              <h2
                id="booking-heading"
                className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#11221F] leading-[1.08]"
              >
                One patient at a time.
                <br />
                <span className="text-[#14473E]">Zero rush.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A5E5A]">
                Select your biomimetic focus, pick a private suite window from
                our calendar, and customize your neuro-acoustic comfort protocol.
                Requests route directly to our concierge desk at{" "}
                <strong className="text-[#14473E] font-semibold">
                  {CONCIERGE_EMAIL}
                </strong>
                .
              </p>

              <div className="mt-8 rounded-[24px] border border-[#DFD8C8] bg-[#FDFCF9] p-6 sm:p-7 shadow-[0_24px_50px_-35px_rgba(14,38,34,0.2)] space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#9A7432]">
                    Beverly Hills Flagship Atelier
                  </div>
                  <div className="mt-1 font-serif text-xl text-[#11221F]">
                    436 N Bedford Dr, Penthouse Suite 500
                  </div>
                  <div className="text-sm text-[#4A5E5A]">
                    Beverly Hills, CA 90210 · Private Subterranean Valet
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#DFD8C8] text-sm">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5E5A]">
                      Direct Concierge Email
                    </div>
                    <a
                      href={`mailto:${CONCIERGE_EMAIL}?subject=Atelier%20Inquiry%20%E2%80%94%20Aurum%20Biomimetic`}
                      className="mt-1 block font-semibold text-[#14473E] hover:underline break-all"
                    >
                      {CONCIERGE_EMAIL}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5E5A]">
                      Atelier Telephone
                    </div>
                    <a
                      href="tel:+13105550148"
                      className="mt-1 block font-semibold text-[#14473E] hover:underline"
                    >
                      (310) 555-0148
                    </a>
                    <div className="text-xs text-[#4A5E5A] mt-0.5">
                      Mon–Sat: 8:30 AM – 6:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3-Step Booking Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-[#DFD8C8] bg-[#FDFCF9] p-6 sm:p-10 shadow-[0_30px_60px_-30px_rgba(14,38,34,0.25)]">
                {confirmation ? (
                  <div role="status" aria-live="polite" className="py-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#D9EAE6] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#14473E]">
                      <span>✓ Private Suite Reserved</span>
                      <span>· Dossier #{confirmation.referenceCode}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl text-[#11221F]">
                      Thank you, {confirmation.summary.fullName}.
                    </h3>
                    <p className="mt-2 text-base text-[#4A5E5A]">
                      Your biomimetic consultation dossier has been logged and
                      dispatched to{" "}
                      <strong className="text-[#14473E]">
                        {confirmation.notifyEmail || CONCIERGE_EMAIL}
                      </strong>
                      .
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-[#F5F1E8] p-5 text-left text-sm border border-[#DFD8C8]">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#9A7432] font-semibold">
                          Clinical Focus
                        </span>
                        <div className="mt-0.5 font-semibold text-[#11221F] capitalize">
                          {confirmation.summary.serviceId.replace(/-/g, " ")}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#9A7432] font-semibold">
                          Preferred Window
                        </span>
                        <div className="mt-0.5 font-semibold text-[#11221F]">
                          {confirmation.summary.preferredDate} ·{" "}
                          {confirmation.summary.preferredSlot}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#9A7432] font-semibold">
                          Comfort Protocol
                        </span>
                        <div className="mt-0.5 font-medium text-[#11221F] capitalize">
                          {confirmation.summary.comfortPreference.replace(/-/g, " ")}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#9A7432] font-semibold">
                          Dossier Reference
                        </span>
                        <div className="mt-0.5 font-mono font-semibold text-[#14473E]">
                          {confirmation.referenceCode}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={confirmation.mailtoUrl || `mailto:${CONCIERGE_EMAIL}`}
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#14473E] px-6 text-xs font-semibold uppercase tracking-wider text-[#FDFCF9] hover:bg-[#0B1F1C] shadow-md transition-all cursor-pointer"
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
                        className="inline-flex h-12 items-center justify-center rounded-full border border-[#11221F]/25 px-6 text-xs font-semibold uppercase tracking-wider text-[#11221F] hover:bg-[#F5F1E8] cursor-pointer"
                      >
                        Book Another Suite
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Step Indicator */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-[#4A5E5A] mb-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className={`cursor-pointer ${
                            step >= 1 ? "text-[#14473E]" : ""
                          }`}
                        >
                          01. Biomimetic Focus
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className={`cursor-pointer ${
                            step >= 2 ? "text-[#14473E]" : ""
                          }`}
                        >
                          02. Suite Calendar
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className={`cursor-pointer ${
                            step === 3 ? "text-[#14473E]" : ""
                          }`}
                        >
                          03. Coordinates
                        </button>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F5F1E8]">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: step === 1 ? "33.3%" : step === 2 ? "66.6%" : "100%",
                            background:
                              "linear-gradient(90deg, #9A7432 0%, #D4AF6A 50%, #14473E 100%)",
                          }}
                        />
                      </div>
                    </div>

                    {/* STEP 1 */}
                    {step === 1 && (
                      <div>
                        <h3 className="font-serif text-2xl text-[#11221F] mb-4">
                          Select your biomimetic consultation focus
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {DENTAL_SERVICES.map((srv) => {
                            const active = selectedService === srv.id;
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => onChangeService(srv.id)}
                                className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                                  active
                                    ? "border-[#14473E] bg-[#D9EAE6]/55 shadow-sm"
                                    : "border-[#DFD8C8] bg-[#F5F1E8]/60 hover:bg-[#F5F1E8]"
                                }`}
                              >
                                <span
                                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                    active
                                      ? "bg-[#14473E] text-[#FDFCF9]"
                                      : "bg-[#FDFCF9] text-[#14473E]"
                                  }`}
                                >
                                  <ServiceIcon serviceId={srv.id} className="w-5 h-5" />
                                </span>
                                <div>
                                  <div className="font-serif text-base font-medium text-[#11221F]">
                                    {srv.title}
                                  </div>
                                  <div className="text-xs text-[#4A5E5A] mt-0.5">
                                    {srv.duration}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-6">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-2">
                            Patient Category
                          </label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {(
                              [
                                ["new-consultation", "New Consultation"],
                                ["returning-atelier", "Returning Patient"],
                                ["international-fly-in", "Fly-In Concierge"],
                              ] as const
                            ).map(([val, label]) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setPatientType(val)}
                                className={`h-11 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                                  patientType === val
                                    ? "border-[#14473E] bg-[#14473E] text-[#FDFCF9]"
                                    : "border-[#DFD8C8] bg-[#F5F1E8] text-[#11221F]"
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
                            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#14473E] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-[#FDFCF9] hover:bg-[#0B1F1C] cursor-pointer"
                          >
                            <span>Continue to Calendar</span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h3 className="font-serif text-2xl text-[#11221F]">
                            Choose your preferred date & penthouse window
                          </h3>
                          <span className="text-xs font-medium text-[#9A7432]">
                            Beverly Hills Penthouse
                          </span>
                        </div>

                        <ElegantCalendarPicker
                          value={preferredDate}
                          onChange={(d) => setPreferredDate(d)}
                        />

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-2">
                            Preferred Atelier Window
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {TIME_SLOTS.map((slot) => {
                              const active = preferredSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setPreferredSlot(slot)}
                                  className={`h-11 rounded-xl border px-3.5 text-left text-xs font-medium transition-all cursor-pointer ${
                                    active
                                      ? "border-[#14473E] bg-[#14473E] text-[#FDFCF9] font-semibold shadow-xs"
                                      : "border-[#DFD8C8] bg-[#F5F1E8] text-[#11221F] hover:bg-[#D9EAE6]/50"
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
                            className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-2"
                          >
                            Complimentary Neuro-Acoustic Suite Protocol
                          </label>
                          <select
                            id="booking-comfort"
                            value={comfortPreference}
                            onChange={(e) =>
                              setComfortPreference(
                                e.target.value as typeof comfortPreference
                              )
                            }
                            className="h-12 w-full rounded-xl border border-[#DFD8C8] bg-[#F5F1E8] px-4 text-sm font-medium text-[#11221F]"
                          >
                            <option value="acoustic-calm-suite">
                              Standard Acoustically Isolated Penthouse Suite
                            </option>
                            <option value="binaural-neuro-relaxation">
                              Binaural Alpha-Wave Audio + Weighted Cashmere Throw
                            </option>
                            <option value="unhurried-step-by-step">
                              High-Sensitivity Protocol (Micro-Pauses & Explanation)
                            </option>
                            <option value="twilight-anesthesiologist">
                              Board-Certified MD Anesthesiologist Twilight Sedation
                            </option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="h-11 rounded-full border border-[#11221F]/25 px-5 text-xs font-semibold uppercase tracking-wider text-[#11221F] cursor-pointer"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#14473E] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-[#FDFCF9] hover:bg-[#0B1F1C] cursor-pointer"
                          >
                            <span>Continue to Contact</span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <h3 className="font-serif text-2xl text-[#11221F]">
                          Where should we send your written treatment dossier?
                        </h3>

                        <div>
                          <label
                            htmlFor="booking-name"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-1.5"
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
                            className="h-12 w-full rounded-xl border border-[#DFD8C8] bg-[#F5F1E8] px-4 text-base text-[#11221F]"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="booking-email"
                              className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-1.5"
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
                              className="h-12 w-full rounded-xl border border-[#DFD8C8] bg-[#F5F1E8] px-4 text-base text-[#11221F]"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="booking-phone"
                              className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-1.5"
                            >
                              Direct Mobile Phone
                            </label>
                            <input
                              id="booking-phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="(310) 555-0199"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="h-12 w-full rounded-xl border border-[#DFD8C8] bg-[#F5F1E8] px-4 text-base text-[#11221F]"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-[#4A5E5A] mb-2">
                            Coverage & Membership Preference
                          </span>
                          <div className="grid grid-cols-3 gap-2.5">
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
                                className={`h-11 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                                  coverageType === val
                                    ? "border-[#14473E] bg-[#14473E] text-[#FDFCF9]"
                                    : "border-[#DFD8C8] bg-[#F5F1E8] text-[#11221F]"
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
                            className="rounded-xl border border-[#9E4732]/40 bg-[#F7E4D8] px-4 py-3 text-sm font-medium text-[#9E4732]"
                          >
                            {errorMessage}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="h-11 rounded-full border border-[#11221F]/25 px-5 text-xs font-semibold uppercase tracking-wider text-[#11221F] cursor-pointer"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#14473E] px-8 text-xs font-semibold uppercase tracking-[0.12em] text-[#FDFCF9] hover:bg-[#0B1F1C] disabled:opacity-60 cursor-pointer shadow-md"
                          >
                            <span>
                              {submitting
                                ? "Reserving Suite..."
                                : "Confirm Private Suite"}
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

      {/* Architectural Obsidian Emerald Footer (#081715) */}
      <footer
        aria-label="Site Footer"
        className="bg-[#081715] text-[#E6F4F1] py-16 sm:py-20 border-t border-white/10"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D4AF6A]/60 bg-[#143832] text-[#D4AF6A]">
                  <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" aria-hidden="true">
                    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
                    <path
                      d="M11 11.5C11 8.5 13.2 7 15 7.6L16 8L17 7.6C18.8 7 21 8.5 21 11.5C21 15.2 19 22.5 17.4 22.5C16.6 22.5 16.3 19.5 16 19.5C15.7 19.5 15.4 22.5 14.6 22.5C13 22.5 11 15.2 11 11.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <div>
                  <span className="block font-serif text-2xl text-[#FDFCF9]">
                    Aurum Biomimetic Atelier
                  </span>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#D4AF6A] mt-0.5">
                    Beverly Hills · Zurich Prosthodontics
                  </span>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9BB5B0]">
                Enamel-conserving biomimetic prosthodontics, Swiss ATZ
                ceramic-gold implants, and 8,000 fps optical diagnostics in
                Beverly Hills.
              </p>
              <div className="mt-4 space-y-1 text-xs text-[#9BB5B0]">
                <p className="text-[#D4AF6A] font-medium">
                  436 N Bedford Dr, Penthouse 500 · Beverly Hills, CA 90210
                </p>
                <p>
                  Direct Concierge:{" "}
                  <a
                    href={`mailto:${CONCIERGE_EMAIL}`}
                    className="text-[#E6F4F1] hover:text-[#D4AF6A] underline transition-colors"
                  >
                    {CONCIERGE_EMAIL}
                  </a>
                </p>
                <p>
                  Atelier Telephone:{" "}
                  <a
                    href="tel:+13105550148"
                    className="text-[#E6F4F1] hover:text-[#D4AF6A] transition-colors"
                  >
                    (310) 555-0148
                  </a>
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF6A] mb-4">
                Biomimetic Disciplines
              </div>
              <ul className="space-y-2 text-sm text-[#9BB5B0]">
                {DENTAL_SERVICES.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeService(s.id);
                        smoothScrollTo("#services");
                      }}
                      className="hover:text-[#FDFCF9] transition-colors cursor-pointer text-left"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF6A] mb-4">
                3D Anatomical Chapters
              </div>
              <ul className="space-y-2 text-sm text-[#9BB5B0]">
                <li>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#hero-stage")}
                    className="hover:text-[#4CE6C4] transition-colors cursor-pointer text-left"
                  >
                    01 · Enamel Histology & 0.2mm Swiss Veil
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#craftsmanship")}
                    className="hover:text-[#4CE6C4] transition-colors cursor-pointer text-left"
                  >
                    02 · Swiss ATZ Zirconia & 24k Gold Implant
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#technology")}
                    className="hover:text-[#4CE6C4] transition-colors cursor-pointer text-left"
                  >
                    03 · 8,000 fps Neural Scan & nHAp Lift
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("#transformations")}
                    className="hover:text-[#4CE6C4] transition-colors cursor-pointer text-left"
                  >
                    04 · Optical Shade & Translucency Comparator
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#9BB5B0]">
            <p className="order-2 md:order-1">
              © {new Date().getFullYear()} Aurum Biomimetic Dental Atelier ·
              Beverly Hills, California. All rights reserved.
            </p>

            {/* Architectural Creator Signature — Designed by Ammar · ammar.works */}
            <div className="order-1 md:order-2 flex items-center gap-2.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#9BB5B0]/70 hidden sm:inline">
                Architecture & Experience
              </span>
              <a
                href="https://ammar.works"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Designed by Ammar — Visit portfolio at ammar.works"
                className="group relative inline-flex items-center gap-2 rounded-full border border-[#D4AF6A]/40 bg-white/[0.04] px-4 py-1.5 text-xs text-[#FDFCF9] hover:border-[#D4AF6A] hover:bg-[#D4AF6A]/15 transition-all duration-300"
              >
                <span className="text-[#9BB5B0] text-xs font-normal">Designed by</span>
                <span className="font-serif text-[13px] font-semibold tracking-wide text-[#D4AF6A] group-hover:text-[#FDFCF9] transition-colors">
                  Ammar
                </span>
                <span className="h-1 w-1 rounded-full bg-[#D4AF6A]/60" />
                <span className="font-mono text-[11px] text-[#E6F4F1]/80 group-hover:text-[#D4AF6A] transition-colors">
                  ammar.works
                </span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#D4AF6A]" />
              </a>
            </div>

            <p className="order-3 text-[11px] text-[#9BB5B0]/80">
              HIPAA-Safe Online Scheduling · Concierge: {CONCIERGE_EMAIL}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
