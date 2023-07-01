import {
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { Remove } from "@mui/icons-material";

const AddGoalCard = (props) => {
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
  const {
    homeTeam,
    awayTeam,
    homeTeamGoal,
    awayTeamGoal,
    card,
    goalPaper,
    setGoalPaper,

    onHomeTeamPlayerChange,
    onAwayTeamPlayerChange,
    onHomeTeamGoalTypeChange,
    onAwayTeamGoalTypeChange,
    onHomeTeamGoalTimeChange,
    onAwayTeamGoalTimeChange,
  } = props;
  const handleDeletePaper = () => {
    const updatedPapers = goalPaper.filter((item) => item !== card);
    setGoalPaper(updatedPapers);
  };
  return (
    <Paper elevation={3} sx={{ padding: "1rem" }}>
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
              {/* <Autocomplete
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
                value={homeTeamGoal?.playerId}
                onChange={(event, value) => {onHomeTeamPlayerChange(value)}}
              ></Autocomplete> */}
              <TextField
                sx={{ width: "100%" }}
                label="Chọn cầu thủ"
                placeholder="Chọn cầu thủ"
                value={homeTeamGoal?.playerId}
                onChange={(event) => {
                  onHomeTeamPlayerChange(event.target.value);
                }}
                select
              >
                {homeTeam?.danhSachCauThuDangThiDau.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item?.hoTen}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4} sx={{ padding: "0 0.5rem 0 0.5rem" }}>
              <TextField
                sx={{ width: "100%" }}
                select
                value={homeTeamGoal?.gType}
                label="Loại bàn thắng"
                onChange={(e) => {
                  onHomeTeamGoalTypeChange(e.target.value);
                }}
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
                <TextField
                  sx={{}}
                  label="Thời điểm ghi bàn"
                  value={homeTeamGoal?.time}
                  onChange={(e) => onHomeTeamGoalTimeChange(e.target.value)}
                ></TextField>
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
                onClick={() => handleDeletePaper()}
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
              {/* <Autocomplete
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
                 */}

              <Box sx={{ marginLeft: "1rem" }}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Chọn cầu thủ"
                  placeholder="Chọn cầu thủ"
                  value={awayTeamGoal?.playerId}
                  onChange={(event) => {
                    onAwayTeamPlayerChange(event.target.value);
                  }}
                  select
                >
                  {awayTeam?.danhSachCauThuDangThiDau.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item?.hoTen}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ padding: "0 0.5rem 0 0.5rem" }}>
              <TextField
                sx={{ width: "100%" }}
                select
                value={awayTeamGoal?.gType}
                onChange={(event) => {
                  onAwayTeamGoalTypeChange(event.target.value);
                }}
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
                <TextField
                  sx={{}}
                  label="Thời điểm ghi bàn"
                  value={awayTeam?.time}
                  onChange={(e) => onAwayTeamGoalTimeChange(e.target.value)}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddGoalCard;
