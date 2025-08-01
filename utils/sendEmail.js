import nodemailer from "nodemailer";
import { config as configDotenv } from "dotenv";

configDotenv();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Ton Nom" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email envoyé", info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur envoi email", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
}

