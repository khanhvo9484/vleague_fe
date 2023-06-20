import { Box, Paper, Backdrop, CircularProgress } from "@mui/material";
import useLoading from "../hooks/useLoading";
import LoadingBox from "../components/ui/LoadingBox";
const ComponentLayout = () => {
  const { isLoading, notify, setIsLoading } = useLoading();
  return (
    <Paper elevation={0} sx={{ margin: "0rem 0rem 0 0rem", height: "100%" }}>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
          open={isLoading}
        >
          <LoadingBox></LoadingBox>
        </Backdrop>
      )}
      {!isLoading && notify.message && (
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            opacity: "0.5",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              backgroundColor: `${notify.type}.light`,
              color: `${notify.type}.main`,
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {notify.message}
          </Typography>
        </Box>
      )}

      {!isLoading && !notify.message && <Box>{children}</Box>}
    </Paper>
  );
};

export default ComponentLayout;
