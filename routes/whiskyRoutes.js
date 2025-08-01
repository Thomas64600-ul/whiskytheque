import express from "express";
import { whiskyController } from "../controllers/whiskyController.js";
import { whiskyValidator } from "../middlewares/whiskyValidator.js";
import { param } from "express-validator";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

const validateIdParam = [
  param("id").isInt().withMessage("L'ID doit être un entier"),
];

// Création (admin uniquement)
router.post("/", protect, authorize("admin"), whiskyValidator, whiskyController.createWhisky);

// Mise à jour (admin uniquement)
router.put("/:id", protect, authorize("admin"), validateIdParam, whiskyValidator, whiskyController.updateWhisky);

// Récupérer un whisky par ID
router.get("/:id", validateIdParam, whiskyController.getWhiskyById);

// Récupérer tous les whiskys
router.get("/", whiskyController.getAllWhiskys);

// Suppression (admin uniquement)
router.delete("/:id", protect, authorize("admin"), validateIdParam, whiskyController.deleteWhisky);

export default router;
