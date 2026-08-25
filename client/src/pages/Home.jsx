import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="hero-badge">🇮🇳 BharatAssist AI</span>

          <h1>{t("homeTitle")}</h1>

          <p>{t("homeDescription")}</p>

          <div className="hero-actions">
            <Link to="/login" className="primary-button">
              {t("login")}
            </Link>

            <Link to="/signup" className="secondary-button">
              {t("createAccount")}
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <span>📋</span>

          <h3>{t("governmentSchemes")}</h3>

          <p>
            Discover government schemes and benefits that may be available to
            you.
          </p>
        </div>

        <div className="feature-card">
          <span>🎯</span>

          <h3>{t("recommended")}</h3>

          <p>Get personalized scheme recommendations based on your profile.</p>
        </div>

        <div className="feature-card">
          <span>📰</span>

          <h3>{t("governmentUpdates")}</h3>

          <p>
            Stay informed about important government announcements and
            opportunities.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
