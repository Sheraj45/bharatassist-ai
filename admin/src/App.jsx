import { Navigate, Route, Routes } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ManageSchemes from "./pages/ManageSchemes";
import ManageUpdates from "./pages/ManageUpdates";

import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<AdminLogin />} />

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schemes" element={<ManageSchemes />} />
          <Route path="/updates" element={<ManageUpdates />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
