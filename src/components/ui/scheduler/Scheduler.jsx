import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";
const useStyles = makeStyles((theme) => ({}));

const Scheduler = () => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3}>
        <Typography variant="h3">Lịch thi đấu</Typography>
      </Paper>
    </>
  );
};

export default Scheduler;
