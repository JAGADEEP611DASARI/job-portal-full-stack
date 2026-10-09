import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/applications/my")
      .then(res => setApplications(res.data.applications))
      .catch(err => setError(err.response?.data?.message || "Unable to load applications"));
  }, []);

  return (
    <main className="section">
      <p className="eyebrow">CANDIDATE DASHBOARD</p>
      <h1>My applications</h1>
      {error && <div className="alert error">{error}</div>}
      <div className="application-list">
        {applications.length ? applications.map(app => (
          <div className="application-card" key={app._id}>
            <div>
              <h3>{app.job?.title}</h3>
              <p>{app.job?.company} • {app.job?.location}</p>
              <small>Applied {new Date(app.createdAt).toLocaleDateString()}</small>
            </div>
            <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span>
          </div>
        )) : <div className="empty">You have not applied for any jobs yet.</div>}
      </div>
    </main>
  );
}
