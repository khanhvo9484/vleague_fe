import React from "react";
import DrawerLayout from "./DrawerLayout";
import { useEffect, useState } from "react";
import {
  HomeRounded,
  Groups3Rounded,
  DescriptionRounded,
  AddToPhotos,
} from "@mui/icons-material";
import { Paper, Box, Button, Typography, Grid } from "@mui/material";
import LoadingBox from "../components/ui/LoadingBox";
import useLoading from "../hooks/useLoading";

const menuItems = [
  { text: "Trang chủ", icon: <HomeRounded />, path: "/manager/home" },
  {
    text: "Quản lý đội bóng",
    icon: <Groups3Rounded />,
    path: "/manager/manage-club",
  },
  { text: "Đăng ký giải đấu", icon: <AddToPhotos />, path: "/dashboard" },
  {
    text: "Danh sách hồ sơ đăng ký",
    icon: <DescriptionRounded />,
    path: "/dashboard",
  },
];
const Dashboard = ({ children }) => {
  const { isLoading, setIsLoading, notify } = useLoading();
  return (
    <DrawerLayout menuItems={menuItems}>
      <Paper
        elevation={3}
        sx={{ margin: "2rem 1rem 0 1rem", height: "100%", maxHeight: "85vh" }}
      >
        {isLoading && <LoadingBox></LoadingBox>}
        {!isLoading && notify.message && (
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              opacity: "0.5",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                backgroundColor: `${notify.type}.light`,
                color: `${notify.type}.main`,
                padding: "1rem",
                borderRadius: "4px",
              }}
            >
              {notify.message}
            </Typography>
          </Box>
        )}

        {!isLoading && !notify.message && <Box>{children}</Box>}
      </Paper>
    </DrawerLayout>
  );
};

export default Dashboard;
