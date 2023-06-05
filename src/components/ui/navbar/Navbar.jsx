import { AppBar, Toolbar, Typography } from "@mui/material";
import "./Navbar.css"
const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar className="navbar-container">
        <img className="navbar-logo" src="./src/assets/football.png"></img>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Giải vô địch quốc gia Việt Nam
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
