import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div>
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
        </div>
        <span className="badge">{job.type}</span>
      </div>
      <p>📍 {job.location}</p>
      {job.salary && <p>💰 {job.salary}</p>}
      <div className="skills">
        {(job.skills || []).slice(0, 5).map(skill => <span key={skill}>{skill}</span>)}
      </div>
      <Link className="primary-button small" to={`/jobs/${job._id}`}>View Job</Link>
    </article>
  );
}
