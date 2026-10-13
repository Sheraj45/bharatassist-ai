import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/login", { replace: true });
  };

  const admin = JSON.parse(sessionStorage.getItem("adminUser") || "{}");

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small">BA</div>
          <div>
            <strong>BharatAssist</strong>
            <span>Admin Portal</span>
          </div>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">Overview</NavLink>
          <NavLink to="/schemes">Government Schemes</NavLink>
          <NavLink to="/updates">Government Updates</NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-identity">
            <div className="avatar">
              {(admin.name || "A").charAt(0).toUpperCase()}
            </div>

            <div className="admin-identity-text">
              <strong>{admin.name || "Administrator"}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="topbar">
          <span>Administration</span>
          <span className="status-badge">Private workspace</span>
        </div>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
