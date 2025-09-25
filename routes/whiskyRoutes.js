import express from "express";
import { whiskyController } from "../controllers/whiskyController.js";
import { whiskyValidator } from "../validations/whiskyValidator.js";
import { param } from "express-validator";
import { protect, authorize } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

const validateIdParam = [
  param("id").isInt().withMessage("L'ID doit être un entier"),
  validateRequest
];

// Routes protégées Admin
router.post("/",
  protect,
  authorize("admin"),
  whiskyValidator,
  validateRequest,
  whiskyController.createWhisky
);

router.put("/:id",
  protect,
  authorize("admin"),
  validateIdParam,
  whiskyValidator,
  validateRequest, // ✅ ajouté
  whiskyController.updateWhisky
);

router.delete("/:id",
  protect,
  authorize("admin"),
  validateIdParam,
  whiskyController.deleteWhisky
);

// Routes publiques
router.get("/", whiskyController.getAllWhiskys);
router.get("/:id", validateIdParam, whiskyController.getWhiskyById);

export default router;
