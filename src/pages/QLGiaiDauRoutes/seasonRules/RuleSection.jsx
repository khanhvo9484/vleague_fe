import { makeStyles } from "@mui/styles";
import { Typography, TextField, Box, Grid } from "@mui/material";
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
const RuleSection = (props) => {
  const classes = useStyles();
  const {
    header,
    minAge,
    maxPlayer,
    setMaxPlayer,
    minPlayer,
    setMinPlayer,
    isEditable,
    maxForeignPlayer,
    setMaxForeignPlayer,
    maxAge,
    setMaxAge,
  } = props;
  return (
    <Grid item container xs={5} className={classes.ruleSection}>
      <Grid item xs={12} sx={{ mb: "1rem" }}>
        <Typography variant="h6"> {header}</Typography>
      </Grid>
      <Grid item container className={classes.detailBoxRow}>
        <Grid item xs={6}>
          <Typography variant="subtitle1"> Số lượng cầu thủ tối đa</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: "100%",
              input: {
                color: "white",
                padding: isEditable ? "1rem" : "0 0 0 1rem",
                fontWeight: "700",
              },
            }}
            disabled={!isEditable}
            className={!isEditable ? classes.disableTextField : ""}
            value={maxPlayer === -1 ? "Không có dữ liệu" : maxPlayer}
            onChange={(e) => setMaxPlayer(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Grid item container className={classes.detailBoxRow}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {" "}
            Số lượng cầu thủ tối thiểu
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: "100%",
              input: {
                color: "white",
                padding: isEditable ? "1rem" : "0 0 0 1rem",
                fontWeight: "700",
              },
            }}
            disabled={!isEditable}
            className={!isEditable ? classes.disableTextField : ""}
            value={minPlayer === -1 ? "Không có dữ liệu" : minPlayer}
            onChange={(e) => setMinPlayer(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Grid item container className={classes.detailBoxRow}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            <div style={{ flex: 1 }}>Số lượng cầu thủ </div>
            <div style={{ flex: 1 }}>nước ngoài tối đa</div>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: "100%",
              input: {
                color: "white",
                padding: isEditable ? "1rem" : "0 0 0 1rem",
                fontWeight: "700",
              },
            }}
            disabled={!isEditable}
            className={!isEditable ? classes.disableTextField : ""}
            value={
              maxForeignPlayer === -1 ? "Không có dữ liệu" : maxForeignPlayer
            }
            onChange={(e) => setMaxForeignPlayer(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Grid item container className={classes.detailBoxRow}>
        <Grid item xs={6}>
          <Typography variant="subtitle1"> Tuổi tối thiểu</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: "100%",
              input: {
                color: "white",
                padding: isEditable ? "1rem" : "0 0 0 1rem",
                fontWeight: "700",
              },
            }}
            disabled={!isEditable}
            className={!isEditable ? classes.disableTextField : ""}
            value={minAge === -1 ? "Không có dữ liệu" : minAge}
            onChange={(e) => setMinAge(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Grid item container className={classes.detailBoxRow}>
        <Grid item xs={6}>
          <Typography variant="subtitle1"> Tuổi tối đa</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: "100%",
              input: {
                color: "white",
                padding: isEditable ? "1rem" : "0 0 0 1rem",
                fontWeight: "700",
                // fontSize: "1.2rem",
              },
            }}
            disabled={!isEditable}
            className={!isEditable ? classes.disableTextField : ""}
            value={maxAge === -1 ? "Không có dữ liệu" : maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RuleSection;
