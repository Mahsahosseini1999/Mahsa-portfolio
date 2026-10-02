import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email sending isn't configured yet." }, { status: 500 });
  }

  const data = await req.json().catch(() => null);
  const name = String(data?.name ?? "").trim().slice(0, 120);
  const email = String(data?.email ?? "").trim().slice(0, 200);
  const message = String(data?.message ?? "").trim().slice(0, 5000);
  const honeypot = String(data?.website ?? "");

  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Mahsa's Website <onboarding@resend.dev>",
    to: "hosseiniii.mahsaa@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
