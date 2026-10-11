import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function UpdateDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        setMessage("");

        const response = await API.get(`/updates/${id}`);

        setUpdate(response.data.update);
      } catch (error) {
        console.error("Failed to load update:", error);

        setMessage(error.response?.data?.message || t("failedToLoadUpdate"));
      } finally {
        setLoading(false);
      }
    };

    fetchUpdate();
  }, [id, t]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("loadingUpdate")}</p>
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

  if (!update) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("updateNotFound")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Back */}
      <Link to="/updates" className="back-link">
        ← {t("backToUpdates")}
      </Link>

      {/* Main Card */}
      <article className="update-details-card">
        {/* Header */}
        <div className="update-details-header">
          <div>
            <span className="category-badge">{update.category}</span>

            <h1>{update.title}</h1>
          </div>

          <span className="update-date">
            {new Date(update.publishedDate).toLocaleDateString()}
          </span>
        </div>

        <hr />

        {/* Description */}
        <div className="update-details-content">
          <p>{update.description}</p>
        </div>

        {/* Information */}
        <div className="update-info-grid">
          <div className="detail-box">
            <h3>🏛️ {t("source")}</h3>

            <p>{update.source}</p>
          </div>

          <div className="detail-box">
            <h3>📅 {t("published")}</h3>

            <p>{new Date(update.publishedDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Official Website */}
        {/* Official Website */}
        <div className="apply-section">
          <div>
            <h2>{t("visitOfficialWebsite")}</h2>

            <p>Visit the official website for complete information.</p>
          </div>

          {update.officialWebsite &&
            (() => {
              try {
                const url = new URL(update.officialWebsite);

                if (!["https:", "http:"].includes(url.protocol)) {
                  return null;
                }

                return (
                  <a
                    href={url.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-button"
                  >
                    {t("visitOfficialWebsite")} 🌐
                  </a>
                );
              } catch {
                return null;
              }
            })()}
        </div>
      </article>
    </div>
  );
}

export default UpdateDetails;
