import { makeStyles } from "@mui/styles";
import { Paper, Typography, Box, CircularProgress, Grid } from "@mui/material";
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

const Scheduler = (props) => {
  const { setCurrentSchedule, currentSchedule, background } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState("");
  const [currentMatchDay, setCurrentMatchDay] = useState("");

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        component={Paper}
        elevation={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography className={classes.title} variant="h3">
          Lịch thi đấu
        </Typography>

        <MatchDay
          currentSchedule={currentSchedule}
          setCurrentMatchDay={setCurrentMatchDay}
          currentMatchDay={currentMatchDay}
          background={background}
        ></MatchDay>
      </Grid>
    </>
  );
};

export default Scheduler;
