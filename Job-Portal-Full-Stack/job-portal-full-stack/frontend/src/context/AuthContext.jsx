import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("job_portal_user");
    return saved ? JSON.parse(saved) : null;
  });

  const saveSession = ({ token, user }) => {
    localStorage.setItem("job_portal_token", token);
    localStorage.setItem("job_portal_user", JSON.stringify(user));
    setUser(user);
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    saveSession(res.data);
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    saveSession(res.data);
  };

  const logout = () => {
    localStorage.removeItem("job_portal_token");
    localStorage.removeItem("job_portal_user");
    setUser(null);
  };

  useEffect(() => {
    if (!user) return;
    api.get("/auth/me").catch(() => logout());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
