import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🇮🇳</span>

          <h1>{t("login")}</h1>

          <p>Welcome back to BharatAssist AI.</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>{t("email")}</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {message && <p className="auth-error">{message}</p>}

          <button
            type="submit"
            className="primary-button auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : t("login")}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">{t("createAccount")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
