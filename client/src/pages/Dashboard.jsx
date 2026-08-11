import { Link } from "react-router-dom";

function Dashboard() {
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

  return (
    <div>
      <h1>Welcome to BharatAssist AI 👋</h1>

      <p>Your one-stop assistant for government information.</p>
      <p>
        Find government schemes, opportunities and important information in one
        place.
      </p>

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
