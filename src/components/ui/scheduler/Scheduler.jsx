import { makeStyles } from "@mui/styles";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import MyAxios from "../../../api/MyAxios";
import { useState, useEffect } from "react";
import MatchDay from "./MatchDay";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "4px 4px 0 0",
    border: "2px solid",
    borderColor: theme.palette.primary.light,
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "20vh",
  },
}));

const Scheduler = () => {
  const { currentLeague, setCurrentSchedule } = useCurrentLeague();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState("");

  useEffect(() => {
    if (!currentLeague) return;
    const fetchScheduler = async () => {
      setIsLoading(true);
      setNotify("");
      try {
        const response = await MyAxios.get(`/lichthidau/${currentLeague}`, {});
        if (response.status === 200 && response?.data?.data?.cacVongDau) {
          let data = response.data.data.cacVongDau;
          setCurrentSchedule(data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (error.response.status === 404) setNotify("Không tìm thấy dữ liệu");
      }
    };

    fetchScheduler();
  }, [currentLeague]);
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3}>
        <Typography className={classes.title} variant="h3">
          Lịch thi đấu
        </Typography>

        {isLoading && (
          <Box className={classes.loadingBox}>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && notify && (
          <Box className={classes.loadingBox}>
            <Typography variant="subtitle1">{notify}</Typography>
          </Box>
        )}
        {!isLoading && !notify && <MatchDay />}
      </Paper>
    </>
  );
};

export default Scheduler;
