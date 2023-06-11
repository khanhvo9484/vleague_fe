import { IconButton, TextField, InputAdornment, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import MyAxios from "../../../api/MyAxios";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  searchField: {
    borderRadius: "10px",
    backgroundColor: "white",
    minWidth: "300px!important",
    marginLeft: "auto!important",
    marginRight: "auto!important",
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const [allTeams, setAllTeams] = useState([]);
  const [filterTeams, setFilterTeams] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearchChange = async (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(async () => {
    if (isLoading === false) return;
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
        // console.log(mappedArr);
        if (allTeams.length > 0) {
          let filterTeamsArr = allTeams.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
          });
          setFilterTeams([filterTeamsArr]);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [isLoading]);
  useEffect(() => {
    setSearchResult([...allTeams, ...allPlayers]);
  }, [allPlayers]);
  useEffect(() => {
    console.log("search RS: ", searchResult);
  }, [searchResult]);
  return (
    <>
      <Autocomplete
        className={classes.searchField}
        isOptionEqualToValue={(option, value) =>
          option.name === value.name && option.id === value.id
        }
        getOptionLabel={(option) => {
          return option.name;
        }}
        filterOptions={(x) => x}
        options={searchResult}
        // autoHighlight
        groupBy={(option) => option.type}
        filterSelectedOptions
        noOptionsText="Không tìm thấy kết quả"
        // renderGroup={(params) => (
        //     <li key={params.key}>

        //     </li>
        // )}
        // renderOption={(props, option) => (
        //   <Box key={uuidv4()} {...props}>
        //     {option.name} hehe
        //   </Box>
        // )}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={() => setIsLoading(true)}
            onBlur={() => setIsLoading(false)}
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
            }}
          />
        )}
      ></Autocomplete>
    </>
  );
};

export default SearchBar;
