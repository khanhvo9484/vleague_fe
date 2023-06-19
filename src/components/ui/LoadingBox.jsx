import { Box, CircularProgress } from "@mui/material";

const LoadingBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress></CircularProgress>
    </Box>
  );
};

export default LoadingBox;
