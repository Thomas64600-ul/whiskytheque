// validations/tastingValidation.js
import Joi from "joi";

export const tastingSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.empty": "Le nom est requis",
      "any.required": "Le nom est requis"
    }),

  description: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.empty": "La description est requise",
      "any.required": "La description est requise"
    }),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": "La note doit être un nombre entier",
      "number.min": "La note doit être au minimum 1",
      "number.max": "La note doit être au maximum 5",
      "any.required": "La note est requise"
    }),

  whiskyId: Joi.string()
    .required()
    // .guid() // Décommente si tu utilises des UUID
    .messages({
      "string.empty": "L'ID du whisky est requis",
      "any.required": "L'ID du whisky est requis"
    }),

  userId: Joi.string()
    .required()
    // .guid() // Idem ici
    .messages({
      "string.empty": "L'ID de l'utilisateur est requis",
      "any.required": "L'ID de l'utilisateur est requis"
    }),
});
