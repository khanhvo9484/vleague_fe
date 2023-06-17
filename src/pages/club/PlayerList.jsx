import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";

const PlayerList = (props) => {
  const { playerList } = props;
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    setPlayers(playerList);
  }, [playerList]);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Typography variant="h6">STT</Typography>
          </TableRow>
          <TableRow>
            <Typography variant="h6">Họ tên</Typography>
          </TableRow>
          <TableRow>
            <Typography variant="h6">Ngày sinh</Typography>
          </TableRow>
          <TableRow>
            <Typography variant="h6">Quốc tịch</Typography>
          </TableRow>
          <TableRow>
            <Typography variant="h6">Số áo</Typography>
          </TableRow>
        </TableHead>
        <TableBody>
          {players &&
            players.map((player, index) => {
              return (
                <>
                  <TableRow>
                    <Typography variant="h6">{index}</Typography>
                  </TableRow>
                  <TableRow>
                    <Typography variant="h6">{player.hoTen}</Typography>
                  </TableRow>
                  <TableRow>
                    <Typography variant="h6">{player.ngaySinh}</Typography>
                  </TableRow>
                  <TableRow>
                    <Typography variant="h6">{player.quocTich}</Typography>
                  </TableRow>
                  <TableRow>
                    <Typography variant="h6">{player.soAo}</Typography>
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerList;
