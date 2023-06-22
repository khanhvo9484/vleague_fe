import ManagerLayout from "../../../layout/ManagerLayout";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import League from "../../../components/ui/league/League";
import PlayerList from "../../../components/form/PlayersList";
import useAuth from "../../../hooks/useAuth";
import MyAxios from "../../../api/MyAxios";
import useCurrentLeague from "../../../hooks/useCurrentLeague";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const { auth } = useAuth();
  const [players, setPlayers] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const { currentLeague } = useCurrentLeague();
  const handleSubmit = async () => {
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
  return (
    <ManagerLayout isLoading={isLoading} notify={notify}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={7}>
          <PlayerList
            hasCheckbox={true}
            hoverEffect={false}
            data={players}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          ></PlayerList>
        </Grid>
        <Grid item xs={4}>
          <League></League>
        </Grid>
        <Button variant="contained" onClick={handleSubmit}>
          Đăng ký
        </Button>
      </Grid>
    </ManagerLayout>
  );
};

export default Register;
