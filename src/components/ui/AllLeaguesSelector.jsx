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
const status = {
  0: "Đang đăng ký",
  1: "Đã bắt đầu",
  2: "Đã kết thúc",
};

const AllLeaguesSelector = (props) => {
  const {
    setCurrentLeague,
    currentLeague,
    selectFirst,
    AllLeagues,
    setAllLeagues,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagueSeasons, setLeagueSeasons] = useState([]);
  // State variable to store the selected value(s)
  const [seasonsStartDate, setSeasonsStartDate] = useState("");
  const [seasonsEndDate, setSeasonsEndDate] = useState("");
  const [seasonsStatus, setSeasonsStatus] = useState("");

  const [isDisabledEndDate, setIsDisabledEndDate] = useState(false);
  const [isDisabledStatus, setIsDisabledStatus] = useState(false);

  const [statusArray, setStatusArray] = useState([]);

  const [isFirstTime, setIsFirstTime] = useState(true);
  // Function to handle Autocomplete value changes
  const handleAutocompleteChange = (event, value) => {
    setSelectedLeague(value);
    setCurrentLeague("");
    setSeasonsStartDate("");
    setSeasonsEndDate("");
    setSeasonsStatus("");
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      const response = await MyAxios.get("/muagiai", {
        params: { page: 1, limit: 1000 },
      });
      setLeagues(response?.data?.data?.listResult);
      if (AllLeagues) {
        setAllLeagues(response?.data?.data?.listResult);
      }
      if (selectFirst) {
        const season = response?.data?.data?.listResult[0];
        setSelectedLeague(season);
        setCurrentLeague(season);
        setSeasonsStartDate(season?.thoiDiemBatDau);
        setSeasonsEndDate(season?.thoiDiemKetThuc);
        setSeasonsStatus(season?.trangThai);
        setIsFirstTime(false);
      }
    } catch (err) {
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    setLeagueSeasons(
      leagues.filter((league) => league?.ten == selectedLeague?.ten)
    );
  }, [selectedLeague]);

  useEffect(() => {
    if (selectFirst) {
      if (!isFirstTime) {
        setSeasonsStartDate("");
        setSeasonsEndDate("");
        setSeasonsStatus("");
      }
    } else {
      setSeasonsStartDate("");
      setSeasonsEndDate("");
      setSeasonsStatus("");
    }

    setStatusArray(
      Array.from(
        new Set(leagueSeasons?.map((season, index) => season?.trangThai))
      )
    );
  }, [leagueSeasons]);

  const handleSelectStartDate = (event) => {
    const season = leagueSeasons.find(
      (item) => item?.thoiDiemBatDau == event.target.value
    );
    setCurrentLeague(season);
    setSeasonsStartDate(season?.thoiDiemBatDau);
    setSeasonsEndDate(season?.thoiDiemKetThuc);
    setSeasonsStatus(season?.trangThai);
  };
  const handleSelectEndDate = (event) => {
    const season = leagueSeasons.find(
      (item) => item?.thoiDiemKetThuc == event.target.value
    );
    setCurrentLeague(season);
    setSeasonsStartDate(season?.thoiDiemBatDau);
    setSeasonsEndDate(season?.thoiDiemKetThuc);
    setSeasonsStatus(season?.trangThai);
  };
  const handleSelectStatus = (event) => {
    const tempStatus = event.target.value;
    setSeasonsStatus(status[tempStatus]);
    setLeagueSeasons(
      leagueSeasons.filter((item) => {
        item?.trangThai == tempStatus;
      })
    );
  };
  return (
    <ComponentLayout isLoading={isLoading} notify={notify}>
      <Grid container justifyContent={"space-between"}>
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
        <Grid item xs={2}>
          <TextField
            select
            label="Ngày bắt đầu"
            sx={{ width: "100%" }}
            value={seasonsStartDate}
            onChange={handleSelectStartDate}
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
            label="Ngày kết thúc"
            sx={{ width: "100%" }}
            disabled={isDisabledEndDate}
            value={seasonsEndDate}
            onChange={handleSelectEndDate}
          >
            {leagueSeasons?.map((season, index) => (
              <MenuItem key={index} value={season?.thoiDiemKetThuc}>
                {" "}
                {Helper.formatDateToLocal(season?.thoiDiemKetThuc)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            label="Tình trạng"
            sx={{ width: "100%" }}
            value={seasonsStatus}
            disabled={isDisabledStatus}
            onChange={handleSelectStatus}
          >
            {statusArray.map((tempStatus, index) => (
              <MenuItem key={index} value={tempStatus}>
                {" "}
                {status[tempStatus]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </ComponentLayout>
  );
};

export default AllLeaguesSelector;
