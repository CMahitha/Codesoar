import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { validate, spamSchema } from "../utils/validation.js";
import {
  searchByName,
  searchByPhone,
} from "../controllers/searchController.js";
const router = Router();

router.get("/name", authenticate, searchByName);
router.get("/phone", authenticate, searchByPhone);

export default router;
