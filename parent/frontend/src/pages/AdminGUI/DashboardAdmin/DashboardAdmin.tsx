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
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />  
      <DashboardAdminGeral />
    </>
  );
};

export default DashboardAdmin;
