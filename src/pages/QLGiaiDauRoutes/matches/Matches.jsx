import { Box, Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import { useState, useEffect } from "react";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import MyAxios from "../../../api/MyAxios";
import { Add } from "@mui/icons-material";
import Scheduler from "../../../components/ui/schedulerComponent/Scheduler";
import useAuth from "../../../hooks/useAuth";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import { useLocation } from "react-router-dom";

const Matches = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [currentLeague, setCurrentLeague] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ type: "", message: "" });
  const { auth } = useAuth();
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  useEffect(async () => {
    if (currentLeague) {
      setIsLoading(true);
      try {
        const res = await MyAxios.get(`/lichthidau/${currentLeague?.id}`);
        if (res?.data?.data?.cacVongDau) {
          setCurrentSchedule(res.data.data.cacVongDau);
        }
      } catch (err) {
        console.log(err);
        setNotify({ message: err?.data?.message, type: "error" });
        setCurrentSchedule([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentLeague]);
  return (
    <OrganizerLayout title={"Trận đấu"}>
      <AllLeaguesSelector
        currentLeague={currentLeague}
        setCurrentLeague={setCurrentLeague}
      ></AllLeaguesSelector>
      <ComponentLayoutBackdrop isLoading={isLoading} notify={notify}>
        <Grid
          container
          component={Paper}
          elevation={3}
          sx={{ mt: "1rem", padding: "0.5rem" }}
        ></Grid>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default Matches;
