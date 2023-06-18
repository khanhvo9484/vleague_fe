import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ExpandLess as ShowLess,
  ExpandMore as ShowMore,
} from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      "& h6": {
        color: "white",
      },
    },
  },
  tableHeader: {
    maxHeight: "2rem",
    backgroundColor: theme.palette.primary.main,
    "& h6": {
      color: "white",
    },
    color: "white",
  },
}));
const PlayerList = (props) => {
  const classes = useStyles();
  const { playerList } = props;
  const [players, setPlayers] = useState([]);
  const numberPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const handleShowMore = () => {
    if (currentPage * numberPerPage + numberPerPage < players.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleShowLess = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    setPlayers(playerList);
  }, [playerList]);
  return (
    <TableContainer component={Paper} elevation={7}>
      <Table>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell>
              <Typography variant="h6">STT</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Họ tên</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Ngày sinh</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Quốc tịch</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Vị trí</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Số áo</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players &&
            players
              .slice(
                currentPage * numberPerPage,
                currentPage * numberPerPage + numberPerPage
              )
              .map((player, index) => {
                return (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell>
                      <Typography variant="h6">{index}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {player?.hoTen}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {player?.ngaySinh}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {player?.quocTich}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {player?.viTri.map((item, index) => {
                          return item + " ";
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {player?.soAo}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
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
          {currentPage * numberPerPage + numberPerPage < players.length
            ? currentPage * numberPerPage + numberPerPage
            : players.length}{" "}
          / {players.length}
        </Typography>
        {/*  */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            disabled={
              currentPage * numberPerPage + numberPerPage >= players.length
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
    </TableContainer>
  );
};

export default PlayerList;
