import React from "react";
import DrawerLayout from "../../../layout/DrawerLayout";
import { useEffect, useState } from "react";
import {
  HomeRounded,
  Groups3Rounded,
  DescriptionRounded,
  AddToPhotos,
} from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import ClubInfo from "../../../components/ui/clubInfo/ClubInfo";
import MyAxios from "../../../api/MyAxios";
import { Paper, Box, Button, Typography, Grid } from "@mui/material";
import LoadingBox from "../../../components/ui/LoadingBox";
import useEditInfo from "../../../hooks/useEditInfo";

const menuItems = [
  { text: "Trang chủ", icon: <HomeRounded />, path: "/manager/home" },
  {
    text: "Quản lý đội bóng",
    icon: <Groups3Rounded />,
    path: "/manager/manage",
  },
  { text: "Đăng ký giải đấu", icon: <AddToPhotos />, path: "/dashboard" },
  {
    text: "Danh sách hồ sơ đăng ký",
    icon: <DescriptionRounded />,
    path: "/dashboard",
  },
];
const Dashboard = ({ children }) => {
  return (
    <DrawerLayout menuItems={menuItems}>
      <Paper
        elevation={3}
        sx={{ margin: "2rem 1rem 0 1rem", height: "100%", maxHeight: "85vh" }}
      >
        {isLoading && <LoadingBox></LoadingBox>}
        {!isLoading && notify.message && (
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="h6" color={notify.type}>
              {notify.message}
            </Typography>
          </Box>
        )}
        {!isLoading && !notify.message && (
          <Box
            sx={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1rem",
            }}
          ></Box>
        )}
      </Paper>
    </DrawerLayout>
  );
};

export default Dashboard;
