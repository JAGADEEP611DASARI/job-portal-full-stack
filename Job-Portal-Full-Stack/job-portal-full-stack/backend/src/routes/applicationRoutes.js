import express from "express";
import { body } from "express-validator";
import { protect, requireRole } from "../middleware/auth.js";
import {
  apply,
  myApplications,
  jobApplications,
  updateStatus
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  requireRole("candidate"),
  body("coverLetter").trim().isLength({ min: 20 }).withMessage("Cover letter must be at least 20 characters"),
  apply
);

router.get("/my", protect, requireRole("candidate"), myApplications);
router.get("/job/:jobId", protect, requireRole("recruiter"), jobApplications);
router.patch("/:id/status", protect, requireRole("recruiter"), updateStatus);

export default router;
