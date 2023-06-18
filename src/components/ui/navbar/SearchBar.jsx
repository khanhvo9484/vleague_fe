import {
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import MyAxios from "../../../api/MyAxios";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { SportsSoccer, DirectionsRun } from "@mui/icons-material";
const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.primary.light,
}));

const GroupItems = styled("ul")(({ theme }) => ({
  // backgroundColor: "blue",
  padding: 0,
}));

const useStyles = makeStyles((theme) => ({
  searchField: {
    borderRadius: "10px",
    backgroundColor: "white",
    minWidth: "300px!important",
    // marginLeft: "auto!important",
    marginRight: "5rem",
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const [allTeams, setAllTeams] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearchChange = async (event) => {
    setSearchValue(event.target.value);
  };

  const handleLoading = async () => {
    if (loaded === true) return;
    setIsLoading(true);
    try {
      const res = await MyAxios.get("/doibong", {
        params: { page: 1, limit: 100 },
      });
      if (res?.data?.data?.listResult) {
        let data = res.data.data.listResult;

        let mappedArr = data.map((item) => {
          return {
            id: item.id,
            name: item.ten,
            image: item.hinhAnh,
            type: "team",
            uuid: uuidv4(),
          };
        });

        setAllTeams(mappedArr);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await MyAxios.get("/cauthu/all");
      if (res?.data?.data) {
        let data = res.data.data;
        let mappedArr = data.map((item) => {
          return {
            id: item.id,
            name: item.hoTen,
            image: item.hinhAnh,
            type: "player",
            uuid: uuidv4(),
          };
        });
        setAllPlayers(mappedArr);
      }

      setLoaded(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setSearchResult(
        allTeams.length !== 0
          ? allTeams
          : allPlayers.length !== 0
          ? allPlayers
          : []
      );
    }
  };
  useEffect(() => {
    if (allTeams.length > 0 && allPlayers.length > 0) {
      if (searchValue !== "") {
        setSearchResult([...allTeams, ...allPlayers]);
      }
    }
  }, [allPlayers, allTeams]);

  useEffect(() => {
    if (searchValue !== "") {
      if (searchResult.length == 0) {
        setSearchResult([...allTeams, ...allPlayers]);
      }
    } else {
      if (searchResult.length > 0) {
        setSearchResult([]);
      }
    }
  }, [searchValue]);

  return (
    <>
      <Autocomplete
        className={classes.searchField}
        isOptionEqualToValue={(option, value) =>
          option.name === value.name && option.id === value.id
        }
        getOptionLabel={(option) => {
          return `${option.id}. ${option.name}`;
        }}
        filterOptions={(options, state) => {
          const inputValue = state.inputValue.toLowerCase();
          return options.filter((option) =>
            option.name.toLowerCase().includes(inputValue)
          );
        }}
        options={searchResult}
        loading={isLoading}
        loadingText="Đang tải dữ liệu..."
        autoHighlight
        groupBy={(option) => option.type}
        filterSelectedOptions
        noOptionsText="Không tìm thấy kết quả"
        open={open}
        onOpen={() => {
          setOpen(true);
          handleLoading();
        }}
        onClose={() => setOpen(false)}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>
              <Typography
                variant="subtitle1"
                style={{
                  marginLeft: "0.2rem",
                }}
              >
                {" "}
                {params.group === "team" ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SportsSoccer sx={{ marginRight: "0.5rem" }} />
                    Đội bóng
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DirectionsRun sx={{ marginRight: "0.5rem" }} />
                    Cầu thủ
                  </Box>
                )}
              </Typography>
            </GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm cầu thủ, đội bóng,..."
            sx={{
              "& fieldset": { border: "none" },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    size="small"
                    edge="start"
                    onClick={handleClearSearch}
                    style={{ cursor: "pointer" }}
                    sx={{
                      "&:hover": { bgcolor: "primary.light" },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      ></Autocomplete>
    </>
  );
};

export default SearchBar;
