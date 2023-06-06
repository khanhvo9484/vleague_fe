import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    bgcolor: "primary",
  },
  searchField: {
    borderRadius: "80px",
    backgroundColor: "white",
    minWidth: "300px!important",
    marginLeft: "auto!important",
    marginRight: "auto!important",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <header>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar sx={{ display: "flex" }}>
          <img
            className="navbar-logo"
            src="./src/assets/football.png"
            style={{ height: "25px", margin: "10px" }}
          />
          <Typography variant="h6" component="div">
            Giải vô địch quốc gia Việt Nam
          </Typography>

          <TextField
            size="small"
            className={classes.searchField}
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm cầu thủ, đội bóng,..."
            sx={{
              "& fieldset": { border: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    edge="start"
                    onClick={handleClearSearch}
                    style={{ cursor: "pointer" }}
                    sx={{
                      "&:hover": { bgcolor: "primary.main" },
                      "&:active": { bgcolor: "red", border: "none" },
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
                      edge="end"
                      onClick={handleClearSearch}
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Avatar />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
