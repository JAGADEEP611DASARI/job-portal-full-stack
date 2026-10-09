import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/">JobNest</Link>
      <div className="nav-links">
        <Link to="/">Jobs</Link>
        {user?.role === "candidate" && <Link to="/dashboard">Dashboard</Link>}
        {user?.role === "recruiter" && <Link to="/recruiter">Recruiter</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link className="nav-button" to="/register">Register</Link>
          </>
        ) : (
          <button className="link-button" onClick={signOut}>Logout</button>
        )}
      </div>
    </nav>
  );
}
