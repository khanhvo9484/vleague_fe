import { Box, Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OneRowForPlayerRule from "./OneRowForPlayerRule";
import { useState, useEffect } from "react";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
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
const PlayerRuleOnly = (props) => {
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
    notTextField,
    currentRegisterListInfo,
  } = props;
  const classes = useStyles();
  const { checkRuleResult, setCheckRuleResult } = useCurrentLeague();
  const [checkMaxAgeResult, setCheckMaxAgeResult] = useState(true);
  const [checkMinAgeResult, setCheckMinAgeResult] = useState(true);
  const [checkMaxPlayerResult, setCheckMaxPlayerResult] = useState(true);
  const [checkMinPlayerResult, setCheckMinPlayerResult] = useState(true);
  const [checkMaxForeignPlayerResult, setCheckMaxForeignPlayerResult] =
    useState(true);

  useEffect(() => {
    if (
      checkMaxAgeResult &&
      checkMinAgeResult &&
      checkMaxPlayerResult &&
      checkMinPlayerResult &&
      checkMaxForeignPlayerResult
    ) {
      setCheckRuleResult(true);
    } else {
      setCheckRuleResult(false);
    }
  }, [
    checkMaxAgeResult,
    checkMinAgeResult,
    checkMaxPlayerResult,
    checkMinPlayerResult,
    checkMaxForeignPlayerResult,
  ]);
  return (
    <Grid container>
      <Grid item container xs={12} className={classes.ruleSection}>
        <Grid item xs={12} sx={{ mb: "1rem" }}>
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            {" "}
            Quy định cầu thủ
          </Typography>
        </Grid>
        <OneRowForPlayerRule
          title={"Số lượng cầu thủ tối đa"}
          value={maxPlayer}
          setValue={setMaxPlayer}
          isEditable={isEditable}
          notTextField={notTextField}
          currentValue={currentRegisterListInfo?.numberOfPlayer}
          less={true}
          checkResult={checkMaxPlayerResult}
          setCheckResult={setCheckMaxPlayerResult}
        ></OneRowForPlayerRule>
        <OneRowForPlayerRule
          title="Số lượng cầu thủ tối thiểu"
          value={minPlayer}
          setValue={setMinPlayer}
          isEditable={isEditable}
          notTextField={notTextField}
          currentValue={currentRegisterListInfo?.numberOfPlayer}
          more={true}
          checkResult={checkMinPlayerResult}
          setCheckResult={setCheckMinPlayerResult}
        ></OneRowForPlayerRule>
        <OneRowForPlayerRule
          title="Số cầu thủ nước ngoài tối đa"
          value={maxForeignPlayer}
          setValue={setMaxForeignPlayer}
          isEditable={isEditable}
          notTextField={notTextField}
          currentValue={currentRegisterListInfo?.numberOfForeignPlayer}
          less={true}
          checkResult={checkMaxForeignPlayerResult}
          setCheckResult={setCheckMaxForeignPlayerResult}
        ></OneRowForPlayerRule>
        <OneRowForPlayerRule
          title="Tuổi tối thiểu"
          value={minAge}
          setValue={setMinAge}
          isEditable={isEditable}
          notTextField={notTextField}
          currentValue={currentRegisterListInfo?.minAge}
          more={true}
          checkResult={checkMinAgeResult}
          setCheckResult={setCheckMinAgeResult}
        ></OneRowForPlayerRule>
        <OneRowForPlayerRule
          title="Tuổi tối đa"
          value={maxAge}
          setValue={setMaxAge}
          isEditable={isEditable}
          notTextField={notTextField}
          currentValue={currentRegisterListInfo?.maxAge}
          less={true}
          checkResult={checkMaxAgeResult}
          setCheckResult={setCheckMaxAgeResult}
        ></OneRowForPlayerRule>
      </Grid>

      <Grid />
    </Grid>
  );
};

export default PlayerRuleOnly;
