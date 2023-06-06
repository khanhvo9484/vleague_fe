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
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
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
            src="./src/assets/football1.png"
            style={{ height: "50px", margin: "10px", cursor: "pointer" }}
            onClick={() => Link("/")}
          />

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
          <Typography
            variant="body"
            sx={{
              display: "flex",
              alignItems: "center",
              userSelect: "none",
              "&:hover": {
                color: theme.palette.secondary.main,
                textDecoration: "underline",
              },
              cursor: "pointer",
            }}
          >
            <LoginIcon sx={{ margin: "5px" }} />
            Đăng nhập
          </Typography>
          <Avatar sx={{ margin: "5px" }}></Avatar>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
