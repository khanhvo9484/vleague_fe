import DefaultLayout from "../../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import {
  Box,
  Grid,
  Grow,
  Typography,
  Collapse,
  CircularProgress,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import bgImage from "../../../assets/background1.jpg";
import { useParams } from "react-router-dom";
import MyAxios from "../../../api/MyAxios";
import { footballPosition, country } from "../../../data/GlobalConstant";
import Helper from "../../../utils/Helper";
import Pattern from "../../../assets/patterns/playerBGPatterns.png";
import { defaultImage } from "../../../data/GlobalConstant";
const numberStyle = {
  fontWeight: 500,
  fontSize: "15rem",
  lineHeight: "0",
  fontFamily: "'Jost', sans-serif",
};
const nameStyle = {
  fontWeight: 600,
  fontSize: "4rem",
  lineHeight: "3.5rem",
  fontFamily: "'Jost', sans-serif",
};
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
  infoRow: {
    display: "flex",
    // justifyContent: "",
    alignItems: "center",
  },
  personalInfo: {
    color: theme.palette.primary.dark + "!important",
  },
  teamInfo: {
    color: theme.palette.primary.dark + "!important",
  },
  paperContainer: {
    padding: "20px",
    margin: "0 10vw 0 10vw ",
    minHeight: "30vh",
    overflow: "hidden",
    marginTop: "5vh",
  },
}));

const Player = () => {
  const pattern = useProgressiveImage(Pattern);
  const loadedBGImage = useProgressiveImage(bgImage);
  const classes = useStyles();
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [team, setTeam] = useState({});

  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState([]);
  const [loadedPlayerImage, setLoadedPlayerImage] = useState();
  const [loadedTeamImage, setLoadedTeamImage] = useState();
  const [loadedCountryImage, setLoadedCountryImage] = useState();

  useEffect(() => {
    setLoading(true);
    setNotify([]);
    const getPlayer = async () => {
      try {
        const res = await MyAxios.get(`/cauthu`, { params: { id } });
        setPlayer(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setNotify(() => [...error.response.data.message]);
      }
    };
    if (id) {
      getPlayer();
    }
  }, [id]);
  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await MyAxios.get(`/doibong/${player?.idDoi}`);
        setTeam(res.data.data);
      } catch (error) {
        setNotify(() => [...error.response.data.message]);
      }
    };
    if (player?.idDoi) {
      setLoadedCountryImage(
        `https://flagcdn.com/w40/${country
          .find((item) => {
            return (
              item.label == player.quocTich || item.label_vi == player.quocTich
            );
          })
          ?.code.toLowerCase()}.png`
      );
      getTeam();
    }
  }, [player]);
  useEffect(() => {
    setLoadedTeamImage(team?.hinhAnh);
  }, [team]);
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
                  THÔNG TIN CẦU THỦ
                </Typography>
              </Box>

              <Paper
                elevation={8}
                className={classes.paperContainer}
                style={{
                  backgroundImage: `url(${pattern})`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                {loading ? (
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
                {!loading && notify.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30rem",
                    }}
                  >
                    {notify.map((item) => {
                      return (
                        <Typography color={"primary.main"}>{item}</Typography>
                      );
                    })}
                  </Box>
                ) : null}
                <Grid
                  container
                  spacing={0}
                  justifyContent="space-around"
                  sx={{}}
                >
                  {!loading && (
                    <>
                      <Grid item xs={8} sm={8} lg={8} sx={{}} container>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          lg={12}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Box
                            id={"nameBox"}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              position: "absolute",
                              maxHeight: "15rem",
                            }}
                          >
                            <Box
                              sx={{
                                zIndex: "2",
                                position: "relative",
                                display: "flex",
                                justifyContent: " flex-start",
                              }}
                            >
                              <p
                                style={{
                                  color: "rgba(24, 64, 134, 1)",
                                  ...nameStyle,
                                }}
                              >
                                {player?.hoTen}
                              </p>
                            </Box>

                            <Box
                              sx={{
                                zIndex: "1",
                                position: "relative",
                                display: "flex",
                                justifyContent: " flex-end",
                                marginLeft:
                                  parseInt(player?.soAo) / 10 < 1
                                    ? "-80px"
                                    : "-150px",
                              }}
                            >
                              <p
                                style={{
                                  color: "rgba(168, 188, 255, 0.631)",

                                  ...numberStyle,
                                }}
                              >
                                {player?.soAo}
                              </p>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                          <Box
                            sx={{
                              marginTop: "15rem",
                            }}
                          >
                            <Paper elevation={7} sx={{ padding: "2rem" }}>
                              <Grid
                                container
                                spacing={0}
                                sx={{
                                  justifyContent: "flex-start",
                                }}
                                className={classes.personalInfo}
                              >
                                <Grid item xs={6} sm={6} lg={6} container>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={3} sm={3} lg={3}>
                                      <Typography variant="h6">
                                        Ngày sinh:{" "}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9} lg={9}>
                                      <Typography variant="subtitle1">
                                        {Helper.formatDateToLocal(
                                          player.ngaySinh
                                        )}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={3} sm={3} lg={3}>
                                      <Typography variant="h6">
                                        Tuổi:{" "}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9} lg={9}>
                                      <Typography variant="subtitle1">
                                        {player.age}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={3} sm={3} lg={3}>
                                      <Typography variant="h6">
                                        Quốc tịch:{" "}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9} lg={9}>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography variant="subtitle1">
                                          {player.quocTich}
                                          {"  "}
                                        </Typography>
                                        <Box sx={{ marginLeft: "0.5rem" }}>
                                          <img
                                            src={loadedCountryImage}
                                            style={{
                                              width: "30px",
                                              borderRadius: "4px",
                                            }}
                                          ></img>
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={3} sm={3} lg={3}>
                                      <Typography variant="h6">
                                        Quê quán:{" "}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9} lg={9}>
                                      <Typography variant="subtitle1">
                                        {player.queQuan}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={4} sm={4} lg={4}>
                                      <Typography variant="h6">
                                        Mã định danh:
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8}>
                                      <Typography variant="subtitle1">
                                        {player.maDinhDanh}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  sm={6}
                                  lg={6}
                                  container
                                  className={classes.personalInfo}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={4} sm={4} lg={4}>
                                      <Typography variant="h6">
                                        Số áo:{" "}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8}>
                                      <Typography variant="subtitle1">
                                        {player.soAo}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={4} sm={4} lg={4}>
                                      <Typography variant="h6">
                                        Trạng thái:
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8}>
                                      <Typography variant="subtitle1">
                                        {player.trangThai}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    className={classes.infoRow}
                                  >
                                    <Grid item xs={4} sm={4} lg={4}>
                                      <Typography variant="h6">
                                        Loại cầu thủ:
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8}>
                                      <Typography variant="subtitle1">
                                        {player.loaiCauThu}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    lg={12}
                                    container
                                    sx={{
                                      alignItems: "flex-start",
                                      marginTop: "0.2rem  ",
                                    }}
                                  >
                                    <Grid item xs={4} sm={4} lg={4}>
                                      <Typography variant="h6">
                                        Vị trí:{" "}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8} container>
                                      {player?.viTri &&
                                        player.viTri.map((vt, index) => {
                                          return (
                                            <Grid
                                              key={index}
                                              item
                                              xs={12}
                                              sm={12}
                                              lg={12}
                                            >
                                              <Typography variant="subtitle1">
                                                {footballPosition[vt]}
                                                {/* {vt} */}
                                              </Typography>
                                            </Grid>
                                          );
                                        })}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Box>
                        </Grid>
                        {team && (
                          <Grid item xs={12} sm={12} lg={12}>
                            <Box>
                              <Paper
                                elevation={7}
                                sx={{ marginTop: "1rem", padding: "2rem" }}
                              >
                                <Grid
                                  container
                                  item
                                  xs={12}
                                  sm={12}
                                  lg={12}
                                  className={classes.teamInfo}
                                >
                                  <Grid item xs={6} sm={6} lg={6}>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      lg={12}
                                      container
                                      className={classes.infoRow}
                                    >
                                      <Grid item xs={5} sm={5} lg={5}>
                                        <Typography variant="h6">
                                          Thuộc đội tuyển:{" "}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={7} sm={7} lg={7}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "30px",
                                              borderRadius: "4px",
                                              marginRight: "0.5rem",
                                              // marginLeft: "0.5rem",
                                            }}
                                            src={loadedTeamImage}
                                          ></img>
                                          <Typography variant="subtitle1">
                                            {team.ten}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      lg={12}
                                      container
                                      className={classes.infoRow}
                                    >
                                      <Grid item xs={5} sm={5} lg={5}>
                                        <Typography variant="h6">
                                          Tổng số bàn thắng:{" "}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={7} sm={7} lg={7}>
                                        <Typography variant="subtitle1">
                                          {player.tongSoBanThang}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={6} sm={6} lg={6}>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      lg={12}
                                      container
                                      className={classes.infoRow}
                                    >
                                      <Grid item xs={5} sm={5} lg={5}>
                                        <Typography variant="h6">
                                          Thời điểm bắt đầu:{" "}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={7} sm={7} lg={7}>
                                        <Typography variant="subtitle1">
                                          {player.thoiDiemBatDau
                                            ? player.thoiDiemBatDau
                                            : "Chưa cập nhật"}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      lg={12}
                                      container
                                      className={classes.infoRow}
                                    >
                                      <Grid item xs={5} sm={5} lg={5}>
                                        <Typography variant="h6">
                                          Thời điểm kết thúc:{" "}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={7} sm={7} lg={7}>
                                        <Typography variant="subtitle1">
                                          {player.thoiDiemBatDau
                                            ? player.thoiDiemKetThuc
                                            : "Chưa cập nhật"}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={4} sm={4} lg={4} sx={{}}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "2rem",
                          }}
                        >
                          <img
                            style={{ width: "20rem" }}
                            src={player.hinhAnh}
                          ></img>
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Player;
