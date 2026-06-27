import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: "harsh160502@gmail.com",
    replyTo: email,
    subject: `New message from ${name} — Portfolio`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #6366f1;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #6366f1; padding-left: 16px; color: #555;">
          ${message.replace(/\n/g, "<br/>")}
        </blockquote>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
