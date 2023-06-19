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
  const [isStart, setIsStart] = useState(false)
  const [ranking, setRanking] = useState([])
  const [currentPosition, setCurrentPosition] = useState({})
  const [schedule, setSchedule] = useState([])
  const [nextGame, setNextGame] = useState({})
  const [notify, setNotify] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        setIsLoading(true)
        const res = await MyAxios.get(`/muagiai?page=1&limit=2&keyword&trangthai=1`)
        const temp = res.data.data.listResult.filter(item => item.id == currentLeague?.id)
        setIsStart(!(temp.length == 0))
        setIsLoading(false)
      } catch (error) {
        setNotify(() => [...error.response.data.message])
      }
    }
    if (currentLeague) {
      getStatus()
    }
  }, [currentLeague])

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
    if (currentLeague && isStart) {
      getRanking()
    }
  }, [currentLeague])

  useEffect(() => {
    if (currentLeague && isStart) {
      setCurrentPosition(ranking.filter(item => item.id_doibong == authContext?.auth?.teamId)[0])
    }
  }, [ranking])

  useEffect(() => {
    if (currentLeague && isStart) {
      let vong = []
      schedule.cacVongDau.map(item => vong.push(...item.cacTranDau))
      const games = vong.filter(item => item.doiNha.id == authContext?.auth?.teamId || item.doiKhach.id == authContext?.auth?.teamId)
      setNextGame(games[currentPosition.tranThang + currentPosition.tranHoa + currentPosition.tranThua])
    }
  }, [schedule])

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
            </Grid>
          </Box>
        </Box>
      </Box>
    </DrawerLayout>
  );
};

export default Dashboard;
