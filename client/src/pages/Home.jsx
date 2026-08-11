import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>BharatAssist AI</h1>

      <p>
        Your intelligent assistant for discovering government schemes,
        opportunities and information.
      </p>

      <Link to="/login">Login</Link>

      {" | "}

      <Link to="/signup">Create Account</Link>
    </div>
  );
}

export default Home;
