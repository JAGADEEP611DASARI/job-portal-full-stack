import express from "express";
import { body } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const credentials = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

router.post("/register", [
  body("name").trim().isLength({ min: 2 }).withMessage("Name is required"),
  ...credentials
], register);

router.post("/login", credentials, login);
router.get("/me", protect, me);

export default router;
