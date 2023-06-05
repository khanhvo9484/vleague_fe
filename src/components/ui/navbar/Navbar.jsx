import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { baselightTheme } from "../../../theme/DefaultTheme";

import "./Navbar.css";
const Navbar = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <header>
        <AppBar
          position="fixed"
          sx={{
            top: 0,
            left: 0,
            right: 0,
            background: "primary.main",
          }}
          style={{ boxShadow: baselightTheme.shadows[1] }}
        >
          <Toolbar className="navbar-container">
            <img className="navbar-logo" src="./src/assets/football.png"></img>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Giải vô địch quốc gia Việt Nam
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
    </ThemeProvider>
  );
};

export default Navbar;
