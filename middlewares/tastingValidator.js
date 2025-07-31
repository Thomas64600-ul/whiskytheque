import { body } from "express-validator";
import { validate } from "./validate.js";

export const tastingValidationRules = [
  body("name").notEmpty().withMessage("Le nom est requis"),
  body("description").notEmpty().withMessage("La description est requise"),
  body("rating").isNumeric().withMessage("La note doit être un nombre"),
  body("whiskyId").notEmpty().withMessage("L'ID du whisky est requis"),
  body("userId").notEmpty().withMessage("L'ID de l'utilisateur est requis"),
];

export const validateTasting = validate;
