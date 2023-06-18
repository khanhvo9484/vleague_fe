import React from "react";
import DrawerLayout from "../../../layout/DrawerLayout";
import { useEffect } from "react";
import {
  DashboardOutlined,
  HomeOutlined,
  EditOutlined,
  AppRegistration,
  Checklist,
} from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
const Dashboard = () => {
  const authContext = useAuth();
  useEffect(() => {
    document.title = "Dashboard";
  });
  const menuItems = [
    { text: "Trang chủ", icon: <HomeOutlined />, path: "/dashboard" },
    { text: "Quản lý đội bóng", icon: <EditOutlined />, path: "/manage" },
    { text: "Đăng ký giải đấu", icon: <AppRegistration />, path: "/dashboard" },
    {
      text: "Danh sách hồ sơ đăng ký",
      icon: <Checklist />,
      path: "/dashboard",
    },
  ];
  return (
    <DrawerLayout menuItems={menuItems}>
      <h1>ID của đội bóng là: {authContext?.auth?.teamId}</h1>
    </DrawerLayout>
  );
};

export default Dashboard;
