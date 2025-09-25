import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Vérifie la présence et la validité du token
export const protect = (req, res, next) => {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ message: "Non authentifié, token manquant" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const msg =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Token invalide ou expiré";
    return res.status(401).json({ message: msg });
  }
};

// Vérifie les rôles autorisés
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non authentifié." });
    }

    if (typeof user.role !== "string") {
      return res.status(400).json({ message: "Rôle utilisateur invalide." });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé : rôle non autorisé." });
    }

    next();
  };
};


