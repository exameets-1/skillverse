// app/api/callback/route.js
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { name, contact, time } = await req.json();

    if (!name || !contact || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const subject = `New Callback Request - ${name}`;
    const message = `
      <h2>New Callback Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Preferred Time:</strong> ${time}</p>
    `;

    await sendEmail({ 
      to: "exameets@gmail.com",
      subject, 
      message 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
