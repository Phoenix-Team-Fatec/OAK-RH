import React, { useState } from "react";
import "./DashboardAdmin.css";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import AdminNavbar from "../../../components/navabarAdmin/AdminNavbar";
import DashboardAdminGeral from "../../../components/DashAdmin/DashAdmin";

const DashboardAdmin: React.FC = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

 

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-side">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div className="dashboard-content">
      <DashboardAdminGeral />
      </div>
    </>
  );
};

export default DashboardAdmin;
