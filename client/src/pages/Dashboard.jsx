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
    },
    {
      key: "Farmers",
      icon: "🌾",
      description: "farmerDescription",
    },
    {
      key: "Job Seekers",
      icon: "💼",
      description: "jobSeekerDescription",
    },
    {
      key: "Senior Citizens",
      icon: "👴",
      description: "seniorCitizenDescription",
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
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-label">BharatAssist AI</p>

          <h1>{t("welcome")} 👋</h1>

          <p className="dashboard-subtitle">{t("dashboardDescription")}</p>

          <p className="dashboard-info">{t("dashboardInfo")}</p>

          <Link to="/schemes" className="primary-button">
            {t("governmentSchemes")}
          </Link>
        </div>
      </section>

      {/* Recommendations */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <p className="section-label">AI</p>
            <h2>{t("recommended")} 🎯</h2>
          </div>
        </div>

        {loadingRecommendations && (
          <div className="status-card">
            <p>{t("loadingRecommendations")}</p>
          </div>
        )}

        {!loadingRecommendations && recommendationError && (
          <div className="status-card error-card">
            <p>{recommendationError}</p>
          </div>
        )}

        {!loadingRecommendations &&
          !recommendationError &&
          recommendedSchemes.length === 0 && (
            <div className="status-card">
              <p>{t("noRecommendations")}</p>
            </div>
          )}

        {!loadingRecommendations &&
          !recommendationError &&
          recommendedSchemes.length > 0 && (
            <div className="recommendation-grid">
              {recommendedSchemes.map((scheme) => (
                <div
                  className="scheme-card recommendation-card"
                  key={scheme._id}
                >
                  <div className="scheme-card-top">
                    <span className="category-badge">{scheme.category}</span>
                  </div>

                  <h3>{scheme.name}</h3>

                  <p className="scheme-description">{scheme.description}</p>

                  <div className="scheme-info">
                    <p>
                      <strong>{t("eligibility")}:</strong>
                      <br />
                      {scheme.eligibility}
                    </p>

                    <p>
                      <strong>{t("benefits")}:</strong>
                      <br />
                      {scheme.benefits}
                    </p>
                  </div>

                  <Link
                    to={`/schemes/${scheme._id}`}
                    className="secondary-button"
                  >
                    {t("viewDetails")} →
                  </Link>
                </div>
              ))}
            </div>
          )}
      </section>

      {/* Categories */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <p className="section-label">Explore</p>
            <h2>{t("howCanWeHelp")}</h2>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category.key}>
              <div className="category-icon">{category.icon}</div>

              <h3>{t(category.key)}</h3>

              <p>{t(category.description)}</p>

              <Link to="/schemes" className="category-button">
                {t("explore")} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="quick-access-section">
        <div>
          <p className="section-label">Quick Access</p>

          <h2>{t("quickAccess")}</h2>

          <p>Access your account information quickly.</p>
        </div>

        <Link to="/profile" className="primary-button">
          {t("myProfile")} →
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;
