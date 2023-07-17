import React from "react";
import DrawerLayout from "../../../layout/DrawerLayout";
import { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import ClubInfo from "../../../components/ui/clubInfo/ClubInfo";
import MyAxios from "../../../api/MyAxios";
import { Paper, Box, Button, Typography, Grid } from "@mui/material";
import LoadingBox from "../../../components/ui/LoadingBox";
import useEditInfo from "../../../hooks/useEditInfo";
import ManagerLayout from "../../../layout/ManagerLayout";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import useLoading from "../../../hooks/useLoading";
const Dashboard = () => {
  const authContext = useAuth();
  const [club, setClub] = useState();
  const [manager, setManager] = useState();
  const [homeStadium, setHomeStadium] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [isEditable, setIsEditable] = useState(false);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);

  const {
    currentStadium,
    currentClub,
    imageUrl,
    isFireUpload,
    hasImageOnQueue,
    setIsFireUpload,
    setImageUrl,
    resetImage,
  } = useEditInfo();
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
    setIsFireUpload(true);
  };

  useEffect(async () => {
    if (!isFireUpload) return;
    let isMounted = true;
    setIsLoadingBackdrop(true);
    if (hasImageOnQueue && !imageUrl) {
      setIsLoadingBackdrop(false);
      return;
    }
    if (isMounted) {
      try {
        const res = await MyAxios.put(
          "/doibong",
          JSON.stringify({
            id: club?.id,
            idQuanLy: manager?.id,
            ten: currentClub ? currentClub?.ten : club?.ten,
            idSanNha: currentStadium ? currentStadium : homeStadium?.id,
            namThanhLap: currentClub
              ? currentClub?.namThanhLap
              : club?.namThanhLap,
            hinhAnh: imageUrl ? imageUrl : club?.hinhAnh,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        setNotify({ message: err.message, type: "error" });
      } finally {
        fetchClub();
        setIsEditable(false);
        setIsLoadingBackdrop(false);
        if (imageUrl) {
          resetImage();
        }
      }
    }
  }, [isFireUpload, imageUrl]);
  return (
    <ManagerLayout isLoading={isLoading} notify={notify}>
      <ComponentLayoutBackdrop isLoading={isLoadingBackdrop}>
        <Box sx={{ ml: "2rem", paddingTop: "2rem" }}>
          <ClubInfo
            club={club}
            manager={manager}
            homeStadium={homeStadium}
            verticalLayout={true}
            isEditable={isEditable}
          ></ClubInfo>
        </Box>

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
      </ComponentLayoutBackdrop>
    </ManagerLayout>
  );
};

export default Dashboard;
