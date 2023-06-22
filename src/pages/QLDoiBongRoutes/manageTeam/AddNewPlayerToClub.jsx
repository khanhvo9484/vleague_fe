import { Box, Typography, Grid } from "@mui/material";
import Filter from "../../../components/ui/Filter";
import Selection from "../../../components/ui/Selection";
import PlayersList from "../../../components/form/PlayersList";
import ComponentLayout from "../../../layout/ComponentLayout";
import { useState, useEffect } from "react";
import MyAxios from "../../../api/MyAxios";
const AddNewPlayerToClub = (props) => {
  const onFilterChange = (value) => {};
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [players, setPlayers] = useState([]);
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
            data={players}
            // hasCheckbox={true}
            addToList={true}
            title={"Danh sách cầu thủ tự do"}
          ></PlayersList>
        </Grid>
      </Grid>
    </ComponentLayout>
  );
};

export default AddNewPlayerToClub;
