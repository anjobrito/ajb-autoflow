import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const formData = await request.formData();
  const customer = String(formData.get("customer") ?? "Cliente");
  const vehicle = String(formData.get("vehicle") ?? "veículo");
  const plate = String(formData.get("plate") ?? "placa não informada");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      mode: "demo",
      message: `Aviso demo preparado para ${customer}: o veículo ${vehicle} placa ${plate} está pronto para retirada.`,
    });
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "AIB AutoFlow <onboarding@resend.dev>",
    to: "anjobrito@gmail.com",
    subject: "Veículo pronto para retirada",
    html: `<p>Olá, ${customer}.</p><p>O serviço do seu veículo <strong>${vehicle}</strong>, placa <strong>${plate}</strong>, foi finalizado.</p><p>Seu veículo já está disponível para retirada.</p>`,
  });

  return NextResponse.json({ ok: true, mode: "email" });
}
