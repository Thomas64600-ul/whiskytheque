import { body } from "express-validator";

export const whiskyValidator = [
  body("nom")
    .notEmpty()
    .withMessage("Le nom du whisky est requis.")
    .isLength({ max: 100 })
    .withMessage("Le nom ne doit pas dépasser 100 caractères."),

  body("marque")
    .notEmpty()
    .withMessage("La marque est requise.")
    .isLength({ max: 100 })
    .withMessage("La marque ne doit pas dépasser 100 caractères."),

  body("pays")
    .notEmpty()
    .withMessage("Le pays d'origine est requis.")
    .isLength({ max: 100 })
    .withMessage("Le pays ne doit pas dépasser 100 caractères."),

  body("categorie")
    .notEmpty()
    .withMessage("La catégorie est requise.")
    .isIn(["single", "single malt", "blend", "bourbon", "rye", "scotch", "blended malt"])
    .withMessage("Catégorie invalide."),

  body("age")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("L'âge doit être un entier entre 0 et 100."),

  body("degre")
    .notEmpty()
    .withMessage("Le degré d'alcool est requis.")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Le degré doit être un nombre entre 0 et 100."),

  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("La description ne doit pas dépasser 1000 caractères."),
];
