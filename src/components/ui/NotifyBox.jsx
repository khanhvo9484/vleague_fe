import { Box, Typography } from "@mui/material";

const NotifyBox = ({ notify }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h6" color={notify.type}>
        {notify.message}
      </Typography>
    </Box>
  );
};

export default NotifyBox;
