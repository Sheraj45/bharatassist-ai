import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function UpdateDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const response = await API.get(`/updates/${id}`);

        setUpdate(response.data.update);
      } catch (error) {
        console.error("Failed to load update:", error);

        setError(error.response?.data?.message || t("failedToLoadUpdate"));
      } finally {
        setLoading(false);
      }
    };

    fetchUpdate();
  }, [id, t]);

  if (loading) {
    return <p>{t("loadingUpdate")}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!update) {
    return <p>{t("updateNotFound")}</p>;
  }

  return (
    <div>
      <h1>{update.title}</h1>

      <p>{update.description}</p>

      <p>
        <strong>{t("category")}:</strong> {update.category}
      </p>

      <p>
        <strong>{t("source")}:</strong> {update.source}
      </p>

      <p>
        <strong>{t("published")}:</strong>{" "}
        {new Date(update.publishedDate).toLocaleDateString()}
      </p>

      <br />

      <a
        href={update.officialWebsite}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>{t("visitOfficialWebsite")} 🌐</button>
      </a>

      <br />
      <br />

      <Link to="/updates">← {t("backToUpdates")}</Link>
    </div>
  );
}

export default UpdateDetails;
