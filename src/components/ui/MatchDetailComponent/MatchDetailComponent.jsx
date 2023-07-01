import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { PlayCircle, Add, Remove } from "@mui/icons-material";
import CountUpTimer from "../CountUpTimer";
import MyAxios from "../../../api/MyAxios";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import CustomSnackbar from "../CustomSnackbar";
import { useState, useEffect } from "react";
import AddGoalCard from "./AddGoalCard";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Helper from "../../../utils/Helper";
const goalType = [
  {
    id: 1,
    mota: "Penalty",
    ten: "Penalty",
  },
  {
    id: 2,
    mota: "Bàn thắng thông thường",
    ten: "Bình thường",
  },
];
const useStyles = makeStyles((theme) => ({
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
}));

const MatchDetailComponent = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { match, setMatch } = props;
  const homeTeam = match?.doiNha || "";
  const awayTeam = match?.doiKhach || "";

  const [startTime, setStartTime] = useState(match?.thoiGianNhanStart || "");
  const [matchResult, setMatchResult] = useState(match?.ketQuaTranDau || "");
  useEffect(() => {
    console.log(match);
    if (match) {
      setMatchResult(match?.ketQuaTranDau);
    }
  }, [match]);
  useEffect(() => {
    console.log(matchResult);
  }, [matchResult]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [isShowTimer, setIsShowTimer] = useState(false);

  useEffect(() => {
    if (!match?.ketQuaTranDau) return;
    if (match?.ketQuaTranDau?.trangThai == "Đã kết thúc") {
      setIsShowTimer(false);
      return;
    }
    if (match?.ketQuaTranDau?.trangThai == "Đang thi đấu") {
      setIsShowTimer(true);
    }
  }, [match]);

  const handleStartMatch = async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.put(`/ketquatrandau/batdau`, {
        dsIDKetQuaTranDau: [match?.id],
      });
      if (res.status === 200) {
        setSnackbarMessage("Bắt đầu trận đấu thành công");
        setSnackbarType("success");
        setIsShowTimer(true);
      }
    } catch (err) {
      setSnackbarMessage(err?.response?.data?.message);
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsOpenSnackbar(true);
    }
  };
  const handleStopMatch = async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.put(`/ketquatrandau/ketthuc`, {
        dsIDKetQuaTranDau: [match?.id],
      });
      if (res.status === 200) {
        setSnackbarMessage("Dừng trận đấu thành công");
        setSnackbarType("success");
        setIsShowTimer(false);
      }
    } catch (err) {
      setSnackbarMessage(err?.response?.data?.message);
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsOpenSnackbar(true);
    }
  };
  const handleUpdateMatchResult = async () => {
    setIsLoading(true);
    const data = goalPaper.map((item) => ({
      idTranDau: match.id,
      thoiDiemGhiBan: parseInt(
        item.homeTeam.time ? item.homeTeam.time : item.awayTeam.time
      ),
      idCauThuGhiBan: parseInt(
        item.homeTeam.time ? item.homeTeam.playerId : item.awayTeam.playerId
      ),
      idDoiGhiBan: item.homeTeam.playerId !== "" ? homeTeam.id : awayTeam.id,
      idLoaiBanThang: parseInt(
        item.homeTeam.gType ? item.homeTeam.gType : item.awayTeam.gType
      ),
    }));

    try {
      const res = await MyAxios.put(`/ketquatrandau/${match?.id}/capnhat`, {
        flag_Hoa_0_banthang: 0,
        dsBanThang: data,
      });
      if (res.status === 200) {
        setSnackbarMessage("Cập nhật kết quả trận đấu thành công");
        setGoalPaper([]);
        setMatchResult(res?.data?.data);
        setSnackbarType("success");
      }
    } catch (err) {
      console.log(err);
      setSnackbarMessage(err?.response?.data?.message);
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsOpenSnackbar(true);
    }
  };

  const [goalPaper, setGoalPaper] = useState([]);

  const handleAddPaper = () => {
    const newCard = {
      homeTeam: {
        playerId: "",
        gType: "1",
        time: "",
        teamId: "",
      },
      awayTeam: {
        playerId: "",
        gType: "1",
        time: "",
        teamId: "",
      },
    };

    setGoalPaper([...goalPaper, newCard]);
  };

  const handleHomeTeamPlayerChange = (index) => (value) => {
    setGoalPaper((prev) => {
      const updatedPapers = [...prev];
      updatedPapers[index].homeTeam.playerId = value;
      return updatedPapers;
    });
  };
  const handleAwayTeamPlayerChange = (index) => (value) => {
    setGoalPaper((prev) => {
      const updatedPapers = [...prev];
      updatedPapers[index].awayTeam.playerId = value;
      return updatedPapers;
    });
  };
  const handleHomeTeamGoalTypeChange = (index) => (value) => {
    setGoalPaper((prev) => {
      const updatedPapers = [...prev];
      updatedPapers[index].homeTeam.gType = value;
      return updatedPapers;
    });
  };
  const handleAwayTeamGoalTypeChange = (index) => (value) => {
    setGoalPaper((prev) => {
      const updatedPapers = [...prev];
      updatedPapers[index].awayTeam.gType = value;
      return updatedPapers;
    });
  };
  const handleHomeTeamGoalTimeChange = (index) => (value) => {
    setGoalPaper((prev) => {
      const updatedPapers = [...prev];
      updatedPapers[index].homeTeam.time = value;
      return updatedPapers;
    });
  };
  const handleAwayTeamGoalTimeChange = (index) => (value) => {
    setGoalPaper((prev) => {
      const updatedPapers = [...prev];
      updatedPapers[index].awayTeam.time = value;
      return updatedPapers;
    });
  };
  return (
    <ComponentLayoutBackdrop isLoading={isLoading}>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        setIsOpen={setIsOpenSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      ></CustomSnackbar>
      <Grid container sx={{ display: "flex" }}>
        <Grid
          item
          container
          xs={12}
          sx={{ padding: "1rem" }}
          component={Paper}
          elevation={3}
        >
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <img
                  style={{ height: "80px", borderRadius: "4px" }}
                  src={homeTeam?.hinhAnh}
                ></img>
              </Box>
              <Typography variant="h5">{homeTeam?.ten}</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                className={classes.scorelineBox}
                sx={{
                  boxShadow:
                    match?.ketQuaTranDau?.sbtDoiNha >
                    match?.ketQuaTranDau?.sbtDoiKhach
                      ? `inset 0px -5px 0px 0px ${theme.palette.success.main}`
                      : "none",
                  marginRight: "1rem",
                }}
              >
                <Typography variant="h2" sx={{ color: "white" }}>
                  {match?.ketQuaTranDau === null ||
                  match?.ketQuaTranDau?.sbtDoiNha === null
                    ? "-"
                    : match?.ketQuaTranDau?.sbtDoiNha ?? "-"}
                </Typography>
              </Box>

              <Box
                className={classes.scorelineBox}
                sx={{
                  boxShadow:
                    matchResult?.sbtDoiKhach > matchResult?.sbtDoiNha
                      ? `inset 0px -5px 0px 0px ${theme.palette.success.main}`
                      : "none",
                  marginLeft: "1rem",
                }}
              >
                {" "}
                <Typography variant="h2" sx={{ color: "white" }}>
                  {matchResult === null || matchResult?.sbtDoiKhach === null
                    ? "-"
                    : matchResult?.sbtDoiKhach ?? "-"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img style={{ height: "80px" }} src={awayTeam?.hinhAnh}></img>
              </Box>
              <Typography variant="h5">{awayTeam?.ten}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ mr: "2rem" }}>
              {matchResult.dsBanThang?.length > 0 &&
                matchResult?.dsBanThang.map((goal, index) => (
                  <Typography key={index} sx={{ whiteSpace: "nowrap" }}>
                    {goal?.idDoi === match?.ketQuaTranDau?.idDoiNha
                      ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                      : null}
                  </Typography>
                ))}
            </Box>
          </Grid>
          <Grid item xs={4}>
            {match?.thoiGianVietNam == null && (
              <Grid
                item
                xs={12}
                sx={{ justifyContent: "center", display: "flex", mb: "0.5rem" }}
              >
                <Typography variant="body1">Chưa có thời gian</Typography>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <Typography variant="body1">
                {Helper.formatDateToLocal(match?.thoiGianVietNam)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ ml: "2rem" }}>
              {matchResult.dsBanThang?.length > 0 &&
                matchResult.dsBanThang.map((goal, index) => (
                  <Typography key={index} sx={{ whiteSpace: "nowrap" }}>
                    {goal?.idDoi === match?.ketQuaTranDau?.idDoiKhach
                      ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                      : null}
                  </Typography>
                ))}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ padding: "1rem" }}>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                  Sân đấu:{" "}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <img
                    style={{ height: "70px", borderRadius: "4px" }}
                    src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf65bc65fc205ad23/641b4e9c99cb6c0a57d664c6/Disen%CC%83o_sin_ti%CC%81tulo-9.jpg?auto=webp&format=pjpg&width=1200&quality=60"
                  ></img>
                </Box>
                <Box sx={{ ml: "1rem" }}>
                  <Typography variant="h6">
                    {homeTeam?.sanNha?.tenSan}
                  </Typography>
                  <Typography>{homeTeam?.sanNha?.diaDiem}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {true && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {isShowTimer && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mr: "1rem",
                      }}
                    >
                      <CountUpTimer startTime={startTime}></CountUpTimer>
                    </Box>
                  )}
                  <Box
                    sx={
                      {
                        // display: "flex",
                        // justifyContent: "flex-end",
                      }
                    }
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant="contained"
                        startIcon={<PlayCircle></PlayCircle>}
                        onClick={handleStartMatch}
                        disabled={
                          matchResult == null ||
                          matchResult?.trangThai == "Chưa thi đấu"
                            ? false
                            : true
                        }
                      >
                        Bắt đầu trận đấu
                      </Button>
                      <Button
                        sx={{ mt: "1rem" }}
                        variant="contained"
                        // onClick={handleStopMatch}
                        disabled={
                          matchResult?.trangThai === "Đang thi đấu"
                            ? false
                            : true
                        }
                        onClick={handleStopMatch}
                      >
                        Kết thúc trận đấu
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ padding: "1rem" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h6">Thêm bàn thắng</Typography>
          </Box>

          {goalPaper.map((paper, index) => (
            <AddGoalCard
              key={index}
              homeTeamGoal={paper.homeTeam}
              awayTeamGoal={paper.awayTeam}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              card={paper}
              setGoalPaper={setGoalPaper}
              goalPaper={goalPaper}
              onHomeTeamPlayerChange={handleHomeTeamPlayerChange(index)}
              onAwayTeamPlayerChange={handleAwayTeamPlayerChange(index)}
              onHomeTeamGoalTypeChange={handleHomeTeamGoalTypeChange(index)}
              onAwayTeamGoalTypeChange={handleAwayTeamGoalTypeChange(index)}
              onHomeTeamGoalTimeChange={handleHomeTeamGoalTimeChange(index)}
              onAwayTeamGoalTimeChange={handleAwayTeamGoalTimeChange(index)}
            ></AddGoalCard>
          ))}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: "0.5rem" }}
          >
            {goalPaper.length > 0 ? (
              <Button
                variant="contained"
                sx={{ mr: "1rem" }}
                onClick={handleUpdateMatchResult}
              >
                Cập nhật bàn thắng
              </Button>
            ) : null}
            <Button
              variant="contained"
              startIcon={<Add></Add>}
              onClick={handleAddPaper}
              // disabled={matchResult?.trangThai=="Đã kết thúc" ? true : false}
            >
              Thêm
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ComponentLayoutBackdrop>
  );
};

export default MatchDetailComponent;
