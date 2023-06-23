import {
  Backdrop,
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import useEditInfo from "../../hooks/useEditInfo";
const ConfirmBox = ({
  children,
  isOpenNotification,
  setIsOpenNotification,
}) => {
  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenNotification}
        onClick={() => setIsOpenNotification(false)}
      >
        <Paper sx={{}}>
          <Box sx={{ position: "relative" }}>
            <IconButton sx={{ position: "absolute", right: "0" }}>
              <Close
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
                color="error"
              ></Close>
            </IconButton>
            <Box sx={{ padding: "2rem 2rem 2rem 2rem" }}>{children}</Box>
          </Box>
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default ConfirmBox;
