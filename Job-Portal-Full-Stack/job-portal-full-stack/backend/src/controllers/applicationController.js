import Application from "../models/Application.js";
import Job from "../models/Job.js";

export async function apply(req, res) {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const existing = await Application.findOne({
    job: job._id,
    candidate: req.user._id
  });
  if (existing) return res.status(409).json({ message: "You already applied for this job" });

  const application = await Application.create({
    job: job._id,
    candidate: req.user._id,
    coverLetter: req.body.coverLetter
  });

  res.status(201).json({ application });
}

export async function myApplications(req, res) {
  const applications = await Application.find({ candidate: req.user._id })
    .populate("job")
    .sort({ createdAt: -1 });
  res.json({ applications });
}

export async function jobApplications(req, res) {
  const job = await Job.findOne({ _id: req.params.jobId, recruiter: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found or not owned by you" });

  const applications = await Application.find({ job: job._id })
    .populate("candidate", "name email skills")
    .sort({ createdAt: -1 });

  res.json({ applications });
}

export async function updateStatus(req, res) {
  const application = await Application.findById(req.params.id).populate("job");
  if (!application || String(application.job.recruiter) !== String(req.user._id)) {
    return res.status(404).json({ message: "Application not found" });
  }

  const allowed = ["Applied", "Reviewing", "Shortlisted", "Rejected", "Hired"];
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  application.status = req.body.status;
  await application.save();
  res.json({ application });
}
