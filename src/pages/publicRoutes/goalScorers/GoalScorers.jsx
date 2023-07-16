import React, { useEffect } from "react";
import DefaultLayout from "../../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useState } from "react";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import bgImage from "../../../assets/background1.jpg";

import League from "../../../components/ui/league/League";
import Scorers from "../../../components/ui/scorers/Scorers";

const backgroundStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: -1,
};
const contentStyle = {
  zIndex: 2,
  width: "100%",
  position: "relative",
  paddingTop: "80px",
};

const GoalScorer = () => {
  const loadedImage = useProgressiveImage(bgImage);

  return (
    <DefaultLayout>
      <Box>
        <Box
          sx={{
            display: loadedImage ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Loader size="5rem"></Loader>
        </Box>
        <Box sx={{ display: loadedImage ? "block" : "none" }}>
          <Box
            style={{
              ...backgroundStyle,
              backgroundImage: `url(${loadedImage})`,
            }}
          ></Box>
          <Box style={contentStyle}>
            <Box>
              <Grid container spacing={0} justifyContent="space-around">
                <Grid item xs={3} sm={3}>
                  <League />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Scorers />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default GoalScorer;
