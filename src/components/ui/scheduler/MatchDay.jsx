import useCurrentLeague from "../../../hooks/useCurrentLeague";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Grid,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import teamLogo from "../../../data/GlobalConstant";
import { List, ListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Helper from "../../../utils/Helper";
const useStyles = makeStyles((theme) => ({
  matchDayContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  matchDay: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
      outline: "2px solid white",
    },
    borderRadius: "4px",
    margin: "0.5rem",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: "white",
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[3],
  },
  selectedMatchDay: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));
const MatchDay = () => {
  const classes = useStyles();
  const { currentSchedule } = useCurrentLeague();
  const showedItem = 6;
  const [isShowItem, setIsShowItem] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMatchDay, setSelectedMatchDay] = useState();
  useEffect(() => {
    if (currentSchedule) {
      setSelectedMatchDay(currentSchedule[0]?.id);
      setIsShowItem(true);
    }
  }, [currentSchedule]);
  const handleNexPage = () => {
    if (currentPage + 1 < currentSchedule.length / showedItem) {
      setCurrentPage((prv) => prv + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prv) => prv - 1);
    }
  };
  const handleSelectMatchDay = (e) => {
    setSelectedMatchDay(e.currentTarget.id);
  };
  useEffect(() => {
    if (currentSchedule) {
      setSelectedMatchDay(currentSchedule[0]?.id);
    }
  }, [currentPage]);
  let theme = useTheme();
  return (
    <Box sx={{}}>
      <Paper
        elevation={3}
        className={classes.matchDayContainer}
        sx={{ backgroundColor: "blueBackground.main" }}
      >
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{
            "&:disabled": {
              backgroundColor: "disabledBackground.main",
            },
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            borderRadius: "4px",
            backgroundColor: "primary.main",
            color: "white",
            width: "2rem",
            height: "2rem",
            margin: "0.5rem",
          }}
        >
          <ChevronLeft />
        </IconButton>
        {currentSchedule &&
          currentSchedule
            .slice(
              currentPage * showedItem,
              currentPage * showedItem + showedItem
            )
            .map((matchDay, index) => (
              <Collapse
                in={isShowItem}
                timeout={300 * index}
                key={index}
                orientation="horizontal"
              >
                <Box
                  key={index}
                  id={matchDay.id}
                  onClick={handleSelectMatchDay}
                  className={`${classes.matchDay} ${
                    matchDay.id == selectedMatchDay
                      ? classes.selectedMatchDay
                      : ""
                  }`}
                >
                  <Typography
                    variant="h6"
                    noWrap={true}
                    sx={{ padding: "0.5rem" }}
                  >
                    {matchDay.tenVong}
                  </Typography>
                </Box>
              </Collapse>
            ))}
        <IconButton
          onClick={handleNexPage}
          disabled={currentPage + 1 >= currentSchedule.length / showedItem}
          sx={{
            "&:disabled": {
              backgroundColor: "disabledBackground.main",
            },
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            borderRadius: "4px",
            backgroundColor: "primary.main",
            color: "white",
            width: "2rem",
            height: "2rem",
            margin: "0.5rem",
          }}
        >
          <ChevronRight />
        </IconButton>
      </Paper>
      {/* Matchs */}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "blueBackground.light",
          borderRadius: "0 0 4px 4px",
        }}
      >
        {currentSchedule &&
          currentSchedule
            .find((matchDay) => matchDay.id == selectedMatchDay)
            ?.cacTranDau.map((match, index) => {
              return (
                <ListItem key={index} sx={{}}>
                  <Paper key={index} elevation={3} sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        margin: "0",
                        // padding: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative", // Ensure the parent Box is positioned relatively
                        overflow: "hidden", // Clip the overflowed content
                      }}
                    >
                      {match?.ketQuaTranDau?.trangThai == "Đã kết thúc" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            borderRadius: "20px",
                            outline: "2px solid gray",
                            mt: "0.5rem",
                            mr: "0.5rem",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ padding: "0.3rem", color: "gray" }}
                          >
                            Đã kết thúc
                          </Typography>
                        </Box>
                      )}
                      <Box>
                        <Typography variant="h5">{match.doiNha.ten}</Typography>
                      </Box>
                      <Box sx={{ padding: "1rem" }}>
                        <img
                          style={{ width: "50px" }}
                          src={teamLogo.logo1}
                        ></img>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "primary.main",
                          width: "50px",
                          height: "50px",
                          mr: "0.5rem",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
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
                      <Box
                        sx={{
                          backgroundColor: "primary.main",
                          width: "50px",
                          height: "50px",
                          ml: "0.5rem",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
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
                          style={{ width: "50px" }}
                          src={teamLogo.logo2}
                        ></img>
                      </Box>
                      <Box>
                        <Typography variant="h5">
                          {match.doiKhach.ten}
                        </Typography>
                      </Box>
                    </Box>
                    <Grid container spacing={0} justifyContent="space-around">
                      <Grid
                        sx={{ justifyContent: "center", display: "flex" }}
                        item
                        xs={12}
                      >
                        <Typography>
                          {Helper.formatDateToLocal(match.thoiGian)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Box sx={{ mr: "4rem" }}>
                          {match?.ketQuaTranDau?.dsBanThang &&
                            match?.ketQuaTranDau?.dsBanThang.map(
                              (goal, index) => (
                                <Typography key={index}>
                                  {goal?.idDoi ===
                                  match?.ketQuaTranDau?.idDoiNha
                                    ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                                    : null}
                                </Typography>
                              )
                            )}
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        <Box sx={{ ml: "4rem" }}>
                          {match?.ketQuaTranDau?.dsBanThang &&
                            match?.ketQuaTranDau?.dsBanThang.map(
                              (goal, index) => (
                                <Typography key={index}>
                                  {goal?.idDoi ===
                                  match?.ketQuaTranDau?.idDoiKhach
                                    ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                                    : null}
                                </Typography>
                              )
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </ListItem>
              );
            })}{" "}
      </List>
    </Box>
  );
};

export default MatchDay;
