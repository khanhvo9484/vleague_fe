import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
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
import ManagerLayout from "../../../layout/ManagerLayout";
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
  const [player, setPlayer] = useState({});
  const [isOpenBackdrop, setIsOpenBackdrop] = useState(false);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    players.find((item) => item.id == currentPlayer && setPlayer(item));
  }, [currentPlayer]);

  const fetchingForm = async () => {
    try {
      setIsLoading(true);
      const res = await MyAxios.get(`/hosodangky/chitiet?hoso=${id}`);
      setCurrentForm(res?.data?.data);
      setCurrentPlayer(res?.data?.data?.dsCauThuDangKy[0]);
      setPlayer(res.data?.data?.dsCauThuDangKy[0]);
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

  return (
    <ManagerLayout
      title={"Hồ sơ đăng ký"}
      childLv1={"Chi tiết hồ sơ"}
      parentLink={`/manager/register-list`}
      isLoading={isLoading}
      notify={notify}
    >
      <ComponentLayoutBackdrop isLoading={isOpenBackdrop}>
        <Grid container sx={{}}>
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
                  displayLeagueName={true}
                ></RegistrationForm>
              </Box>
            )}
          </Grid>
          <Grid item container justifyContent={"space-between"}>
            <Grid item xs={8}>
              {currentForm && <PlayerTable data={players}></PlayerTable>}
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
        <Grid container>
          <Grid
            item
            xs={8}
            sx={{ mt: "1rem", padding: "1rem" }}
            component={Paper}
            elevation={3}
            container
          >
            <Grid item container xs={12}>
              <Grid item xs={3}>
                {" "}
                <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
                  Tuổi tối đa:{" "}
                </Typography>{" "}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" sx={{ color: "primary.dark" }}>
                  {" "}
                  {Math.max(...players.map((player) => player?.age))}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                {" "}
                <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
                  Tuổi tối thiểu:{" "}
                </Typography>{" "}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" sx={{ color: "primary.dark" }}>
                  {" "}
                  {Math.min(...players.map((player) => player?.age))}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                {" "}
                <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
                  Số lượng cầu thủ:
                </Typography>{" "}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" sx={{ color: "primary.dark" }}>
                  {" "}
                  {players.length}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                {" "}
                <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
                  Số lượng cầu thủ nước ngoài:{" "}
                </Typography>{" "}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" sx={{ color: "primary.dark" }}>
                  {
                    players.filter(
                      (player) => player?.loaiCauThu == "Ngoại binh"
                    ).length
                  }
                </Typography>
              </Grid>
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
    </ManagerLayout>
  );
};

export default RegistrationDetail;
