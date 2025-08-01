import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Retourner toutes les erreurs sous forme d’un tableau
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });
  }
  next();
};
