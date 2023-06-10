import React from "react";
import DrawerLayout from "../../layout/DrawerLayout";
import { useEffect } from "react";
import { DashboardOutlined } from "@mui/icons-material";
const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
  ];
  return (
    <DrawerLayout menuItems={menuItems}>
      <h1>
        heheasdfjkasfhdjkashfkjashfdjkasdhfjkasfhasjkfhasjkfhaskjfhaskjfdh
        jadsasdadfhjfhas
      </h1>
    </DrawerLayout>
  );
};

export default Dashboard;
