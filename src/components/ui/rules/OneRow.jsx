import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
const OneRow = (props) => {
  const classes = useStyles();
  const { title, value, setValue, isEditable } = props;
  return (
    <Grid item container className={classes.detailBoxRow}>
      <Grid item xs={6}>
        <Typography variant="subtitle1"> {title}</Typography>
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
          value={value === -1 ? "" : value}
          onChange={(e) => setValue(e.target.value)}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default OneRow;
