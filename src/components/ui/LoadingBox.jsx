import { Box, CircularProgress } from "@mui/material";

const LoadingBox = (props) => {
  const { color } = props;
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
      <CircularProgress sx={{ color: color ? color : "" }}></CircularProgress>
    </Box>
  );
};

export default LoadingBox;
