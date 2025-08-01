export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non authentifié." });
    }

    // Vérifier que user.role existe et est une chaîne de caractères
    if (typeof user.role !== "string") {
      return res.status(400).json({ message: "Rôle utilisateur invalide." });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Accès refusé : rôle non autorisé." });
    }

    next();
  };
}
