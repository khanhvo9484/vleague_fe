import React from "react";
import { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import ClubInfo from "../../../components/ui/clubInfo/ClubInfo";
import MyAxios from "../../../api/MyAxios";
import NotifiBox from "../../../components/ui/NotifiBox";
import {
  Paper,
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { Edit, Check, Close, Add } from "@mui/icons-material";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import useLoading from "../../../hooks/useLoading";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import { makeStyles } from "@mui/styles";
import { status } from "../../../data/GlobalConstant";
import Helper from "../../../utils/Helper";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import OneLeague from "./OneLeague";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import AddNewLeague from "./AddNewLeague";
import { useLocation } from "react-router-dom";
import LeagueDetail from "./LeagueDetail";
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
const useStyles = makeStyles((theme) => ({
  detailBoxRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem!important",
    // color: theme.palette.primary.dark,
    color: "white",
    backgroundColor: theme.palette.primary.dark,
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },
  normalTextField: {},
  disableTextField: {
    "& fieldset": {
      border: "none",
      color: theme.palette.primary.dark,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      // WebkitTextFillColor: theme.palette.primary.dark,
      WebkitTextFillColor: "white",
    },
  },
  select: {
    padding: "0!important",
    color: theme.palette.primary.dark + "!important",
  },
  ruleSection: {
    backgroundColor: theme.palette.blueBackground.manage,
    padding: "1rem!important",
    borderRadius: "4px!important",
  },
}));
const LeaguesList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const classes = useStyles();
  const [allLeagues, setAllLeagues] = useState([]);
  const [currentLeague, setCurrentLeague] = useState([]);

  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const [currentTab, setCurrentTab] = useState(0);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const [selectedLeague, setSelectedLeague] = useState("");

  return (
    <OrganizerLayout title={"Mùa giải"}>
      <StyledTabs
        value={currentTab}
        onChange={handleChangeTab}
        aria-label="styled tabs example"
      >
        <StyledTab value={0} label="Danh sách"></StyledTab>
        <StyledTab value={1} label="Thêm mùa giải"></StyledTab>
      </StyledTabs>
      <TabPanel value={currentTab} index={0}>
        <Box sx={{ display: "none" }}>
          <AllLeaguesSelector
            // currentLeague={currentLeague}
            // setCurrentLeague={setCurrentLeague}
            selectId={id}
            AllLeagues={allLeagues}
            setAllLeagues={setAllLeagues}
          ></AllLeaguesSelector>
        </Box>

        <Box sx={{ color: "primary.main" }}>
          <Box
            sx={{
              mt: "1rem",
              mb: "0.5rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></Box>
        </Box>
        {!isShowDetail &&
          allLeagues &&
          allLeagues.map((league) => (
            <Box sx={{ mb: "1rem" }} key={league?.id}>
              <OneLeague
                league={league}
                snackbarContent={snackbarContent}
                snackbarType={snackbarType}
                isOpenSnackbar={isOpenSnackbar}
                setIsOpenSnackbar={setIsOpenSnackbar}
                setSnackbarContent={setSnackbarContent}
                setSnackbarType={setSnackbarType}
                setSelectedLeague={setSelectedLeague}
                isShowDetail={isShowDetail}
                setIsShowDetail={setIsShowDetail}
              ></OneLeague>
            </Box>
          ))}
        {isShowDetail && (
          <Box sx={{ mb: "1rem" }}>
            <LeagueDetail
              league={selectedLeague}
              setSelectedLeague={setSelectedLeague}
            ></LeagueDetail>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <AddNewLeague></AddNewLeague>
      </TabPanel>

      <CustomSnackbar
        message={snackbarContent}
        type={snackbarType}
        isOpen={isOpenSnackbar}
        setIsOpen={setIsOpenSnackbar}
      ></CustomSnackbar>
    </OrganizerLayout>
  );
};

export default LeaguesList;
