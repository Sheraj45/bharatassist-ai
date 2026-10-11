import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "📋",
      number: "01",
      title: t("governmentSchemes"),
      description:
        "Explore government schemes and discover benefits that may be available to you.",
      label: "SCHEMES & BENEFITS",
    },
    {
      icon: "🎯",
      number: "02",
      title: t("recommended"),
      description:
        "Find personalized scheme recommendations based on your profile and needs.",
      label: "PERSONALIZED DISCOVERY",
    },
    {
      icon: "📰",
      number: "03",
      title: t("governmentUpdates"),
      description:
        "Stay informed about government announcements, new initiatives, and opportunities.",
      label: "LATEST UPDATES",
    },
  ];

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            🇮🇳 BharatAssist AI
          </div>

          <h1>{t("homeTitle")}</h1>

          <p className="home-hero-description">{t("homeDescription")}</p>

          <div className="hero-actions">
            <Link to="/signup" className="primary-button">
              {t("createAccount")}
              <span aria-hidden="true"> →</span>
            </Link>

            <Link to="/login" className="secondary-button">
              {t("login")}
            </Link>
          </div>

          <div className="hero-trust-note">
            <span aria-hidden="true">✓</span>
            Discover information relevant to your needs
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <div className="hero-center-card">
            <div className="hero-emblem">🇮🇳</div>
            <span className="hero-center-label">BHARATASSIST AI</span>
            <h2>Support for every citizen.</h2>
            <p>Schemes, recommendations, and updates in one place.</p>

            <div className="hero-mini-stats">
              <div>
                <span className="hero-mini-icon">📋</span>
                <span>Schemes</span>
              </div>
              <div>
                <span className="hero-mini-icon">🎯</span>
                <span>Guidance</span>
              </div>
              <div>
                <span className="hero-mini-icon">📰</span>
                <span>Updates</span>
              </div>
            </div>
          </div>

          <div className="hero-floating-mark hero-floating-mark-top">✓</div>
          <div className="hero-floating-mark hero-floating-mark-bottom">✦</div>
        </div>
      </section>

      <section className="home-features-section">
        <div className="home-section-heading">
          <span className="home-section-eyebrow">WHAT YOU CAN DO</span>
          <h2>Government support, made easier.</h2>
          <p>
            Find useful information and explore opportunities designed to
            support you.
          </p>
        </div>

        <div className="home-features">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-card-top">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-number">{feature.number}</span>
              </div>

              <span className="feature-label">{feature.label}</span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <div className="feature-card-bottom">
                <span className="feature-bottom-line" />
                <span className="feature-bottom-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-bottom-cta">
        <div>
          <span className="home-section-eyebrow">GET STARTED</span>
          <h2>Take the first step towards finding the right support.</h2>
          <p>
            Create an account to explore recommendations tailored to your needs.
          </p>
        </div>

        <Link to="/signup" className="primary-button">
          {t("createAccount")} <span aria-hidden="true"> →</span>
        </Link>
      </section>
    </main>
  );
}

export default Home;
