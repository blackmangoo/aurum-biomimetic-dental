import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { BookingRequestSchema, type BookingConfirmation } from "@/lib/bookingSchema";

// In-memory IP rate limiter (10 booking requests per 15 minutes per IP)
const ipHits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Too many reservation attempts from this connection. Please wait 15 minutes or call (310) 555-0148.",
        },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const parsed = BookingRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Invalid booking payload.",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;
    if (input.websiteUrlHoneypot && input.websiteUrlHoneypot.length > 0) {
      return NextResponse.json(
        { ok: false, error: "Automated submission rejected." },
        { status: 400 }
      );
    }

    const referenceCode = `AUR-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;
    const createdAt = new Date().toISOString();

    let savedSupabase = false;
    let sentResend = false;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("your-project-id")
    ) {
      try {
        const sbRes = await fetch(`${supabaseUrl}/rest/v1/appointment_requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            reference_code: referenceCode,
            service_id: input.serviceId,
            patient_type: input.patientType,
            preferred_date: input.preferredDate,
            preferred_slot: input.preferredSlot,
            full_name: input.fullName,
            email: input.email,
            phone: input.phone,
            comfort_preference: input.comfortPreference,
            coverage_type: input.coverageType,
            created_at: createdAt,
          }),
        });
        savedSupabase = sbRes.ok;
      } catch {
        savedSupabase = false;
      }
    }

    const notifyEmail =
      process.env.CLINIC_NOTIFICATION_EMAIL || "ammar.akbar2002@gmail.com";
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes("re_your_api_key_here")) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Aurum Biomimetic Atelier <concierge@aurumbiomimetic.com>",
            to: [notifyEmail],
            subject: `[Penthouse Dossier ${referenceCode}] ${input.fullName} — ${input.serviceId}`,
            text: `Reference: ${referenceCode}\nPatient: ${input.fullName}\nEmail: ${input.email}\nPhone: ${input.phone}\nSpecialty: ${input.serviceId}\nPreferred: ${input.preferredDate} (${input.preferredSlot})\nComfort: ${input.comfortPreference}\nCoverage: ${input.coverageType}`,
          }),
        });
        sentResend = emailRes.ok;
      } catch {
        sentResend = false;
      }
    }

    const mailtoSubject = encodeURIComponent(
      `[Aurum Biomimetic Penthouse Suite] ${input.fullName} — ${referenceCode}`
    );
    const mailtoBody = encodeURIComponent(
      `Hello Ammar & Aurum Biomimetic Concierge,\n\nI have reserved a private penthouse suite consultation:\n\n` +
        `• Dossier Code: ${referenceCode}\n` +
        `• Patient Name: ${input.fullName}\n` +
        `• Email: ${input.email}\n` +
        `• Phone: ${input.phone}\n` +
        `• Clinical Focus: ${input.serviceId}\n` +
        `• Preferred Date: ${input.preferredDate}\n` +
        `• Time Window: ${input.preferredSlot}\n` +
        `• Comfort Protocol: ${input.comfortPreference}\n` +
        `• Coverage Option: ${input.coverageType}\n\n` +
        `Please confirm suite availability and dispatch my pre-visit dossier.`
    );
    const mailtoUrl = `mailto:${notifyEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    try {
      const dataDir = path.join(process.cwd(), ".data");
      await fs.mkdir(dataDir, { recursive: true });
      const ledgerPath = path.join(dataDir, "bookings.json");
      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(ledgerPath, "utf-8");
        existing = JSON.parse(raw);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }
      existing.push({
        referenceCode,
        createdAt,
        ...input,
      });
      await fs.writeFile(ledgerPath, JSON.stringify(existing, null, 2), "utf-8");
    } catch {
      // Read-only filesystem fallback
    }

    const deliveryMode: BookingConfirmation["deliveryMode"] =
      savedSupabase && sentResend
        ? "supabase+resend"
        : savedSupabase
        ? "supabase"
        : sentResend
        ? "resend"
        : "local-ledger";

    const response: BookingConfirmation = {
      ok: true,
      referenceCode,
      createdAt,
      deliveryMode,
      notifyEmail,
      mailtoUrl,
      summary: {
        fullName: input.fullName,
        serviceId: input.serviceId,
        preferredDate: input.preferredDate,
        preferredSlot: input.preferredSlot,
        comfortPreference: input.comfortPreference,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected error processing suite reservation.",
      },
      { status: 500 }
    );
  }
}
