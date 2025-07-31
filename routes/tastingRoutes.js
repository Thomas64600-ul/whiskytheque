import express from "express";
import tastingController from "../controllers/tastingController.js";
import { tastingValidationRules, validateTasting } from "../middlewares/tastingValidator.js";

const router = express.Router();

router.get("/user/:userId", tastingController.getTastingsByUser);
router.get("/whisky/:whiskyId", tastingController.getTastingsByWhisky);


router.post("/", tastingValidationRules, validateTasting, tastingController.createTasting);
router.get("/", tastingController.getAllTastings);
router.get("/:id", tastingController.getTastingById);
router.put("/:id", tastingValidationRules, validateTasting, tastingController.updateTasting);
router.delete("/:id", tastingController.deleteTasting);

export default router;
