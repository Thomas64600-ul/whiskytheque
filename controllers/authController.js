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

// ==========================
// VERIFY EMAIL
// ==========================
export async function verifyEmail(req, res) {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.id) {
      return res.status(400).json({ message: "Token invalide." });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable." });
    }
    if (user.is_verified) {
      return res.status(400).json({ message: "Compte déjà vérifié." });
    }

    await User.verifyUser(user.email);

    res.json({ message: "Compte vérifié avec succès." });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(400).json({ message: "Token invalide ou expiré." });
  }
}

// ==========================
// LOGIN
// ==========================
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
    if (!user.is_verified) {
      return res.status(401).json({ message: "Merci de vérifier votre email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
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
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// ==========================
// REQUEST PASSWORD RESET
// ==========================
export async function requestPasswordReset(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requis." });

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHashed = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expireDate = new Date(Date.now() + 3600000); // 1h

    await db.query(
      "UPDATE users SET reset_password_token = $1, reset_password_expire = $2 WHERE email = $3",
      [resetTokenHashed, expireDate, email]
    );

    const resetUrl = `${CLIENT_URL}/api/auth/reset-password/${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `<p>Bonjour,</p>
             <p>Pour réinitialiser votre mot de passe, cliquez sur ce lien :</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>Ce lien expire dans 1 heure.</p>`,
    });

    res.json({ message: "Email de réinitialisation envoyé." });
  } catch (error) {
    console.error("Reset request error:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// ==========================
// RESET PASSWORD
// ==========================
export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const resetTokenHashed = crypto.createHash("sha256").update(token).digest("hex");

    const { rows } = await db.query(
      "SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expire > NOW()",
      [resetTokenHashed]
    );
    const user = rows[0];
    if (!user) return res.status(400).json({ message: "Token invalide ou expiré." });

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.query(
      "UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expire = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    res.json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// ==========================
// LOGOUT
// ==========================
export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Déconnecté avec succès" });
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
}

// ==========================
// RESEND VERIFICATION EMAIL
// ==========================
export async function resendVerificationEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email requis." });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    if (user.is_verified) {
      return res.status(400).json({ message: "Compte déjà vérifié." });
    }

    const verificationToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    const verificationUrl = `${CLIENT_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Nouveau lien de vérification",
      html: `Bonjour,<br><br>
             Voici un nouveau lien pour vérifier votre compte :
             <a href="${verificationUrl}">Vérifier mon compte</a><br><br>
             Ce lien est valable 24h.`,
    });

    res.json({ message: "Un nouvel email de vérification a été envoyé." });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

