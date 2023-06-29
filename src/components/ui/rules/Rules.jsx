import { Box, Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OneRow from "./OneRow";
import { useState, useEffect } from "react";
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
    notTextField,
    isDisable,
    setIsDisable,
  } = props;
  const classes = useStyles();
  const [notify, setNotify] = useState("");

  const [redBorderWinPoint, setRedBorderWinPoint] = useState(false);
  const [redBorderDrawPoint, setRedBorderDrawPoint] = useState(false);
  const [redBorderLosePoint, setRedBorderLosePoint] = useState(false);

  useEffect(() => {
    if (winPoint && drawPoint && losePoint) {
      if (
        winPoint === drawPoint ||
        winPoint === losePoint ||
        drawPoint === losePoint
      ) {
        setNotify("Điểm thắng, hòa, thua không được trùng nhau");
        setIsDisable(true);
      } else if (winPoint < 0 || drawPoint < 0 || losePoint < 0) {
        setNotify("Điểm không được âm");
        setIsDisable(true);
        setRedBorderWinPoint(winPoint < 0 ? true : false);
        setRedBorderDrawPoint(drawPoint < 0 ? true : false);
        setRedBorderLosePoint(losePoint < 0 ? true : false);
      } else if (winPoint < drawPoint || winPoint < losePoint) {
        setNotify("Điểm thắng phải lớn hơn điểm hòa và thua");
        setIsDisable(true);
        setRedBorderWinPoint(true);
      } else if (drawPoint > winPoint || drawPoint < losePoint) {
        setNotify("Điểm hòa phải lớn hơn điểm thua và nhỏ hơn điểm thắng");
        setIsDisable(true);
        setRedBorderDrawPoint(true);
      } else if (losePoint > winPoint || losePoint > drawPoint) {
        setNotify("Điểm thua phải nhỏ hơn điểm thắng và hòa");
        setIsDisable(true);
        setRedBorderLosePoint(true);
      } else {
        setNotify("");
        setIsDisable(false);
        setRedBorderWinPoint(false);
        setRedBorderDrawPoint(false);
        setRedBorderLosePoint(false);
      }
    }
  }, [winPoint, losePoint, drawPoint]);
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
          notTextField={notTextField}
        ></OneRow>
        <OneRow
          title="Số lượng cầu thủ tối thiểu"
          value={minPlayer}
          setValue={setMinPlayer}
          isEditable={isEditable}
          notTextField={notTextField}
        ></OneRow>
        <OneRow
          title="Số cầu thủ nước ngoài tối đa"
          value={maxForeignPlayer}
          setValue={setMaxForeignPlayer}
          isEditable={isEditable}
          notTextField={notTextField}
        ></OneRow>
        <OneRow
          title="Tuổi tối thiểu"
          value={minAge}
          setValue={setMinAge}
          isEditable={isEditable}
          notTextField={notTextField}
        ></OneRow>
        <OneRow
          title="Tuổi tối đa"
          value={maxAge}
          setValue={setMaxAge}
          isEditable={isEditable}
          notTextField={notTextField}
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
            notTextField={notTextField}
            redBorder={redBorderWinPoint}
          ></OneRow>
          <OneRow
            title="Hòa"
            value={drawPoint}
            setValue={setDrawPoint}
            isEditable={isEditable}
            notTextField={notTextField}
            redBorder={redBorderDrawPoint}
          ></OneRow>
          <OneRow
            title="Thua"
            value={losePoint}
            setValue={setLosePoint}
            isEditable={isEditable}
            notTextField={notTextField}
            redBorder={redBorderLosePoint}
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
            notTextField={notTextField}
          ></OneRow>
        </Grid>
        <Typography
          variant="subtitle1"
          sx={{ color: "primary.main", mb: "1rem", fontStyle: "italic" }}
        >
          {notify}
        </Typography>
      </Grid>
      <Grid />
    </Grid>
  );
};

export default Rules;
