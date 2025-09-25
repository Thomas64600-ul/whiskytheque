import nodemailer from "nodemailer";
import { config as configDotenv } from "dotenv";

configDotenv();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // mot de passe d’application
  },
});

/**
 * Envoi un email
 * @param {Object} param0
 * @param {string} param0.to - Destinataire
 * @param {string} param0.subject - Sujet
 * @param {string} param0.html - Contenu HTML
 * @param {string} [param0.text] - Contenu texte brut (optionnel)
 * @param {string} [param0.from] - Expéditeur personnalisé (optionnel)
 */
export default async function sendEmail({ to, subject, html, text, from }) {
  try {
    const info = await transporter.sendMail({
      from: from || `"Whiskytheque" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]+>/g, ""), // fallback texte si non fourni
      html,
    });

    console.log("📧 Email envoyé avec succès:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Erreur envoi email:", error.message, error.response || "");
    throw new Error("Erreur lors de l'envoi de l'email");
  }
}

