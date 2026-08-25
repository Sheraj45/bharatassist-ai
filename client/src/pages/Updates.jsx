import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Updates() {
  const { t } = useTranslation();

  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setMessage("");

        const response = await API.get("/updates");

        setUpdates(response.data.updates || []);
      } catch (error) {
        console.error("Failed to load updates:", error);

        setMessage(error.response?.data?.message || t("failedToLoadUpdates"));
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [t]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("loadingUpdates")}</p>
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

        <h1>{t("governmentUpdates")} 📰</h1>

        <p>{t("updatesDescription")}</p>
      </section>

      {/* Updates */}
      {updates.length === 0 ? (
        <div className="status-card">
          <p>{t("noUpdates")}</p>
        </div>
      ) : (
        <div className="updates-grid">
          {updates.map((update) => (
            <div className="update-card" key={update._id}>
              {/* Card Header */}
              <div className="update-card-header">
                <span className="category-badge">{update.category}</span>

                <span className="update-date">
                  {new Date(update.publishedDate).toLocaleDateString()}
                </span>
              </div>

              {/* Title */}
              <h2>{update.title}</h2>

              {/* Description */}
              <p className="update-description">{update.description}</p>

              {/* Source */}
              <p className="update-source">
                <strong>{t("source")}:</strong> {update.source}
              </p>

              {/* Button */}
              <Link to={`/updates/${update._id}`} className="primary-button">
                {t("readMore")} →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Updates;
