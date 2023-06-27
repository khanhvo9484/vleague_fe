import { Box, Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import { useState, useEffect } from "react";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import MyAxios from "../../../api/MyAxios";
import { Add } from "@mui/icons-material";

const CreateSchedule = () => {
  const [currentLeague, setCurrentLeague] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ type: "", message: "" });
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
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentLeague]);
  return (
    <OrganizerLayout title={"Tạo lịch thi đấu"}>
      <AllLeaguesSelector
        currentLeague={currentLeague}
        setCurrentLeague={setCurrentLeague}
      ></AllLeaguesSelector>
      <ComponentLayoutBackdrop isLoading={isLoading} notify={notify}>
        <Grid container component={Paper} elevation={3} sx={{ mt: "1rem" }}>
          {currentLeague && !currentSchedule?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button variant="contained" startIcon={<Add></Add>}>
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
            {currentLeague && !currentSchedule?.length > 0 && (
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Hiện chưa có lịch thi đấu của giải đấu này
              </Typography>
            )}
          </Grid>
        </Grid>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default CreateSchedule;
