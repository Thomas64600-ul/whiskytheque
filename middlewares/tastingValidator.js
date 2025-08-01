import { body } from "express-validator";
import { validate } from "./validate.js";

export const tastingValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est requis"),
  
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La description est requise"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("La note doit être un nombre entier entre 1 et 5"),

  body("whiskyId")
    .notEmpty()
    .withMessage("L'ID du whisky est requis")
    // si c'est un UUID, tu peux ajouter :
    //.isUUID()
    //.withMessage("L'ID du whisky doit être un UUID valide"),

  body("userId")
    .notEmpty()
    .withMessage("L'ID de l'utilisateur est requis")
    // même remarque que pour whiskyId sur la validation du format
];

export const validateTasting = validate;

