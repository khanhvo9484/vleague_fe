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
import { useLocation, useNavigate } from "react-router-dom";
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
    selectId,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [leagues, setLeagues] = useState([]);
  const [filterLeagues, setFilterLeagues] = useState([]);
  const [nameSet, setNameSet] = useState([]);
  const [statusSet, setStatusSet] = useState([]);
  const [selectedLeagueNameObj, setSelectedLeagueNameObj] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leagueStatus, setLeagueStatus] = useState("");

  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    try {
      const response = await MyAxios.get("/muagiai", {
        params: { page: 1, limit: 1000 },
      });
      setLeagues(response?.data?.data?.listResult);
      setFilterLeagues(response?.data?.data?.listResult);
      // setSelectedLeagueNameObj(response?.data?.data?.listResult[0]);
      if (AllLeagues) {
        console.log("all league", AllLeagues);
        setAllLeagues(response?.data?.data?.listResult);
      }
      if (selectId) {
        console.log("select ID");
        setCurrentLeague(
          response?.data?.data?.listResult.find((item) => item.id == selectId)
        );
      }
    } catch (err) {
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);
  // Function to handle Autocomplete value changes
  const handleAutocompleteChange = (event, value) => {
    setSelectedName(value?.ten);
    setCurrentLeague("");
    setSelectedLeagueNameObj(value);
    setStartDate("");
    setEndDate("");
    setLeagueStatus("");
    setFilterLeagues(leagues.filter((league) => league?.ten == value?.ten));
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    if (filterLeagues.length == 1) {
      setEndDate(filterLeagues[0]?.thoiDiemKetThuc);
      setLeagueStatus(filterLeagues[0]?.trangThai);
    } else {
      setFilterLeagues(
        leagues.filter((league) => {
          if (selectedName) {
            return (
              league?.ten == selectedName &&
              league?.thoiDiemBatDau == event.target.value
            );
          }
          return league?.thoiDiemBatDau == event.target.value;
        })
      );
    }
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    if (filterLeagues.length == 1) {
      setStartDate(filterLeagues[0]?.thoiDiemBatDau);
      setLeagueStatus(filterLeagues[0]?.trangThai);
    } else {
      setFilterLeagues(
        leagues.filter((league) => {
          if (selectedName && startDate) {
            return (
              league?.ten == selectedName &&
              league?.thoiDiemBatDau == startDate &&
              league?.thoiDiemKetThuc == event.target.value
            );
          }
          return league?.thoiDiemKetThuc == event.target.value;
        })
      );
    }
  };
  const handleStatusChange = (event) => {
    setLeagueStatus(event.target.value);
    if (filterLeagues.length == 1) {
      setStartDate(filterLeagues[0]?.thoiDiemBatDau);
      setEndDate(filterLeagues[0]?.thoiDiemKetThuc);
    }
  };

  useEffect(() => {
    if ((selectedName, startDate, endDate, leagueStatus !== "")) {
      if (filterLeagues.length == 1) {
        setCurrentLeague(filterLeagues[0]);
      }
    }
  }, [selectedName, startDate, endDate, leagueStatus]);
  useEffect(() => {
    if (currentLeague) {
      setSelectedLeagueNameObj(currentLeague);
      setSelectedName(currentLeague?.ten);
      setStartDate(currentLeague?.thoiDiemBatDau);
      setEndDate(currentLeague?.thoiDiemKetThuc);
      setLeagueStatus(currentLeague?.trangThai);
    }
    if (currentLeague) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("id", `${currentLeague?.id}`);
      navigate({
        search: `?${searchParams.toString()}`,
      });
    }
  }, [currentLeague]);

  return (
    <ComponentLayout isLoading={isLoading} notify={notify}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={3}>
          <Autocomplete
            options={leagues}
            autoHighlight
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
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
            value={selectedLeagueNameObj || null} // Set the value prop to the selectedLeague state variable
            onChange={handleAutocompleteChange} // Handle value changes
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            label="Ngày bắt đầu"
            sx={{ width: "100%" }}
            value={startDate}
            onChange={handleStartDateChange}
          >
            {filterLeagues?.map((season, index) => (
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
            value={endDate}
            onChange={handleEndDateChange}
          >
            {filterLeagues?.map((season, index) => (
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
            value={leagueStatus}
            onChange={handleStatusChange}
          >
            {Array.from(
              new Set(filterLeagues.map((league) => league?.trangThai))
            ).map((tempStatus, index) => (
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
