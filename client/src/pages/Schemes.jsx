import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Schemes() {
  const { t } = useTranslation();

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const getSchemes = async () => {
      try {
        const response = await API.get("/schemes");

        setSchemes(response.data.schemes || []);
      } catch (error) {
        setMessage(error.response?.data?.message || t("failedToLoadSchemes"));
      } finally {
        setLoading(false);
      }
    };

    getSchemes();
  }, [t]);

  const filteredSchemes = schemes.filter((scheme) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      scheme.name.toLowerCase().includes(searchText) ||
      scheme.description.toLowerCase().includes(searchText);

    const matchesCategory = category === "all" || scheme.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("loadingSchemes")}</p>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="page-container">
        <div className="status-card error-card">
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <section className="page-header">
        <p className="section-label">BharatAssist AI</p>

        <h1>{t("governmentSchemes")}</h1>

        <p>{t("dashboardInfo")}</p>
      </section>

      {/* Search and Filter */}
      <section className="scheme-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔎</span>

          <input
            type="text"
            placeholder={t("searchSchemes")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">{t("allCategories")}</option>

          <option value="student">{t("students")}</option>

          <option value="farmer">{t("farmers")}</option>

          <option value="job_seeker">{t("jobSeekers")}</option>

          <option value="senior_citizen">{t("seniorCitizens")}</option>

          <option value="general">{t("general")}</option>
        </select>
      </section>

      {/* Result count */}
      <div className="scheme-results-header">
        <p>
          {filteredSchemes.length}{" "}
          {filteredSchemes.length === 1 ? "scheme" : "schemes"}
        </p>
      </div>

      {/* Schemes */}
      {filteredSchemes.length === 0 ? (
        <div className="status-card">
          <p>{t("noSchemes")}</p>
        </div>
      ) : (
        <div className="schemes-grid">
          {filteredSchemes.map((scheme) => (
            <div className="scheme-list-card" key={scheme._id}>
              <div className="scheme-list-header">
                <span className="category-badge">{scheme.category}</span>

                <span className="state-badge">🇮🇳 {scheme.state}</span>
              </div>

              <h2>{scheme.name}</h2>

              <p className="scheme-list-description">{scheme.description}</p>

              <div className="scheme-preview-info">
                <div>
                  <strong>{t("eligibility")}</strong>

                  <p>{scheme.eligibility}</p>
                </div>

                <div>
                  <strong>{t("benefits")}</strong>

                  <p>{scheme.benefits}</p>
                </div>
              </div>

              <Link
                to={`/schemes/${scheme._id}`}
                className="primary-button scheme-details-button"
              >
                {t("viewDetails")} →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Schemes;
