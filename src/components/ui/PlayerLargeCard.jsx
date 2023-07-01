import {
  Box,
  Paper,
  Typography,
  Collapse,
  TextField,
  IconButton,
  Grid,
  Select,
  MenuItem,
  Button,
  Backdrop,
  Snackbar,
} from "@mui/material";
import { Edit, Close, Check } from "@mui/icons-material";
import useCurrentLeague from "../../hooks/useCurrentLeague";
import { makeStyles } from "@mui/styles";
import Helper from "../../utils/Helper";
import useEditInfo from "../../hooks/useEditInfo";
import { useEffect, useState } from "react";
import UploadImageSection from "./UploadImageSection";
import MyAxios from "../../api/MyAxios";
import ConfirmBox from "./ConfirmBox";
import ComponentLayoutBackdrop from "../../layout/ComponentLayoutBackdrop";
import useLoading from "../../hooks/useLoading";
import CustomSnackbar from "./CustomSnackbar";
const useStyles = makeStyles((theme) => ({
  detailBox: {
    border: "2px solid #ffffffff",
    borderRadius: "4px",
    boxShadow: "15px 15px 30px #d9d9d9ff",
  },
  detailBoxRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    color: theme.palette.primary.dark,
  },

  disableTextField: {
    "& fieldset": {
      border: "none",
      color: theme.palette.primary.dark,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: theme.palette.primary.dark,
    },
  },
  select: {
    padding: "0!important",
    color: theme.palette.primary.dark + "!important",
  },
}));

const currentPlayerLargeCard = (props) => {
  const classes = useStyles();
  const { player, isEditable, setIsEditable, isNotShowEdit, setPlayer } = props;
  const { currentPlayer } = useCurrentLeague();
  const {
    setOpenNotiBox,
    openNotiBox,
    isAccept,
    hasImageOnQueue,
    imageUrl,
    resetAll,
  } = useEditInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });

  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerDOB, setPlayerDOB] = useState("");
  const [playerNationality, setPlayerNationality] = useState("");
  const [playerHomeTown, setPlayerHomeTown] = useState("");
  const [playerIdentity, setPlayerIdentity] = useState("");
  const [playerStatus, setPlayerStatus] = useState("");
  const [playerType, setPlayerType] = useState("");
  const [playerPosition, setPlayerPosition] = useState([]);
  const [isAcceptKick, setIsAcceptKick] = useState(false);

  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  useEffect(() => {
    if (player) {
      setPlayerName(player?.hoTen);
      setPlayerNumber(player?.soAo);
      setPlayerDOB(Helper.formatDateToLocal(player?.ngaySinh));
      setPlayerNationality(player?.quocTich);
      setPlayerHomeTown(player?.queQuan);
      setPlayerIdentity(player?.maDinhDanh);
      setPlayerStatus(player?.trangThai);
      setPlayerType(player?.loaiCauThu);
      setPlayerPosition(player?.viTri);
    }
  }, [player, isEditable]);

  const handleDOBChange = (event) => {
    const input = event.target.value;
    let formattedInput = input.replace(/[^0-9]/g, "");

    if (formattedInput.length >= 3 && formattedInput.length <= 5) {
      formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(
        2
      )}`;
    } else if (formattedInput.length > 5) {
      formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(
        2,
        4
      )}/${formattedInput.slice(4, 8)}`;
    }
    setPlayerDOB(formattedInput);
  };
  const handleEndContract = async () => {
    setOpenNotiBox(true);
    if (isAcceptKick) {
      try {
        const res = await MyAxios.put(`/doibong/huycauthu`, {
          id_cauthu: player?.id,
          id_doibong: player?.idDoi,
        });
      } catch (err) {}
    }
  };
  useEffect(async () => {
    if (isAccept) {
    }
  }, [isAccept]);
  const handleSubmitChange = async () => {
    setIsLoading(true);
    try {
      if (hasImageOnQueue) {
        let count = 0;
        while (imageUrl == "") {
          if (count > 10) break;
          await new Promise((r) => setTimeout(r, 500));
          count++;
        }
      }
      const sendData = {
        idDoi: player?.idDoi,
        id: player?.id,
        hoTen: playerName ? playerName : player?.hoTen,
        soAo: playerNumber ? playerNumber : player?.soAo,
        ngaySinh: playerDOB
          ? Helper.formatDateToUTC(playerDOB)
          : player?.ngaySinh,
        quocTich: playerNationality ? playerNationality : player?.quocTich,
        queQuan: playerHomeTown ? playerHomeTown : player?.queQuan,
        maDinhDanh: playerIdentity ? playerIdentity : player?.maDinhDanh,
        // trangThai: playerStatus? playerStatus: player?.trangThai,
        loaiCauThu: playerType ? playerType : player?.loaiCauThu,
        viTri: playerPosition ? playerPosition : player?.viTri,
        hinhAnh: imageUrl ? imageUrl : player?.hinhAnh,
      };
      const res = await MyAxios.put(`/cauthu/update`, sendData, {
        headers: { contentType: "application/json" },
        accept: "application/json",
      });
      setPlayer(res?.data?.data);
      setSnackbarMessage("Cập nhật thông tin thành công");
      setSnackbarType("success");
      setIsEditable(false);
    } catch (err) {
      console.log(err);
      setNotify({ message: err.message, type: "error" });
      setSnackbarMessage("Cập nhật thông tin thất bại");
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsOpenSnackbar(true);
    }
  };
  return (
    <ComponentLayoutBackdrop isLoading={isLoading} notify={notify}>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        setIsOpen={setIsOpenSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      ></CustomSnackbar>
      <Collapse
        key={player?.id}
        in={true}
        orientation="vertical"
        timeout={1000}
      >
        {openNotiBox && (
          <ConfirmBox setIsAcept={setIsAcceptKick}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="subtitle1" color="primary.dark">
                Kết thúc hợp đồng với &nbsp;
              </Typography>
              <Typography variant="h6" color="primary.dark">
                {"  "}
                {player?.hoTen}?
              </Typography>
            </Box>
          </ConfirmBox>
        )}
        <Box
          className={classes.detailBox}
          sx={{ borderRadius: "15px 15px 15px 15px" }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(45deg, #74ebd5 30%, #ACB6E5 90%)",
              borderRadius: "15px 15px 0 0",
            }}
          >
            <Grid
              item
              xs={isEditable ? 3 : 9}
              sx={{ alignSelf: "center", marginTop: "2rem" }}
            >
              <img
                src={player?.hinhAnh}
                alt={`${player?.hoTen}`}
                height={200}
              />
            </Grid>
            <Grid item xs={isEditable ? 2 : 3} sx={{ alignSelf: "center" }}>
              <Box
                sx={{
                  // display: "flex",
                  // justifyContent: "flex-end",
                  height: "200px",
                }}
              >
                {isEditable && <UploadImageSection></UploadImageSection>}
                {!isEditable && !isNotShowEdit && (
                  <Box>
                    <IconButton
                      onClick={() => {
                        setIsEditable(true);
                      }}
                      sx={{
                        backgroundColor: "white",
                        // marginTop: "-0.5rem",
                        mr: "0.5rem",
                        "&:hover": {
                          backgroundColor: "primary.light",
                        },
                      }}
                    >
                      <Edit color="primary"></Edit>
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "1rem 2rem" }}>
            <Grid item container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Họ tên:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                  }}
                  sx={{
                    input: {
                      color: "primary.dark",
                      padding: "5px",
                      fontWeight: 650,
                      whiteSpace: "wrap",
                    },
                    whiteSpace: "wrap",
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Số áo:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  type="number"
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={playerNumber}
                  onChange={(e) => {
                    setPlayerNumber(e.target.value);
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                {" "}
                <Typography variant="h6">Ngày sinh:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                {" "}
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={playerDOB}
                  onChange={(e) => {
                    handleDOBChange(e);
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Quốc tịch:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={playerNationality}
                  onChange={(e) => {
                    setPlayerNationality(e.target.value);
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Quê quán:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={playerHomeTown}
                  onChange={(e) => {
                    setPlayerHomeTown(e.target.value);
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Mã định danh:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={playerIdentity}
                  onChange={(e) => {
                    setPlayerIdentity(e.target.value);
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container item className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Loại cầu thủ:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  select
                  value={playerType}
                  onChange={(e) => {
                    setPlayerType(e.target.value);
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },

                    "& .MuiInputBase-root": {
                      color: "primary.dark",
                    },
                    "& .MuiSelect-select": {
                      padding: isEditable ? "0.3rem" : "0",
                    },
                  }}
                >
                  <MenuItem value="Ngoại binh">Ngoại binh</MenuItem>
                  <MenuItem value="Nội binh">Nội binh</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid container className={classes.detailBoxRow}>
              <Grid item xs={isEditable ? 3 : 6}>
                <Typography variant="h6">Vị trí:</Typography>
              </Grid>
              <Grid item xs={isEditable ? 9 : 6}>
                <TextField
                  className={!isEditable ? classes.disableTextField : ""}
                  size="small"
                  fullWidth={false}
                  disabled={!isEditable}
                  value={(() => {
                    try {
                      return playerPosition.join(", ");
                    } catch (error) {
                      // Handle the error here
                      return "";
                    }
                  })()}
                  onChange={(e) => {
                    setPlayerPosition(e.target.value.split(", "));
                  }}
                  sx={{
                    input: { color: "primary.dark", padding: "5px" },
                  }}
                ></TextField>{" "}
              </Grid>
            </Grid>
            <Grid container className={classes.detailBoxRow}>
              <Typography variant="h6">Tổng số bàn thắng:</Typography>
              <Typography variant="body1" sx={{ ml: "1rem" }}>
                {currentPlayer?.tongSoBanThang || 0}
              </Typography>
            </Grid>
            <Grid container className={classes.detailBoxRow}>
              <Typography variant="h6">Bắt đầu hợp đồng:</Typography>
              <Typography variant="body1" sx={{ ml: "1rem" }}>
                {Helper.formatDateToLocal(player?.thoiDiemBatDau)}
              </Typography>
            </Grid>
            <Grid container className={classes.detailBoxRow}>
              <Typography variant="h6">Kết thúc hợp đồng:</Typography>
              <Typography variant="body1" sx={{ ml: "1rem" }}>
                {Helper.formatDateToLocal(player?.thoiDiemKetThuc)}
              </Typography>
            </Grid>
            {isEditable && (
              <Grid item xs={5} className={classes.detailBoxRow}>
                <Button
                  sx={{
                    opacity: "0.7",
                    whiteSpace: "nowrap",
                    padding: "0.5rem 1.5rem 0.5rem 1.5rem",
                  }}
                  color="error"
                  variant="contained"
                  onClick={handleEndContract}
                >
                  Kết thúc hợp đồng
                </Button>
                <Box
                  sx={{ display: "flex", justifyContent: "end", width: "100%" }}
                >
                  <IconButton
                    onClick={() => {
                      handleSubmitChange();
                    }}
                  >
                    <Check color="success"></Check>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setIsEditable(false);
                    }}
                  >
                    <Close color="error"></Close>
                  </IconButton>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Collapse>
    </ComponentLayoutBackdrop>
  );
};

export default currentPlayerLargeCard;
