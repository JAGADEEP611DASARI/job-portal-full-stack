import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import Recruiter from "./pages/Recruiter";

function Protected({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Login />;
  if (role && user.role !== role) return <Home />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={<Protected role="candidate"><Dashboard /></Protected>} />
          <Route path="/recruiter" element={<Protected role="recruiter"><Recruiter /></Protected>} />
        </Routes>
        <footer>© 2026 JobNest • Full Stack Virtual Internship Project</footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
