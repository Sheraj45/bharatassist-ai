import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Dashboard() {
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const categories = [
    {
      title: "Students",
      icon: "🎓",
      description:
        "Find scholarships, education schemes and student opportunities.",
    },
    {
      title: "Farmers",
      icon: "🌾",
      description:
        "Discover farming schemes, subsidies and government support.",
    },
    {
      title: "Job Seekers",
      icon: "💼",
      description:
        "Find government jobs, exams, internships and career opportunities.",
    },
    {
      title: "Senior Citizens",
      icon: "👴",
      description:
        "Find pension schemes, benefits and services for senior citizens.",
    },
  ];

  // Fetch recommended schemes
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await API.get("/schemes/recommended");

        console.log("Recommendation response:", response.data);

        setRecommendedSchemes(response.data.schemes || []);
      } catch (error) {
        console.error("RECOMMENDATION ERROR:", error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h1>Welcome to BharatAssist AI 👋</h1>

      <p>Your one-stop assistant for government information.</p>

      <p>
        Find government schemes, opportunities and important information in one
        place.
      </p>

      <hr />

      {/* Recommended Schemes */}
      <h2>Recommended for You 🎯</h2>

      {loadingRecommendations && <p>Loading recommendations...</p>}
      {!loadingRecommendations && recommendedSchemes.length === 0 && (
        <p>No recommended schemes available.</p>
      )}
      {!loadingRecommendations && recommendedSchemes.length > 0 && (
        <div>
          {recommendedSchemes.map((scheme) => (
            <div key={scheme._id}>
              <h3>{scheme.name}</h3>

              <p>{scheme.description}</p>

              <p>
                <strong>Category:</strong> {scheme.category}
              </p>

              <p>
                <strong>Eligibility:</strong> {scheme.eligibility}
              </p>

              <p>
                <strong>Benefits:</strong> {scheme.benefits}
              </p>

              <Link to={`/schemes/${scheme._id}`}>View Details</Link>

              <hr />
            </div>
          ))}
        </div>
      )}
      <hr />

      {/* CATEGORIES */}

      <h2>How can we help you?</h2>

      <div>
        {categories.map((category) => (
          <div key={category.title}>
            <h3>
              {category.icon} {category.title}
            </h3>

            <p>{category.description}</p>

            <button>Explore</button>
          </div>
        ))}
      </div>

      <hr />

      <h2>Quick Access</h2>

      <Link to="/profile">My Profile</Link>
    </div>
  );
}

export default Dashboard;
