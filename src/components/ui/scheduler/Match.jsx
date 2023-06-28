import useCurrentLeague from "../../../hooks/useCurrentLeague";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Grid,
  Grow,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { List, ListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Helper from "../../../utils/Helper";

const useStyles = makeStyles((theme) => ({
  matchList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "blueBackground.light",
    borderRadius: "0 0 4px 4px",
  },
  scorelineBox: {
    backgroundColor: theme.palette.primary.main,
    width: "50px",
    height: "50px",
    mr: "0.5rem",
    ml: "0.5rem",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  matchCard: {
    display: "flex",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Ensure the parent Box is positioned relatively
    overflow: "hidden", // Clip the overflowed content
  },
  endedMatchStamp: {
    position: "absolute",
    top: "0",
    right: "0",
    borderRadius: "px",
    outline: "2px solid gray",
    mt: "0.2rem",
    mr: "0.2rem",
  },
  gridItemFlexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  gridItemFlexStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));
const Match = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { currentMatchDay, currentSchedule } = useCurrentLeague();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
  }, [currentMatchDay]);
  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);
  return (
    <List className={classes.matchList}>
      {currentMatchDay?.cacTranDau.map((match, index) => {
        return (
          <ListItem key={index} sx={{}}>
            <Grow
              key={JSON.stringify(currentMatchDay)}
              in={!isLoading}
              {...(!isLoading
                ? { timeout: index == 0 ? 500 : index * 1000 }
                : {})}
            >
              <Paper key={index} elevation={3} sx={{ width: "100%" }}>
                <Box className={classes.matchCard}>
                  {match?.ketQuaTranDau?.trangThai == "Đã kết thúc" && (
                    <Box className={classes.endedMatchStamp}>
                      <Typography
                        variant="body3"
                        sx={{
                          padding: "0rem 0.5rem 0rem 0.5rem",
                          color: "gray",
                        }}
                      >
                        Đã kết thúc
                      </Typography>
                    </Box>
                  )}
                  <Grid container spacing={0} justifyContent="center">
                    <Grid
                      item
                      xs={5}
                      className={classes.gridItemFlexEnd}
                      sx={{ mr: "0.5rem" }}
                    >
                      <Box>
                        <Typography variant="h5">{match.doiNha.ten}</Typography>
                      </Box>
                      <Box sx={{ padding: "1rem" }}>
                        <img
                          style={{ width: "40px" }}
                          src={match.doiNha.hinhAnh}
                        ></img>
                      </Box>
                      <Box
                        className={classes.scorelineBox}
                        sx={{
                          boxShadow:
                            match?.ketQuaTranDau?.sbtDoiNha >
                            match?.ketQuaTranDau?.sbtDoiKhach
                              ? `inset 0px -5px 0px 0px ${theme.palette.success.main}`
                              : "none",
                        }}
                      >
                        <Typography variant="h2" sx={{ color: "white" }}>
                          {match?.ketQuaTranDau?.sbtDoiNha !== null
                            ? match?.ketQuaTranDau?.sbtDoiNha
                            : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      className={classes.gridItemFlexStart}
                      sx={{ ml: "0.5rem" }}
                    >
                      <Box
                        className={classes.scorelineBox}
                        sx={{
                          boxShadow:
                            match?.ketQuaTranDau?.sbtDoiKhach >
                            match?.ketQuaTranDau?.sbtDoiNha
                              ? `inset 0px -5px 0px 0px ${theme.palette.success.main}`
                              : "none",
                        }}
                      >
                        <Typography variant="h2" sx={{ color: "white" }}>
                          {match?.ketQuaTranDau?.sbtDoiKhach !== null
                            ? match?.ketQuaTranDau?.sbtDoiKhach
                            : "-"}
                        </Typography>
                      </Box>
                      <Box sx={{ padding: "1rem" }}>
                        <img
                          style={{ width: "40px" }}
                          src={match.doiKhach.hinhAnh}
                        ></img>
                      </Box>
                      <Box>
                        <Typography variant="h5">
                          {match.doiKhach.ten}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container spacing={0} justifyContent="space-around">
                  <Grid
                    sx={{ justifyContent: "center", display: "flex" }}
                    item
                    xs={12}
                  >
                    <Typography>
                      {Helper.formatDateToVNDate(match?.thoiGianVietNam)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Box sx={{ mr: "4rem" }}>
                      {match?.ketQuaTranDau?.dsBanThang &&
                        match?.ketQuaTranDau?.dsBanThang.map((goal, index) => (
                          <Typography key={index}>
                            {goal?.idDoi === match?.ketQuaTranDau?.idDoiNha
                              ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                              : null}
                          </Typography>
                        ))}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Box sx={{ ml: "4rem" }}>
                      {match?.ketQuaTranDau?.dsBanThang &&
                        match?.ketQuaTranDau?.dsBanThang.map((goal, index) => (
                          <Typography key={index}>
                            {goal?.idDoi === match?.ketQuaTranDau?.idDoiKhach
                              ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                              : null}
                          </Typography>
                        ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grow>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Match;
