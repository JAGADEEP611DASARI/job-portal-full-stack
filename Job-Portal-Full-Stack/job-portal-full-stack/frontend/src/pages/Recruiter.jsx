import { useEffect, useState } from "react";
import api from "../services/api";

const blank = { title: "", company: "", location: "", type: "Full-time", salary: "", description: "", skills: "" };

export default function Recruiter() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data.jobs);
  };

  useEffect(() => { load(); }, []);

  const submit = async e => {
    e.preventDefault();
    setMessage("");
    const payload = { ...form, skills: form.skills.split(",").map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) await api.put(`/jobs/${editing}`, payload);
      else await api.post("/jobs", payload);
      setForm(blank);
      setEditing(null);
      setMessage(editing ? "Job updated." : "Job created.");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not save job");
    }
  };

  const edit = job => setForm({
    title: job.title, company: job.company, location: job.location, type: job.type,
    salary: job.salary || "", description: job.description, skills: (job.skills || []).join(", ")
  }) || setEditing(job._id);

  const remove = async id => {
    if (!confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`);
    load();
  };

  return (
    <main className="section">
      <div className="section-heading">
        <div><p className="eyebrow">RECRUITER PANEL</p><h1>{editing ? "Edit job" : "Post a new job"}</h1></div>
      </div>
      <form className="job-form" onSubmit={submit}>
        {["title","company","location","salary"].map(key => (
          <label key={key}>{key[0].toUpperCase()+key.slice(1)}
            <input required={key !== "salary"} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} />
          </label>
        ))}
        <label>Job Type<select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option><option>Remote</option>
        </select></label>
        <label>Skills (comma separated)<input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} /></label>
        <label>Description<textarea required minLength={20} rows="7" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></label>
        <div className="form-actions">
          <button className="primary-button" type="submit">{editing ? "Update Job" : "Create Job"}</button>
          {editing && <button type="button" className="secondary-button" onClick={() => {setEditing(null);setForm(blank)}}>Cancel</button>}
        </div>
      </form>
      {message && <div className="alert">{message}</div>}

      <h2 className="subheading">Your jobs</h2>
      <div className="job-grid">
        {jobs.map(job => (
          <article className="job-card" key={job._id}>
            <h3>{job.title}</h3><p>{job.company} • {job.location}</p>
            <div className="form-actions">
              <button className="secondary-button" onClick={() => edit(job)}>Edit</button>
              <button className="danger-button" onClick={() => remove(job._id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
