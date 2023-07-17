import { Backdrop, Paper, Box, Typography, Button } from "@mui/material";
import { Close, Check } from "@mui/icons-material";
import useEditInfo from "../../hooks/useEditInfo";
const ConfirmBox = ({ children, openNotiBox, setOpenNotiBox, setIsAccept }) => {
  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openNotiBox}
        onClick={() => setOpenNotiBox(false)}
      >
        <Paper sx={{}}>
          <Box>
            <Box sx={{ padding: "2rem 2rem 2rem 2rem" }}>{children}</Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                paddingBottom: "1rem",
              }}
            >
              <Button
                variant="contained"
                startIcon={<Check></Check>}
                sx={{ opacity: "0.7" }}
                color="info"
                onClick={() => setIsAccept(true)}
              >
                Đồng ý
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ opacity: "0.7" }}
                startIcon={<Close></Close>}
                onClick={() => setIsAccept(false)}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default ConfirmBox;
