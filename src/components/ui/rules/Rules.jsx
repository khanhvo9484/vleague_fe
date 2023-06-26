import React from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OneRow from "./OneRow";
const useStyles = makeStyles((theme) => ({
  detailBoxRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem!important",
    // color: theme.palette.primary.dark,
    color: "white",
    backgroundColor: theme.palette.primary.dark,
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
      // WebkitTextFillColor: theme.palette.primary.dark,
      WebkitTextFillColor: "white",
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
const Rules = (props) => {
  const {
    minAge,
    setMinAge,
    maxPlayer,
    setMaxPlayer,
    minPlayer,
    setMinPlayer,
    isEditable,
    maxForeignPlayer,
    setMaxForeignPlayer,
    maxAge,
    setMaxAge,
    winPoint,
    drawPoint,
    losePoint,
    setWinPoint,
    setDrawPoint,
    setLosePoint,
    numberOfClubs,
    setNumberOfClubs,
    league,
  } = props;
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item container xs={6} className={classes.ruleSection}>
        <Grid item xs={12} sx={{ mb: "1rem" }}>
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            {" "}
            Quy định cầu thủ
          </Typography>
        </Grid>
        <OneRow
          title={"Số lượng cầu thủ tối đa"}
          value={maxPlayer}
          setValue={setMaxPlayer}
          isEditable={isEditable}
        ></OneRow>
        <OneRow
          title="Số lượng cầu thủ tối thiểu"
          value={minPlayer}
          setValue={setMinPlayer}
          isEditable={isEditable}
        ></OneRow>
        <OneRow
          title="Số cầu thủ nước ngoài tối đa"
          value={maxForeignPlayer}
          setValue={setMaxForeignPlayer}
          isEditable={isEditable}
        ></OneRow>
        <OneRow
          title="Tuổi tối thiểu"
          value={minAge}
          setValue={setMinAge}
          isEditable={isEditable}
        ></OneRow>
        <OneRow
          title="Tuổi tối đa"
          value={maxAge}
          setValue={setMaxAge}
          isEditable={isEditable}
        ></OneRow>
      </Grid>
      <Grid item container xs={6} className={classes.ruleSection}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "primary.main", mb: "1rem" }}>
            {" "}
            Quy định tính điểm
          </Typography>
          <OneRow
            title="Thắng"
            value={winPoint}
            setValue={setWinPoint}
            isEditable={isEditable}
          ></OneRow>
          <OneRow
            title="Hòa"
            value={drawPoint}
            setValue={setDrawPoint}
            isEditable={isEditable}
          ></OneRow>
          <OneRow
            title="Thua"
            value={losePoint}
            setValue={setLosePoint}
            isEditable={isEditable}
          ></OneRow>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "primary.main", mb: "1rem" }}>
            {" "}
            Quy định số lượng đội
          </Typography>
          <OneRow
            title="Số lượng đội"
            value={numberOfClubs}
            setValue={setNumberOfClubs}
            isEditable={isEditable}
          ></OneRow>
        </Grid>
      </Grid>
      <Grid />
    </Grid>
  );
};

export default Rules;
