import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Updates() {
  const { t, i18n } = useTranslation();

  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);

      try {
        setMessage("");

        const currentLanguage = i18n.resolvedLanguage || i18n.language;

        const languageMap = {
          en: "en",
          hi: "hi",
          te: "te",
        };

        const language = languageMap[currentLanguage?.split("-")[0]] || "en";

        const response = await API.get("/updates", {
          params: { language },
        });

        setUpdates(response.data.updates || []);
      } catch (error) {
        console.error("Failed to load updates:", error);

        setMessage(error.response?.data?.message || t("failedToLoadUpdates"));
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [i18n.resolvedLanguage, i18n.language, t]);

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
      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">BharatAssist AI</p>

        <h1>{t("governmentUpdates")} 📰</h1>

        <p>{t("updatesDescription")}</p>
      </section>

      {/* Updates Grid */}
      {updates.length === 0 ? (
        <div className="status-card">
          <p>{t("noUpdates")}</p>
        </div>
      ) : (
        <div className="updates-grid">
          {updates.map((update) => (
            <article className="update-card" key={update._id}>
              {/* Category and Date */}
              <div className="update-card-header">
                <span className="category-badge">{update.category}</span>

                <span className="update-date">
                  {update.publishedDate &&
                  !Number.isNaN(new Date(update.publishedDate).getTime())
                    ? new Date(update.publishedDate).toLocaleDateString(
                        i18n.resolvedLanguage || i18n.language || "en",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : ""}
                </span>
              </div>

              {/* Short Title */}
              <h2 className="update-card-title">{update.title}</h2>

              {/* Short Description */}
              <p className="update-description">
                {update.description
                  ? update.description.length > 140
                    ? `${update.description.slice(0, 140).trimEnd()}...`
                    : update.description
                  : ""}
              </p>

              {/* Read More */}
              <div className="update-card-footer">
                <Link
                  to={`/updates/${update._id}`}
                  className="update-read-more"
                >
                  {t("readMore")} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Updates;
