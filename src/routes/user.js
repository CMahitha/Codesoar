import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { addContact, getContacts } from "../controllers/userController.js";
import { validate, contactSchema } from "../utils/validation.js";
const router = Router();

router.post("/", validate(contactSchema), authenticate, addContact);
router.get("/", authenticate, getContacts);

export default router;
