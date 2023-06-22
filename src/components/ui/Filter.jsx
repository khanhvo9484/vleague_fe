import { useState, useEffect } from "react";
import {
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
const Filter = (props) => {
  const { placeholder, width, onFilterChange } = props;
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onFilterChange("");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        size="small"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder={placeholder}
        sx={{
          "& fieldset": { border: "1px solid gray", paddingLeft: 0 },
          flex: 1,
          width: width ? width : "100%",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                size="small"
                edge="start"
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
            <InputAdornment position="end">
              {searchValue && (
                <IconButton
                  size="small"
                  edge="start"
                  onClick={handleClearSearch}
                  style={{ cursor: "pointer" }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Filter;
