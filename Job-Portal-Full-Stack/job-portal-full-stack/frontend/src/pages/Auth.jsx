import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return <AuthForm title="Welcome back" subtitle="Login to continue" form={form} setForm={setForm}
    onSubmit={submit} error={error} button="Login" footer={<p>New here? <Link to="/register">Create an account</Link></p>} />;
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return <AuthForm title="Create your account" subtitle="Start using JobNest today" form={form} setForm={setForm}
    onSubmit={submit} error={error} button="Register" register
    footer={<p>Already have an account? <Link to="/login">Login</Link></p>} />;
}

function AuthForm({ title, subtitle, form, setForm, onSubmit, error, button, register, footer }) {
  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <p className="eyebrow">JOBNEST</p>
        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>
        {register && <label>Name<input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></label>}
        <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></label>
        <label>Password<input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></label>
        {register && <label>Account type
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </label>}
        {error && <div className="alert error">{error}</div>}
        <button className="primary-button full" type="submit">{button}</button>
        {footer}
      </form>
    </main>
  );
}
