import { User } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await User.create(user);
    res.status(201).json({ message: "Utilisateur créé avec succès", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || user.password !== password) {
    return res.status(401).json({ message: "Identifiants invalides" });
    }
    res.status(200).json({ message: "Connexion réussie", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email } = req.body;
    await User.verifyUser(email);
    res.status(200).json({ message: "Utilisateur vérifié avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification de l'utilisateur", error: error.message });
  }
};
