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
import bgImage from "../../assets/background1.jpg";
import MyAxios from "../../api/MyAxios";
import DefaultLayout from "../../layout/DefaultLayout";
import useProgressiveImage from "../../hooks/useProgressiveImage";
import Loader from "@mui/material/CircularProgress";
import Helper from "../../utils/Helper";
import PlayerList from "./PlayerList";

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
                  <Grid
                    container
                    spacing={0}
                    justifyContent="space-between"
                    sx={{ color: "black" }}
                  >
                    <Grid item sm={9} container>
                      <Grid item lg={12} xs={12}>
                        <Typography
                          variant="h2"
                          sx={{ mb: "0.5rem", color: "primary.dark" }}
                        >
                          {club?.ten}
                        </Typography>
                      </Grid>
                      <Paper
                        elevation={0}
                        sx={{ width: "100%", height: "fit-content" }}
                      >
                        <Box
                          justifyContent={"space-between"}
                          sx={{ display: "flex" }}
                        >
                          <Grid
                            item
                            lg={6}
                            xs={6}
                            container
                            sx={{ alignContent: "flex-start" }}
                          >
                            <Grid
                              item
                              xs={12}
                              className={classes.allCenter}
                              sx={{
                                backgroundColor: "primary.main",
                                color: "white",
                                borderRadius: "4px",
                                maxHeight: "2rem",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{ padding: "0.5rem" }}
                              >
                                {"Quản lý"}
                              </Typography>
                            </Grid>
                            <Paper
                              elevation={3}
                              sx={{ width: "100%", display: "flex" }}
                            >
                              <Grid
                                container
                                item
                                xs={8}
                                className={classes.allCenter}
                                sx={{
                                  alignContent: "center",
                                  paddingLeft: "0.5rem",
                                }}
                              >
                                <Grid
                                  container
                                  className={classes.allCenter}
                                  sx={{}}
                                >
                                  <Grid item sm={4}>
                                    <Typography variant="h6">
                                      Họ tên:{" "}
                                    </Typography>
                                  </Grid>
                                  <Grid item sm={8}>
                                    <Typography variant="subtitle1">
                                      {manager?.hoTen}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container className={classes.allCenter}>
                                  <Grid item sm={4}>
                                    <Typography variant="h6">
                                      Ngày sinh:{" "}
                                    </Typography>
                                  </Grid>
                                  <Grid item sm={8}>
                                    <Typography variant="subtitle1">
                                      {Helper.formatDateToLocal(
                                        manager?.ngaySinh
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                item
                                xs={3}
                                className={classes.allCenter}
                              >
                                <Box>
                                  <img
                                    style={{ height: "150px" }}
                                    src={manager?.hinhAnh}
                                    alt="manager"
                                  ></img>
                                </Box>
                              </Grid>
                            </Paper>
                          </Grid>

                          <Grid
                            item
                            lg={5}
                            xs={5}
                            sx={{ alignContent: "flex-start" }}
                            container
                          >
                            <Grid
                              item
                              xs={12}
                              className={classes.allCenter}
                              sx={{
                                backgroundColor: "primary.main",
                                color: "white",
                                borderRadius: "4px",
                                maxHeight: "2rem",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{ padding: "0.5rem" }}
                              >
                                {"Sân nhà"}
                              </Typography>
                            </Grid>
                            <Grid
                              component={Paper}
                              elevation={3}
                              sx={{ width: "100%", display: "flex" }}
                            >
                              <Grid
                                container
                                item
                                xs={8}
                                className={classes.allCenter}
                                sx={{
                                  alignContent: "center",
                                  paddingLeft: "0.5rem",
                                }}
                              >
                                <Grid
                                  container
                                  className={classes.allCenter}
                                  sx={{}}
                                >
                                  <Grid item sm={4}>
                                    <Typography variant="h6">
                                      Tên sân:{" "}
                                    </Typography>
                                  </Grid>
                                  <Grid item sm={8}>
                                    <Typography variant="subtitle1">
                                      {homeStadium?.tenSan}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  className={classes.allCenter}
                                  sx={{ alignItems: "flex-start" }}
                                >
                                  <Grid item sm={4}>
                                    <Typography variant="h6">
                                      Địa điểm:{" "}
                                    </Typography>
                                  </Grid>
                                  <Grid item sm={8}>
                                    <Typography variant="subtitle1">
                                      {homeStadium?.diaDiem}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                item
                                xs={3}
                                className={classes.allCenter}
                              >
                                <Box
                                  sx={{
                                    paddingTop: "1rem",
                                    paddingBottom: "0.8rem",
                                  }}
                                >
                                  <img
                                    style={{
                                      width: "150px",
                                      borderRadius: "4px",
                                    }}
                                    src={
                                      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Etihad_Stadium.jpg"
                                    }
                                  ></img>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                      <Box sx={{ mt: "1rem", width: "100%" }}>
                        <Typography variant="h6">
                          Danh sách cầu thủ:{" "}
                        </Typography>
                        {players.length > 0 ? (
                          <Box
                            sx={{
                              paddingTop: "1rem",
                              mt: "1rem",
                            }}
                          >
                            <PlayerList playerList={players}></PlayerList>
                          </Box>
                        ) : (
                          <Typography variant="subtitle1">
                            Không có dữ liệu{" "}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid item sm={3}>
                      <Box className={classes.allCenter}>
                        <img
                          style={{ width: "200px" }}
                          src={club.hinhAnh}
                        ></img>
                      </Box>
                      <Box className={classes.allCenter} sx={{ mt: "1rem" }}>
                        <Typography variant="h6">Năm thành lập: </Typography>
                        <Typography variant="subtitle1" sx={{ ml: "0.5rem" }}>
                          {club.namThanhLap}{" "}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
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
