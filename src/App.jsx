import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardRoutes from "./routes/DashboardRoutes";
import LoginWithToken from "./pages/Dashboard/LoginWithToken";
import { useSelector } from "react-redux";
import AdminLoginPage from "./pages/Dashboard/Admins/AdminLoginPage";

function App() {
  const { user, token } = useSelector((state) => state.auth);

  let role = user?.role;
  if (role === "Student") role = "user";
  if (role === "Trainer") role = "trainer";
  if (role === "Admin") role = "admin";

  const isAuthenticated = Boolean(token);

  return (
    <Routes>

      {/* <Route path="/" element={<Navigate to="/auth/login-with-token" replace />} /> */}

      <Route path="/" element={<AdminLoginPage/>} />

      <Route path="/auth/login-with-token" element={<LoginWithToken />} />

     { DashboardRoutes({ isAuthenticated, role }) }

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
