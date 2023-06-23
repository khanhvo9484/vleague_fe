import { CircularProgress, Backdrop, Box } from "@mui/material";
import { useState } from "react";
const LoadingOverlay = () => {
  const [isOpenBackdrop, setIsOpenBackdrop] = useState(true);

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenBackdrop}
        onClick={() => setIsOpenBackdrop(false)}
      >
        <CircularProgress color="white"></CircularProgress>
      </Backdrop>
    </Box>
  );
};

export default LoadingOverlay;
