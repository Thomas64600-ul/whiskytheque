import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

export async function register(req, res) {
  try {
    const { email, password, confirmPassword, role, avatar, name, lastname } = req.body;

    if (!email || !password || !confirmPassword || !name || !lastname) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email,
      password: hashedPassword,
      role: role || "user",
      image: avatar || null,
      contact: null,  // adapte si tu as d'autres infos
    };

    const result = await User.create(userData);
    const userId = result.insertId;

    // Crée le token avec l'id utilisateur
    const verificationToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });

    const verificationUrl = `${CLIENT_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Vérifiez votre compte",
      html: `Bonjour ${name},<br><br>Merci de vérifier votre compte en cliquant sur ce lien : <a href="${verificationUrl}">Vérifier mon compte</a><br><br>Ce lien est valable 24h.`,
    });

    res.status(201).json({ message: "Utilisateur créé. Un email de vérification a été envoyé." });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Impossible d’enregistrer l'utilisateur." });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Tu peux stocker le champ isVerified dans ta table users si besoin
    if (!user.isVerified) {
      return res.status(401).json({ message: "Merci de vérifier votre email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Connexion réussie.",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}
