import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { spamANumber } from "../controllers/spamController.js";
import { validate, spamSchema } from "../utils/validation.js";
const router = Router();

router.post("/", validate(spamSchema), authenticate, spamANumber);

export default router;
