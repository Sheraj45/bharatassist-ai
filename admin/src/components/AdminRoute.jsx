import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";

export default function AdminRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    const verifyAdmin = async () => {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        if (active) setStatus("unauthenticated");
        return;
      }

      try {
        await api.get("/admin/me");

        if (active) setStatus("authenticated");
      } catch {
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminUser");

        if (active) setStatus("unauthenticated");
      }
    };

    verifyAdmin();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <div className="loading-screen">Verifying administrator...</div>;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
