import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import MyAxios from "../../../api/MyAxios";
import { useState, useEffect } from "react";
import { Edit, Check, Close } from "@mui/icons-material";
import MatchDay from "./MatchDay";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import CustomSnackbar from "../CustomSnackbar";
const useStyles = makeStyles((theme) => ({
  title: {
    height: "3rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "4px 4px 0 0",
    border: "2px solid",
    borderColor: theme.palette.primary.light,
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "20vh",
  },
}));

const Scheduler = (props) => {
  const {
    setCurrentSchedule,
    currentSchedule,
    background,
    setIsLoading,
    setSnackbarMessage,
    setSnackbarType,
    setIsOpenSnackbar,
  } = props;

  const [notify, setNotify] = useState("");
  const [currentMatchDay, setCurrentMatchDay] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [changeList, setChangeList] = useState([]); // [matchId, newMatchDay
  const [isSave, setIsSave] = useState(false);
  const classes = useStyles();
  const handleChangeSchedule = async () => {
    setIsLoading(true);
    try {
      const response = await MyAxios.put(
        `/trandau`,
        { dsTranDau: changeList },
        { contentType: "application/json" }
      );
      if (response.status === 200) {
        setSnackbarMessage("Lưu thành công");
        setSnackbarType("success");
      }
    } catch (err) {
      setSnackbarMessage("Lưu thất bại");
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsOpenSnackbar(true);
      setIsSave(true);
      setIsEditable(false);
    }
  };
  return (
    <Grid
      container
      component={Paper}
      elevation={3}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box className={classes.title}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={4}></Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Lịch thi đấu</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{}}>
              {!isEditable && (
                <Tooltip title="Chỉnh sửa lịch thi đấu">
                  <IconButton
                    sx={{
                      background: "white",
                      mr: "0.5rem",
                      "&: hover": {
                        color: "primary.dark",
                        backgroundColor: "primary.light",
                      },
                    }}
                    onClick={() => {
                      setIsEditable(!isEditable);
                    }}
                  >
                    <Edit></Edit>
                  </IconButton>
                </Tooltip>
              )}
              {isEditable && (
                <Box>
                  <Tooltip title="Lưu lịch thi đấu">
                    <IconButton
                      sx={{
                        background: "white",
                        mr: "0.5rem",
                        "&: hover": {
                          color: "primary.dark",
                          backgroundColor: "primary.light",
                        },
                      }}
                      onClick={handleChangeSchedule}
                    >
                      <Check></Check>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hủy chỉnh sửa">
                    <IconButton
                      onClick={() => {
                        setIsEditable(false);
                      }}
                      sx={{
                        background: "white",
                        mr: "0.5rem",
                        "&: hover": {
                          color: "primary.dark",
                          backgroundColor: "primary.light",
                        },
                      }}
                    >
                      <Close></Close>
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <MatchDay
        currentSchedule={currentSchedule}
        setCurrentMatchDay={setCurrentMatchDay}
        currentMatchDay={currentMatchDay}
        background={background}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        changeList={changeList}
        setChangeList={setChangeList}
        isSave={isSave}
      ></MatchDay>
    </Grid>
  );
};

export default Scheduler;
