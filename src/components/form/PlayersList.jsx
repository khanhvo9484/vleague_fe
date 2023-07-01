import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grow,
  Pagination,
  Checkbox,
  Button,
  Snackbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Helper from "../../utils/Helper";
import useCurrentLeague from "../../hooks/useCurrentLeague";
import MyAxios from "../../api/MyAxios";
import useAuth from "../../hooks/useAuth";
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
  rowNotHover: {
    cursor: "pointer",
    // "&:hover": {
    //   backgroundColor: theme.palette.primary.dark,
    //   "& h6": {
    //     color: "white",
    //   },
    //   outline: "2px solid white",
    // },
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
  playerSelected: {
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.main,

    "& .MuiTableCell-root .MuiTypography-root": {
      // Styles for the Typography component inside the TableCell
      color: "white",
      // Other typography styles if needed
    },
  },
}));

const PlayerTable = (props) => {
  const {
    data,
    headerSize,
    title,
    bgColor,
    alignHeader,
    number,
    isNavigatable,
    hasCheckbox,
    addToList,
    hoverEffect,
    selectedList,
    setSelectedList,
    setData,
    selectedFreePlayer,
    setSelectedFreePlayer,
    setIsOpenSnackbar,
    setSnackbarMessage,
    setSnackbarType,
  } = props;

  const theme = useTheme();
  const classes = useStyles();
  const { currentPlayer, setCurrentPlayer } = useCurrentLeague();
  useEffect(() => {
    console.log("current player", currentPlayer);
  }, [currentPlayer]);
  const numberPerPage = number ? number : 12;
  const [page, setPage] = useState(1);
  const { auth } = useAuth();

  const handleAddToList = async (id) => {
    try {
      const res = await MyAxios.post(`/doibong/cauthu`, {
        idDoi: auth?.teamId,
        dsCauThuMoi: [],
        dsCauThuTuDo: [{ id_cauthu: id, thoiDiemKetThuc: "2027-05-10" }],
      });
      if (res.status == 200) {
        setData(data.filter((player) => player.id != id));
      }
      setSnackbarMessage("Thêm cầu thủ thành công");
      setSnackbarType("success");
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Thêm cầu thủ thất bại");
      setSnackbarType("error");
    } finally {
      setIsOpenSnackbar(true);
    }
  };
  const handleRegisterList = (itemId) => {
    if (selectedList.includes(itemId)) {
      setSelectedList(selectedList.filter((id) => id !== itemId));
    } else {
      setSelectedList([...selectedList, itemId]);
    }
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ minWidth: "40vw" }}>
        <Typography
          variant={headerSize ? headerSize : "h3"}
          className={classes.title}
          justifyContent={alignHeader ? "flex-start" : "center"}
          paddingLeft={alignHeader ? "1rem" : "0"}
        >
          {title ? title : "Danh sách cầu thủ"}
        </Typography>

        <TableContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: `${bgColor ? bgColor : "blueBackground.manage"}`,
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
                {hasCheckbox && <TableCell align="center"></TableCell>}
                <TableCell align="center">
                  <Typography variant="h6" sx={{}}>
                    #
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{}}>
                    Họ tên
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ ml: "1rem" }} variant="h6">
                    Ngày sinh
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Quốc tịch</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Vị trí</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Số áo</Typography>
                </TableCell>
                {addToList && <TableCell align="center"></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                backgroundColor: "blueBackground.light",
              }}
            >
              {data?.length == 0 && (
                <TableRow>
                  <TableCell>
                    <Box>
                      {" "}
                      <Typography sx={{ textAlign: "center" }} variant="h6">
                        Không có thông tin
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {data &&
                data
                  .slice((page - 1) * numberPerPage, page * numberPerPage)
                  .map((item, index) => (
                    <Grow
                      in={true}
                      {...(true ? { timeout: index * 500 } : {})}
                      key={item?.id}
                    >
                      <TableRow
                        key={index}
                        className={`${
                          hoverEffect === false
                            ? classes.rowNotHover
                            : classes.row
                        } ${
                          item?.id == currentPlayer && hoverEffect !== false
                            ? classes.playerSelected
                            : ""
                        }`}
                        onClick={() => {
                          setCurrentPlayer(item?.id);
                        }}
                      >
                        {hasCheckbox && (
                          <TableCell align="center" sx={{ padding: "8px" }}>
                            <Checkbox
                              checked={selectedList?.includes(item.id)}
                              onChange={() => handleRegisterList(item.id)}
                            ></Checkbox>
                          </TableCell>
                        )}
                        <TableCell align="center" sx={{ padding: "8px" }}>
                          <Typography
                            variant="h6"
                            sx={{ color: "primary.lightGray" }}
                          >
                            {" "}
                            {index}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "8px" }}>
                          <Typography
                            variant="h6"
                            sx={{ color: "primary.lightGray" }}
                          >
                            {" "}
                            {item?.hoTen}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "8px" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.lightGray" }}
                          >
                            {" "}
                            {Helper.formatDateToLocal(item?.ngaySinh)}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" sx={{ padding: "8px" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.lightGray" }}
                          >
                            {" "}
                            {item?.quocTich}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "8px" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.lightGray" }}
                          >
                            {" "}
                            {/* {item?.viTri.join(", ")} */}
                            {item?.viTri}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "8px" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.lightGray" }}
                          >
                            {" "}
                            {item?.soAo}
                          </Typography>
                        </TableCell>
                        {addToList && (
                          <TableCell align="center" sx={{ padding: "8px" }}>
                            <Button
                              onClick={() => handleAddToList(item.id)}
                              variant="outlined"
                              color="error"
                              sx={{ borderRadius: "20px" }}
                            >
                              Thêm vào đội
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    </Grow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Pagination
            page={page}
            count={
              Array.isArray(data) ? Math.ceil(data.length / numberPerPage) : 0
            }
            onChange={(e, value) => {
              setPage(value);
            }}
          ></Pagination>
        </Box>
      </Paper>
      <Box />
    </Box>
  );
};

export default PlayerTable;
