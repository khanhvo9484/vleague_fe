import React from "react";
import { Box, Grid } from "@mui/material";
import PlayersList from "../../../components/form/PlayersList";
import MyAxios from "../../../api/MyAxios";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { makeStyles } from "@mui/styles";
import ManagerLayout from "../../../layout/ManagerLayout";
import PlayerLargeCard from "../../../components/ui/PlayerLargeCard";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import AddNewPlayerToClub from "./AddNewPlayerToClub";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const { setCurrentPlayer, currentPlayer } = useCurrentLeague();
  const [player, setPlayer] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    if (newValue == 1) {
      // setIsLoadingComponent(true);
    }
    setCurrentTab(newValue);
  };
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
    <ManagerLayout isLoading={isLoading} notify={notify}>
      <Box sx={{ margin: "0 2rem 0 2rem", paddingTop: "1rem" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "4px",
          }}
        >
          <StyledTabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="styled tabs example"
          >
            <StyledTab value={0} label="Danh sách"></StyledTab>
            <StyledTab value={1} label="Thêm cầu thủ"></StyledTab>
          </StyledTabs>
          <TabPanel value={currentTab} index={0}>
            <Grid
              container
              spacing={0}
              justifyContent={isEditable ? "flex-start" : "space-between"}
            >
              {!isEditable && (
                <Grid item xs={8} sm={8} lg={8}>
                  <PlayersList data={players} isEditable={isEditable} />
                </Grid>
              )}

              <Grid item xs={isEditable ? 12 : 3} sm={isEditable ? 12 : 3}>
                <PlayerLargeCard
                  isEditable={isEditable}
                  setIsEditable={setIsEditable}
                  player={player}
                ></PlayerLargeCard>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box>
              <AddNewPlayerToClub></AddNewPlayerToClub>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </ManagerLayout>
  );
};

export default ManageTeam;
