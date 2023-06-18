import {
  Avatar,
  MenuList,
  MenuItem,
  Popover,
  styled,
  Typography,
  Box,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { Logout, ManageAccounts } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  let navigate = useNavigate();
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
  const handleGoToDashboard = () => {
    if (AuthContext?.auth?.role === "QLDB") {
      navigate("/manager/dashboard", { replace: true });
    } else if (AuthContext?.auth?.role === "QLGD") {
      navigate("/organizer/dashboard", { replace: true });
    }
    handleMenuClose();
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          onClick={handleAvatarClick}
          sx={{ cursor: "pointer", "&:hover": { scale: "1.1" } }}
        >
          {AuthContext?.auth?.username &&
            AuthContext?.auth?.username.substring(0, 1)}
        </Avatar>
        <Popover
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
          <MenuList
            sx={{
              padding: "0.2rem!important",
              backgroundColor: "blueBackground.main",
            }}
          >
            <MenuItem
              onClick={handleGoToDashboard}
              sx={{
                boxShadow: 1,
                borderRadius: "4px",
                backgroundColor: "white",
                margin: "0.2rem",
                // border: "1px solid black",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",

                  // padding: "0.5rem",
                }}
              >
                <ManageAccounts fontSize="small" sx={{ mr: "0.5rem" }} />
                Tới trang quản lý
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{
                boxShadow: 1,
                borderRadius: "4px",
                backgroundColor: "white",
                margin: "0.2rem",
                // border: "1px solid black",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",

                  // padding: "0.5rem",
                }}
              >
                <Logout fontSize="small" sx={{ mr: "0.5rem" }} />
                Đăng xuất
              </Typography>
            </MenuItem>
          </MenuList>
        </Popover>
      </Box>
    </>
  );
};

export default UserMenu;
