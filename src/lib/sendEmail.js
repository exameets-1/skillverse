// lib/sendEmail.js
import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, message }) {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpService = process.env.SMTP_SERVICE;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_MAIL;
    const smtpPass = process.env.SMTP_PASSWORD;

    if (!smtpHost || !smtpService || !smtpPort || !smtpUser || !smtpPass) {
      throw new Error("Missing required SMTP configuration");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      service: smtpService,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter
    await transporter.verify();

    const mailOptions = {
      from: `Exameets Skillverse <${smtpUser}>`,
      to: to,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email sending error:", error.message);
    throw error;
  }
}
