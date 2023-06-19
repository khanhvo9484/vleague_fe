import React from "react";
import DrawerLayout from "../../layout/DrawerLayout";

import { Box, Grid, Paper, Typography, CircularProgress, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Grow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { DashboardOutlined, GroupsSharp } from "@mui/icons-material";

import League from "../../components/ui/league/League";
import versus from "../../assets/vs.png";

import MyAxios from "../../api/MyAxios";

import useAuth from "../../hooks/useAuth";
import useCurrentLeague from "../../hooks/useCurrentLeague";

const contentStyle = {
  zIndex: 2,
  width: "100%",
  position: "relative",
  paddingTop: "20px",
};
const useStyles = makeStyles((theme) => ({
  title: {
    margin: "15px",
    padding: "10px",
  },
  boxContent: {
    marginTop: "10px",
  },
  boxContainer: {
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "15px 15px 30px #d9d9d9ff",
    backgroundColor: theme.palette.blueBackground.light,
    marginBottom: "20px",
    border: "2px solid #ffffffff",
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "20vh",
  },
  statisticBox: {
    marginTop: "15px",
    padding: "15px",
    border: "2px solid #ffffffff",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.secondary.light,
  },
  borderRightBox: {
    borderRight: "2px solid #ffffffff",
    paddingRight: "30px!important",
  },
  statisticContentBox: {
    textTransform: "uppercase",
    textAlign: "center",
    padding: "10px",
  },
  statisticNumber: {
    paddingTop: "10px",
    fontSize: "1.5rem!important",
  },
  title1: {
    color: theme.palette.secondary.main,
  },
  nextGameBox: {
    textAlign: "center",
  },
  nextGameRow: {
    maxWidth: "600px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "5px",
    marginRight: "25px",
    marginLeft: "25px",
  },
  imageBox: {
    backgroundColor: theme.palette.secondary.light,
    border: "2px solid #ffffffff",
    borderRadius: "15px",
    padding: "5px",
    width: "70px",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextGameTeam: {
    color: theme.palette.primary.dark,
    fontSize: "1.2rem!important",
    width: "100px",
  },
  nextGameTimeBox: {
    justifyContent: "center",
  },
  nextGameTime: {
    color: theme.palette.text.secondary,
    fontSize: "1.2rem!important",
    paddingTop: "5px",
    paddingBottom: "5px",
    marginLeft: "30px!important",
  },
  rankingHeadText: {
    color: theme.palette.primary.light,
    fontWeight: "bold!important",
  },
  rankingHeadRow: {
    backgroundColor: theme.palette.primary.dark,
    border: "2px solid #ffffffff",
  },
  rankingBodyRow:
  {
    backgroundColor: theme.palette.secondary.light,
    border: "2px solid #ffffffff!important",
    "&:hover": {
      backgroundColor: theme.palette.blueBackground.dark,
    }
  },
  rankingBodyText: {
    color: theme.palette.text.secondary,
    fontSize: "1rem!important",
  },
  rankingBodyText1: {
    color: theme.palette.primary.main,
    fontSize: "1rem!important",
  }
}));

const Dashboard = () => {
  const authContext = useAuth();
  useEffect(() => {
    document.title = "Dashboard";
  });

  const classes = useStyles();

  const { currentLeague } = useCurrentLeague()
  const [isStart, setIsStart] = useState(true)
  const [ranking, setRanking] = useState([])
  const [currentPosition, setCurrentPosition] = useState({})
  const [schedule, setSchedule] = useState([])
  const [nextGame, setNextGame] = useState({})
  const [notify, setNotify] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNotify([])
    const getRanking = async () => {
      try {
        setIsLoading(true)
        const res = await MyAxios.get(`/muagiai/${currentLeague?.id}/ranking`)
        setRanking(res.data.data)
        const res1 = await MyAxios.get(`/lichthidau/${currentLeague?.id}`)
        setSchedule(res1.data.data)
        setIsLoading(false)
      } catch (error) {
        setNotify(() => [...error.response.data.message])
      }
    }
    if (currentLeague) {
      getRanking()
    }
  }, [currentLeague])

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await MyAxios.get(`/muagiai?page=1&limit=2&keyword&trangthai=1`)
        const temp = res.data.data.listResult.filter(item => item.id == currentLeague?.id)
        setIsStart(!(temp.length == 0))
      } catch (error) {
        setNotify(() => [...error.response.data.message])
      }
    }
    if (currentLeague) {
      getStatus()
    }
  }, [currentLeague])

  useEffect(() => {
    if (currentLeague) {
      setCurrentPosition(ranking?.filter(item => item.id_doibong == authContext?.auth?.teamId)[0])
    }
  }, [ranking])

  useEffect(() => {
    if (currentLeague) {
      let vong = []
      schedule?.cacVongDau?.map(item => vong.push(...item.cacTranDau))
      const games = vong.filter(item => item.doiNha.id == authContext?.auth?.teamId || item.doiKhach.id == authContext?.auth?.teamId)
      setNextGame(games[currentPosition.tranThang + currentPosition.tranHoa + currentPosition.tranThua])
    }
  }, [schedule])

  console.log(ranking)

  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { text: "Đội hình", icon: <GroupsSharp />, path: "/dashboard/squad" },
  ];
  return (
    <DrawerLayout menuItems={menuItems}>
      <Box>
        <Box style={contentStyle}>
          <Typography variant="h2" className={classes.title}>
            Dashboard
          </Typography>
          <Box className={classes.boxContent}>
            <Grid container spacing={1} justifyContent="space-around">
              <Grid item xs={12} sm={5} lg={3}>
                <League />
              </Grid>
              <Grid item xs={12} sm={6} lg={8}>
                {!isStart ? (
                  <Box className={classes.boxContainer}>
                    <Typography variant="h5" className={classes.title1} sx={{ textAlign: "center" }}>
                      Mùa giải chưa bắt đầu
                    </Typography>
                  </Box>
                ) :
                  (<>
                    <Box className={classes.boxContainer}>
                      <Typography variant="h5" className={classes.title1}>
                        Trận đấu tiếp theo
                      </Typography>
                      <Box>
                        {isLoading ? (
                          <Box className={classes.loadingBox}>
                            <CircularProgress />
                          </Box>
                        ) : null}
                        {
                          !isLoading &&
                          <Box className={classes.nextGameBox}>
                            <Box className={`${classes.nextGameRow} ${classes.nextGameTimeBox}`}>
                              <Box className={classes.borderRightBox}>
                                <Typography variant="body1" className={classes.nextGameTime}>
                                  {nextGame?.tenVong}
                                </Typography>
                              </Box>
                              <Typography variant="body1" className={classes.nextGameTime}>
                                {nextGame?.thoiGianVietNam}
                              </Typography>
                            </Box>
                            <Box className={classes.nextGameRow}>
                              <Typography variant="h6" className={classes.nextGameTeam}>
                                {nextGame?.doiNha?.ten}
                              </Typography>
                              <Box className={classes.imageBox}>
                                <img
                                  height={60}
                                  src={nextGame?.doiNha?.hinhAnh}
                                  alt={`${nextGame?.doiNha?.ten}`}
                                />
                              </Box>
                              <img
                                height={40}
                                src={versus}
                                alt="vs"
                              />
                              <Box className={classes.imageBox}>
                                <img
                                  height={60}
                                  src={nextGame?.doiKhach?.hinhAnh}
                                  alt={`${nextGame?.doiKhach?.ten}`}
                                />
                              </Box>
                              <Typography variant="h6" className={classes.nextGameTeam}>
                                {nextGame?.doiKhach?.ten}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      </Box>
                    </Box>
                    <Box className={classes.boxContainer}>
                      <Typography variant="h5" className={classes.title1}>
                        Thống kê
                      </Typography>
                      <Box>
                        {isLoading ? (
                          <Box className={classes.loadingBox}>
                            <CircularProgress />
                          </Box>
                        ) : null}
                        {
                          !isLoading &&
                          <Box className={classes.statisticBox}>
                            <Box className={`${classes.statisticContentBox} ${classes.borderRightBox}`}>
                              <Typography variant="body1">
                                Số trận
                              </Typography>
                              <Typography variant="h6" className={classes.statisticNumber}>
                                {currentPosition ? currentPosition.tranThang + currentPosition.tranHoa + currentPosition.tranThua : <>Không</>}
                              </Typography>
                            </Box>
                            <Box className={classes.statisticContentBox}>
                              <Typography variant="body1">
                                Thắng
                              </Typography>
                              <Typography variant="h6" className={classes.statisticNumber}>
                                {currentPosition ? currentPosition.tranThang : <>Không</>}
                              </Typography>
                            </Box>
                            <Box className={classes.statisticContentBox}>
                              <Typography variant="body1">
                                Hoà
                              </Typography>
                              <Typography variant="h6" className={classes.statisticNumber}>
                                {currentPosition ? currentPosition.tranHoa : <>Không</>}
                              </Typography>
                            </Box>
                            <Box className={classes.statisticContentBox}>
                              <Typography variant="body1">
                                Thua
                              </Typography>
                              <Typography variant="h6" className={classes.statisticNumber}>
                                {currentPosition ? currentPosition.tranThua : <>Không</>}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      </Box>
                    </Box>
                    <Box className={classes.boxContainer}>
                      <Typography variant="h5" className={classes.title1}>
                        Bảng xếp hạng
                      </Typography>
                      <Box>
                        {isLoading ? (
                          <Box className={classes.loadingBox}>
                            <CircularProgress />
                          </Box>
                        ) : null}
                        {!isLoading &&
                          <TableContainer sx={{ marginTop: "15px", borderRadius: "15px" }}>
                            <Table>
                              <TableHead>
                                <TableRow className={classes.rankingHeadRow}>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      #
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      Đội bóng
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      MP
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      W
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      D
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      L
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      GF:GA
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      GD
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1" className={classes.rankingHeadText}>
                                      PTS
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {ranking?.map(((doi, index) => (
                                  <Grow
                                    in={!isLoading}
                                    {...(!isLoading ? { timeout: index * 800 } : {})}
                                    key={index}
                                  >
                                    <TableRow className={classes.rankingBodyRow}>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.xephang}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Box sx={{
                                          display: "flex",
                                          alignItems: "center"
                                        }}>
                                          <Box className={classes.imageBox} sx={{ width: 30, height: 30, marginRight: "15px" }}>
                                            <img
                                              src={doi.hinhAnh}
                                              height={25}
                                              alt={doi.ten_doi}
                                            />
                                          </Box>
                                          {
                                            doi.id_doibong == authContext?.auth?.teamId ?
                                              (
                                                <Typography variant="body2" className={classes.rankingBodyText1}
                                                  sx={{ fontWeight: "bold", fontSize: "1.1rem!important", color: "#04476a" }}>
                                                  {doi.ten_doi}
                                                </Typography>
                                              ) :
                                              (
                                                <Typography variant="body2" className={classes.rankingBodyText1}>
                                                  {doi.ten_doi}
                                                </Typography>
                                              )
                                          }
                                        </Box>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.tranThang + doi.tranHoa + doi.tranThua}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.tranThang}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.tranHoa}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.tranThua}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.phaLuoi} : {doi.thungLuoi}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="body2" className={classes.rankingBodyText}>
                                          {doi.hieuSo}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          doi.id_doibong == authContext?.auth?.teamId ?
                                            (
                                              <Typography variant="body2" className={classes.rankingBodyText1}
                                                sx={{ fontWeight: "bold", fontSize: "1.1rem!important", color: "#04476a" }}>
                                                {doi.diem}
                                              </Typography>
                                            ) :
                                            (
                                              <Typography variant="body2" className={classes.rankingBodyText1}>
                                                {doi.diem}
                                              </Typography>
                                            )
                                        }

                                      </TableCell>
                                    </TableRow>
                                  </Grow>
                                )))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        }
                      </Box>
                    </Box>
                  </>
                  )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </DrawerLayout>
  );
};

export default Dashboard;
