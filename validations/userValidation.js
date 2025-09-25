import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Le format de l'email est invalide.",
      "string.empty": "L'email est requis."
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
      "string.empty": "Le mot de passe est requis."
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Les mots de passe ne correspondent pas.",
      "string.empty": "La confirmation du mot de passe est requise."
    }),

  role: Joi.string()
    .valid("admin", "user")
    .optional()
    .messages({
      "any.only": "Le rôle doit être 'admin' ou 'user'."
    }),

  image: Joi.string().uri().optional(),
  contact: Joi.string().max(500).optional(),
});
