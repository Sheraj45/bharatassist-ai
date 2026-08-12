import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Schemes() {
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
        setMessage(error.response?.data?.message || "Failed to load schemes");
      } finally {
        setLoading(false);
      }
    };

    getSchemes();
  }, []);

  if (loading) {
    return <p>Loading schemes...</p>;
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
      <h1>Government Schemes</h1>
      <input
        type="text"
        placeholder="Search government schemes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="student">Students</option>
        <option value="farmer">Farmers</option>
        <option value="job_seeker">Job Seekers</option>
        <option value="senior_citizen">Senior Citizens</option>
        <option value="general">General</option>
      </select>

      {filteredSchemes.length === 0 ? (
        <p>No schemes available.</p>
      ) : (
        filteredSchemes.map((scheme) => (
          <div key={scheme._id}>
            <h2>{scheme.name}</h2>

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

            <p>
              <strong>State:</strong> {scheme.state}
            </p>
            <Link to={`/schemes/${scheme._id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Schemes;
