import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">BharatAssist AI</Link>

      <div>
        {!token ? (
          <>
            <Link to="/login">{t("login")}</Link>
            {" | "}
            <Link to="/signup">{t("signup")}</Link>
          </>
        ) : (
          <>
            <Link to="/schemes">{t("schemes")}</Link>
            {" | "}
            <Link to="/dashboard">{t("dashboard")}</Link>
            {" | "}
            <Link to="/updates">{t("updates")}</Link>
            {" | "}
            <Link to="/profile">{t("profile")}</Link>
            {" | "}

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>

            {" | "}

            <button onClick={handleLogout}>{t("logout")}</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
