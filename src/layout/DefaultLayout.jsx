import React from "react";
import Navbar from "../components/ui/navbar/Navbar";
import Footer from "../components/ui/footer/Footer";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "Red",
  },
}));

const DefaultLayout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <main>
        <div>{props.children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
