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
  TextField,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { List, ListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Helper from "../../../utils/Helper";
import CustomTextField from "../CustomTextField";
import MatchCard from "./MatchCard";
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
    top: "8px",
    right: "5px",
    borderRadius: "10px",
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
const Match = (props) => {
  const classes = useStyles();
  const {
    currentMatchDay,
    background,
    isEditable,
    setIsEditable,
    changeList,
    setChangeList,
    isSave,
    showDetail,
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);
  return (
    <List className={classes.matchList}>
      {currentMatchDay &&
        currentMatchDay?.cacTranDau?.map((match, index) => {
          return (
            <ListItem key={match?.id}>
              <MatchCard
                match={match}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                changeList={changeList}
                setChangeList={setChangeList}
                isSave={isSave}
                showDetail={showDetail}
              />
            </ListItem>
          );
        })}
    </List>
  );
};

export default Match;
