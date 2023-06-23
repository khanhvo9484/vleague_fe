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
} from "@mui/material";
import { Edit, Check, Close, Add } from "@mui/icons-material";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import useLoading from "../../../hooks/useLoading";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import { makeStyles } from "@mui/styles";
import { status } from "../../../data/GlobalConstant";
import Helper from "../../../utils/Helper";
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
  const classes = useStyles();
  const [AllLeagues, setAllLeagues] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const [maxPlayer, setMaxPlayer] = useState(0);
  const [maxForeignPlayer, setMaxForeignPlayer] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [minAge, setMinAge] = useState(0);
  const [minPlayer, setMinPlayer] = useState(0);

  const [currentLeague, setCurrentLeague] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [winPoint, setWinPoint] = useState(0);
  const [drawPoint, setDrawPoint] = useState(0);
  const [losePoint, setLosePoint] = useState(0);

  const [numberOfClubs, setNumberOfClubs] = useState(0);

  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  useEffect(() => {
    setIsEditable(false);
    if (currentLeague) {
      setMaxPlayer(currentLeague?.quyDinhCauThu?.soLuongCauThuToiDa);
      setMinPlayer(currentLeague?.quyDinhCauThu?.soLuongCauThuToiThieu);
      setMaxForeignPlayer(
        currentLeague?.quyDinhCauThu?.soLuongCauThuNuocNgoaiToiDa
      );
      setMaxAge(currentLeague?.quyDinhCauThu?.tuoiToiDa);
      setMinAge(currentLeague?.quyDinhCauThu?.tuoiToiThieu);
      setWinPoint(currentLeague?.quyDinhTinhDiem?.thang);
      setDrawPoint(currentLeague?.quyDinhTinhDiem?.hoa);
      setLosePoint(currentLeague?.quyDinhTinhDiem?.thua);
      setNumberOfClubs(currentLeague?.quyDinhSoLuongDoi?.soLuongDoi);
    } else {
      setMaxPlayer(0);
      setMinPlayer(0);
      setMaxForeignPlayer(0);
      setMaxAge(0);
      setMinAge(0);
      setWinPoint(0);
      setDrawPoint(0);
      setLosePoint(0);
      setNumberOfClubs(0);
    }
  }, [currentLeague]);
  const handleClickEdit = () => {
    if (!currentLeague) {
      setIsOpenNotification(true);
      setNotificationContent("Vui lòng chọn giải đấu");
      return;
    }
    if (currentLeague?.trangThai == 1 || currentLeague?.trangThai == 2) {
      setIsOpenNotification(true);
      setNotificationContent(
        "Không thể chỉnh sửa quy định giải đấu khi giải đấu đang diễn ra hoặc đã kết thúc"
      );
    } else {
      setIsEditable(true);
    }
  };

  return (
    <OrganizerLayout title={"Mùa giải"}>
      <AllLeaguesSelector
        setCurrentLeague={setCurrentLeague}
        currentLeague={currentLeague}
        selectFirst={true}
        AllLeagues={AllLeagues}
        setAllLeagues={setAllLeagues}
      ></AllLeaguesSelector>
      <Box sx={{ color: "primary.main" }}>
        <Box
          sx={{
            mt: "1rem",
            mb: "0.5rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button startIcon={<Add></Add>} variant="contained">
            <Typography variant="body1">Thêm mùa giải</Typography>
          </Button>
        </Box>
        <Grid
          container
          sx={{ padding: "2rem" }}
          component={Paper}
          elevation={3}
        >
          <Grid container item xs={12} sm={12} justifyContent={"space-between"}>
            {currentLeague && (
              <Grid item container xs={12} sm={12} md={12} sx={{ mb: "1rem" }}>
                <Grid item xs={4}>
                  <Box sx={{ display: "flex" }}>
                    <img
                      style={{
                        height: "80px",
                        marginRight: "1rem",
                      }}
                      src={currentLeague?.hinhAnh}
                      alt={currentLeague?.ten}
                    ></img>
                    <Typography variant="h5">{currentLeague?.ten}</Typography>
                  </Box>
                </Grid>

                {/* <Grid item xs={2}></Grid> */}
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Typography>Thời điểm bắt đầu:</Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h6">
                    {Helper.formatDateToLocal(currentLeague?.thoiDiemBatDau)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Typography>Thời điểm kết thúc:</Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h6">
                    {Helper.formatDateToLocal(currentLeague?.thoiDiemBatDau)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Typography>Trạng thái:</Typography>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h6"
                    color={
                      currentLeague?.trangThai == 0
                        ? "info.main"
                        : currentLeague?.trangThai == 1
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {status[currentLeague?.trangThai]}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid item xs={1} justifyContent={"flex-end"}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {!isEditable && (
                  <IconButton
                    onClick={() => {
                      handleClickEdit();
                    }}
                  >
                    <Edit></Edit>
                  </IconButton>
                )}
                {isEditable && (
                  <Box>
                    <IconButton onClick={() => {}}>
                      <Check color="success"></Check>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsEditable(false);
                      }}
                    >
                      <Close color="error"></Close>
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {isOpenNotification && (
        <NotifiBox
          isOpenNotification={isOpenNotification}
          setIsOpenNotification={setIsOpenNotification}
        >
          <Typography>{notificationContent}</Typography>
        </NotifiBox>
      )}
    </OrganizerLayout>
  );
};

export default LeaguesList;
