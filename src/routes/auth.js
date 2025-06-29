import { Router } from "express";
import { register, login } from "../controllers/authController.js";

import { registerSchema, loginSchema, validate } from "../utils/validation.js";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
