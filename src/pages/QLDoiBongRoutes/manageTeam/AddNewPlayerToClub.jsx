import { Box, Typography, Grid } from "@mui/material";
import Filter from "../../../components/ui/Filter";
import Selection from "../../../components/ui/Selection";
import PlayersList from "../../../components/form/PlayersList";
import ComponentLayout from "../../../layout/ComponentLayout";
import { useState, useEffect } from "react";
import MyAxios from "../../../api/MyAxios";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
const AddNewPlayerToClub = (props) => {
  const onFilterChange = (value) => {};
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [players, setPlayers] = useState([]);
  const [selectedFreePlayer, setSelectedFreePlayer] = useState("");
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  useEffect(async () => {
    setIsLoading(true);
    try {
      const response = await MyAxios.get(`/cauthu/tudo`);
      setPlayers(response.data.data);
    } catch (err) {
      setNotify({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <ComponentLayout isLoading={isLoading} notify={notify}>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      ></CustomSnackbar>
      <Grid container>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Filter
            placeholder="Điền tên cầu thủ hoặc vị trí"
            onFilterChange={onFilterChange}
            width={"15rem"}
          ></Filter>
        </Grid>
        <Grid item xs={12} sx={{ mt: "0.5rem" }}>
          <PlayersList
            setIsOpenSnackbar={setIsOpenSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarType={setSnackbarType}
            data={players}
            setData={setPlayers}
            hoverEffect={false}
            // hasCheckbox={true}
            addToList={true}
            title={"Danh sách cầu thủ tự do"}
            selectedFreePlayer={selectedFreePlayer}
            setSelectedFreePlayer={setSelectedFreePlayer}
          ></PlayersList>
        </Grid>
      </Grid>
    </ComponentLayout>
  );
};

export default AddNewPlayerToClub;
