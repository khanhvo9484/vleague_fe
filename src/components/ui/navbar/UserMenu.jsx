import { Avatar, MenuList, MenuItem, Popover, styled } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const UserMenu = () => {
  const AuthContext = useAuth();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  return (
    <>
      <Avatar
        onClick={handleAvatarClick}
        sx={{ cursor: "pointer", "&:hover": { scale: "1.1" } }}
      >
        {AuthContext?.auth?.username &&
          AuthContext?.auth?.username.substring(0, 1)}
      </Avatar>
      <Popover
        // sx={{
        //   position: "absolute",
        //   marginTop: (theme) => theme.spacing(1),
        //   marginLeft: (theme) => theme.spacing(1),
        // }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default UserMenu;
