import { Paper, Box, Grid, Typography, Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const LeagueDetail = (props) => {
  const { league, setSelectedLeague } = props;
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: "0.5rem", ml: "0.5rem" }}>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "left" }}>
          <Typography variant="h5">{league[0]?.tenGiai}</Typography>
        </Box>
        <Box>
          <Typography>Danh sách đội đã đăng ký</Typography>
        </Box>
      </Grid>
      {league &&
        league.map((item, index) => (
          <Grid
            item
            xs={5}
            key={index}
            component={Paper}
            elevation={3}
            sx={{ mt: "0.5rem", ml: "0.5rem" }}
          >
            <Box
              sx={{ display: "flex", padding: "0.5rem", alignItems: "center" }}
            >
              <Box sx={{ width: "60px" }}>
                <img style={{ height: "40px" }} src={item?.hinhAnhDoi}></img>
              </Box>
              <Typography variant="h6">{item?.ten_doibong}</Typography>
            </Box>
          </Grid>
        ))}
      <Grid item xs={12} sx={{ mt: "1rem", ml: "0.5rem" }}>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "left" }}>
          <Button
            startIcon={<ArrowBackIos></ArrowBackIos>}
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedLeague("");
            }}
          >
            Trở lại
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LeagueDetail;
