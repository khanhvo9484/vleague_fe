import { IconButton, TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";
import { Autocomplete } from "@mui/material";
import MyAxios from "../../../api/MyAxios";

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
  const [recentSearches, setRecentSearches] = useState([]);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <Autocomplete
        className={classes.searchField}
        options={["123", "12312"]}
        autoHighlight
        noOptionsText="Không tìm thấy kết quả"
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
            }}
          />
        )}
      ></Autocomplete>
    </>
  );
};

export default SearchBar;
