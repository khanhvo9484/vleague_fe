import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Helper from "../../../utils/Helper";
import { status } from "../../../data/GlobalConstant";
import { useState, useEffect } from "react";
import {
  Edit,
  Check,
  Close,
  Add,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import NotifiBox from "../../../components/ui/NotifiBox";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import { makeStyles } from "@mui/styles";
import MyAxios from "../../../api/MyAxios";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
const useStyles = makeStyles((theme) => ({
  detailBoxRow: {
    display: "flex",
    alignItems: "center",
    // color: theme.palette.primary.dark,
  },
  normalTextField: {},
  disableTextField: {
    "& fieldset": {
      border: "none",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: theme.palette.primary.dark,
    },
  },
}));

const OneLeague = (props) => {
  const classes = useStyles();
  const {
    league,
    isOpenSnackbar,
    snackbarContent,
    setSnackbarContent,
    snackbarType,
    setSnackbarType,
    setIsOpenSnackbar,
    setSelectedLeague,
  } = props;
  const [leagueName, setLeagueName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leagueStatus, setLeagueStatus] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getLeagueAcceptedTeam = async (id) => {
    setIsLoading(true);
    try {
      const res = await MyAxios.get(`/hosodangky/${id}`);
      if (res.status === 200) {
        setSelectedLeague(
          res.data.data.filter((item) => item?.trangThai == "Đã duyệt")
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClickEdit = () => {
    if (league?.trangThai == 2 || league?.trangThai == 1) {
      setIsOpenNotification(true);
      setNotificationContent(
        "Không thể chỉnh sửa giải đấu đã bắt đầu hoặc kết thúc"
      );
      return;
    }
    setIsEditable(true);
  };
  useEffect(() => {
    if (league) {
      setLeagueName(league?.ten);
      setStartDate(league?.thoiDiemBatDau);
      setEndDate(league?.thoiDiemKetThuc);
      setLeagueStatus(league?.trangThai);
    }
  }, [league]);
  const handleSubmitEdit = async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.put(
        `/muagiai/capnhat`,
        {
          ...league,
          ten: leagueName ? leagueName : league.ten,
          thoiDiemBatDau: startDate
            ? Helper.formatDateToUTC(startDate)
            : Helper.formatDateToUTC(league.thoiDiemBatDau),
          thoiDiemKetThuc: endDate
            ? Helper.formatDateToUTC(endDate)
            : Helper.formatDateToUTC(league.thoiDiemKetThuc),
          //   trangThai: leagueStatus ? leagueStatus : league.trangThai,
        },
        {
          contentType: "application/json",
        }
      );
      if (res.status == 200) {
        setSnackbarContent("Cập nhật thành công");
        setSnackbarType("success");
      }
    } catch (err) {
      console.log(err);
      setSnackbarContent("Có lỗi xảy ra");
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsEditable(false);
      setIsOpenSnackbar(true);
    }
  };
  const handleStartLeague = async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.post(`muagiai/${league?.id}/kichhoat`);
      if (res.status == 200) {
        setSnackbarContent("Kích hoạt thành công");
        setSnackbarType("success");
        setLeagueStatus(1);
      }
    } catch (err) {
      console.log(err);
      setSnackbarContent(err.response.data.message);
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsEditable(false);
      setIsOpenSnackbar(true);
    }
  };
  return (
    <ComponentLayoutBackdrop isLoading={isLoading}>
      <Grid container sx={{ padding: "2rem" }} component={Paper} elevation={3}>
        <Grid container item xs={12} sm={12} justifyContent={"space-between"}>
          {league && (
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              sx={{ mb: "1rem" }}
              justifyContent={"space-between"}
            >
              <Grid item xs={4}>
                <Box sx={{ display: "flex" }}>
                  <img
                    style={{
                      height: "80px",
                      marginRight: "1rem",
                    }}
                    src={league?.hinhAnh}
                    alt={league?.ten}
                  ></img>
                  <TextField
                    sx={{
                      width: "100%",
                      input: {
                        color: "primary.dark",
                        padding: isEditable ? "1rem" : "0 0 0 1rem",
                        fontWeight: "700",
                        fontSize: "1.25rem",
                        lineHeight: "1.25rem",
                        whiteSpace: "wrap",
                      },
                    }}
                    disabled={!isEditable}
                    className={!isEditable ? classes.disableTextField : ""}
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                  ></TextField>
                </Box>
              </Grid>

              {/* <Grid item xs={2}></Grid> */}
              <Grid
                item
                xs={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Grid item container className={classes.detailBoxRow}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1"> Ngày bắt đầu: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      sx={{
                        width: "100%",
                        input: {
                          color: "primary.dark",
                          padding: isEditable ? "1rem" : "0 0 0 1rem",
                          fontWeight: "700",
                          fontSize: "1rem",
                          lineHeight: "1.25rem",
                        },
                      }}
                      disabled={!isEditable}
                      className={!isEditable ? classes.disableTextField : ""}
                      value={Helper.formatDateToLocal(startDate)}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item container className={classes.detailBoxRow}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">
                      {" "}
                      Ngày kết thúc:{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      sx={{
                        width: "100%",
                        input: {
                          color: "primary.dark",
                          padding: isEditable ? "1rem" : "0 0 0 1rem",
                          fontWeight: "700",
                          fontSize: "1rem",
                          lineHeight: "1.25rem",
                        },
                      }}
                      disabled={!isEditable}
                      className={!isEditable ? classes.disableTextField : ""}
                      value={Helper.formatDateToLocal(endDate)}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Typography>Trạng thái:</Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h6"
                  color={
                    league?.trangThai == 0
                      ? "info.main"
                      : league?.trangThai == 1
                      ? "success.main"
                      : "error.main"
                  }
                >
                  {status[leagueStatus]}
                </Typography>
              </Grid>
              <Grid item xs={1} justifyContent={"flex-end"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "space-between",
                    alignItems: "space-between",
                    //   flexDirection: "column",
                  }}
                >
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
                      <IconButton onClick={handleSubmitEdit}>
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
                {leagueStatus == 0 && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Tooltip title={"Bắt đầu mùa giải"}>
                      <IconButton onClick={handleStartLeague}>
                        <PlayCircleFilledOutlined></PlayCircleFilledOutlined>
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <Typography
                  sx={{
                    "&:hover": {
                      color: "primary.dark",
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    getLeagueAcceptedTeam(league?.id);
                  }}
                >
                  Xem chi tiết
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        {isOpenNotification && (
          <NotifiBox
            isOpenNotification={isOpenNotification}
            setIsOpenNotification={setIsOpenNotification}
          >
            <Typography>{notificationContent}</Typography>
          </NotifiBox>
        )}
        {isOpenSnackbar && (
          <CustomSnackbar
            message={snackbarContent}
            type={snackbarType}
          ></CustomSnackbar>
        )}
      </Grid>
    </ComponentLayoutBackdrop>
  );
};

export default OneLeague;
