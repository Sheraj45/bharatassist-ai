import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await API.post("/users/signup", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🇮🇳</span>

          <h1>{t("createAccount")}</h1>

          <p>Create your BharatAssist AI account.</p>
        </div>

        <form onSubmit={handleSignup}>
          <label>{t("name")}</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

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
            placeholder="Create a password"
            required
          />

          {message && <p className="auth-error">{message}</p>}

          <button
            type="submit"
            className="primary-button auth-button"
            disabled={loading}
          >
            {loading ? "Creating account..." : t("createAccount")}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">{t("login")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
