import { Box, Paper, Typography } from "@mui/material";
import LoadingBox from "../components/ui/LoadingBox";
const ComponentLayout = (props) => {
  const { isLoading, notify } = props;
  const { children, componentName } = props;
  return (
    <Paper elevation={0} sx={{ margin: "0rem 0rem 0 0rem", height: "100%" }}>
      {isLoading && <LoadingBox></LoadingBox>}
      {!isLoading && notify?.message && (
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
            {notify?.message}
          </Typography>
        </Box>
      )}

      {!isLoading && !notify?.message && <Box>{children}</Box>}
    </Paper>
  );
};

export default ComponentLayout;
