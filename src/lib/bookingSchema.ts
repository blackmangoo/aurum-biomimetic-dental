import { z } from "zod";

export const SERVICE_IDS = [
  "biomimetic-veneers",
  "zirconia-implants",
  "airway-aligners",
  "laser-endodontics",
  "hydroxyapatite-enamel",
  "tmj-neuromuscular",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const TIME_SLOTS = [
  "08:30 AM — Morning Sanctuary Suite",
  "10:30 AM — Mid-Morning Diagnostic Suite",
  "01:30 PM — Early Afternoon Atelier",
  "03:30 PM — Late Afternoon Restorative",
  "05:15 PM — Private Executive Twilight",
] as const;

/**
 * HIPAA-Safe Appointment Request Contract for Aurum Biomimetic Dental Atelier.
 * Collects scheduling preferences & contact coordinates only — never clinical history or SSN.
 */
export const BookingRequestSchema = z.object({
  serviceId: z.enum(SERVICE_IDS, {
    errorMap: () => ({ message: "Please select a biomimetic clinical focus." }),
  }),
  patientType: z.enum([
    "new-consultation",
    "returning-atelier",
    "international-fly-in",
  ]),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a valid preferred date (YYYY-MM-DD)."),
  preferredSlot: z.enum(TIME_SLOTS, {
    errorMap: () => ({ message: "Please select a preferred atelier time window." }),
  }),
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address for your dossier confirmation."),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+()\-\s0-9]{10,20}$/,
      "Please enter a valid 10-digit phone number."
    ),
  comfortPreference: z
    .enum([
      "acoustic-calm-suite",
      "binaural-neuro-relaxation",
      "unhurried-step-by-step",
      "twilight-anesthesiologist",
    ])
    .default("acoustic-calm-suite"),
  coverageType: z
    .enum([
      "ppo-concierge-reimbursement",
      "atelier-longevity-membership",
      "private-bespoke-retainer",
    ])
    .default("ppo-concierge-reimbursement"),
  websiteUrlHoneypot: z
    .string()
    .max(0, "Automated bot submission rejected.")
    .optional()
    .default(""),
});

export type BookingRequestInput = z.infer<typeof BookingRequestSchema>;

export interface BookingConfirmation {
  ok: true;
  referenceCode: string;
  createdAt: string;
  deliveryMode: "supabase+resend" | "supabase" | "resend" | "local-ledger";
  notifyEmail: string;
  mailtoUrl: string;
  summary: {
    fullName: string;
    serviceId: ServiceId;
    preferredDate: string;
    preferredSlot: string;
    comfortPreference: string;
  };
}
