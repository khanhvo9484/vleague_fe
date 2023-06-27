import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import MyAxios from "../../../api/MyAxios";
import RegistrationForm from "../../../components/form/RegistrationForm";
import PlayerTable from "../../../components/form/PlayersList";
import { Add, Close } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import PlayerLargeCard from "../../../components/ui/PlayerLargeCard";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
const RegistrationDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [currentForm, setCurrentForm] = useState("");
  const { currentPlayer, setCurrentPlayer } = useCurrentLeague();
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const [isOpenBackdrop, setIsOpenBackdrop] = useState(false);

  const fetchingForm = async () => {
    try {
      setIsLoading(true);
      const res = await MyAxios.get(`/hosodangky/chitiet?hoso=${id}`);
      setCurrentForm(res?.data?.data);
      setCurrentPlayer(res?.data?.data?.dsCauThuDangKy[0]);
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

  return (
    <OrganizerLayout
      title={"Hồ sơ đăng ký"}
      childLv1={"Chi tiết hồ sơ"}
      parentLink="/organizer/league-registration"
      isLoading={isLoading}
      notify={notify}
    >
      <ComponentLayoutBackdrop isLoading={isOpenBackdrop}>
        <Grid container sx={{}}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              variant="contained"
              disabled={currentForm?.trangThai == "Đã duyệt" ? true : false}
              onClick={handleAccept}
            >
              Duyệt
            </Button>
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
                  player={currentPlayer}
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
