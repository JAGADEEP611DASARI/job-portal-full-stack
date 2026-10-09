import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { validate } from "./middleware/validate.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Job Portal API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", validate, jobRoutes);
app.use("/api/applications", validate, applicationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
