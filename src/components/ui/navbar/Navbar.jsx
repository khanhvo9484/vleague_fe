import {
  AppBar,
  Avatar,
  Grid,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    bgcolor: theme.palette.primary.main,
    padding: "0!important",
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
  const authContext = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    console.log(authContext);
    if (authContext?.auth?.username) {
      setIsLogin(true);
    } else {
      console.log("no user");
      setIsLogin(false);
    }
  }, [authContext]);
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
        <Toolbar sx={{ display: "flex", userSelect: "none" }}>
          <Link to="/" sx={{}}>
            <img
              className="navbar-logo"
              src="./src/assets/football1.png"
              style={{
                height: "50px",
                margin: "10px",
                cursor: "pointer",
                userSelect: "none",
              }}
            />{" "}
          </Link>

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
          <Box
            sx={{
              minWidth: "6rem",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {!isLogin && (
              <Link to="/login">
                <Typography
                  variant="body1"
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
              </Link>
            )}

            {isLogin && <UserMenu />}
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
