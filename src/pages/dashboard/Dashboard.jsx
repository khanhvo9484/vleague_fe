import React from "react";
import DrawerLayout from "../../layout/DrawerLayout";

import { Box, Grid, Paper, Typography, Grow, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { DashboardOutlined } from "@mui/icons-material";

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
  },
  totalBox: {
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextGameImageBox: {
    backgroundColor: theme.palette.secondary.light,
    border: "2px solid #ffffffff",
    borderRadius: "15px",
    padding: "5px",
    width: "70px",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const Dashboard = () => {
  const authContext = useAuth();
  useEffect(() => {
    document.title = "Dashboard";
  });

  const classes = useStyles();

  const { currentLeague } = useCurrentLeague()
  const [ranking, setRanking] = useState([])
  const [currentPosition, setCurrentPosition] = useState({})
  const [schedule, setSchedule] = useState([])
  const [nextGame, setNextGame] = useState({})
  const [notify, setNotify] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  // console.log(authContext?.auth?.teamId)

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
    if (currentLeague)
    {
      setCurrentPosition(ranking.filter(item => item.id_doibong == authContext?.auth?.teamId)[0])
    }
  }, [ranking])

  useEffect(() => {
    if (currentLeague) {
      let vong = []
      schedule.cacVongDau.map(item => vong.push(...item.cacTranDau))
      const games = vong.filter(item => item.doiNha.id == authContext?.auth?.teamId || item.doiKhach.id == authContext?.auth?.teamId)
      setNextGame(games[currentPosition.tranThang + currentPosition.tranHoa + currentPosition.tranThua])
    }
  }, [schedule])

  console.log(ranking)
  console.log(currentPosition)
  console.log(nextGame)

  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    // { text: "cauthu", icon: <DashboardOutlined />, path: "/dscauthu" },
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
                        <Box className={classes.nextGameRow}>
                          <Typography>
                            {nextGame?.tenVong}
                          </Typography>
                          <Typography>
                            {nextGame?.thoiGianVietNam}
                          </Typography>
                        </Box>
                        <Box className={classes.nextGameRow}>
                          <Typography>
                            {nextGame?.doiNha?.ten}
                          </Typography>
                          <Box className={classes.nextGameImageBox}>
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
                          <Box className={classes.nextGameImageBox}>
                            <img
                              height={60}
                              src={nextGame?.doiKhach?.hinhAnh}
                              alt={`${nextGame?.doiKhach?.ten}`}
                            />
                          </Box>                          
                          <Typography>
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
                        <Box className={`${classes.statisticContentBox} ${classes.totalBox}`}>
                          <Typography variant="body1">
                            Tổng
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
                    {!isLoading && ranking?.map((item) => {
                      return (
                        <li key={item.id_doibong}>{item.ten_doi}</li>
                      )
                    })}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </DrawerLayout>
  );
};

export default Dashboard;
