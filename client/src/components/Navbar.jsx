import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getNavClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">🇮🇳</span>
          <span className="navbar-brand-text">
            BharatAssist <span>AI</span>
          </span>
        </Link>

        <div className="navbar-links">
          {!token ? (
            <>
              <NavLink to="/login" className={getNavClass}>
                {t("login")}
              </NavLink>

              <NavLink to="/signup" className="nav-link signup-link">
                {t("signup")}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={getNavClass}>
                {t("dashboard")}
              </NavLink>

              <NavLink to="/schemes" className={getNavClass}>
                {t("schemes")}
              </NavLink>

              <NavLink to="/updates" className={getNavClass}>
                {t("updates")}
              </NavLink>

              <NavLink to="/profile" className={getNavClass}>
                {t("profile")}
              </NavLink>

              <label className="language-control">
                <span className="language-icon" aria-hidden="true">
                  🌐
                </span>

                <select
                  className="language-select"
                  aria-label="Select language"
                  value={i18n.language?.split("-")[0] || "en"}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="te">తెలుగు</option>
                </select>
              </label>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                {t("logout")}
                <span aria-hidden="true"> ↗</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
