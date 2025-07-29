import express from "express";
import { whiskyController } from "../controllers/whiskyController.js";
import { whiskyValidator } from "../middleware/whiskyValidator.js";

const router = express.Router();

// ✅ Route pour créer un whisky avec validation
router.post("/", whiskyValidator, whiskyController.createWhisky);

// ✅ Route pour mettre à jour un whisky avec validation
router.put("/:id", whiskyValidator, whiskyController.updateWhisky);

// ✅ Route pour récupérer un whisky par son ID
router.get("/:id", whiskyController.getWhiskyById);

// ✅ Route pour récupérer tous les whiskys
router.get("/", whiskyController.getAllWhiskys);

// ✅ Route pour supprimer un whisky
router.delete("/:id", whiskyController.deleteWhisky);

export default router;
