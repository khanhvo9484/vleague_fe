import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import MyAxios from "../../../api/MyAxios";
import RegistrationForm from "../../../components/form/RegistrationForm";
import PlayerTable from "../../../components/form/PlayersList";
import { Add, Close, Check } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import PlayerLargeCard from "../../../components/ui/PlayerLargeCard";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
const RegistrationDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const leagueId = searchParams.get("leagueId");

  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [currentForm, setCurrentForm] = useState("");
  const { currentPlayer, setCurrentPlayer } = useCurrentLeague();
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [player, setPlayer] = useState({});
  const [players, setPlayers] = useState([]);
  const [notes, setNotes] = useState("");
  const [isShowDeclineNotes, setIsShowDeclineNotes] = useState(false);

  const fetchingForm = async () => {
    try {
      setIsLoading(true);
      const res = await MyAxios.get(`/hosodangky/chitiet?hoso=${id}`);
      setCurrentForm(res?.data?.data);

      setPlayers(res?.data?.data?.dsCauThuDangKy);
    } catch (err) {
      console.log(err);
      setNotify(err?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(async () => {
    fetchingForm();
  }, []);
  useEffect(() => {
    if (players.length > 0) {
      setPlayer(players[0]);
      setCurrentPlayer(players[0])?.id;
    }
  }, [players]);
  const handleAccept = async () => {
    setIsOpenBackdrop(true);
    try {
      const res = await MyAxios.put(`/hosodangky/duyet?hoso=${id}`);
      if (res.status === 200) {
        fetchingForm();
      }
      setSnackbarMessage("Duyệt thành công");
      setSnackbarType("success");
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Duyệt thất bại");
      setSnackbarType("error");
    } finally {
      setIsOpenSnackbar(true);
      setIsOpenBackdrop(false);
    }
  };
  const handleDecline = async () => {
    setIsOpenBackdrop(true);
    try {
      const res = await MyAxios.put(`/hosodangky/tuchoi`, {
        id_hoso: id,
        ghiChu: notes,
      });
      if (res.status === 200) {
        fetchingForm();
      }
      setSnackbarMessage("Từ chối thành công");
      setSnackbarType("success");
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Từ chối thất bại");
      setSnackbarType("error");
    } finally {
      setIsOpenSnackbar(true);
      setIsOpenBackdrop(false);
    }
  };
  useEffect(() => {
    if (currentPlayer == null) return;
    if (players) {
      players.find((item) => item.id == currentPlayer && setPlayer(item));
    }
  }, [currentPlayer]);

  const [isOpenBackdrop, setIsOpenBackdrop] = useState(false);
  return (
    <OrganizerLayout
      title={"Hồ sơ đăng ký"}
      childLv1={"Chi tiết hồ sơ"}
      parentLink={`/organizer/league-registration?id=${leagueId}`}
      isLoading={isLoading}
      notify={notify}
    >
      <ComponentLayoutBackdrop isLoading={isOpenBackdrop}>
        <Grid container sx={{}}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            {!isShowDeclineNotes && (
              <>
                <Button
                  sx={{ mr: "1rem" }}
                  variant="contained"
                  disabled={currentForm?.trangThai == "Đã duyệt" ? true : false}
                  onClick={() => {
                    setIsShowDeclineNotes(true);
                  }}
                >
                  Từ chối
                </Button>
                <Button
                  variant="contained"
                  disabled={currentForm?.trangThai == "Đã duyệt" ? true : false}
                  onClick={handleAccept}
                >
                  Duyệt
                </Button>
              </>
            )}
            {isShowDeclineNotes && (
              <>
                <Tooltip title="Hủy">
                  <IconButton
                    onClick={() => {
                      setIsShowDeclineNotes(false);
                    }}
                  >
                    <Close></Close>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Xác nhận">
                  <IconButton sx={{ ml: "0.5rem" }} onClick={handleDecline}>
                    <Check></Check>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: isShowDeclineNotes ? "flex" : "none",
              justifyContent: "flex-end",
              mt: "1rem",
              mb: "0.5rem",
            }}
          >
            <TextField
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              sx={{ width: "20rem" }}
              label="Ghi chú lý do từ chối"
              variant="outlined"
              placeholder="Nhập lý do từ chối"
              multiline
              rows={3}
            ></TextField>
          </Box>
          <Grid
            item
            xs={12}
            sx={{
              mt: "1rem",
              backgroundColor: "blueBackground.manage",
              borderRadius: "4px",
            }}
          >
            {currentForm && (
              <Box sx={{ padding: "0.5rem" }}>
                <RegistrationForm
                  key={currentForm?.id}
                  registration={currentForm}
                  isDetail={true}
                ></RegistrationForm>
              </Box>
            )}
          </Grid>
          <Grid item container justifyContent={"space-between"}>
            <Grid item xs={8}>
              {currentForm && (
                <PlayerTable data={currentForm?.dsCauThuDangKy}></PlayerTable>
              )}
            </Grid>
            <Grid item xs={3}>
              {currentForm && (
                <PlayerLargeCard
                  player={player}
                  isNotShowEdit={true}
                ></PlayerLargeCard>
              )}
            </Grid>
          </Grid>
        </Grid>
        <CustomSnackbar
          isOpen={isOpenSnackbar}
          setIsOpen={setIsOpenSnackbar}
          message={snackbarMessage}
          type={snackbarType}
        ></CustomSnackbar>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default RegistrationDetail;
