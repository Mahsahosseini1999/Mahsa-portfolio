import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email sending isn't configured yet." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("drawing");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No drawing received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Mahsa's Website <onboarding@resend.dev>",
    to: "hosseiniii.mahsaa@gmail.com",
    subject: "A drawing for you",
    text: "Someone made this on your site and sent it to you!",
    attachments: [
      {
        filename: "drawing-for-mahsa.png",
        content: buffer,
      },
    ],
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
