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
const CreateSchedule = () => {
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
  const [alreadyCreated, setAlreadyCreated] = useState(false);
  useEffect(async () => {
    if (currentLeague) {
      setIsLoading(true);
      console.log(currentLeague);
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
        setAlreadyCreated(true);
      }
    }
    if (!currentLeague) {
      setCurrentSchedule([]);
    }
  }, [currentLeague]);
  useEffect(() => {
    if (currentSchedule.length > 0) {
      console.log(currentLeague);
    }
  }, [currentSchedule]);
  const handleCreateSchedule = async () => {
    setIsLoading(true);
    const data = {
      idMuaGiai: currentLeague?.id,
      idQuanLy: auth?.id,
    };
    console.log(data);
    try {
      const res = await MyAxios.post(`/lichthidau`, data);
      if (res.status === 200) {
        setCurrentSchedule(res?.data?.data?.cacVongDau);
        setSnackbarMessage("Tạo lịch thi đấu thành công");
        setSnackbarType("success");
      }
    } catch (err) {
      setSnackbarMessage(err?.response?.data?.message);
      setSnackbarType("error");
    } finally {
      setIsOpenSnackbar(true);
      setIsLoading(false);
    }
  };
  return (
    <OrganizerLayout title={"Tạo lịch thi đấu"}>
      <AllLeaguesSelector
        currentLeague={currentLeague}
        setCurrentLeague={setCurrentLeague}
        selectId={id}
      ></AllLeaguesSelector>
      <ComponentLayoutBackdrop isLoading={isLoading} notify={notify}>
        <Grid
          container
          component={Paper}
          elevation={3}
          sx={{ mt: "1rem", padding: "0.5rem" }}
        >
          {!isLoading && currentLeague && !currentSchedule?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: "0.5rem",
                mb: "1rem",
              }}
            >
              <Button
                variant="contained"
                startIcon={<Add></Add>}
                onClick={handleCreateSchedule}
              >
                Tạo lịch thi đấu
              </Button>
            </Box>
          )}
          <Grid
            item
            container
            xs={12}
            sx={{ padding: "1rem", backgroundColor: "blueBackground.manage" }}
          >
            {!isLoading && !currentLeague && !currentSchedule?.length > 0 && (
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Hãy chọn giải đấu
              </Typography>
            )}
            {!isLoading && currentLeague && !currentSchedule?.length > 0 && (
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Hiện chưa có lịch thi đấu của giải đấu này
              </Typography>
            )}
            {!isLoading && currentLeague && currentSchedule?.length > 0 ? (
              <Scheduler
                currentSchedule={currentSchedule}
                setCurrentSchedule={setCurrentSchedule}
                background={"blueBackground.manage"}
                setIsLoading={setIsLoading}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarType={setSnackbarType}
                setIsOpenSnackbar={setIsOpenSnackbar}
              ></Scheduler>
            ) : null}
          </Grid>
        </Grid>
        <CustomSnackbar
          isOpen={isOpenSnackbar}
          setIsOpen={setIsOpenSnackbar}
          message={snackbarMessage}
          type={snackbarType}
        ></CustomSnackbar>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default CreateSchedule;
