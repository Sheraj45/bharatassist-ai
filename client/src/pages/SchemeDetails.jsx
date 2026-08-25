import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function SchemeDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getScheme = async () => {
      try {
        const response = await API.get(`/schemes/${id}`);

        setScheme(response.data.scheme);
      } catch (error) {
        setMessage(error.response?.data?.message || t("failedToLoadScheme"));
      } finally {
        setLoading(false);
      }
    };

    getScheme();
  }, [id, t]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("loadingScheme")}</p>
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

  if (!scheme) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("failedToLoadScheme")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Back */}
      <Link to="/schemes" className="back-link">
        ← {t("backToSchemes")}
      </Link>

      {/* Main Details Card */}
      <div className="scheme-details-card">
        {/* Header */}
        <div className="scheme-details-header">
          <div>
            <span className="category-badge">{scheme.category}</span>

            <h1>{scheme.name}</h1>

            <p className="scheme-details-description">{scheme.description}</p>
          </div>

          <div className="scheme-state">🇮🇳 {scheme.state}</div>
        </div>

        <hr />

        {/* Information */}
        <div className="scheme-details-grid">
          <div className="detail-box">
            <h3>📋 {t("eligibility")}</h3>

            <p>{scheme.eligibility}</p>
          </div>

          <div className="detail-box">
            <h3>💰 {t("benefits")}</h3>

            <p>{scheme.benefits}</p>
          </div>

          <div className="detail-box application-box">
            <h3>📝 {t("applicationProcess")}</h3>

            <p>{scheme.applicationProcess}</p>
          </div>
        </div>

        {/* Apply Section */}
        <div className="apply-section">
          <div>
            <h2>{t("applyOfficial")}</h2>

            <p>
              Visit the official government website to apply for this scheme.
            </p>
          </div>

          <a
            href={scheme.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
          >
            {t("applyOfficial")} 🌐
          </a>
        </div>
      </div>
    </div>
  );
}

export default SchemeDetails;
