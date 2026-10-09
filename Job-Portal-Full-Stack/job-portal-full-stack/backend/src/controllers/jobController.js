import Job from "../models/Job.js";

export async function listJobs(req, res) {
  const { search = "", location = "", type = "" } = req.query;
  const query = {};

  if (search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [
      { title: regex },
      { company: regex },
      { description: regex },
      { skills: regex }
    ];
  }
  if (location.trim()) query.location = new RegExp(location.trim(), "i");
  if (type) query.type = type;

  const jobs = await Job.find(query).populate("recruiter", "name email").sort({ createdAt: -1 });
  res.json({ jobs });
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate("recruiter", "name email");
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json({ job });
}

export async function createJob(req, res) {
  const job = await Job.create({ ...req.body, recruiter: req.user._id });
  res.status(201).json({ job });
}

export async function updateJob(req, res) {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, recruiter: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) return res.status(404).json({ message: "Job not found or not owned by you" });
  res.json({ job });
}

export async function deleteJob(req, res) {
  const job = await Job.findOneAndDelete({ _id: req.params.id, recruiter: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found or not owned by you" });
  res.json({ message: "Job deleted successfully" });
}
