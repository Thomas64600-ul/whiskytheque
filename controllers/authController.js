import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

// ==========================
// REGISTER
// ==========================
export async function register(req, res) {
  try {
    const { firstname, lastname, email, password, confirmPassword, role } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    // Vérifie si l'email existe déjà
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Crée l’utilisateur en DB
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Génère un token de vérification
    const verificationToken = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1d" });
    const verificationUrl = `${CLIENT_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Vérifiez votre compte",
      html: `Bonjour ${firstname},<br><br>
             Merci de vérifier votre compte en cliquant sur ce lien :
             <a href="${verificationUrl}">Vérifier mon compte</a><br><br>
             Ce lien est valable 24h.`,
    });

    res.status(201).json({
      message: "Utilisateur créé. Un email de vérification a été envoyé."
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Impossible d’enregistrer l'utilisateur." });
  }
}
