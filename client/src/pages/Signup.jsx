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
  const [role, setRole] = useState("");

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
        role,
        category: role,
        
      });

      navigate("/login");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Signup failed",
      );
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

          <label>What best describes you?</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select your category</option>
            <option value="student">👨‍🎓 Student</option>
            <option value="farmer">🌾 Farmer</option>
            <option value="job_seeker">💼 Job Seeker</option>
            <option value="senior_citizen">👴 Senior Citizen</option>
          </select>

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
