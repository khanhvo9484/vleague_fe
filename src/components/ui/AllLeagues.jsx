import {
  Autocomplete,
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import MyAxios from "../../api/MyAxios";
import ComponentLayout from "../../layout/ComponentLayout";
import Helper from "../../utils/Helper";
const AllLeagues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagueSeasons, setLeagueSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  // Function to handle Autocomplete value changes
  const handleAutocompleteChange = (event, value) => {
    setSelectedLeague(value);
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      const response = await MyAxios.get("/muagiai", {
        params: { page: 1, limit: 1000 },
      });
      setLeagues(response?.data?.data?.listResult);
    } catch (err) {
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (selectedLeague) {
      setLeagueSeasons(
        leagues.filter((league) => league?.ten == selectedLeague?.ten)
      );
    }
  }, [selectedLeague]);

  return (
    <ComponentLayout isLoading={isLoading} notify={notify}>
      <Grid container justifyContent={"space-around"}>
        <Grid item xs={3}>
          <Autocomplete
            options={leagues}
            autoHighlight
            getOptionLabel={(option) => option?.ten}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`${option?.hinhAnh}`}
                  alt=""
                />
                {option?.ten}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Chọn giải đấu"
                inputProps={{
                  ...params.inputProps,
                  //   autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
            value={selectedLeague} // Set the value prop to the selectedLeague state variable
            onChange={handleAutocompleteChange} // Handle value changes
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            placeholder="Chọn mùa giải"
            label="Chọn mùa giải"
            sx={{ width: "100%" }}
            value={selectedSeason}
            onChange={() => {
              setSelectedSeason(
                leagueSeasons.find((item) => {
                  return item?.thoiDiemBatDau == selectedSeason;
                })?.thoiDiemBatDau
              );
            }}
          >
            {leagueSeasons?.map((season, index) => (
              <MenuItem key={index} value={season?.thoiDiemBatDau}>
                {" "}
                {Helper.formatDateToLocal(season?.thoiDiemBatDau)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            select
            placeholder="Chọn mùa giải"
            label="Chọn mùa giải"
            sx={{ width: "100%" }}
            value={selectedSeason}
            onChange={() => {
              setSelectedSeason(
                leagueSeasons.find((item) => {
                  return item?.thoiDiemBatDau == selectedSeason;
                })?.thoiDiemBatDau
              );
            }}
          >
            {leagueSeasons?.map((season, index) => (
              <MenuItem key={index} value={season?.thoiDiemBatDau}>
                {" "}
                {Helper.formatDateToLocal(season?.thoiDiemBatDau)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            placeholder="Chọn mùa giải"
            label="Chọn mùa giải"
            sx={{ width: "100%" }}
            value={selectedSeason}
            onChange={() => {
              setSelectedSeason(
                leagueSeasons.find((item) => {
                  return item?.thoiDiemBatDau == selectedSeason;
                })?.thoiDiemBatDau
              );
            }}
          >
            {leagueSeasons?.map((season, index) => (
              <MenuItem key={index} value={season?.thoiDiemBatDau}>
                {" "}
                {Helper.formatDateToLocal(season?.thoiDiemBatDau)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </ComponentLayout>
  );
};

export default AllLeagues;
