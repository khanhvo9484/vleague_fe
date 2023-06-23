import {
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import LoadingBox from "../components/ui/LoadingBox";
const ComponentLayoutBackdrop = (props) => {
  const { isLoading, notify } = props;
  const { children, componentName } = props;
  return (
    <Paper elevation={0} sx={{ margin: "0rem 0rem 0 0rem", height: "100%" }}>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
          open={isLoading}
        >
          <LoadingBox color={"white"}></LoadingBox>
        </Backdrop>
      )}
      <Box>{children}</Box>
    </Paper>
  );
};

export default ComponentLayoutBackdrop;
