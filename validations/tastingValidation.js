import Joi from "joi";

export const tastingSchema = Joi.object({
  user_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID de l'utilisateur doit être un entier",
      "any.required": "L'ID de l'utilisateur est requis"
    }),

  whisky_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID du whisky doit être un entier",
      "any.required": "L'ID du whisky est requis"
    }),

  note: Joi.number()
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

  comment: Joi.string()
    .max(1000)
    .optional(),

  date_tasting: Joi.date()
    .optional()
    .messages({
      "date.base": "La date doit être une date valide"
    }),
});
