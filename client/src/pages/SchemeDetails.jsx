import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/api";

function SchemeDetails() {
  const { id } = useParams();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getScheme = async () => {
      try {
        const response = await API.get(`/schemes/${id}`);

        setScheme(response.data.scheme);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load scheme");
      } finally {
        setLoading(false);
      }
    };

    getScheme();
  }, [id]);

  if (loading) {
    return <p>Loading scheme...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div>
      <Link to="/schemes">← Back to Schemes</Link>

      <h1>{scheme.name}</h1>

      <p>{scheme.description}</p>

      <h3>Category</h3>
      <p>{scheme.category}</p>

      <h3>Eligibility</h3>
      <p>{scheme.eligibility}</p>

      <h3>Benefits</h3>
      <p>{scheme.benefits}</p>

      <h3>Application Process</h3>
      <p>{scheme.applicationProcess}</p>

      <h3>State</h3>
      <p>{scheme.state}</p>

      <a
        href={scheme.officialWebsite}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Official Website
      </a>
    </div>
  );
}

export default SchemeDetails;
