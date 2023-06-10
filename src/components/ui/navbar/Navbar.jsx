import {
  AppBar,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import useProgressiveImage from "../../../hooks/useProgressiveImage";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
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

const Navbar = ({ drawerWidth }) => {
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
  const loadedLogo = useProgressiveImage("./src/assets/football1.png");

  return (
    <header>
      <AppBar
        sx={{
          width: drawerWidth ? `calc(100% - ${drawerWidth}px)` : "100%",
          zIndex: (theme) => {
            return theme.zIndex.drawer + 1;
          },
        }}
        position="fixed"
        className={classes.root}
      >
        <Toolbar sx={{ userSelect: "none" }}>
          <Box
            sx={{
              visibility: loadedLogo ? "visible" : "hidden",
              display: "flex",
              width: "100%",
              userSelect: "none",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ maxWidth: "6rem" }}>
              <img
                className="navbar-logo"
                src={loadedLogo}
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
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
