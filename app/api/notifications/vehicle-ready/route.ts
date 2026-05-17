import { NextResponse } from "next/server";
import { Resend } from "resend";

type VehicleReadyPayload = {
  customer: string;
  vehicle: string;
  plate: string;
  email?: string;
};

function normalizeText(value: unknown, fallback: string) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : fallback;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function readPayload(request: Request): Promise<VehicleReadyPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return {
      customer: normalizeText(body.customer, "Cliente"),
      vehicle: normalizeText(body.vehicle, "veículo"),
      plate: normalizeText(body.plate, "placa não informada"),
      email: normalizeText(body.email, ""),
    };
  }

  const formData = await request.formData();
  return {
    customer: normalizeText(formData.get("customer"), "Cliente"),
    vehicle: normalizeText(formData.get("vehicle"), "veículo"),
    plate: normalizeText(formData.get("plate"), "placa não informada"),
    email: normalizeText(formData.get("email"), ""),
  };
}

export async function POST(request: Request) {
  const payload = await readPayload(request);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "AJB AutoFlow <onboarding@resend.dev>";
  const demoRecipient = process.env.RESEND_DEMO_TO_EMAIL ?? "anjobrito@gmail.com";
  const internalCopy = process.env.RESEND_INTERNAL_COPY_EMAIL;
  const recipient = payload.email && isValidEmail(payload.email) ? payload.email : demoRecipient;

  if (!payload.email && apiKey) {
    return NextResponse.json(
      {
        ok: false,
        mode: "validation",
        message: "Informe um e-mail válido do cliente antes de enviar o aviso real.",
      },
      { status: 400 },
    );
  }

  const subject = `Veículo pronto para retirada - ${payload.plate}`;
  const safeCustomer = escapeHtml(payload.customer);
  const safeVehicle = escapeHtml(payload.vehicle);
  const safePlate = escapeHtml(payload.plate);

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h1 style="font-size: 22px; margin-bottom: 16px;">Veículo pronto para retirada</h1>
      <p>Olá, <strong>${safeCustomer}</strong>.</p>
      <p>O serviço do seu veículo <strong>${safeVehicle}</strong>, placa <strong>${safePlate}</strong>, foi finalizado pela equipe da AJB AutoFlow.</p>
      <p>Seu veículo já está disponível para retirada.</p>
      <p style="margin-top: 24px; font-size: 13px; color: #475569;">AJB AutoFlow by AJBSYSTEMS</p>
    </div>
  `;

  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      mode: "demo",
      message: `Aviso demo preparado para ${payload.customer}: o veículo ${payload.vehicle} placa ${payload.plate} está pronto para retirada.`,
    });
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: recipient,
    bcc: internalCopy && isValidEmail(internalCopy) ? internalCopy : undefined,
    subject,
    html,
  });

  if (result.error) {
    return NextResponse.json(
      {
        ok: false,
        mode: "email",
        message: "Não foi possível enviar o aviso pelo Resend.",
        error: result.error.message,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: "email",
    message: `Aviso enviado para ${recipient}.`,
    emailId: result.data?.id,
  });
}
