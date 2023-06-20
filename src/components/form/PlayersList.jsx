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
import { useTheme } from "@mui/material/styles";
import Helper from "../../utils/Helper";
import useCurrentLeague from "../../hooks/useCurrentLeague";
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
  const { data, headerSize, bgColor, alignHeader, number, isNavigatable } =
    props;

  const theme = useTheme();
  const classes = useStyles();
  const { currentPlayer, setCurrentPlayer } = useCurrentLeague();
  console.log(currentPlayer, "hehe");
  const numberPerPage = number ? number : 12;
  const [page, setPage] = useState(1);
  console.log(data);
  console.log(data.length, number, page);
  return (
    <>
      <Paper elevation={0} sx={{ minWidth: "40vw" }}>
        <Typography
          variant={headerSize ? headerSize : "h3"}
          className={classes.title}
          justifyContent={alignHeader ? "flex-start" : "center"}
          paddingLeft={alignHeader ? "1rem" : "0"}
        >
          Danh sách cầu thủ
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
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                backgroundColor: "blueBackground.light",
              }}
            >
              {data
                .slice((page - 1) * numberPerPage, page * numberPerPage)
                .map((item, index) => (
                  <Grow
                    in={true}
                    {...(true ? { timeout: index * 500 } : {})}
                    key={item?.id}
                  >
                    <TableRow
                      key={index}
                      className={`${classes.row} ${
                        item?.id == currentPlayer ? classes.playerSelected : ""
                      }`}
                      onClick={() => {
                        setCurrentPlayer(item?.id);
                      }}
                    >
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
                          {item?.viTri.join(", ")}
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
    </>
  );
};

export default PlayerTable;
