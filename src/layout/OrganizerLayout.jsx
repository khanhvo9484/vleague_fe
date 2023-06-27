import React from "react";
import DrawerLayout from "./DrawerLayout";
import { useEffect, useState } from "react";
import {
  HomeRounded,
  Groups3Rounded,
  DescriptionRounded,
  AddToPhotos,
  BarChart,
  CalendarMonth,
  EmojiEvents,
  EmojiFlags,
  LibraryAddCheck,
  Segment,
  SportsSoccer,
  EditNote,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Paper, Box, Button, Typography, Grid } from "@mui/material";
import LoadingBox from "../components/ui/LoadingBox";
import useLoading from "../hooks/useLoading";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    text: "Danh sách mùa giải",
    icon: <EmojiFlags />,
    path: "/organizer/all-leagues",
  },
  {
    text: "Tạo lịch thi đấu",
    icon: <EditNote />,
    path: "/organizer/create-schedule",
  },
  { text: "Quản lý trận đấu", icon: <SportsSoccer />, path: "/manager/match" },
  {
    text: "Danh sách hồ sơ đăng ký",
    icon: <DescriptionRounded />,
    path: "/organizer/league-registration",
  },
  {
    text: "Quy định mùa giải",
    icon: <Segment />,
    path: "/organizer/season-rules",
  },
];
const Dashboard = ({
  children,
  isLoading,
  notify,
  title,
  childLv1,
  parentLink,
}) => {
  document.title = title;
  const navigate = useNavigate();
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
            {childLv1 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    // mb: "0.5rem",
                    // fontFamily: "Source Sans 3",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(parentLink, { replace: true });
                  }}
                >
                  {title}
                </Typography>

                <Box sx={{ display: "flex" }}>
                  <ArrowForwardIos
                    sx={{ ml: "0.5rem", mr: "0.5rem" }}
                  ></ArrowForwardIos>
                  <Typography variant="h3">{childLv1}</Typography>
                </Box>
              </Box>
            )}
            {!childLv1 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    mb: "0.5rem",
                    // fontFamily: "Source Sans 3",
                  }}
                >
                  {title}
                </Typography>
              </Box>
            )}

            {children}
          </Box>
        )}
      </Paper>
    </DrawerLayout>
  );
};

export default Dashboard;
