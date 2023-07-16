import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  disableTextField: {
    "& fieldset": {
      border: "none",
      color: theme.palette.primary.dark,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      // WebkitTextFillColor: theme.palette.primary.dark,
      WebkitTextFillColor: theme.palette.primary.dark,
    },
  },
}));

const CustomTextField = (props) => {
  const classes = useStyles();

  const {
    value,
    isEditable,
    setIsEditable,
    setValue,
    color,
    background,
    width,
    padding,
    type,
    setIsChanged,
  } = props;

  const [placeholder, setPlaceholder] = useState("");
  const [oldValue, setOldValue] = useState(value);
  const handleDateChange = (event) => {
    const input = event.target.value;
    let formattedInput = input.replace(/[^0-9]/g, "");

    if (formattedInput.length >= 3 && formattedInput.length <= 5) {
      formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(
        2
      )}`;
    } else if (formattedInput.length > 5) {
      formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(
        2,
        4
      )}/${formattedInput.slice(4, 8)}`;
    }
    setValue(formattedInput);
    setIsChanged(true);
  };
  const handleTimeChange = (event) => {
    const input = event.target.value;
    let formattedInput = input.replace(/[^0-9]/g, "");

    if (formattedInput.length >= 3 && formattedInput.length <= 5) {
      formattedInput = `${formattedInput.slice(0, 2)}:${formattedInput.slice(
        2
      )}`;
    } else if (formattedInput.length > 5) {
      formattedInput = `${formattedInput.slice(0, 2)}:${formattedInput.slice(
        2,
        4
      )}:${formattedInput.slice(4, 6)}`;
    }
    setValue(formattedInput);
    setIsChanged(true);
  };
  useEffect(() => {
    if (!isEditable) {
      setPlaceholder("");
      setValue(oldValue);
    }
  }, [isEditable]);
  useEffect(() => {
    if (type) {
      if (type === "date") {
        setPlaceholder("dd/mm/yyyy");
      } else if (type === "time") {
        setPlaceholder("hh:mm:ss");
      }
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <TextField
      sx={{
        width: width ? width : "100%",
        input: {
          color: color ? color : "primary.main",
          padding: isEditable ? "0.5rem" : "0 0 0 1rem",
          fontWeight: "700",
        },
      }}
      disabled={!isEditable}
      className={!isEditable ? classes.disableTextField : ""}
      value={value}
      placeholder={isEditable ? placeholder : ""}
      onChange={(e) => {
        if (type === "date") {
          handleDateChange(e);
        } else if (type === "time") {
          handleTimeChange(e);
        } else if (!type) {
          setValue(e.target.value);
        }
      }}
    ></TextField>
  );
};

export default CustomTextField;
