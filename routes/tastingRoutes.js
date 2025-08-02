import express from "express";
import tastingController from "../controllers/tastingController.js";
import { tastingSchema } from "../validations/tastingValidation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

// Lire
router.get("/", tastingController.getAllTastings);
router.get("/:id", tastingController.getTastingById);
router.get("/user/:userId", tastingController.getTastingsByUser);
router.get("/whisky/:whiskyId", tastingController.getTastingsByWhisky);

// Créer
router.post("/", validate(tastingSchema), tastingController.createTasting);

// Modifier
router.put("/:id", validate(tastingSchema), tastingController.updateTasting);

// Supprimer
router.delete("/:id", tastingController.deleteTasting);

export default router;

