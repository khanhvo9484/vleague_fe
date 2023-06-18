import React from "react";
import DrawerLayout from "../../../layout/DrawerLayout";
import { useEffect } from "react";
import { DashboardOutlined } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
const Dashboard = () => {
  const authContext = useAuth();
  useEffect(() => {
    document.title = "Dashboard";
  });
  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
  ];
  return (
    <DrawerLayout menuItems={menuItems}>
      <h1>ID của đội bóng là: {authContext?.auth?.teamId}</h1>
    </DrawerLayout>
  );
};

export default Dashboard;
