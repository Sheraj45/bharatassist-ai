import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Updates() {
  const { t } = useTranslation();

  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await API.get("/updates");
        setUpdates(response.data.updates || []);
      } catch (error) {
        console.error("Failed to load updates:", error);

        setError(error.response?.data?.message || t("failedToLoadUpdates"));
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [t]);

  if (loading) {
    return <p>{t("loadingUpdates")}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>{t("governmentUpdates")} 📰</h1>

      <p>{t("updatesDescription")}</p>

      {updates.length === 0 ? (
        <p>{t("noUpdates")}</p>
      ) : (
        <div>
          {updates.map((update) => (
            <div key={update._id}>
              <h2>{update.title}</h2>

              <p>{update.description}</p>

              <p>
                <strong>{t("category")}:</strong> {update.category}
              </p>

              <p>
                <strong>{t("source")}:</strong> {update.source}
              </p>

              <Link to={`/updates/${update._id}`}>{t("readMore")}</Link>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Updates;
