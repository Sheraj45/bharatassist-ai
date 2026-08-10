import { useEffect, useState } from "react";
import API from "../api/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load profile");
      }
    };

    getProfile();
  }, []);

  if (message) {
    return <p>{message}</p>;
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;
