import { Paper, Box, Typography, Grid, TextField } from "@mui/material";
import UploadImageSection from "../../../components/ui/UploadImageSection";
import { useState, useEffect } from "react";
const AddNewLeague = () => {
  const [leagueName, setLeagueName] = useState("");

  const [maxPlayer, setMaxPlayer] = useState(-1);
  const [maxForeignPlayer, setMaxForeignPlayer] = useState(-1);
  const [maxAge, setMaxAge] = useState(-1);
  const [minAge, setMinAge] = useState(-1);
  const [minPlayer, setMinPlayer] = useState(-1);

  const [currentLeague, setCurrentLeague] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [winPoint, setWinPoint] = useState(-1);
  const [drawPoint, setDrawPoint] = useState(-1);
  const [losePoint, setLosePoint] = useState(-1);

  const [numberOfClubs, setNumberOfClubs] = useState(-1);
  return (
    <Paper sx={{ padding: "1rem" }}>
      <Grid container>
        <Grid item container xs={8}>
          <Grid xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label={"Tên mùa giải"}
                placeholder="Tên mùa giải"
                value={leagueName}
                sx={{ mb: "0.5rem" }}
              ></TextField>
              <TextField
                label={"Thời gian bắt đầu"}
                placeholder="Thời điểm bắt đầu (dd/mm/yyyy)"
                value={startDate}
                sx={{ mb: "0.5rem" }}
              ></TextField>
              <TextField
                label={"Thời gian kết thúc"}
                placeholder="Thời điểm kết thúc (dd/mm/yyyy)"
                value={endDate}
                sx={{ mb: "0.5rem" }}
              ></TextField>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6"> Quy định chung</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6"> Quy định chung</Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <UploadImageSection></UploadImageSection>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddNewLeague;
