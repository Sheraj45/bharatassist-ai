import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Dashboard() {
  const { t } = useTranslation();

  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState("");

  const categories = [
    {
      key: "Students",
      icon: "🎓",
      description: "studentDescription",
      number: "01",
    },
    {
      key: "Farmers",
      icon: "🌾",
      description: "farmerDescription",
      number: "02",
    },
    {
      key: "Job Seekers",
      icon: "💼",
      description: "jobSeekerDescription",
      number: "03",
    },
    {
      key: "Senior Citizens",
      icon: "👴",
      description: "seniorCitizenDescription",
      number: "04",
    },
  ];

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setRecommendationError("");

        const response = await API.get("/schemes/recommended");

        setRecommendedSchemes(response.data.schemes || []);
      } catch (error) {
        console.error("RECOMMENDATION ERROR:", error);

        setRecommendationError(
          error.response?.data?.message || t("failedToLoadRecommendations"),
        );
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [t]);

  return (
    <main className="dashboard-container">
      {/* Welcome Hero */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="dashboard-label">
            <span className="dashboard-label-dot" />
            BHARATASSIST AI · YOUR PERSONAL SPACE
          </div>

          <h1>
            {t("welcome")} <span aria-hidden="true">👋</span>
          </h1>

          <p className="dashboard-subtitle">{t("dashboardDescription")}</p>

          <p className="dashboard-info">{t("dashboardInfo")}</p>

          <Link to="/schemes" className="dashboard-primary-button">
            {t("governmentSchemes")}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="dashboard-hero-visual" aria-hidden="true">
          <div className="dashboard-visual-ring dashboard-visual-ring-one" />
          <div className="dashboard-visual-ring dashboard-visual-ring-two" />

          <div className="dashboard-visual-card">
            <div className="dashboard-visual-flag">🇮🇳</div>
            <span>BHARATASSIST AI</span>
            <h2>Discover. Explore. Benefit.</h2>
            <p>Government schemes and useful updates, all in one place.</p>

            <div className="dashboard-visual-items">
              <span>📋 Schemes</span>
              <span>🎯 Recommendations</span>
              <span>📰 Updates</span>
            </div>
          </div>

          <div className="dashboard-visual-star">✦</div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-eyebrow">
              PERSONALIZED FOR YOU
            </span>
            <h2>
              <span className="dashboard-heading-icon">✦</span>
              {t("recommended")}
            </h2>
            <p>Explore schemes recommended for your needs.</p>
          </div>

          <Link to="/schemes" className="dashboard-text-link">
            {t("governmentSchemes")} →
          </Link>
        </div>

        {loadingRecommendations && (
          <div className="dashboard-status-card">
            <span className="dashboard-loader" />
            <p>{t("loadingRecommendations")}</p>
          </div>
        )}

        {!loadingRecommendations && recommendationError && (
          <div className="dashboard-status-card dashboard-error-card">
            <span aria-hidden="true">!</span>
            <p>{recommendationError}</p>
          </div>
        )}

        {!loadingRecommendations &&
          !recommendationError &&
          recommendedSchemes.length === 0 && (
            <div className="dashboard-status-card">
              <span className="dashboard-empty-icon">📋</span>
              <p>{t("noRecommendations")}</p>
              <Link to="/schemes" className="dashboard-text-link">
                {t("governmentSchemes")} →
              </Link>
            </div>
          )}

        {!loadingRecommendations &&
          !recommendationError &&
          recommendedSchemes.length > 0 && (
            <div className="dashboard-recommendation-grid">
              {recommendedSchemes.map((scheme) => (
                <article className="dashboard-scheme-card" key={scheme._id}>
                  <div className="dashboard-scheme-card-top">
                    <span className="dashboard-scheme-icon">📄</span>
                    <span className="dashboard-category-badge">
                      {scheme.category}
                    </span>
                  </div>

                  <h3>{scheme.name}</h3>

                  <p className="dashboard-scheme-description">
                    {scheme.description}
                  </p>

                  <div className="dashboard-scheme-location">
                    <span aria-hidden="true">📍</span>
                    <span>
                      <strong>{t("state")}:</strong> {scheme.state}
                    </span>
                  </div>

                  <Link
                    to={`/schemes/${scheme._id}`}
                    className="dashboard-scheme-link"
                  >
                    {t("viewDetails")}
                    <span aria-hidden="true"> →</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
      </section>

      {/* Explore Categories */}
      <section className="dashboard-section dashboard-categories-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-eyebrow">
              SUPPORT FOR EVERYONE
            </span>
            <h2>{t("howCanWeHelp")}</h2>
            <p>Explore information and opportunities relevant to your needs.</p>
          </div>
        </div>

        <div className="dashboard-category-grid">
          {categories.map((category) => (
            <article className="dashboard-category-card" key={category.key}>
              <div className="dashboard-category-card-top">
                <span className="dashboard-category-icon">{category.icon}</span>
                <span className="dashboard-category-number">
                  {category.number}
                </span>
              </div>

              <h3>{t(category.key)}</h3>

              <p>{t(category.description)}</p>

              <Link to="/schemes" className="dashboard-category-link">
                {t("explore")}
                <span aria-hidden="true"> ↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="dashboard-quick-access">
        <div className="dashboard-quick-access-icon">👤</div>

        <div className="dashboard-quick-access-content">
          <span className="dashboard-section-eyebrow">QUICK ACCESS</span>
          <h2>{t("quickAccess")}</h2>
          <p>Manage your profile and keep your information up to date.</p>
        </div>

        <Link to="/profile" className="dashboard-primary-button">
          {t("myProfile")}
          <span aria-hidden="true"> →</span>
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;
