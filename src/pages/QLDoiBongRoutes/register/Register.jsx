import ManagerLayout from "../../../layout/ManagerLayout";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Fab,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import League from "../../../components/ui/league/League";
import PlayerList from "../../../components/form/PlayersList";
import useAuth from "../../../hooks/useAuth";
import MyAxios from "../../../api/MyAxios";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import AllPlayers from "./AllPlayers";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";

import {
  Add,
  ArrowBack,
  StickyNote2,
  ArrowForwardIos,
} from "@mui/icons-material";
import NotifiBox from "../../../components/ui/NotifiBox";
import Rules from "../../../components/ui/rules/Rules";
import PopupRules from "./PopupRules";
import CheckRule from "./CheckRule";
import { useLocation } from "react-router-dom";
const Register = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const { auth } = useAuth();
  const [players, setPlayers] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [AllLeagues, setAllLeagues] = useState([]);
  const [currentLeague, setCurrentLeague] = useState("");
  const [isShowRegisterList, setIsShowRegisterList] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notifiContent, setNotifiContent] = useState("");
  const [isOpenRules, setIsOpenRules] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [currentRegisterListInfo, setCurrentRegisterListInfo] = useState({});
  const { checkRuleResult } = useCurrentLeague();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const handleSubmit = async () => {
    if (!currentLeague) {
      setNotifiContent("Vui lòng chọn giải đấu");
      setIsOpenNotification(true);
      return;
    }
    if (selectedList.length == 0) {
      setNotifiContent("Vui lòng chọn cầu thủ");
      setIsOpenNotification(true);
      return;
    }
    try {
      setIsLoadingSubmit(true);
      const response = await MyAxios.post(`/muagiai/thamgiagiai`, {
        id_doibong: auth?.teamId,
        id_giai: currentLeague?.id,
        ds_id_cauthu_thamgia: selectedList,
      });
      setSnackbarContent(response?.data?.message);
      setSnackbarType("success");
    } catch (err) {
      setSnackbarContent(err?.response?.data?.message);
      setSnackbarType("error");
    } finally {
      setIsOpenSnackbar(true);
      setIsLoadingSubmit(false);
    }
  };

  useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await MyAxios.get(`/doibong/${auth?.teamId}`);
      setPlayers(response?.data?.data?.danhSachCauThuDangThiDau);
    } catch (err) {
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedList) {
      setFilterList(
        players.filter((player) => {
          return selectedList.includes(player.id);
        })
      );
    }
  }, [selectedList]);
  useEffect(() => {
    try {
      let maxAge = Math.max(...filterList.map((player) => player?.age));
      let minAge = Math.min(...filterList.map((player) => player?.age));
      // Check if maxAge is -Infinity
      if (!isFinite(maxAge)) {
        maxAge = 0;
      }
      // Check if minAge is Infinity
      if (!isFinite(minAge)) {
        minAge = 0;
      }
      const numberOfPlayer = filterList.length;
      const numberOfForeignPlayer = filterList.filter(
        (player) => player?.loaiCauThu == "Ngoại binh"
      ).length;
      setCurrentRegisterListInfo({
        maxAge,
        minAge,
        numberOfPlayer,
        numberOfForeignPlayer,
      });
    } catch (err) {}
  }, [filterList]);

  return (
    <ManagerLayout
      title={"Đăng ký mùa giải"}
      isLoading={isLoading}
      notify={notify}
    >
      {!isLoading && (
        <AllLeaguesSelector
          currentLeague={currentLeague}
          setCurrentLeague={setCurrentLeague}
          selectId={id}
        ></AllLeaguesSelector>
      )}

      <ComponentLayoutBackdrop isLoading={isLoadingSubmit}>
        <Grid container justifyContent={"center"}>
          <Grid item container xs={12} sx={{ mb: "1rem" }}></Grid>
          <>
            {!isShowRegisterList && (
              <Grid item container justifyContent="space-between">
                <Grid item xs={6}>
                  <PlayerList
                    title={"Danh sách cầu thủ"}
                    hasCheckbox={true}
                    hoverEffect={false}
                    data={players}
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                  ></PlayerList>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", ml: "2rem" }}>
                    {!currentLeague && (
                      <Box
                        sx={{
                          padding: "1rem",
                          width: "100%",
                          borderRadius: "4px",
                          boxShadow: "shadows[5]",
                          backgroundColor: "background.paper",
                        }}
                        component={Paper}
                        elevation={3}
                      >
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          Hãy chọn mùa giải
                        </Typography>
                      </Box>
                    )}
                    <CheckRule
                      currentLeague={currentLeague}
                      currentRegisterListInfo={currentRegisterListInfo}
                    ></CheckRule>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              {isShowRegisterList && (
                <PlayerList
                  title={"Danh sách cầu thủ đăng ký"}
                  hoverEffect={false}
                  data={filterList}
                ></PlayerList>
              )}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  // alignItems: "center",
                }}
              >
                {!isShowRegisterList && (
                  <Button
                    variant="contained"
                    startIcon={<ArrowForwardIos></ArrowForwardIos>}
                    onClick={() => {
                      if (!currentLeague) {
                        setNotifiContent("Vui lòng chọn giải đấu");
                        setIsOpenNotification(true);
                        return;
                      }
                      if (
                        currentLeague?.trangThai == 1 ||
                        currentLeague?.trangThai == 2
                      ) {
                        setNotifiContent(
                          "Giải đấu đã kết thúc hoặc đang diễn ra"
                        );
                        setIsOpenNotification(true);
                        return;
                      }
                      if (currentLeague && !checkRuleResult) {
                        setNotifiContent("Vui lòng kiểm tra quy định mùa giải");
                        setIsOpenNotification(true);
                        return;
                      }
                      setIsShowRegisterList(true);
                    }}
                  >
                    Tiếp theo
                  </Button>
                )}
                {isShowRegisterList && (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<ArrowBack />}
                      onClick={() => {
                        setIsShowRegisterList(false);
                      }}
                      sx={{ mr: "1rem" }}
                    >
                      Quay lại
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<ArrowForwardIos></ArrowForwardIos>}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Đăng ký
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            <Box sx={{ position: "absolute", right: "0" }}>
              <Tooltip title="Xem quy định mùa giải">
                <Fab
                  onClick={() => {
                    setIsOpenRules(true);
                  }}
                >
                  <StickyNote2></StickyNote2>
                </Fab>
              </Tooltip>
            </Box>
          </>
        </Grid>

        {isOpenNotification && (
          <NotifiBox
            isOpenNotification={isOpenNotification}
            setIsOpenNotification={setIsOpenNotification}
          >
            <Typography>{notifiContent}</Typography>
          </NotifiBox>
        )}
        <PopupRules
          isOpen={isOpenRules}
          setIsOpen={setIsOpenRules}
          currentLeague={currentLeague}
        ></PopupRules>
      </ComponentLayoutBackdrop>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        setIsOpen={setIsOpenSnackbar}
        message={snackbarContent}
        type={snackbarType}
      ></CustomSnackbar>
    </ManagerLayout>
  );
};

export default Register;
