import React from "react";
import DrawerLayout from "./DrawerLayout";
import { useEffect, useState } from "react";
import {
  HomeRounded,
  Groups3Rounded,
  DescriptionRounded,
  AddToPhotos,
  BarChart,
} from "@mui/icons-material";
import { Paper, Box, Button, Typography, Grid } from "@mui/material";
import LoadingBox from "../components/ui/LoadingBox";

const menuItems = [
  { text: "Trang chủ", icon: <HomeRounded />, path: "/manager/home" },
  {
    text: "Quản lý đội bóng",
    icon: <Groups3Rounded />,
    path: "/manager/manage-club",
  },
  {
    text: "Đăng ký giải đấu",
    icon: <AddToPhotos />,
    path: "/manager/register-league",
  },
  {
    text: "Danh sách hồ sơ đăng ký",
    icon: <DescriptionRounded />,
    path: "/dashboard",
  },
  {
    text: "Bảng xếp hạng",
    icon: <BarChart />,
    path: "/dashboard",
  },
];
const Dashboard = ({ children, isLoading, notify, title }) => {
  return (
    <DrawerLayout menuItems={menuItems}>
      <Paper elevation={0} sx={{ margin: "1rem 1rem 0 1rem", height: "100%" }}>
        {isLoading && <LoadingBox></LoadingBox>}
        {!isLoading && notify?.message && (
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

        {!isLoading && !notify?.message && (
          <Box>
            <Typography
              variant="h3"
              sx={{
                mb: "0.5rem",
                // fontFamily: "Source Sans 3",
              }}
            >
              {title}
            </Typography>
            {children}
          </Box>
        )}
      </Paper>
    </DrawerLayout>
  );
};

export default Dashboard;
