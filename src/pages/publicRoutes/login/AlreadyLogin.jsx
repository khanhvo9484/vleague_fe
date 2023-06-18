import React from "react";
import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
const AlreadyLogin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "calc(100vh - 200px)",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="secondary">
        <CheckCircle sx={{ mr: "1rem" }}></CheckCircle>
        Bạn đã đăng nhập
      </Typography>
      <Link to="/" style={{ textDecoration: "underline" }}>
        <Typography mt="2rem" color="secondary" variant="body1">
          Về trang chủ
        </Typography>
      </Link>
    </Box>
  );
};

export default AlreadyLogin;
