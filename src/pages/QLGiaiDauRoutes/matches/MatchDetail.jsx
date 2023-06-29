import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import { Paper, Grid, Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MyAxios from "../../../api/MyAxios";
import MatchDetailComponent from "../../../components/ui/MatchDetailComponent/MatchDetailComponent";

const useStyles = makeStyles((theme) => ({}));
const MatchDetail = () => {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get("matchId");

  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState({});
  const [notify, setNotify] = useState({ message: "", type: "" });
  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.get(`/trandau/${matchId}`);
      setMatch(res.data.data);
    } catch (err) {
      console.log(err);
      setNotify({ message: err?.data?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <OrganizerLayout
      title={"Quản lý trận đấu"}
      childLv1={"Chi tiết trận đấu"}
      parentLink={"/organizer/matches"}
      isLoading={isLoading}
      notify={notify}
    >
      <ComponentLayoutBackdrop>
        <Grid
          container
          component={Paper}
          elevation={3}
          sx={{ padding: "0.5rem", mt: "1rem" }}
        >
          <Grid
            item
            xs={12}
            sx={{ backgroundColor: "blueBackground.manage", padding: "1rem" }}
          >
            {!match && (
              <Typography variant="h5">Không tìm thấy trận đấu</Typography>
            )}
            <MatchDetailComponent match={match}></MatchDetailComponent>
          </Grid>
        </Grid>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default MatchDetail;
