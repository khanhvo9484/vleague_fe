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
import { Add, ArrowBack, StickyNote2 } from "@mui/icons-material";
import NotifiBox from "../../../components/ui/NotifiBox";
import Rules from "../../../components/ui/rules/Rules";
import PopupRules from "./PopupRules";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const { auth } = useAuth();
  const [players, setPlayers] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [AllLeagues, setAllLeagues] = useState([]);
  const [currentLeague, setCurrentLeague] = useState("");
  const [isShowAll, setIsShowAll] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notifiContent, setNotifiContent] = useState("");
  const [isOpenRules, setIsOpenRules] = useState(false);

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
      setIsLoading(true);
      const response = await MyAxios.post(`/muagiai/thamgiagiai`, {
        id_doi_bong: auth?.teamId,
        id_giai: currentLeague?.id,
        ds_id_cauthu_thamgia: selectedList,
      });
      setNotify({ message: response?.data?.message, type: "success" });
    } catch (err) {
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
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
        ></AllLeaguesSelector>
      )}

      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12} sx={{ mb: "1rem" }}></Grid>
        <>
          <Grid item xs={6}>
            {!isShowAll && (
              <>
                <PlayerList
                  title={"Danh sách cầu thủ đăng ký"}
                  hoverEffect={false}
                  data={filterList}
                ></PlayerList>
              </>
            )}
            {isShowAll && (
              <PlayerList
                title={"Danh sách cầu thủ"}
                hasCheckbox={true}
                hoverEffect={false}
                data={players}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              ></PlayerList>
            )}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={1}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {!isShowAll && (
                <Tooltip title="Xem quy định mùa giải">
                  <Fab
                    onClick={() => {
                      setIsOpenRules(true);
                    }}
                  >
                    <StickyNote2></StickyNote2>
                  </Fab>
                </Tooltip>
              )}
              {isShowAll && (
                <Fab
                  onClick={() => {
                    setIsShowAll(false);
                  }}
                >
                  <ArrowBack></ArrowBack>
                </Fab>
              )}
            </Box>
          </Grid>
        </>
      </Grid>
      <Button variant="contained" onClick={handleSubmit}>
        Đăng ký
      </Button>
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
    </ManagerLayout>
  );
};

export default Register;
{
  /* <AllPlayers
          data={players}
          isOpen={isShowAll}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          hoverEffect={false}
          setIsOpen={setIsShowAll}
        ></AllPlayers> */
}
