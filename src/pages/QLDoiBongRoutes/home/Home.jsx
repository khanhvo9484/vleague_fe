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
const Dashboard = () => {
  const authContext = useAuth();
  const [club, setClub] = useState();
  const [manager, setManager] = useState();
  const [homeStadium, setHomeStadium] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [localIsFireUpload, setLocalIsFireUpload] = useState();
  const {
    setIsEditable,
    isEditable,
    currentStadium,
    currentClub,
    setIsFireUpload,
    imageUrl,
    setImageUrl,
    isFireUpload,
    hasImageOnQueue,
  } = useEditInfo();
  useEffect(() => {
    setLocalIsFireUpload(isFireUpload);
  }, [isFireUpload]);
  const fetchClub = async () => {
    setIsLoading(true);
    setNotify({ message: "", type: "" });
    try {
      const response = await MyAxios.get(
        `/doibong/${authContext?.auth?.teamId}`
      );
      setClub(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setNotify({ message: err.message, type: "error" });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (authContext?.auth?.teamId) {
      fetchClub();
    }
  }, [authContext?.auth?.teamId]);
  useEffect(() => {
    if (club) {
      setManager(club?.quanLy);
      setHomeStadium(club?.sanNha);
    }
  }, [club]);
  const handleUpdateClubInfo = () => {
    setIsLoading(true);
    setIsFireUpload(true);
  };
  useEffect(async () => {
    if (!isFireUpload) return;
    if (hasImageOnQueue) {
      while (!imageUrl) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    try {
      const res = await MyAxios.put(
        "/doibong",
        JSON.stringify({
          id: club?.id,
          idQuanLy: manager?.id,
          ten: currentClub ? currentClub?.ten : club?.ten,
          idSanNha: currentStadium ? currentStadium : homeStadium.id,
          namThanhLap: currentClub ? currentClub.namThanhLap : club.namThanhLap,
          hinhAnh: imageUrl ? imageUrl : club.hinhAnh,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      fetchClub();
      setIsEditable(false);
      setIsFireUpload(false);
      setImageUrl(false);
    }
  }, [isFireUpload]);
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
          >
            <ClubInfo
              club={club}
              manager={manager}
              homeStadium={homeStadium}
              verticalLayout={true}
            ></ClubInfo>
          </Box>
        )}

        <Grid container spacing={0}>
          <Grid item xs={8} md={8}>
            {!isLoading && !notify.message && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {!isEditable && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsEditable(true);
                    }}
                    color="primary"
                  >
                    <Typography variant="h6"> Sửa thông tin</Typography>
                  </Button>
                )}
                {isEditable && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleUpdateClubInfo();
                      }}
                      color="secondary"
                      sx={{ marginRight: "1rem" }}
                    >
                      <Typography variant="h6" color={"white"}>
                        {" "}
                        Cập nhật
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setIsEditable(false);
                      }}
                      color="error"
                    >
                      <Typography variant="h6"> Hủy</Typography>
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </DrawerLayout>
  );
};

export default Dashboard;
