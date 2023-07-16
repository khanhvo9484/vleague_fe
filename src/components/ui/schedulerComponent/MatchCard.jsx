import {
  Grow,
  Paper,
  Box,
  Typography,
  Grid,
  ListItem,
  List,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../CustomTextField";
import { useState, useEffect } from "react";
import Helper from "../../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { te } from "date-fns/locale";
const useStyles = makeStyles((theme) => ({
  matchList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "blueBackground.light",
    borderRadius: "0 0 4px 4px",
  },
  scorelineBox: {
    backgroundColor: theme.palette.primary.main,
    width: "50px",
    height: "50px",
    mr: "0.5rem",
    ml: "0.5rem",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  matchCard: {
    display: "flex",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Ensure the parent Box is positioned relatively
    overflow: "hidden", // Clip the overflowed content
  },
  endedMatchStamp: {
    position: "absolute",
    top: "8px",
    right: "5px",
    borderRadius: "10px",
    outline: `1px solid ${theme.palette.error.main}`,
    mt: "0.2rem",
    mr: "0.2rem",
  },
  gridItemFlexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  gridItemFlexStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

const MatchCard = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    match,
    isEditable,
    setIsEditable,
    changeList,
    setChangeList,
    isSave,
    showDetail,
    leagueId,
  } = props;
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (match) {
      try {
        const tempDate = match?.thoiGianVietNam.substring(0, 10);
        const tempTime = match?.thoiGianVietNam.substring(11, 19);
        setCurrentDate(Helper.formatDateToLocal(tempDate));
        setCurrentTime(tempTime);
      } catch (err) {}
    }
  }, [match]);

  useEffect(() => {
    if (!isEditable && match) {
      if (isSave) {
        try {
          const tempDate = changeList
            .find((item) => item.idTranDau === match.id)
            .timeString.substring(0, 10);
          const tempTime = changeList
            .find((item) => item.idTranDau === match.id)
            .timeString.substring(11, 19);
          setCurrentDate(Helper.formatDateToLocal(tempDate));
          setCurrentTime(tempTime);
        } catch (err) {}
      } else {
        try {
          const tempDate = match?.thoiGianVietNam.substring(0, 10);
          const tempTime = match?.thoiGianVietNam.substring(11, 19);
          setCurrentDate(Helper.formatDateToLocal(tempDate));
          setCurrentTime(tempTime);
        } catch (err) {}
      }
    }
  }, [isEditable]);

  useEffect(() => {
    if ((currentDate, currentTime)) {
      if (currentDate.length == 10 && currentTime.length == 8 && isChanged) {
        const tempDateTime =
          Helper.formatDateToUTC(currentDate) + " " + currentTime;
        console.log(tempDateTime);
        const tempMatch = { idTranDau: match?.id, timeString: tempDateTime };
        setChangeList((prevList) => {
          const updatedList = prevList.map((item) => {
            if (item.idTranDau === tempMatch.idTranDau) {
              return tempMatch; // Replace existing element with tempMatch
            } else {
              return item; // Keep the item unchanged
            }
          });

          if (
            !updatedList.some((item) => item.idTranDau === tempMatch.idTranDau)
          ) {
            // If tempMatch doesn't exist in updatedList, push it
            updatedList.push(tempMatch);
          }

          return updatedList;
        });
      }
    }
  }, [currentDate, currentTime]);

  return (
    <Paper elevation={3} sx={{ width: "100%" }}>
      <Box className={classes.matchCard}>
        {match?.ketQuaTranDau?.trangThai == "Đã kết thúc" ||
          (match?.ketQuaTranDau?.trangThai == "Đã cập nhật kết quả" && (
            <Box className={classes.endedMatchStamp}>
              <Typography
                variant="body3"
                sx={{
                  padding: "0rem 0.5rem 0rem 0.5rem",
                  color: "error.main",
                }}
              >
                Đã kết thúc
              </Typography>
            </Box>
          ))}
        <Grid container spacing={0} justifyContent="center">
          <Grid
            item
            xs={5}
            className={classes.gridItemFlexEnd}
            sx={{ mr: "0.5rem" }}
          >
            <Box>
              <Typography variant="h5">{match?.doiNha?.ten}</Typography>
            </Box>
            <Box sx={{ padding: "1rem" }}>
              <img style={{ width: "40px" }} src={match?.doiNha?.hinhAnh}></img>
            </Box>
            <Box
              className={classes.scorelineBox}
              sx={{
                boxShadow:
                  match?.ketQuaTranDau?.sbtDoiNha >
                  match?.ketQuaTranDau?.sbtDoiKhach
                    ? `inset 0px -5px 0px 0px ${theme.palette.success.main}`
                    : "none",
              }}
            >
              <Typography variant="h2" sx={{ color: "white" }}>
                {match?.ketQuaTranDau === null ||
                match?.ketQuaTranDau?.sbtDoiNha === null
                  ? "-"
                  : match?.ketQuaTranDau?.sbtDoiNha ?? "-"}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            className={classes.gridItemFlexStart}
            sx={{ ml: "0.5rem" }}
          >
            <Box
              className={classes.scorelineBox}
              sx={{
                boxShadow:
                  match?.ketQuaTranDau?.sbtDoiKhach >
                  match?.ketQuaTranDau?.sbtDoiNha
                    ? `inset 0px -5px 0px 0px ${theme.palette.success.main}`
                    : "none",
              }}
            >
              <Typography variant="h2" sx={{ color: "white" }}>
                {match?.ketQuaTranDau === null ||
                match?.ketQuaTranDau?.sbtDoiKhach === null
                  ? "-"
                  : match?.ketQuaTranDau?.sbtDoiKhach ?? "-"}
              </Typography>
            </Box>
            <Box sx={{ padding: "1rem" }}>
              <img style={{ width: "40px" }} src={match.doiKhach.hinhAnh}></img>
            </Box>
            <Box>
              <Typography variant="h5">{match.doiKhach.ten}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={0} justifyContent="space-around">
        <Grid
          sx={{ justifyContent: "center", display: "flex", mb: "0.5rem" }}
          item
          xs={12}
        >
          {
            <>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mr: "0.5rem",
                }}
              >
                {" "}
                <Box>
                  <CustomTextField
                    value={currentDate}
                    color="black"
                    width={"6rem"}
                    isEditable={
                      match?.ketQuaTranDau?.trangThai == "Đã kết thúc" ||
                      match?.ketQuaTranDau?.trangThai == "Đã cập nhật kết quả"
                        ? ""
                        : isEditable
                    }
                    setIsEditable={
                      match?.ketQuaTranDau?.trangThai == "Đã kết thúc" ||
                      match?.ketQuaTranDau?.trangThai == "Đã cập nhật kết quả"
                        ? ""
                        : setIsEditable
                    }
                    setValue={setCurrentDate}
                    type="date"
                    match={match}
                    isChanged={isChanged}
                    setIsChanged={setIsChanged}
                  ></CustomTextField>
                </Box>
              </Grid>
              <Grid item xs={6} sx={{ ml: "0.5rem" }}>
                <Box>
                  <CustomTextField
                    value={currentTime}
                    setValue={setCurrentTime}
                    color="black"
                    width={"6rem"}
                    isEditable={
                      match?.ketQuaTranDau?.trangThai == "Đã kết thúc" ||
                      match?.ketQuaTranDau?.trangThai == "Đã cập nhật kết quả"
                        ? ""
                        : isEditable
                    }
                    setIsEditable={
                      match?.ketQuaTranDau?.trangThai == "Đã kết thúc" ||
                      match?.ketQuaTranDau?.trangThai == "Đã cập nhật kết quả"
                        ? ""
                        : setIsEditable
                    }
                    type="time"
                    isChanged={isChanged}
                    setIsChanged={setIsChanged}
                  ></CustomTextField>
                </Box>
              </Grid>
            </>
          }
        </Grid>
        {match?.thoiGianVietNam == null &&
          !isEditable &&
          !currentDate &&
          !currentTime && (
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", display: "flex", mb: "0.5rem" }}
            >
              <Typography variant="body1">Chưa có thời gian</Typography>
            </Grid>
          )}
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ mr: "2rem" }}>
            {match?.ketQuaTranDau?.dsBanThang &&
              match?.ketQuaTranDau?.dsBanThang.map((goal, index) => (
                <Typography key={index} sx={{ whiteSpace: "nowrap" }}>
                  {goal?.idDoi === match?.ketQuaTranDau?.idDoiNha
                    ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                    : null}
                </Typography>
              ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Box sx={{ ml: "2rem" }}>
            {match?.ketQuaTranDau?.dsBanThang &&
              match?.ketQuaTranDau?.dsBanThang.map((goal, index) => (
                <Typography key={index} sx={{ whiteSpace: "nowrap" }}>
                  {goal?.idDoi === match?.ketQuaTranDau?.idDoiKhach
                    ? `${goal?.tenCauThu} - ${goal?.thoiDiemGhiBan}'`
                    : null}
                </Typography>
              ))}
          </Box>
          {showDetail && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{
                  paddingRight: "0.5rem",
                  paddingBottom: "0.5rem",
                  cursor: "pointer",
                  color: "primary.dark",
                  "&:hover": {
                    color: "blueBackground.dark",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => {
                  navigate(
                    `/organizer/matches/match?leagueId=${leagueId}&matchId=${match.id}`
                  );
                }}
              >
                Xem chi tiết
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchCard;
