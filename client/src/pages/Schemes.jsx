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

        setSchemes(response.data.schemes);
      } catch (error) {
        setMessage(error.response?.data?.message || t("failedToLoadSchemes"));
      } finally {
        setLoading(false);
      }
    };

    getSchemes();
  }, [t]);

  if (loading) {
    return <p>{t("loadingSchemes")}</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "all" || scheme.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>{t("governmentSchemes")}</h1>

      <input
        type="text"
        placeholder={t("searchSchemes")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">{t("allCategories")}</option>
        <option value="student">{t("students")}</option>
        <option value="farmer">{t("farmers")}</option>
        <option value="job_seeker">{t("jobSeekers")}</option>
        <option value="senior_citizen">{t("seniorCitizens")}</option>
        <option value="general">{t("general")}</option>
      </select>

      {filteredSchemes.length === 0 ? (
        <p>{t("noSchemes")}</p>
      ) : (
        filteredSchemes.map((scheme) => (
          <div key={scheme._id}>
            <h2>{scheme.name}</h2>

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

            <p>
              <strong>{t("state")}:</strong> {scheme.state}
            </p>

            <Link to={`/schemes/${scheme._id}`}>{t("viewDetails")}</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Schemes;
