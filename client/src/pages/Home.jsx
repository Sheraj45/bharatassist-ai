import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("homeTitle")}</h1>

      <p>{t("homeDescription")}</p>

      <Link to="/login">{t("login")}</Link>

      {" | "}

      <Link to="/signup">{t("createAccount")}</Link>
    </div>
  );
}

export default Home;
