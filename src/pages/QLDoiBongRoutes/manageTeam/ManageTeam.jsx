import React from "react";
import { Box, Grid } from "@mui/material";
import PlayersList from "../../../components/form/PlayersList";
import MyAxios from "../../../api/MyAxios";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { makeStyles } from "@mui/styles";
import useLoading from "../../../hooks/useLoading";
import ManagerLayout from "../../../layout/ManagerLayout";
const useStyles = makeStyles((theme) => ({}));

const ManageTeam = () => {
  const { auth } = useAuth();
  const { setIsLoading, setNotify } = useLoading();
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await MyAxios.get(`/doibong/${auth?.teamId}`);
      setClubs(response.data?.data);
      setPlayers(response.data?.data?.danhSachCauThuDangThiDau);
    } catch (err) {
      setNotify({
        message: "Không thể lấy danh sách cầu thủ",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <ManagerLayout>
      <Box sx={{ margin: "0 2rem 0 2rem", paddingTop: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={8}>
            <PlayersList data={players} />
          </Grid>
        </Grid>
      </Box>
    </ManagerLayout>
  );
};

export default ManageTeam;
