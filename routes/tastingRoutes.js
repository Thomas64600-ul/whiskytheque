import express from "express";
import tastingController from "../controllers/tastingController.js";
import { tastingSchema } from "../validations/tastingValidation.js";
import { validate } from "../middlewares/validate.js";
import { param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// Vérification param id
const validateId = [
  param("id").isInt().withMessage("L'ID doit être un entier"),
  validateRequest
];
const validateUserId = [
  param("userId").isInt().withMessage("L'ID utilisateur doit être un entier"),
  validateRequest
];
const validateWhiskyId = [
  param("whiskyId").isInt().withMessage("L'ID whisky doit être un entier"),
  validateRequest
];

// Routes de lecture
router.get("/", tastingController.getAllTastings);
router.get("/user/:userId", validateUserId, tastingController.getTastingsByUser);
router.get("/whisky/:whiskyId", validateWhiskyId, tastingController.getTastingsByWhisky);
router.get("/:id", validateId, tastingController.getTastingById);

// Créer
router.post("/", validate(tastingSchema), tastingController.createTasting);

// Modifier
router.put("/:id", validateId, validate(tastingSchema), tastingController.updateTasting);

// Supprimer
router.delete("/:id", validateId, tastingController.deleteTasting);

export default router;

