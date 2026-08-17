import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./pages/SchemeDetails";
import Updates from "./pages/Updates";
import UpdateDetails from "./pages/UpdateDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <Schemes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schemes/:id"
          element={
            <ProtectedRoute>
              <SchemeDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/updates" element={<Updates />} />
        <Route path="/updates/:id" element={<UpdateDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
