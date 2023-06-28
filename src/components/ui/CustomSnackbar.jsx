import { Snackbar, Box, Alert } from "@mui/material";
import { useState } from "react";
const CustomSnackbar = (props) => {
  const { message, type, isOpen, setIsOpen } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };
  return (
    <Box sx={{ zIndex: "1000" }}>
      <Snackbar open={isOpen} autoHideDuration={8000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{
            width: "150%",
            fontSize: "1.1rem",
            padding: "1rem",
            fontWeight: "bold",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomSnackbar;
