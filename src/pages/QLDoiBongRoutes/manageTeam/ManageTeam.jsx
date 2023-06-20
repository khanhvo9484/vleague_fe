import React from "react";
import { Box, Grid } from "@mui/material";
import PlayersList from "../../../components/form/PlayersList";
import MyAxios from "../../../api/MyAxios";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { makeStyles } from "@mui/styles";
import useLoading from "../../../hooks/useLoading";
import ManagerLayout from "../../../layout/ManagerLayout";
import PlayerLargeCard from "../../../components/ui/PlayerLargeCard";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({}));
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#3834a6",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    "&.Mui-selected": {
      color: theme.palette.primary.dark,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import useEditInfo from "../../../hooks/useEditInfo";
const ManageTeam = () => {
  const { auth } = useAuth();
  const { setIsLoading, setNotify } = useLoading();
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const { setCurrentPlayer, currentPlayer } = useCurrentLeague();
  const [player, setPlayer] = useState({});
  const { isEditable } = useEditInfo();

  useEffect(() => {
    players.find((item) => item.id == currentPlayer && setPlayer(item));
  }, [currentPlayer]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await MyAxios.get(`/doibong/${auth?.teamId}`);
      setClubs(response.data?.data);
      setPlayers(response.data?.data?.danhSachCauThuDangThiDau);
      setPlayer(response.data?.data?.danhSachCauThuDangThiDau[0]);
      setCurrentPlayer(response.data?.data?.danhSachCauThuDangThiDau[0]?.id);
    } catch (err) {
      setNotify({
        message: "Không thể lấy danh sách cầu thủ",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <ManagerLayout>
      <Box sx={{ margin: "0 2rem 0 2rem", paddingTop: "1rem" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "4px",
          }}
        >
          <StyledTabs
            value={1}
            // onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Danh sách" />
            <StyledTab label="Thêm cầu thủ" />
            <StyledTab label="Connections" />
          </StyledTabs>
        </Paper>
        <Grid
          container
          spacing={0}
          justifyContent={isEditable ? "flex-start" : "space-between"}
        >
          {!isEditable && (
            <Grid item xs={8} sm={8} lg={8}>
              <PlayersList data={players} />
            </Grid>
          )}

          <Grid item xs={isEditable ? 12 : 3} sm={isEditable ? 12 : 3}>
            <PlayerLargeCard player={player}></PlayerLargeCard>
          </Grid>
        </Grid>
      </Box>
    </ManagerLayout>
  );
};

export default ManageTeam;
