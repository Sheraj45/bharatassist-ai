import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../api/api";

function Profile() {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get("/users/profile");

        setUser(response.data.user);
      } catch (error) {
        setMessage(error.response?.data?.message || t("failedToLoadProfile"));
      }
    };

    getProfile();
  }, [t]);

  if (message) {
    return <p>{message}</p>;
  }

  if (!user) {
    return <p>{t("loadingProfile")}</p>;
  }

  return (
    <div>
      <h1>{t("myProfile")}</h1>

      <p>
        <strong>{t("name")}:</strong> {user.name}
      </p>

      <p>
        <strong>{t("email")}:</strong> {user.email}
      </p>

      <p>
        <strong>{t("role")}:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;
