import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    categories: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        const response = await api.get("/schemes");
        const schemes = response.data.schemes || {};

        const categories = {};

        if (Array.isArray(schemes)) {
          schemes.forEach((scheme) => {
            categories[scheme.category] =
              (categories[scheme.category] || 0) + 1;
          });

          setStats({
            total: schemes.length,
            categories,
          });
        } else {
          setError("Unexpected scheme data received from the server.");
        }
      } catch {
        setError("Unable to load scheme statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadSchemes();
  }, []);

  const categoryNames = {
    student: "Students",
    farmer: "Farmers",
    job_seeker: "Job Seekers",
    senior_citizen: "Senior Citizens",
    general: "General",
  };

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Manage BharatAssist AI's government information.</p>
        </div>

        <Link to="/schemes" className="primary-button button-link">
          + Add a Scheme
        </Link>
      </header>

      {error && <div className="error-message">{error}</div>}

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total Government Schemes</span>
          <strong>{loading ? "—" : stats.total}</strong>
          <p>Available in the database</p>
        </article>

        <article className="stat-card">
          <span>Scheme Categories</span>
          <strong>{Object.keys(stats.categories).length}</strong>
          <p>Categories containing schemes</p>
        </article>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h2>Scheme categories</h2>
            <p>View the current distribution of schemes.</p>
          </div>
        </div>

        {loading ? (
          <p>Loading scheme data...</p>
        ) : (
          <div className="category-list">
            {Object.entries(categoryNames).map(([key, label]) => (
              <div className="category-row" key={key}>
                <span>{label}</span>
                <strong>{stats.categories[key] || 0}</strong>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="content-card">
        <h2>Quick actions</h2>

        <div className="quick-actions">
          <Link to="/schemes" className="action-card">
            <span className="action-icon">▤</span>
            <strong>Manage Schemes</strong>
            <span>View, add, edit, or remove schemes.</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
