import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, List, ListItem, Box, Typography, Button } from "@mui/material";
import MyAxios from "../../../api/MyAxios";
import teamLogo from "../../../data/GlobalConstant";
import Helper from "../../../utils/Helper";
import { CircularProgress, Grow, IconButton } from "@mui/material";
import {
  ExpandLess as ShowLess,
  ExpandMore as ShowMore,
} from "@mui/icons-material";
import useCurrentLeague from "../../../hooks/useCurrentLeague";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "4px 4px 0 0",
    border: "2px solid",
    borderColor: theme.palette.primary.light,
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40vh",
  },
  leagueList: {
    backgroundColor: theme.palette.blueBackground.main,
    borderRadius: "0 0 4px 4px",
  },
  leagueItem: {
    display: "flex",
    cursor: "pointer",
    minHeight: "80px",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  leaguePaper: {
    "&:hover": {
      outline: "2px solid",
      borderColor: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
    width: "100%",
    padding: "0",
  },
  leaguePaperSelected: {
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));
const showedItem = 4;
const League = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(null);
  const { currentLeague, setCurrentLeague } = useCurrentLeague();

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        setIsLoading(true);
        const response = await MyAxios.get("/muagiai", {
          params: { page: 1, limit: 100 },
        });
        if (response.status === 200 && response?.data?.data?.listResult) {
          setListItem(response.data.data.listResult);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListItems();
  }, []);
  useEffect(() => {
    if (listItem.length > 0) {
      setCurrentSelected(listItem[0].id);
    }
  }, [listItem]);
  const handleShowMore = () => {
    if (currentPage * showedItem + showedItem < listItem.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleShowLess = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleSelect = (e) => {
    setCurrentSelected(e.currentTarget.id);
  };
  useEffect(() => {
    setCurrentLeague(
      listItem.find((item) => {
        return item.id == currentSelected;
      }) || null
    );
  }, [currentSelected]);

  return (
    <Paper elevation={3}>
      <Typography className={classes.title} variant="h3">
        Mùa giải hiện tại
      </Typography>
      <List className={classes.leagueList}>
        {isLoading ? (
          <Box className={classes.loadingBox}>
            <CircularProgress />
          </Box>
        ) : null}

        {!isLoading &&
          listItem
            .slice(
              currentPage * showedItem,
              currentPage * showedItem + showedItem
            )
            .map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  sx={{
                    borderRadius: item == listItem.length ? "0 0 4px 4px" : "0",
                  }}
                  className={`${classes.leagueItem}`}
                >
                  {/* ... Render item content here */}
                  <Grow
                    in={!isLoading}
                    {...(!isLoading ? { timeout: index * 1000 } : {})}
                  >
                    <Paper
                      key={item.id}
                      id={item.id}
                      onClick={handleSelect}
                      sx={{
                        backgroundColor:
                          item.id == currentSelected ? "primary.main" : "",
                        color: item.id == currentSelected ? "white" : "",
                      }}
                      className={classes.leaguePaper}
                      elevation={4}
                    >
                      <Box sx={{ padding: "0.5rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body1">
                            {item.id}
                            {".  "}
                          </Typography>
                          <img
                            style={{
                              width: "35px",
                              marginRight: "0.5rem",
                              marginLeft: "0.5rem",
                            }}
                            src={item.hinhAnh}
                            alt=""
                          ></img>
                          <Typography variant="h5">{item.ten}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Typography variant="body1">
                            {Helper.formatDateToLocal(item.thoiDiemBatDau)} -{" "}
                            {Helper.formatDateToLocal(item.thoiDiemKetThuc)}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grow>
                </ListItem>
              );
            })}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              disabled={currentPage <= 0}
              onClick={handleShowLess}
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
              <ShowLess />
            </IconButton>
          </Box>

          <Typography>
            {currentPage * showedItem + showedItem < listItem.length
              ? currentPage * showedItem + showedItem
              : listItem.length}{" "}
            / {listItem.length}
          </Typography>
          {/*  */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              disabled={
                currentPage * showedItem + showedItem >= listItem.length
              }
              onClick={handleShowMore}
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
              <ShowMore />
            </IconButton>
          </Box>
        </Box>
      </List>
    </Paper>
  );
};

export default League;
