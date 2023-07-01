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

const MatchDetailComponent = (props) => {
  const { match } = props;
  const homeTeam = match?.doiNha || "";
  const awayTeam = match?.doiKhach || "";
  const result = match?.ketQuaTranDau || "";
  const startTime = match?.thoiGianNhanStart || "";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [isShowTimer, setIsShowTimer] = useState(false);
  useEffect(() => {
    if (match?.ketQuaTranDau?.trangThai == "Đã kết thúc") {
      setIsShowTimer(false);
      return;
    }
    if (match?.ketQuaTranDau?.trangThai == "Đang diễn ra") {
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
  const [goalPaper, setGoalPaper] = useState([]);

  const handleAddPaper = () => {
    const newPaper = (
      <Paper key={goalPaper.length} elevation={3} sx={{ padding: "1rem" }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={6} sx={{ borderRight: "2px solid black" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{homeTeam?.ten}</Typography>
            </Box>
            <Grid
              item
              container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: "0.5rem",
              }}
            >
              <Grid item xs={4}>
                <Autocomplete
                  sx={{}}
                  getOptionLabel={(option) => option.hoTen}
                  options={homeTeam?.danhSachCauThuDangThiDau}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chọn cầu thủ"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                  // value={paperPlayer}
                ></Autocomplete>
              </Grid>
              <Grid item xs={4} sx={{ padding: "0 0.5rem 0 0.5rem" }}>
                <TextField
                  sx={{ width: "100%" }}
                  select
                  value={1}
                  label="Loại bàn thắng"
                >
                  {goalType.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.ten}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                {" "}
                <Box sx={{ paddingRight: "1rem" }}>
                  <TextField sx={{}} label="Thời điểm ghi bàn"></TextField>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={4}></Grid>
              <Grid xs={4} item>
                <Typography variant="h6">{awayTeam?.ten}</Typography>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton
                  sx={{ width: "1rem", height: "1rem" }}
                  onClick={() => handleDeletePaper(newPaper)}
                >
                  <Remove></Remove>
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              item
              container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: "0.5rem",
              }}
            >
              <Grid item xs={4}>
                <Autocomplete
                  sx={{ paddingLeft: "1rem" }}
                  getOptionLabel={(option) => option.hoTen}
                  options={homeTeam?.danhSachCauThuDangThiDau}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chọn cầu thủ"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                  // value={paperPlayer}
                ></Autocomplete>
              </Grid>
              <Grid item xs={4} sx={{ padding: "0 0.5rem 0 0.5rem" }}>
                <TextField
                  sx={{ width: "100%" }}
                  select
                  value={1}
                  label="Loại bàn thắng"
                >
                  {goalType.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.ten}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                {" "}
                <Box sx={{}}>
                  <TextField sx={{}} label="Thời điểm ghi bàn"></TextField>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );

    setGoalPaper([...goalPaper, newPaper]);
  };

  const handleDeletePaper = (paper) => {
    const updatedPapers = goalPaper.filter((item) => item !== paper);
    setGoalPaper(updatedPapers);
  };
  return (
    <ComponentLayoutBackdrop>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img style={{ height: "80px" }} src={homeTeam?.hinhAnh}></img>
              </Box>
              <Typography variant="h5">{homeTeam?.ten}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
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
        </Grid>
        <Grid item xs={12} sx={{ padding: "1rem" }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                Sân đấu:{" "}
              </Typography>
              {!match?.ketQuaTranDau && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PlayCircle></PlayCircle>}
                    onClick={handleStartMatch}
                    disabled={match?.ketQuaTranDau}
                  >
                    Bắt đầu trận đấu
                  </Button>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <img
                  style={{ height: "70px" }}
                  src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf65bc65fc205ad23/641b4e9c99cb6c0a57d664c6/Disen%CC%83o_sin_ti%CC%81tulo-9.jpg?auto=webp&format=pjpg&width=1200&quality=60"
                ></img>
              </Box>
              <Box sx={{ ml: "1rem" }}>
                <Typography variant="h6">{homeTeam?.sanNha?.tenSan}</Typography>
                <Typography>{homeTeam?.sanNha?.diaDiem}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {isShowTimer ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CountUpTimer startTime={startTime}></CountUpTimer>
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sx={{ padding: "1rem" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h6">Thêm bàn thắng</Typography>
          </Box>

          {goalPaper.map((paper, index) => (
            <Box key={index}>{paper}</Box>
          ))}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: "0.5rem" }}
          >
            <Button
              variant="contained"
              startIcon={<Add></Add>}
              onClick={handleAddPaper}
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
