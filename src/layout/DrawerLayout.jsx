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
} from "@mui/material";

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
    // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px!important",
    backgroundColor: theme.palette.blueBackground.main,
    marginTop: theme.mixins.toolbar.minHeight,
  },
}));
const DrawerLayout = ({ children, menuItems }) => {
  if (children) {
    console.log("props", children);
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />

      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="permanent"
        anchor="left"
        sx={{
          "& > .MuiBackdrop-root": {
            display: "none",
          },
        }}
        PaperProps={{
          sx: { backgroundColor: "blueBackground.main", boxShadow: "none" },
        }}
      >
        <List sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          {menuItems.map((item) => {
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
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
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
      </Drawer>
      <div className={classes.toolbar}> </div>
      <main className={classes.content}>{children}</main>
      <Footer drawerWidth={drawerWidth} />
    </div>
  );
};

export default DrawerLayout;
