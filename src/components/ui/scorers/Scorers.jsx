import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grow,
  Pagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import MyAxios from "../../../api/MyAxios";
import { useTheme } from "@mui/material/styles";
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
    minHeight: "20vh",
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      "& h6": {
        color: "white",
      },
      outline: "2px solid white",
    },
    boxShadow: theme.shadows[3],
    borderRadius: "4px",
    backgroundColor: "white",
    minHeight: "1rem",
    padding: "0.5rem",
    margin: "5rem",
    "& td:first-child": {
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
    },
    "& td:last-child": {
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
    },
  },
  tableHeadRow: {
    // backgroundColor: theme.palette.blueBackground.dark,
    // color: "white",
    "& td:first-child": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "4px",
    },
    "& td:last-child": {
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
    },
  },
}));

const Ranking = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState("");
  const { currentLeague } = useCurrentLeague();
  const [data, setData] = useState([]);
  const [refinedData, setRefinedData] = useState([]); // [
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(async () => {
    if (!currentLeague) return;
    try {
      setIsLoading(true);
      setNotify("");
      const response = await MyAxios.get(
        `/cauthughibanmuagiai/${currentLeague.id}`
      );
      if (response?.data?.data) {
        setData(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setNotify("Không tìm thấy dữ liệu");
    }
  }, [currentLeague]);
  useEffect(async () => {
    if (!data) return;
    try {
      // setData(data.sort((a, b) => b.soBanThang - a.soBanThang));

      const promises = data?.map(async (item) => {
        const res = await MyAxios.get(`/cauthu?id=${item?.idCauThu}`);
        return {
          ...item,
          loaiCauThu: res?.data?.data?.loaiCauThu,
          hinhAnh: res?.data?.data?.hinhAnh,
        };
      });
      setRefinedData(await Promise.all(promises));
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  return (
    <>
      <Paper elevation={3} sx={{ minWidth: "40vw" }}>
        <Typography variant="h3" className={classes.title}>
          Danh sách cầu thủ ghi bàn
        </Typography>
        {isLoading && (
          <Box className={classes.loadingBox}>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && notify && (
          <Box className={classes.loadingBox}>
            <Typography variant="subtitle1">{notify}</Typography>
          </Box>
        )}
        {!isLoading && !notify && (
          <TableContainer
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "blueBackground.main",
              borderRadius: "0 0 4px 4px",
            }}
          >
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 0.5em",
                padding: "1rem",
                paddingTop: "0",
              }}
            >
              <TableHead>
                <TableRow className={classes.tableHeadRow}>
                  <TableCell align="center">
                    <Typography
                      variant="h6"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        // margin: "0.5rem",
                      }}
                    >
                      Cầu thủ
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ ml: "1rem" }} variant="h6">
                      Đội bóng
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Loại cầu thủ</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Số bàn thắng</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  backgroundColor: "blueBackground.light",
                }}
              >
                {refinedData.map((item, index) => (
                  <Grow
                    in={!isLoading}
                    {...(!isLoading ? { timeout: index * 1000 } : {})}
                    key={index}
                  >
                    <TableRow key={index} className={classes.row}>
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{
                              width: "35px",
                              marginLeft: "1rem",
                              marginRight: "1rem",
                            }}
                            src={item?.hinhAnh}
                          ></img>
                          <Typography variant="h6">
                            {" "}
                            {item?.tenCauThu}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Typography variant="h6"> {item?.tenDoi}</Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Typography variant="h6">
                          {" "}
                          {item?.loaiCauThu}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Typography variant="h6">
                          {" "}
                          {item.soLuongBanThang}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Grow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "blueBackground.main",
            paddingBottom: "0.5rem",
          }}
        >
          {refinedData.length > 0 ? (
            <Pagination
              count={totalPage}
              page={currentPage}
              variant="contained"
              shape="rounded"
              // onChange={handlePageChange}
              key={currentPage}
            ></Pagination>
          ) : (
            <Typography variant="h6" sx={{ padding: "1rem" }}>
              Không có dữ liệu
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default Ranking;
