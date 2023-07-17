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
  Snackbar,
} from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import useEditInfo from "../../../hooks/useEditInfo";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import AllLeagues from "../../../components/ui/AllLeaguesSelector";
import { makeStyles } from "@mui/styles";
import { current } from "@reduxjs/toolkit";
import { status } from "../../../data/GlobalConstant";
import Helper from "../../../utils/Helper";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import RuleSection from "./RuleSection";
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
const Dashboard = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [isEditable, setIsEditable] = useState(false);

  const [maxPlayer, setMaxPlayer] = useState(-1);
  const [maxForeignPlayer, setMaxForeignPlayer] = useState(-1);
  const [maxAge, setMaxAge] = useState(-1);
  const [minAge, setMinAge] = useState(-1);
  const [minPlayer, setMinPlayer] = useState(-1);

  const [currentLeague, setCurrentLeague] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [winPoint, setWinPoint] = useState(-1);
  const [drawPoint, setDrawPoint] = useState(-1);
  const [losePoint, setLosePoint] = useState(-1);

  const [numberOfClubs, setNumberOfClubs] = useState(-1);

  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");

  const [notify, setNotify] = useState("");

  const [redBorderWinPoint, setRedBorderWinPoint] = useState(false);
  const [redBorderDrawPoint, setRedBorderDrawPoint] = useState(false);
  const [redBorderLosePoint, setRedBorderLosePoint] = useState(false);

  useEffect(() => {
    if (winPoint && drawPoint && losePoint) {
      if (
        winPoint === drawPoint ||
        winPoint === losePoint ||
        drawPoint === losePoint
      ) {
        setNotify("Điểm thắng, hòa, thua không được trùng nhau");
      } else if (winPoint < 0 || drawPoint < 0 || losePoint < 0) {
        setNotify("Điểm không được âm");

        setRedBorderWinPoint(winPoint < 0 ? true : false);
        setRedBorderDrawPoint(drawPoint < 0 ? true : false);
        setRedBorderLosePoint(losePoint < 0 ? true : false);
      } else if (winPoint < drawPoint || winPoint < losePoint) {
        setNotify("Điểm thắng phải lớn hơn điểm hòa và thua");

        setRedBorderWinPoint(true);
      } else if (drawPoint > winPoint || drawPoint < losePoint) {
        setNotify("Điểm hòa phải lớn hơn điểm thua và nhỏ hơn điểm thắng");

        setRedBorderDrawPoint(true);
      } else if (losePoint > winPoint || losePoint > drawPoint) {
        setNotify("Điểm thua phải nhỏ hơn điểm thắng và hòa");

        setRedBorderLosePoint(true);
      } else {
        setNotify("");

        setRedBorderWinPoint(false);
        setRedBorderDrawPoint(false);
        setRedBorderLosePoint(false);
      }
    }
  }, [winPoint, losePoint, drawPoint]);

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
      setMaxPlayer(-1);
      setMinPlayer(-1);
      setMaxForeignPlayer(-1);
      setMaxAge(-1);
      setMinAge(-1);
      setWinPoint(-1);
      setDrawPoint(-1);
      setLosePoint(-1);
      setNumberOfClubs(-1);
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
  const handleCancelUpdate = () => {
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
    setIsEditable(false);
  };
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleUpdateRules = async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.put(
        `/muagiai/capnhat`,
        {
          ...currentLeague,
          quyDinhCauThu: {
            ...currentLeague.quyDinhCauThu,
            soLuongCauThuToiDa: maxPlayer,
            soLuongCauThuToiThieu: minPlayer,
            soLuongCauThuNuocNgoaiToiDa: maxForeignPlayer,
            tuoiToiDa: maxAge,
            tuoiToiThieu: minAge,
          },
          quyDinhTinhDiem: {
            ...currentLeague.quyDinhTinhDiem,
            thang: winPoint,
            hoa: drawPoint,
            thua: losePoint,
          },
          quyDinhSoLuongDoi: {
            ...currentLeague.quyDinhSoLuongDoi,
            soLuongDoi: numberOfClubs,
          },
        },
        {
          contentType: "application/json",
        }
      );
      if (res.status === 200) {
        setIsOpenSnackbar(true);
        setSnackbarContent("Cập nhật quy định thành công");
        setSnackbarType("success");
      }
    } catch (err) {
      setIsOpenSnackbar(true);
      setSnackbarContent("Cập nhật quy định thất bại");
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsEditable(false);
    }
  };
  return (
    <OrganizerLayout title={"Quy định giải đấu"}>
      <AllLeagues
        setCurrentLeague={setCurrentLeague}
        currentLeague={currentLeague}
      ></AllLeagues>
      <ComponentLayoutBackdrop isLoading={isLoading}>
        <Box sx={{ color: "primary.main" }}>
          <Grid
            container
            sx={{ mt: "2rem", padding: "2rem" }}
            component={Paper}
            elevation={3}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              justifyContent={"space-between"}
            >
              {currentLeague && (
                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{ mb: "1rem" }}
                >
                  <Grid item xs={4}>
                    <Box sx={{ display: "flex" }}>
                      <img
                        style={{
                          height: "35px",
                          marginRight: "1rem",
                        }}
                        src={currentLeague?.hinhAnh}
                        alt={currentLeague?.ten}
                      ></img>
                      <Typography variant="h5">{currentLeague?.ten}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={2}></Grid>
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

              <RuleSection
                header={"Quy định cầu thủ"}
                maxAge={maxAge}
                minAge={minAge}
                maxPlayer={maxPlayer}
                minPlayer={minPlayer}
                maxForeignPlayer={maxForeignPlayer}
                setMaxAge={setMaxAge}
                setMinAge={setMinAge}
                setMaxForeignPlayer={setMaxForeignPlayer}
                setMaxPlayer={setMaxPlayer}
                setMinPlayer={setMinPlayer}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
              ></RuleSection>
              <Grid item container xs={5} className={classes.ruleSection}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: "1rem" }}>
                    {" "}
                    Quy định tính điểm
                  </Typography>
                  <Grid item container className={classes.detailBoxRow}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">Thắng</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{
                          width: "100%",
                          input: {
                            color: "white",
                            padding: isEditable ? "1rem" : "0 0 0 1rem",
                            fontWeight: "700",
                            // fontSize: "1.2rem",
                          },
                          border: redBorderWinPoint ? "2px solid red" : "none",
                          borderRadius: "4px",
                        }}
                        disabled={!isEditable}
                        className={!isEditable ? classes.disableTextField : ""}
                        value={winPoint === -1 ? "Không có dữ liệu" : winPoint}
                        onChange={(e) => setWinPoint(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Grid item container className={classes.detailBoxRow}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">Hòa</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{
                          width: "100%",
                          input: {
                            color: "white",
                            padding: isEditable ? "1rem" : "0 0 0 1rem",
                            fontWeight: "700",
                            // fontSize: "1.2rem",
                          },
                          border: redBorderDrawPoint ? "2px solid red" : "none",
                          borderRadius: "4px",
                        }}
                        disabled={!isEditable}
                        className={!isEditable ? classes.disableTextField : ""}
                        value={
                          drawPoint === -1 ? "Không có dữ liệu" : drawPoint
                        }
                        onChange={(e) => setDrawPoint(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Grid item container className={classes.detailBoxRow}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">Thua</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{
                          width: "100%",
                          input: {
                            color: "white",
                            padding: isEditable ? "1rem" : "0 0 0 1rem",
                            fontWeight: "700",
                            // fontSize: "1.2rem",
                          },
                          border: redBorderLosePoint ? "2px solid red" : "none",
                          borderRadius: "4px",
                        }}
                        disabled={!isEditable}
                        className={!isEditable ? classes.disableTextField : ""}
                        value={
                          losePoint === -1 ? "Không có dữ liệu" : losePoint
                        }
                        onChange={(e) => setLosePoint(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: "1rem" }}>
                    {" "}
                    Quy định số lượng đội
                  </Typography>
                  <Grid container className={classes.detailBoxRow}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">Số lượng đội</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{
                          width: "100%",
                          input: {
                            color: "white",
                            padding: isEditable ? "1rem" : "0 0 0 1rem",
                            fontWeight: "700",
                            // fontSize: "1.2rem",
                          },
                        }}
                        disabled={!isEditable}
                        className={!isEditable ? classes.disableTextField : ""}
                        value={
                          numberOfClubs === -1
                            ? "Không có dữ liệu"
                            : numberOfClubs
                        }
                        onChange={(e) => setNumberOfClubs(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: "1rem" }}>
                    {notify}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={1} justifyContent={"flex-end"}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {!isEditable && (
                    <IconButton onClick={handleClickEdit}>
                      <Edit></Edit>
                    </IconButton>
                  )}
                  {isEditable && (
                    <Box>
                      <IconButton
                        onClick={() => {
                          handleUpdateRules();
                        }}
                      >
                        <Check color="success"></Check>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleCancelUpdate();
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
      </ComponentLayoutBackdrop>

      <CustomSnackbar
        // isOpen={isOpenSnackbar}
        message={snackbarContent}
        type={snackbarType}
        isOpen={isOpenSnackbar}
        setIsOpen={setIsOpenSnackbar}
      ></CustomSnackbar>
    </OrganizerLayout>
  );
};

export default Dashboard;
