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
  Tab,
} from "@mui/material";
import { useState, useEffect } from "react";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import MyAxios from "../../../api/MyAxios";
import teamLogo from "../../../data/GlobalConstant";
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
}));

const Ranking = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState("");
  const { currentLeague } = useCurrentLeague();
  const [data, setData] = useState([]);
  useEffect(async () => {
    if (!currentLeague) return;
    try {
      setIsLoading(true);
      setNotify("");
      const response = await MyAxios.get(`/muagiai/${currentLeague}/ranking`);
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
  return (
    <>
      <Paper elevation={3}>
        <Typography variant="h3" className={classes.title}>
          Bảng xếp hạng
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
            // component={Paper}
          >
            <Table
              sx={{ borderCollapse: "separate", borderSpacing: "0 0.5em" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography
                      variant="h6"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        margin: "0.5rem",
                      }}
                    >
                      Xếp hạng
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Tên đội</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Logo</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Thắng</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "blueBackground.light" }}>
                {data.map((item, index) => (
                  <Grow
                    in={!isLoading}
                    {...(!isLoading ? { timeout: index * 1000 } : {})}
                    key={index}
                  >
                    <TableRow
                      key={index}
                      sx={{
                        boxShadow: `${theme.shadows[3]}`,
                        backgroundColor: "white",
                        minHeight: "1rem",
                        padding: "0.5rem",
                        margin: "5rem",
                      }}
                    >
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Typography variant="h6"> {item.xephang}</Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Typography variant="h6"> {item.ten_doi}</Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <img
                          style={{ width: "50px" }}
                          src={teamLogo.logo1}
                        ></img>
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px" }}>
                        <Typography variant="h6"> {item.tranThang}</Typography>
                      </TableCell>
                    </TableRow>
                  </Grow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
};

export default Ranking;
