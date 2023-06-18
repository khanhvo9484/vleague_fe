import DefaultLayout from "../../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import { Box, Grid, Grow, Typography, Collapse, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import bgImage from "../../../assets/background1.jpg";
import footballPlayer from "../../../assets/football_player1.png";
import footballPlayer2 from "../../../assets/football_player2.png";

import League from "../../../components/ui/league/League";
// import useCountdown from "./../../../hooks/useCountDown";
import useCurrentLeague from "../../../hooks/useCurrentLeague";

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
const useStyles = makeStyles((theme) => ({
  timeBox: {
    background: "linear-gradient(135deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "4px",
    minWidth: "70px",
    minHeight: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: "500px",
  },
}));

const Home = () => {
  const loadedBGImage = useProgressiveImage(bgImage);
  const loadedPlayerImage = useProgressiveImage(footballPlayer);
  const loadedPlayerImage2 = useProgressiveImage(footballPlayer2);

  const classes = useStyles();
  // const { remainingTime, hasPassed, setTargetDate } = useCountdown();
  const { currentLeague } = useCurrentLeague();

  // useEffect(() => {
  //   if (currentLeague) {
  //     setTargetDate("2023-06-19");
  //   }
  //   // console.log(remainingTime);
  // }, [currentLeague]);
  return (
    <DefaultLayout>
      <Box>
        <Box
          sx={{
            display: loadedBGImage ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Loader size="5rem"></Loader>
        </Box>
        <Box
          sx={{
            display: loadedBGImage && loadedPlayerImage ? "block" : "none",
          }}
        >
          <Box
            style={{
              ...backgroundStyle,
              backgroundImage: `url(${loadedBGImage})`,
            }}
          ></Box>
          <Box style={contentStyle}>
            <Box>
              <Grid container spacing={0} justifyContent="space-around">
                <Grid item xs={12} sm={3}>
                  <League />
                </Grid>

                <Grid item xs={12} sm={7} container>
                  <Grid item sm={7}>
                    {currentLeague && (
                      <Grow in={true} timeout={1000}>
                        <Box
                          sx={{
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            // alignItems: "center",
                          }}
                        >
                          {/* <Typography variant="h1" sx={{ margin: "1rem" }}>
                            Mùa giải sẽ bắt đầu sau:
                          </Typography>
                          <Box className={classes.timeContainer}>
                            <Box className={classes.timeBox}>
                              <Typography variant="h1">
                                {remainingTime?.days}
                              </Typography>
                            </Box>

                            <Typography variant="h1">ngày </Typography>
                            <Box className={classes.timeBox}>
                              <Typography variant="h1">
                                {remainingTime?.hours}
                              </Typography>
                            </Box>

                            <Typography variant="h1">giờ </Typography>
                            <Box className={classes.timeBox}>
                              <Typography variant="h1">
                                {remainingTime?.minutes}
                              </Typography>
                            </Box>

                            <Typography variant="h1">phút </Typography>
                          </Box> */}
                        </Box>
                      </Grow>
                    )}
                    <Box
                      sx={{
                        mt: "2rem",
                        // background:
                        //   "linear-gradient(135deg, #FE6B8B 30%, #FF8E53 90%)",
                        backgroundColor: "primary.main",
                        borderRadius: "4px",
                        padding: "1rem",
                      }}
                    >
                      <Typography variant="h2" sx={{ color: "white" }}>
                        Some long text here to test the text overflow of the box
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ zIndex: 0, height: "90vh" }}>
                      <Slide
                        in={currentLeague ? true : false}
                        timeout={1000}
                        easing={{
                          enter: "cubic-bezier(0, 0, 0.2, 1)",
                          exit: "linear",
                        }}
                        direction="left"
                      >
                        <img
                          style={{
                            height: "50vh",
                            position: "absolute",
                            bottom: "1.1rem",
                          }}
                          src={loadedPlayerImage}
                        ></img>
                      </Slide>
                      <Slide
                        in={currentLeague ? true : false}
                        timeout={1200}
                        easing={{
                          enter: "cubic-bezier(0, 0.4, 0.3, 1)",
                          exit: "linear",
                        }}
                        direction="left"
                      >
                        <img
                          style={{
                            height: "50vh",
                            position: "absolute",
                            // top: "1rem",
                            right: "0.5rem",
                            bottom: "1rem",
                          }}
                          src={loadedPlayerImage2}
                        ></img>
                      </Slide>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Home;
