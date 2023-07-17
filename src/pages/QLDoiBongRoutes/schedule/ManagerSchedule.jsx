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
import ManagerLayout from "../../../layout/ManagerLayout";
import MatchCard from "../../../components/ui/schedulerComponent/MatchCard";
import { useLocation } from "react-router-dom";
const ManagerSchedule = () => {
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
        const res = await MyAxios.get(
          `/trandau?muagiai=${currentLeague?.id}&doibong=${auth?.teamId}&trangthai=chuathidau`
        );
        if (res?.data?.data?.dsTranDaus) {
          setCurrentSchedule(res.data.data.dsTranDaus);
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

  return (
    <ManagerLayout title={"Lịch thi đấu"}>
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
            {!isLoading && currentLeague && currentSchedule?.length > 0 && (
              <Box sx={{ width: "100%" }}>
                <Typography variant="h3" sx={{ mb: "0.5rem" }}>
                  Trận đấu sắp diễn ra
                </Typography>
              </Box>
            )}

            {!isLoading &&
              currentLeague &&
              currentSchedule?.length > 0 &&
              currentSchedule.map((item, index) => {
                return (
                  <Grid container sx={{ mb: "0.5rem" }} key={index}>
                    <Grid container item xs={8}>
                      <MatchCard
                        match={item}
                        setIsLoading={setIsLoading}
                        setSnackbarMessage={setSnackbarMessage}
                        setSnackbarType={setSnackbarType}
                        setIsOpenSnackbar={setIsOpenSnackbar}
                      ></MatchCard>
                    </Grid>
                    <Grid item xs={3} component={Paper} sx={{ ml: "1rem" }}>
                      <Box sx={{ padding: "1rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="subtitle1">Sân đấu: </Typography>
                          <Typography variant="h6" sx={{ ml: "0.5rem" }}>
                            {" "}
                            {item?.doiNha?.sanNha?.tenSan}
                          </Typography>
                        </Box>
                        <Box>
                          <img
                            style={{ width: "80px", borderRadius: "4px" }}
                            src={`${item?.doiNha?.sanNha?.hinhAnh}`}
                          ></img>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <CustomSnackbar
          isOpen={isOpenSnackbar}
          setIsOpen={setIsOpenSnackbar}
          message={snackbarMessage}
          type={snackbarType}
        ></CustomSnackbar>
      </ComponentLayoutBackdrop>
    </ManagerLayout>
  );
};

export default ManagerSchedule;
