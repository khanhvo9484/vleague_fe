import { AppBar, Grid, Box, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

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
      setIsLogin(false);
    }
  }, [authContext]);
  const theme = useTheme();
  const classes = useStyles();

  return (
    <header>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar sx={{ display: "flex", userSelect: "none" }}>
          <Link to="/" style={{ maxWidth: "6rem" }}>
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
          <SearchBar />
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
