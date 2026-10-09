import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then(res => setJob(res.data.job)).catch(() => setMessage("Job not found"));
  }, [id]);

  const apply = async e => {
    e.preventDefault();
    try {
      await api.post(`/applications/${id}`, { coverLetter });
      setMessage("Application submitted successfully!");
      setCoverLetter("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Application failed");
    }
  };

  if (!job) return <main className="section"><p>{message || "Loading..."}</p></main>;

  return (
    <main className="section">
      <div className="detail-card">
        <span className="badge">{job.type}</span>
        <h1>{job.title}</h1>
        <h3>{job.company}</h3>
        <p>📍 {job.location} {job.salary && ` • ${job.salary}`}</p>
        <div className="skills">{job.skills?.map(s => <span key={s}>{s}</span>)}</div>
        <hr />
        <h2>Job Description</h2>
        <p className="description">{job.description}</p>

        {user?.role === "candidate" ? (
          <form className="apply-box" onSubmit={apply}>
            <h2>Apply for this job</h2>
            <textarea required minLength={20} rows="7" placeholder="Write a short cover letter..." value={coverLetter} onChange={e => setCoverLetter(e.target.value)} />
            <button className="primary-button" type="submit">Submit Application</button>
          </form>
        ) : !user ? (
          <div className="alert">Login as a candidate to apply for this job.</div>
        ) : null}

        {message && <div className="alert">{message}</div>}
      </div>
    </main>
  );
}
