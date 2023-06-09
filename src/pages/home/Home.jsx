import React, { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import listItem from "../../data/muagiai.js";
import { useState } from "react";
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
  boxTitle: {
    color: theme.palette.primary.main,
    bgcolor: "white",
    overflow: "hidden",
    borderRadius: "4px 4px 0 0",
    textAlign: "center",
    padding: "1rem",
    boxShadow: 3,
    border: "2px solid black",
  },
  leagueCard: {
    maxWidth: "500px",
    opacity: 0.9,
    boxShadow: 2,
    // marginLeft: "3rem",
    marginTop: "2rem",
  },
  leagueItem: {
    display: "flex",
    border: "1px solid black",
    cursor: "pointer",
    minHeight: "80px",
    width: "100%",
    // minWidth: "400px",
  },
  evenItem: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "green",
    },
  },
  oddItem: {
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: "green",
    },
  },
  schedule: {
    marginTop: "2rem",
  },
  chart: {
    marginTop: "2rem",
  },
}));

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  useEffect(() => {
    document.title = "Trang chủ";
    import("../../assets/background1.jpg")
      .then((image) => {
        setBackgroundLoaded(true);
        setBackgroundImage(image.default);
      })
      .catch((error) => {
        console.error("Failed to load background image:", error);
      });
  }, []);

  // const [allTournament, setAllTournament] = useState(listItem);
  const tournament = {
    id: 1,
    name: "V-League 2021",
    logo: "https://upload.wikimedia.org/wikipedia/vi/0/0f/V.League_1_2021_logo.png",
    start: "2021-01-01",
  };
  const [selectedTournament, setSelectedTournament] = useState(tournament);
  const handleSelectTour = (id) => {
    setSelectedTournament(id);
  };
  useEffect(() => {
    console.log(selectedTournament);
  }, [selectedTournament]);
  const classes = useStyles();

  const handleBackgroundLoad = () => {
    setBackgroundLoaded(true);
  };
  return (
    <DefaultLayout>
      <Box>
        <Box
          sx={{
            display: backgroundLoaded ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Loader size="5rem"></Loader>
        </Box>
        <Box sx={{ display: backgroundLoaded ? "block" : "none" }}>
          <Box
            style={{
              ...backgroundStyle,
              backgroundImage: `url(${backgroundImage})`,
            }}
            onLoad={handleBackgroundLoad}
          ></Box>
          <Box style={contentStyle}>
            <Box>
              <Grid container spacing={0} justifyContent="space-around">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper elevation={3} className={classes.leagueCard}>
                    <Typography variant="h3" className={classes.boxTitle}>
                      Mùa giải hiện tại
                    </Typography>

                    <List sx={{ padding: 0 }}>
                      {listItem.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const itemClass = isEven
                          ? classes.evenItem
                          : classes.oddItem;
                        return (
                          <ListItem
                            onClick={() => handleSelectTour(item.id)}
                            key={item.id}
                            className={`${classes.leagueItem} ${itemClass} `}
                            sx={
                              index === listItem.length - 1
                                ? { borderRadius: "0 0 4px 4px" }
                                : {}
                            }
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="h5">{item.id}. </Typography>
                              <img
                                style={{ width: "35px" }}
                                src={item.logo}
                              ></img>
                              <Typography variant="h5">{item.name}</Typography>
                            </Box>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={5}>
                  <Paper elevation={3} className={classes.schedule}>
                    <Typography variant="h3" className={classes.boxTitle}>
                      Lịch thi đấu
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper elevation={3} className={classes.chart}>
                    <Typography variant="h3" className={classes.boxTitle}>
                      Bảng xếp hạng
                    </Typography>
                  </Paper>
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
