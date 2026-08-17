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
    return <p>{t("loadingScheme")}</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div>
      <Link to="/schemes">← {t("backToSchemes")}</Link>

      <h1>{scheme.name}</h1>

      <p>{scheme.description}</p>

      <h3>{t("category")}</h3>
      <p>{scheme.category}</p>

      <h3>{t("eligibility")}</h3>
      <p>{scheme.eligibility}</p>

      <h3>{t("benefits")}</h3>
      <p>{scheme.benefits}</p>

      <h3>{t("applicationProcess")}</h3>
      <p>{scheme.applicationProcess}</p>

      <h3>{t("state")}</h3>
      <p>{scheme.state}</p>

      <a
        href={scheme.officialWebsite}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>{t("applyOfficial")} 🌐</button>
      </a>
    </div>
  );
}

export default SchemeDetails;
