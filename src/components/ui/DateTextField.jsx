import { TextField, Box } from "@mui/material";
import { useState } from "react";
const DateTextField = () => {
  const [currentDate, setCurrentDate] = useState();
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
    setCurrentDate(formattedInput);
  };
  return (
    <Box>
      <TextField value={currentDate}></TextField>
    </Box>
  );
};

export default DateTextField;
