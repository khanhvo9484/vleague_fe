import { MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useEditInfo from "../../hooks/useEditInfo";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  disableTextField: {
    "& fieldset": {
      border: "none",
      color: theme.palette.primary.dark,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: theme.palette.primary.dark,
    },
  },
  select: {
    padding: "0!important",
    color: theme.palette.primary.dark + "!important",
  },
}));
const Select = (props) => {
  const { items, makeDisable } = props;
  const { isEditable } = useEditInfo();
  const classes = useStyles();
  const [currentItems, setCurrentItems] = useState(items[0]);
  const handleChange = (e) => {
    setCurrentItems(e);
  };
  return (
    <TextField
      className={!isEditable && makeDisable ? classes.disableTextField : ""}
      size="small"
      fullWidth={false}
      disabled={!makeDisable ? false : !isEditable}
      select
      value={currentItems}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      sx={{
        input: { color: "primary.dark", padding: "5px" },

        "& .MuiInputBase-root": {
          color: "primary.dark",
        },
        "& .MuiSelect-select": {
          padding: isEditable ? "0.3rem" : "0",
        },
      }}
    >
      {items.map((item, index) => {
        return (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default Select;
