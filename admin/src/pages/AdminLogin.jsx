import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", form);

      sessionStorage.setItem("adminToken", response.data.token);
      sessionStorage.setItem("adminUser", JSON.stringify(response.data.admin));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-mark">BA</div>

        <p className="eyebrow">BHARATASSIST AI</p>

        <h1>Admin Portal</h1>

        <p className="login-description">
          Sign in to manage government schemes and public information.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Administrator email</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your admin email"
            autoComplete="username"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button className="primary-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in to Admin Portal"}
          </button>
        </form>

        <p className="security-note">
          Restricted access · Authorized administrators only
        </p>
      </section>
    </main>
  );
}
