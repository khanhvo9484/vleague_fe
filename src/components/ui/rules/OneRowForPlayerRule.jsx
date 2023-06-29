import { Grid, TextField, Typography, Paper, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Check, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
const useStyles = makeStyles((theme) => ({
  detailBoxRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem!important",
    // color: theme.palette.primary.dark,
    // color: "white",
    // backgroundColor: theme.palette.primary.dark,
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },
  normalTextField: {},
  disableTextField: {
    "& fieldset": {
      border: "none",
      color: theme.palette.primary.dark,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: theme.palette.primary.dark,
      // WebkitTextFillColor: "white",
    },
  },
  select: {
    padding: "0!important",
    color: theme.palette.primary.dark + "!important",
  },
  ruleSection: {
    backgroundColor: theme.palette.blueBackground.manage,
    padding: "1rem!important",
    borderRadius: "4px!important",
  },
}));
const OneRow = (props) => {
  const classes = useStyles();
  const {
    title,
    value,
    setValue,
    isEditable,
    notTextField,
    currentValue,
    more,
    less,
    checkResult,
    setCheckResult,
  } = props;

  useEffect(() => {
    if (less && value >= currentValue) {
      setCheckResult(true);
    }
    if (more && value <= currentValue) {
      setCheckResult(true);
    }
    if (less && value < currentValue) {
      setCheckResult(false);
    }
    if (more && value > currentValue) {
      setCheckResult(false);
    }
  }, [currentValue, value]);

  return (
    <Grid
      item
      container
      component={Paper}
      elevation={3}
      className={classes.detailBoxRow}
      sx={{
        border: "2px solid",
        borderColor: checkResult ? "info.main" : "error.main",
      }}
    >
      <Grid item xs={6}>
        <Typography variant="subtitle1"> {title}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{ color: "primary.dark", minWidth: "3rem" }}
          >
            {value === -1 ? "" : value}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", width: "5rem" }}>
            <Typography>{"Hiện tại: "}</Typography>
            &nbsp;
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {currentValue}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "5rem" }}
          >
            {checkResult && <Check sx={{ color: "#16dd8a" }} />}

            {!checkResult && <Close sx={{ color: "red" }} />}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OneRow;
