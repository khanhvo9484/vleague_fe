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
import Match from "./Match";

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
  const { currentSchedule, setCurrentMatchDay } = useCurrentLeague();
  const showedItem = 6;
  const [isShowItem, setIsShowItem] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMatchDay, setSelectedMatchDay] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (currentSchedule) {
      setSelectedMatchDay(currentSchedule[0]?.id);
      setIsLoading(true);
    }
  }, [currentSchedule]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  const handleNexPage = () => {
    setIsLoading(true);
    if (currentPage + 1 < currentSchedule?.length / showedItem) {
      setCurrentPage((prv) => prv + 1);
    }
  };
  const handlePrevPage = () => {
    setIsLoading(true);
    if (currentPage > 0) {
      setCurrentPage((prv) => prv - 1);
    }
  };
  const handleSelectMatchDay = async (e) => {
    setSelectedMatchDay(e.currentTarget.id);
  };
  useEffect(() => {
    if (currentSchedule) {
      setSelectedMatchDay(currentSchedule[0]?.id);
    }
  }, [currentPage]);
  useEffect(() => {
    if (currentSchedule && selectedMatchDay) {
      setCurrentMatchDay(currentSchedule.find((x) => x.id == selectedMatchDay));
    }
  }, [selectedMatchDay]);
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
                in={!isLoading}
                {...(!isLoading
                  ? { timeout: index == 0 ? 200 : index * 300 }
                  : {})}
                key={JSON.stringify(currentSchedule + index + selectedMatchDay)}
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
      <Match />
    </Box>
  );
};

export default MatchDay;
