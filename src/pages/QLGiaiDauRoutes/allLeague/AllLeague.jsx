import React from "react";
import DrawerLayout from "../../../layout/DrawerLayout";
import { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import ClubInfo from "../../../components/ui/clubInfo/ClubInfo";
import MyAxios from "../../../api/MyAxios";
import { Paper, Box, Button, Typography, Grid } from "@mui/material";
import useEditInfo from "../../../hooks/useEditInfo";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import useLoading from "../../../hooks/useLoading";
import AllLeagues from "../../../components/ui/AllLeagues";
const Dashboard = () => {
  const authContext = useAuth();
  const [club, setClub] = useState();
  const [manager, setManager] = useState();
  const [homeStadium, setHomeStadium] = useState();
  const { isLoading, setIsLoading, notify, setNotify } = useLoading();

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
      count = 0;
      while (!imageUrl) {
        if (count == 10) break;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        count++;
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
          hinhAnh: imageUrl ? imageUrl : club?.hinhAnh,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log(err);
      setNotify({ message: err.message, type: "error" });
    } finally {
      fetchClub();
      setIsEditable(false);
      setIsFireUpload(false);
      setImageUrl(false);
    }
  }, [isFireUpload]);
  return (
    <OrganizerLayout>
      <AllLeagues></AllLeagues>
      <Box>
        <Typography>Quy định mùa giải</Typography>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography> Quy định cầu thủ</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography> Quy định tính điểm</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography> Quy định trọng tài</Typography>
          </Grid>
        </Grid>
      </Box>
    </OrganizerLayout>
  );
};

export default Dashboard;
