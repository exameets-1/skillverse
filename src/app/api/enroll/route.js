// app/api/enroll/route.js
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { name, contact, course } = await req.json();

    if (!name || !contact || !course) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const subject = `New Enrollment Request - ${name}`;
    const message = `
      <h2>New Enrollment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Course Interested:</strong> ${course}</p>
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
