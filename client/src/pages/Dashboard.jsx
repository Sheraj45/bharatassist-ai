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
      key: "students",
      icon: "🎓",
      descriptionKey: "studentsDescription",
    },
    {
      key: "farmers",
      icon: "🌾",
      descriptionKey: "farmersDescription",
    },
    {
      key: "jobSeekers",
      icon: "💼",
      descriptionKey: "jobSeekersDescription",
    },
    {
      key: "seniorCitizens",
      icon: "👴",
      descriptionKey: "seniorCitizensDescription",
    },
  ];

  // Fetch recommended schemes
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setRecommendationError("");

        const response = await API.get("/schemes/recommended");

        console.log("Recommendation response:", response.data);

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
    <div>
      {/* ==================== WELCOME ==================== */}

      <h1>{t("welcome")} 👋</h1>

      <p>{t("dashboardSubtitle")}</p>

      <p>{t("dashboardDescription")}</p>

      <hr />

      {/* ==================== RECOMMENDATIONS ==================== */}

      <h2>{t("recommended")} 🎯</h2>

      {loadingRecommendations && <p>{t("loadingRecommendations")}</p>}

      {!loadingRecommendations && recommendationError && (
        <p>{recommendationError}</p>
      )}

      {!loadingRecommendations &&
        !recommendationError &&
        recommendedSchemes.length === 0 && <p>{t("noRecommendations")}</p>}

      {!loadingRecommendations &&
        !recommendationError &&
        recommendedSchemes.length > 0 && (
          <div>
            {recommendedSchemes.map((scheme) => (
              <div key={scheme._id}>
                <h3>{scheme.name}</h3>

                <p>{scheme.description}</p>

                <p>
                  <strong>{t("category")}:</strong> {scheme.category}
                </p>

                <p>
                  <strong>{t("eligibility")}:</strong> {scheme.eligibility}
                </p>

                <p>
                  <strong>{t("benefits")}:</strong> {scheme.benefits}
                </p>

                <Link to={`/schemes/${scheme._id}`}>{t("viewDetails")}</Link>

                <hr />
              </div>
            ))}
          </div>
        )}

      <hr />

      {/* ==================== CATEGORIES ==================== */}

      <h2>{t("howCanWeHelp")}</h2>

      <div>
        {categories.map((category) => (
          <div key={category.key}>
            <h3>
              {category.icon} {t(category.key)}
            </h3>

            <p>{t(category.descriptionKey)}</p>

            <button>{t("explore")}</button>
          </div>
        ))}
      </div>

      <hr />

      {/* ==================== QUICK ACCESS ==================== */}

      <h2>{t("quickAccess")}</h2>

      <Link to="/profile">{t("myProfile")}</Link>
    </div>
  );
}

export default Dashboard;
