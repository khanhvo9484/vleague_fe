import React from "react";
import { Typography, Box } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(2),
//     marginTop: "auto",
//   },
// }));

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p>This is the footer content.</p>
    </footer>
  );
};

export default Footer;
