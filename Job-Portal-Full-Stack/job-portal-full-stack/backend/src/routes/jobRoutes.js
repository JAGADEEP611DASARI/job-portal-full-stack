import express from "express";
import { body } from "express-validator";
import { listJobs, getJob, createJob, updateJob, deleteJob } from "../controllers/jobController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

const jobValidation = [
  body("title").trim().notEmpty().withMessage("Job title is required"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("description").trim().isLength({ min: 20 }).withMessage("Description must be at least 20 characters")
];

router.get("/", listJobs);
router.get("/:id", getJob);
router.post("/", protect, requireRole("recruiter"), jobValidation, createJob);
router.put("/:id", protect, requireRole("recruiter"), jobValidation, updateJob);
router.delete("/:id", protect, requireRole("recruiter"), deleteJob);

export default router;
