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
import { useNavigate, createSearchParams } from "react-router-dom";
import { defaultImage } from "../../../data/GlobalConstant";
import { useLocation } from "react-router-dom";
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
  const numberPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  // useEffect(() => {
  //   if (clubs && filterValue) {
  //     setFilteredClubs(
  //       clubs
  //         .filter((club) => {
  //           try {
  //             let name = club?.hoTen.toLowerCase();
  //             if (name && name.includes(filterValue.toLowerCase())) {
  //               return club;
  //             }
  //           } catch (err) {
  //             return {};
  //           }
  //         })
  //         .slice(0, numberPerPage)
  //     );
  //   } else if (!filterValue) {
  //     setFilteredClubs(
  //       clubs.slice(
  //         (currentPage - 1) * numberPerPage,
  //         currentPage * numberPerPage
  //       )
  //     );
  //     setCurrentPage(1);
  //     setTotalPage(Math.ceil(clubs.length / numberPerPage));
  //   }
  // }, [filterValue]);

  const fetchClubs = async () => {
    console.log("im here");
    try {
      setFilteredClubs([]);
      setClubs([]);
      setIsLoading(true);
      setNotify({ message: "", type: "" });
      const response = await MyAxios.get(`/cauthu/all`, {
        params: { page: page, limit: numberPerPage },
      });

      if (response?.data?.data) {
        console.log(response.data.data);
        setClubs(response.data.data.listPlayerDto);
        setFilteredClubs(response.data.data.listPlayerDto);
        setTotalPage(response.data.data.totalPage);
        setCurrentPage(response.data.data.page);
      }
    } catch (err) {
      console.log(err);
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClubs();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    navigate({
      pathname: "/players",
      search: createSearchParams({
        page: value,
      }).toString(),
    });
  };

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
                  DANH SÁCH CẦU THỦ
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
                    placeholder="Tìm cầu thủ..."
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
                            navigate(`/players/${club.id}`);
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
                                    src={club?.hinhAnh || defaultImage?.player}
                                  ></img>
                                  <Typography variant="h6" sx={{ ml: "1rem" }}>
                                    {club?.hoTen}
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
                                    Ngày sinh: {club?.ngaySinh}
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
                                    Quốc tịch:{" "}
                                    {club?.quocTich || "Chưa cập nhật"}
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
                    key={location.search}
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
