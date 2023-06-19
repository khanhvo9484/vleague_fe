import { Box } from "@mui/material";
import React from "react";

const Footer = ({ drawerWidth }) => {
  if (drawerWidth) console.log(drawerWidth);
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <footer
        style={{
          // width: drawerWidth ? `calc(100% - ${drawerWidth}px)` : "100%",
          width: "100%",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          display: "flex",
        }}
      >
        <p style={{ margin: "0 auto" }}>This is the footer content.</p>
      </footer>
    </Box>
  );
};

export default Footer;
