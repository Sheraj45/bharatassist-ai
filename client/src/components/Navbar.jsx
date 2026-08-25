import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          BharatAssist AI
        </Link>

        <div className="navbar-links">
          {!token ? (
            <>
              <Link to="/login" className="nav-link">
                {t("login")}
              </Link>

              <Link to="/signup" className="nav-link signup-link">
                {t("signup")}
              </Link>
            </>
          ) : (
            <>
              <Link to="/schemes" className="nav-link">
                {t("schemes")}
              </Link>

              <Link to="/dashboard" className="nav-link">
                {t("dashboard")}
              </Link>

              <Link to="/updates" className="nav-link">
                {t("updates")}
              </Link>

              <Link to="/profile" className="nav-link">
                {t("profile")}
              </Link>

              <select
                className="language-select"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="te">తెలుగు</option>
              </select>

              <button className="logout-button" onClick={handleLogout}>
                {t("logout")}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
