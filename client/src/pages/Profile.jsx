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
    return (
      <div className="page-container">
        <div className="status-card error-card">
          <p>{message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="status-card">
          <p>{t("loadingProfile")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <section className="page-header">
        <p className="section-label">BharatAssist AI</p>

        <h1>{t("myProfile")}</h1>

        <p>View your BharatAssist AI account information.</p>
      </section>

      <div className="profile-card">
        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2>{user.name}</h2>

        <p className="profile-role">{user.role}</p>

        <div className="profile-info">
          <div className="profile-info-item">
            <span>👤</span>

            <div>
              <strong>{t("name")}</strong>
              <p>{user.name}</p>
            </div>
          </div>

          <div className="profile-info-item">
            <span>📧</span>

            <div>
              <strong>{t("email")}</strong>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-info-item">
            <span>🔐</span>

            <div>
              <strong>{t("role")}</strong>
              <p>{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
