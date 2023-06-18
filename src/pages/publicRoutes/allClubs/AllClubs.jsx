import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  List,
  ListItem,
  Pagination,
  Grow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import bgImage from "../../../assets/background1.jpg";
import MyAxios from "../../../api/MyAxios";
import DefaultLayout from "../../../layout/DefaultLayout";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import Loader from "@mui/material/CircularProgress";
import Helper from "../../../utils/Helper";
import Filter from "../../../components/ui/Filter";
import { useNavigate } from "react-router-dom";
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30rem",
  },
  paperContainer: {
    padding: "20px",
    margin: "0 10vw 0 10vw ",
    minHeight: "30vh",
    overflow: "hidden",
    marginTop: "5vh",
  },
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rowItem: {
    cursor: "pointer",
  },
}));
const AllClubs = () => {
  const loadedBGImage = useProgressiveImage(bgImage);
  const navigate = useNavigate();
  const classes = useStyles();
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const numberPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };
  useEffect(() => {
    if (clubs && filterValue) {
      setFilteredClubs(
        clubs
          .filter((club) => {
            try {
              let name = club?.ten.toLowerCase();
              if (name && name.includes(filterValue.toLowerCase())) {
                return club;
              }
            } catch (err) {
              return {};
            }
          })
          .slice(0, numberPerPage)
      );
    } else if (!filterValue) {
      setFilteredClubs(
        clubs.slice(
          (currentPage - 1) * numberPerPage,
          currentPage * numberPerPage
        )
      );
      setCurrentPage(1);
      setTotalPage(Math.ceil(clubs.length / numberPerPage));
    }
  }, [filterValue]);

  const fetchClubs = async () => {
    try {
      setFilteredClubs([]);
      setClubs([]);
      setIsLoading(true);
      setNotify({ message: "", type: "" });
      const response = await MyAxios.get(`/doibong`, {
        params: { page: 1, limit: 100 },
      });
      if (response?.data?.data?.listResult) {
        setClubs(response.data.data.listResult);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setNotify({ message: err.message, type: "error" });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClubs();
  }, []);
  useEffect(() => {
    if (clubs) {
      try {
        setTotalPage(Math.ceil(clubs.length / numberPerPage));
        setFilteredClubs(
          clubs.slice(
            (currentPage - 1) * numberPerPage,
            currentPage * numberPerPage
          )
        );
        const tempImageList = clubs.map((club) => {
          return { id: club?.id, image: club?.hinhAnh };
        });
        setImageList(tempImageList);
      } catch (err) {
        console.log(err);
      }
    }
  }, [clubs]);
  useEffect(() => {
    if (filterValue) {
      setTotalPage(Math.ceil(filteredClubs.length / numberPerPage));
      setCurrentPage(1);
    }
  }, [filteredClubs]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setFilteredClubs(
      clubs.slice(
        (currentPage - 1) * numberPerPage,
        currentPage * numberPerPage
      )
    );
  }, [currentPage]);

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
                  DANH SÁCH ĐỘI BÓNG
                </Typography>
              </Box>

              <Paper elevation={8} className={classes.paperContainer}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "16px",
                  }}
                >
                  <Filter
                    width={"15rem"}
                    placeholder="Tìm đội bóng..."
                    onFilterChange={handleFilterChange}
                  ></Filter>
                </Box>
                {isLoading ? (
                  <Box className={classes.loadingContainer}>
                    <CircularProgress />
                  </Box>
                ) : null}
                {!isLoading && notify.length > 0 ? (
                  <Box className={classes.loadingContainer}>
                    <Typography>
                      {notify.message} {notify.type}
                    </Typography>
                  </Box>
                ) : null}
                {clubs && (
                  <List>
                    {filteredClubs.map((club, index) => {
                      return (
                        <ListItem
                          className={classes.rowItem}
                          key={club.id}
                          onClick={() => {
                            navigate(`/clubs/${club.id}`);
                          }}
                        >
                          <Grow in={true} timeout={index * 1000}>
                            <Paper elevation={3} sx={{ width: "100%" }}>
                              <Grid
                                container
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Grid
                                  xs={4}
                                  item
                                  className={classes.allCenter}
                                  sx={{
                                    justifyContent: "flex-start",
                                    padding: "1rem",
                                  }}
                                >
                                  <img
                                    style={{ width: "35px" }}
                                    src={
                                      imageList.find((image) => {
                                        return image.id === club.id;
                                      })?.image
                                    }
                                  ></img>
                                  <Typography variant="h6" sx={{ ml: "1rem" }}>
                                    {club.ten}
                                  </Typography>
                                </Grid>
                                <Grid
                                  xs={4}
                                  item
                                  className={classes.allCenter}
                                  sx={{
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      color: "primary.dark",
                                    }}
                                  >
                                    Năm thành lập: {club.namThanhLap}
                                  </Typography>
                                </Grid>
                                <Grid
                                  xs={4}
                                  item
                                  className={classes.allCenter}
                                  sx={{
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      color: "primary.dark",
                                    }}
                                  >
                                    Số lượng cầu thủ:{" "}
                                    {club?.danhSachCauThuDangThiDau?.length}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grow>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
                <Box className={classes.allCenter}>
                  <Pagination
                    count={totalPage}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  ></Pagination>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default AllClubs;
