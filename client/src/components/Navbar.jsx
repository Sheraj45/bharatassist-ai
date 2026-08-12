import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">BharatAssist AI</Link>

      <div>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/schemes">Schemes</Link>
            {" | "}
            <Link to="/dashboard">Dashboard</Link>
            {" | "}
            <Link to="/profile">Profile</Link>
            {" | "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
