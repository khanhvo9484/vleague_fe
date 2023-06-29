import { Paper, Grid, Box, Button, Typography } from "@mui/material";
import useCountUpTime from "../../hooks/useCountUp";

const CountUpTimer = (props) => {
  const { startTime } = props;
  const { seconds, minutes } = useCountUpTime(startTime);
  const size = "3rem";
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Paper
        sx={{
          width: size,
          height: size,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </Typography>
      </Paper>
      <Typography variant="h6">:</Typography>
      <Paper
        sx={{
          width: size,
          height: size,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CountUpTimer;
