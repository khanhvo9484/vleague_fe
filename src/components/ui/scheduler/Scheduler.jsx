import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";
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
    minHeight: "40vh",
  },
}));

const Scheduler = () => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3}>
        <Typography className={classes.title} variant="h3">
          Lịch thi đấu
        </Typography>
      </Paper>
    </>
  );
};

export default Scheduler;
