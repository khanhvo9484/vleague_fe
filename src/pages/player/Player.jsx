import DefaultLayout from "../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import {
  Box,
  Grid,
  Grow,
  Typography,
  Collapse,
  Slide,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import useProgressiveImage from "../../hooks/useProgressiveImage";
import bgImage from "../../assets/background1.jpg";
import { useParams } from "react-router-dom";
import MyAxios from "../../api/MyAxios";

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
const useStyles = makeStyles((theme) => ({}));

const Player = () => {
  const loadedBGImage = useProgressiveImage(bgImage);
  const classes = useStyles();
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState("");

  useEffect(() => {
    console.log(id);
  }, [id]);
  useEffect(() => {
    setLoading(true);
    const getPlayer = async () => {
      try {
        const res = await MyAxios.get(`/cauthu`, { params: { id } });
        setPlayer(res.data);
        setLoading(false);
      } catch (error) {
        setNotify(error.response.data.message);
      }
    };
    if (id) {
      getPlayer();
    }
  }, []);

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
            display: loadedBGImage ? "block" : "none",
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
              <Paper elevation={3} sx={{ padding: "20px" }}></Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Player;
