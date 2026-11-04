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
import { MagneticButton } from "@/components/ui/MagneticButton";

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
      setErrorMessage(firstIssue?.message ?? "Please check your details.");
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
          data.error ?? "Could not complete request. Please call (310) 555-0148."
        );
      } else {
        setConfirmation(data as BookingConfirmation);
      }
    } catch {
      setErrorMessage(
        "Network interrupted. Please try again or call (310) 555-0148."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="booking"
        aria-labelledby="booking-heading"
        style={{
          background:
            "linear-gradient(155deg, #F7E3DF 0%, #FAF6EE 48%, #DFF0EC 100%)",
        }}
        className="text-[#181210] py-24 sm:py-32 border-t border-[#E6DEC8]"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Clean Studio Details */}
            <div className="lg:col-span-5">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1917] mb-2">
                Schedule Your Visit
              </span>
              <h2
                id="booking-heading"
                className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#181210] leading-[1.06]"
              >
                Your suite,
                <br />
                <span className="italic text-[#4B1917]">unhurried.</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#544A40]">
                Choose your focus, preferred date, and comfort preferences.
                Confirmations are sent directly by our concierge at{" "}
                <strong className="text-[#4B1917]">{CONCIERGE_EMAIL}</strong>.
              </p>

              <div className="mt-8 rounded-3xl border border-[#C8B9A6] bg-[#FAF6EE] p-6 sm:p-7 space-y-4 shadow-sm">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#4B1917]">
                    Beverly Hills Studio
                  </div>
                  <div className="mt-1 font-serif text-xl text-[#181210]">
                    436 N Bedford Dr, Penthouse 500
                  </div>
                  <div className="text-sm text-[#544A40]">
                    Beverly Hills, CA 90210 · Complimentary Valet
                  </div>
                </div>
                <div className="pt-3 border-t border-[#D8CFC0] flex flex-wrap items-center justify-between gap-3 text-sm">
                  <a
                    href="tel:+13105550148"
                    className="font-semibold text-[#4B1917] hover:underline"
                  >
                    (310) 555-0148
                  </a>
                  <a
                    href={`mailto:${CONCIERGE_EMAIL}`}
                    className="text-xs font-medium text-[#544A40] hover:text-[#181210] underline"
                  >
                    {CONCIERGE_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean 3-Step Booking Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#C8B9A6] bg-[#FAF6EE] p-6 sm:p-10 shadow-xl">
                {confirmation ? (
                  <div role="status" aria-live="polite" className="py-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#4B1917]/10 px-4 py-1.5 text-xs font-semibold text-[#4B1917]">
                      <span>✓ Suite Reserved</span>
                      <span>· #{confirmation.referenceCode}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl text-[#181210]">
                      Thank you, {confirmation.summary.fullName}.
                    </h3>
                    <p className="mt-2 text-base text-[#544A40]">
                      We have sent your appointment request to{" "}
                      <strong className="text-[#4B1917]">
                        {confirmation.notifyEmail || CONCIERGE_EMAIL}
                      </strong>
                      .
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={
                          confirmation.mailtoUrl || `mailto:${CONCIERGE_EMAIL}`
                        }
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-[#4B1917] px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] hover:bg-[#181210] transition-colors cursor-pointer"
                      >
                        <span>Email Concierge Directly</span>
                        <ArrowUpRightIcon className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmation(null);
                          setStep(1);
                        }}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-[#181210]/30 px-5 text-xs font-semibold uppercase tracking-wider text-[#181210] cursor-pointer"
                      >
                        Book Another Visit
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Clean Unnumbered Step Pills */}
                    <div className="mb-7 flex items-center gap-2">
                      {(
                        [
                          [1, "Treatment"],
                          [2, "Date & Time"],
                          [3, "Your Details"],
                        ] as const
                      ).map(([sNum, label]) => (
                        <button
                          key={sNum}
                          type="button"
                          onClick={() => setStep(sNum)}
                          className={`flex-1 rounded-full py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                            step === sNum
                              ? "bg-[#4B1917] text-[#FAF6EE]"
                              : "bg-[#DFD3C3]/60 text-[#544A40] hover:text-[#181210]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {step === 1 && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {DENTAL_SERVICES.map((srv) => {
                            const active = selectedService === srv.id;
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => onChangeService(srv.id)}
                                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                                  active
                                    ? "border-[#4B1917] bg-[#4B1917] text-[#FAF6EE] shadow-md"
                                    : "border-[#D8CFC0] bg-[#DFD3C3]/35 text-[#181210] hover:bg-[#DFD3C3]/70"
                                }`}
                              >
                                <div className="font-serif text-lg">
                                  {srv.title}
                                </div>
                                <div
                                  className={`text-xs mt-0.5 ${
                                    active ? "text-[#C6A46C]" : "text-[#544A40]"
                                  }`}
                                >
                                  {srv.duration}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-2">
                          {(
                            [
                              ["new-consultation", "New Patient"],
                              ["returning-atelier", "Returning"],
                              ["international-fly-in", "Fly-In Guest"],
                            ] as const
                          ).map(([val, label]) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setPatientType(val)}
                              className={`h-10 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                                patientType === val
                                  ? "border-[#4B1917] bg-[#4B1917] text-[#FAF6EE]"
                                  : "border-[#D8CFC0] bg-[#DFD3C3]/35 text-[#181210]"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <MagneticButton
                            type="button"
                            onClick={() => setStep(2)}
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#4B1917] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EE] hover:bg-[#181210] cursor-pointer"
                          >
                            <span>Choose Date</span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </MagneticButton>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <ElegantCalendarPicker
                          value={preferredDate}
                          onChange={(d) => setPreferredDate(d)}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const active = preferredSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setPreferredSlot(slot)}
                                className={`h-10 rounded-xl border px-3.5 text-left text-xs font-medium transition-colors cursor-pointer ${
                                  active
                                    ? "border-[#4B1917] bg-[#4B1917] text-[#FAF6EE] font-semibold"
                                    : "border-[#D8CFC0] bg-[#DFD3C3]/35 text-[#181210]"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>

                        <select
                          aria-label="Suite Comfort Preference"
                          value={comfortPreference}
                          onChange={(e) =>
                            setComfortPreference(
                              e.target.value as typeof comfortPreference
                            )
                          }
                          className="h-11 w-full rounded-xl border border-[#D8CFC0] bg-[#DFD3C3]/35 px-4 text-sm text-[#181210]"
                        >
                          <option value="acoustic-calm-suite">
                            Standard Private Suite
                          </option>
                          <option value="binaural-neuro-relaxation">
                            Noise-Canceling Audio + Cashmere Throw
                          </option>
                          <option value="unhurried-step-by-step">
                            Extra-Gentle Pace with Pauses
                          </option>
                          <option value="twilight-anesthesiologist">
                            Request Twilight Sedation
                          </option>
                        </select>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="h-10 rounded-full border border-[#181210]/30 px-5 text-xs font-semibold uppercase tracking-wider text-[#181210] cursor-pointer"
                          >
                            Back
                          </button>
                          <MagneticButton
                            type="button"
                            onClick={() => setStep(3)}
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#4B1917] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EE] hover:bg-[#181210] cursor-pointer"
                          >
                            <span>Your Details</span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </MagneticButton>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-11 w-full rounded-xl border border-[#D8CFC0] bg-[#DFD3C3]/35 px-4 text-base text-[#181210]"
                          required
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="email"
                            autoComplete="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 w-full rounded-xl border border-[#D8CFC0] bg-[#DFD3C3]/35 px-4 text-base text-[#181210]"
                            required
                          />
                          <input
                            type="tel"
                            autoComplete="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-11 w-full rounded-xl border border-[#D8CFC0] bg-[#DFD3C3]/35 px-4 text-base text-[#181210]"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {(
                            [
                              ["ppo-concierge-reimbursement", "PPO Insurance"],
                              ["atelier-longevity-membership", "Membership"],
                              ["private-bespoke-retainer", "Self-Pay / 0% APR"],
                            ] as const
                          ).map(([val, label]) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCoverageType(val)}
                              className={`h-10 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                                coverageType === val
                                  ? "border-[#4B1917] bg-[#4B1917] text-[#FAF6EE]"
                                  : "border-[#D8CFC0] bg-[#DFD3C3]/35 text-[#181210]"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>

                        <div className="hidden" aria-hidden="true">
                          <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={websiteUrlHoneypot}
                            onChange={(e) =>
                              setWebsiteUrlHoneypot(e.target.value)
                            }
                          />
                        </div>

                        {errorMessage && (
                          <div
                            role="alert"
                            className="rounded-xl border border-[#4B1917] bg-[#4B1917]/10 px-4 py-2.5 text-sm font-medium text-[#4B1917]"
                          >
                            {errorMessage}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="h-10 rounded-full border border-[#181210]/30 px-5 text-xs font-semibold uppercase tracking-wider text-[#181210] cursor-pointer"
                          >
                            Back
                          </button>
                          <MagneticButton
                            type="submit"
                            disabled={submitting}
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#4B1917] px-8 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EE] hover:bg-[#181210] disabled:opacity-60 cursor-pointer"
                          >
                            <span>
                              {submitting ? "Sending..." : "Confirm Visit"}
                            </span>
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </MagneticButton>
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

      {/* Clean Espresso Footer (#0E0C08) */}
      <footer
        aria-label="Site Footer"
        className="bg-[#0E0C08] text-[#FAF6EE] py-14 sm:py-16 border-t border-white/10"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <img
              src="/brand/logo-emblem.webp"
              alt="Aurum Atelier Medallion"
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-full object-cover shadow-md"
            />
            <div>
              <div className="font-serif text-2xl text-[#FAF6EE]">
                Aurum Atelier
              </div>
              <p className="mt-0.5 text-xs text-[#FAF6EE]/65">
                436 N Bedford Dr, Penthouse 500 · Beverly Hills, CA 90210 · (310)
                555-0148
              </p>
            </div>
          </div>

          <a
            href="https://ammar.works"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#C6A46C]/45 bg-white/[0.04] px-4 py-1.5 text-xs text-[#FAF6EE] hover:border-[#C6A46C]"
          >
            <span className="text-[#FAF6EE]/65">Designed by</span>
            <span className="font-serif font-semibold text-[#C6A46C]">
              Ammar
            </span>
            <span className="text-[11px] text-[#FAF6EE]/75">ammar.works</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#C6A46C]" />
          </a>
        </div>
      </footer>
    </>
  );
}
