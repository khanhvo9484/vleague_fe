import React from "react";
import DrawerLayout from "../../layout/DrawerLayout";

import { Box, Grid, Paper, Typography, Grow, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { DashboardOutlined } from "@mui/icons-material";

import League from "../../components/ui/league/League";

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
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-around",
  }
}));

const Dashboard = () => {
  const authContext = useAuth();
  useEffect(() => {
    document.title = "Dashboard";
  });

  const classes = useStyles();

  const [ranking, setRanking] = useState([])
  const [currentPosition, setCurrentPosition] = useState({})
  const { currentLeague } = useCurrentLeague()
  const [notify, setNotify] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  // console.log(authContext?.auth?.teamId)

  useEffect(() => {
    setNotify([])
    const getRanking = async () => {
      try {
        setIsLoading(true)
        const res = await MyAxios.get(`/muagiai/${currentLeague?.id}/ranking`)
        setRanking(res.data.data);
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
    setCurrentPosition(ranking.filter(item => item.id_doibong == authContext?.auth?.teamId)[0])
  }, [ranking])

  console.log(ranking)
  console.log(currentPosition)

  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
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
                  <Typography variant="h5">
                    Trận đấu tiếp theo
                  </Typography>
                  <Box>
                    {isLoading ? (
                      <Box className={classes.loadingBox}>
                        <CircularProgress />
                      </Box>
                    ) : null}
                  </Box>
                </Box>
                <Box className={classes.boxContainer}>
                  <Typography variant="h5">
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
                        <Box>
                          <Typography variant="body1">
                            Tổng
                          </Typography>
                          <Typography variant="h6">
                            {currentPosition? currentPosition.tranThang + currentPosition.tranHoa + currentPosition.tranThua : <>Không</>}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Thắng
                          </Typography>
                          <Typography variant="h6">
                            {currentPosition? currentPosition.tranThang : <>Không</>}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Hoà
                          </Typography>
                          <Typography variant="h6">
                            {currentPosition? currentPosition.tranHoa : <>Không</>}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Thua
                          </Typography>
                          <Typography variant="h6">
                            {currentPosition? currentPosition.tranThua : <>Không</>}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  </Box>
                </Box>
                <Box className={classes.boxContainer}>
                  <Typography variant="h5">
                    Bảng xếp hạng
                  </Typography>
                  <Box>
                    {isLoading ? (
                      <Box className={classes.loadingBox}>
                        <CircularProgress />
                      </Box>
                    ) : null}
                    {!isLoading && ranking.map((item) => {
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
