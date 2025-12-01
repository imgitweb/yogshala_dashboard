// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

const DashboardLayout = ({ role = "trainer" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen bg-offwhite overflow-hidden">
      <Sidebar
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          role={role}
          onMenuClick={toggleSidebar}
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-offwhite py-5 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
