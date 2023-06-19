import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PlayerList from "../../publicRoutes/club/PlayerList";
import MyAxios from "../../../api/MyAxios";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { makeStyles } from "@mui/styles";
import { fi } from "date-fns/locale";
import { set } from "date-fns";
const useStyles = makeStyles((theme) => ({}));

const ManageTeam = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  useEffect(async () => {
    setIsLoading(true);
    setNotify({ message: "", type: "" });

    try {
      const response = await MyAxios.get(`/api/doibong/${auth?.teamId}`);
      setClubs(response.data?.data);
      setPlayers(response.data?.data?.danhSachCauThuDangThiDau);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <Paper>
      <Box></Box>
    </Paper>
  );
};

export default ManageTeam;
