import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import bgImage from "../../../assets/background1.jpg";
import MyAxios from "../../../api/MyAxios";
import DefaultLayout from "../../../layout/DefaultLayout";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import Loader from "@mui/material/CircularProgress";
import Helper from "../../../utils/Helper";
import PlayerList from "./PlayerList";
import ClubInfo from "../../../components/ui/clubInfo/ClubInfo";

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
  paddingTop: "20px",
};
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    padding: "20px",
    margin: "0 10vw 0 10vw ",
    minHeight: "30vh",
    overflow: "hidden",
    marginTop: "5vh",
  },
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Club = () => {
  const loadedBGImage = useProgressiveImage(bgImage);
  const classes = useStyles();

  const { id } = useParams();
  const [club, setClub] = useState();
  const [players, setPlayers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [manager, setManager] = useState();
  const [homeStadium, setHomeStadium] = useState();
  useEffect(() => {
    setIsLoading(true);
    setNotify({ message: "", type: "" });

    const fetchClub = async () => {
      try {
        const response = await MyAxios.get(`/doibong/${id}`);
        setClub(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setNotify({ message: err.message, type: "error" });
        setIsLoading(false);
      }
    };
    if (id) {
      fetchClub();
    }
  }, [id]);

  useEffect(() => {
    if (club) {
      setPlayers(club?.danhSachCauThuDangThiDau);
      console.log(club?.danhSachCauThuDangThiDau);
      setManager(club?.quanLy);
      setHomeStadium(club?.sanNha);
    }
  }, [club]);
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    textShadow: "3px 3px 0px rgba(54, 243, 253, 0.552)",
                  }}
                >
                  THÔNG TIN ĐỘI BÓNG
                </Typography>
              </Box>

              <Paper elevation={8} className={classes.paperContainer}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30rem",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : null}
                {!isLoading && notify.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30rem",
                    }}
                  >
                    <Typography>
                      {notify.message} {notify.type}
                    </Typography>
                  </Box>
                ) : null}
                {club && manager && homeStadium && (
                  <ClubInfo
                    club={club}
                    manager={manager}
                    homeStadium={homeStadium}
                    players={players}
                  ></ClubInfo>
                )}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Club;
