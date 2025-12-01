// src/routes/DashboardRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";

import UserRoutes from "./pagesRoutes/UserRoutes";
import TrainerRoutes from "./pagesRoutes/TrainerRoutes";
import AdminRoutes from "./pagesRoutes/AdminRoutes";

const DashboardRoutes = ({ isAuthenticated, role }) => {
  return (
    <>
      {/* USER DASHBOARD */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} role={role} allowedRoles={["user"]}>
            <DashboardLayout role={role} />
          </ProtectedRoute>
        }
      >
        {UserRoutes()}
      </Route>

      {/* TRAINER DASHBOARD */}
      <Route
        path="/trainer/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} role={role} allowedRoles={["trainer"]}>
            <DashboardLayout role={role} />
          </ProtectedRoute>
        }
      >
        {TrainerRoutes()}
      </Route>

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} role={role} allowedRoles={["admin"]}>
            <DashboardLayout role={role} />
          </ProtectedRoute>
        }
      >
        {AdminRoutes()}
      </Route>
    </>
  );
};

export default DashboardRoutes;
