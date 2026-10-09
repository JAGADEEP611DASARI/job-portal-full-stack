import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: "", location: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadJobs() {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const res = await api.get("/jobs", { params });
      setJobs(res.data.jobs);
      setMessage("");
    } catch {
      setMessage("Unable to load jobs. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadJobs(); }, []);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">FIND YOUR NEXT OPPORTUNITY</p>
          <h1>Build your career with <span>JobNest</span>.</h1>
          <p className="hero-text">
            Search jobs, explore opportunities, and apply from one simple portal.
          </p>
        </div>
      </section>

      <section className="search-panel">
        <input
          placeholder="Job title, company or skill"
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
        />
        <input
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters({ ...filters, location: e.target.value })}
        />
        <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>
        <button className="primary-button" onClick={loadJobs}>Search</button>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OPPORTUNITIES</p>
            <h2>Latest jobs</h2>
          </div>
          <span>{jobs.length} jobs found</span>
        </div>

        {message && <div className="alert error">{message}</div>}
        {loading ? <p>Loading jobs...</p> : (
          <div className="job-grid">
            {jobs.length ? jobs.map(job => <JobCard key={job._id} job={job} />) :
              <div className="empty">No jobs match your search.</div>}
          </div>
        )}
      </section>
    </main>
  );
}
