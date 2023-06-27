import React from "react";
import Navbar from "../components/ui/navbar/Navbar.jsx";
import Footer from "../components/ui/Footer";
import { makeStyles } from "@mui/styles";
import {
  Drawer,
  ListItemIcon,
  ListItemText,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useProgressiveImage from "../hooks/useProgressiveImage.js";
import drawerLogo from "../assets/patterns/drawerLogo.png";
import drawerPatterns from "../assets/patterns/drawerPatterns.png";
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingTop: "64px",
    minHeight: "98vh",
  },
  drawer: {
    width: drawerWidth,
    zIndex: theme.zIndex.drawer,
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
    marginTop: theme.mixins.toolbar.minHeight,
    boxShadow: theme.shadows[10] + "!important",
  },
  active: {
    backgroundColor: theme.palette.primary.main + "!important",
    color: "white!important",
    outline: "2px solid white!important",
    "& .MuiListItemIcon-root": {
      color: "white!important",
    },
  },
}));
const DrawerLayout = ({ children, menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const drawerLogoImage = useProgressiveImage(drawerLogo);
  const drawerPatternImage = useProgressiveImage(drawerPatterns);
  return (
    <div>
      <Box className={classes.root}>
        <Navbar />

        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          anchor="left"
          sx={{}}
          PaperProps={{
            sx: {
              backgroundImage: `url(${drawerPatternImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
          }}
        >
          <List
            sx={{
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            {drawerLogoImage &&
              drawerPatternImage &&
              menuItems.map((item) => {
                return (
                  <ListItem key={item.text}>
                    <ListItemButton
                      sx={{
                        borderRadius: "4px",
                        boxShadow: (theme) => theme.shadows[7],
                        backgroundColor: "white",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                          outline: "2px solid white",
                          color: "white",
                          "& .MuiListItemIcon-root": {
                            color: "white",
                          },
                        },
                        "& .MuiListItemIcon-root": {
                          color: "primary.main",
                        },
                      }}
                      className={
                        location.pathname.includes(item?.path)
                          ? classes.active
                          : ""
                      }
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>{item?.icon}</ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { fontWeight: 600 } }}
                      >
                        {item.text}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
          <Box
            sx={{
              backgroundImage: `url(${drawerLogoImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "6rem",
              height: "8rem",
              position: "absolute",
              bottom: "4rem",
              left: "200px",
            }}
          ></Box>
        </Drawer>
        <div className={classes.toolbar}> </div>
        <main className={classes.content}>{children}</main>
      </Box>
      <Footer drawerWidth={drawerWidth} />
    </div>
  );
};

export default DrawerLayout;
