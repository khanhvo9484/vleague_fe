import { Paper, Box, Typography, Grid, TextField, Button } from "@mui/material";
import UploadImageSection from "../../../components/ui/UploadImageSection";
import { useState, useEffect } from "react";
import Rules from "../../../components/ui/rules/Rules";
import { Add } from "@mui/icons-material";
import useEditInfo from "../../../hooks/useEditInfo";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import useAuth from "../../../hooks/useAuth";
import MyAxios from "../../../api/MyAxios";
import Helper from "../../../utils/Helper";
const AddNewLeague = () => {
  const [leagueName, setLeagueName] = useState("");

  const [maxPlayer, setMaxPlayer] = useState(-1);
  const [maxForeignPlayer, setMaxForeignPlayer] = useState(-1);
  const [maxAge, setMaxAge] = useState(-1);
  const [minAge, setMinAge] = useState(-1);
  const [minPlayer, setMinPlayer] = useState(-1);

  const [currentLeague, setCurrentLeague] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [winPoint, setWinPoint] = useState(-1);
  const [drawPoint, setDrawPoint] = useState(-1);
  const [losePoint, setLosePoint] = useState(-1);
  const [isEditable, setIsEditable] = useState(true);

  const [numberOfClubs, setNumberOfClubs] = useState(-1);
  const { imageUrl, hasImageOnQueue, isFireUpload, setIsFireUpload } =
    useEditInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const { auth } = useAuth();
  console.log(auth);
  const handleAddLeague = async () => {
    setIsLoading(true);
    let data = {
      id_nguoitao: auth?.id,
      ten: leagueName,
      hinhAnh: imageUrl,
      thoiDiemBatDau: Helper.formatDateToUTC(startDate),
      thoiDiemKetThuc: Helper.formatDateToUTC(endDate),
      quyDinhCauThu: {
        soLuongCauThuToiDa: maxPlayer,
        soLuongCauThuToiThieu: minPlayer,
        soLuongCauThuNgoaiQuocToiDa: maxForeignPlayer,
        tuoiToiThieu: minAge,
        tuoiToiDa: maxAge,
      },
      quyDinhTinhDiem: {
        thang: winPoint,
        hoa: drawPoint,
        thua: losePoint,
      },
      quyDinhSoLuongDoi: {
        soLuongDoi: numberOfClubs,
      },
    };
    console.log(data);
    try {
      const res = await MyAxios.post("/muagiai/taogiaidau_quydinhmoi", data, {
        contentType: "application/json",
      });
      if (res.status == 200) {
        setSnackbarContent("Thêm mùa giải thành công");
        setSnackbarType("success");
      }
    } catch (error) {
      console.log(error);
      setSnackbarContent("Thêm mùa giải thất bại");
      setSnackbarType("error");
    } finally {
      setIsLoading(false);
      setIsOpenSnackbar(true);
    }
  };
  return (
    <ComponentLayoutBackdrop isLoading={isLoading}>
      <Paper sx={{ padding: "1rem" }}>
        <Grid container>
          <Grid item container xs={8}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label={"Tên mùa giải"}
                  placeholder="Tên mùa giải"
                  value={leagueName}
                  sx={{ mb: "0.5rem" }}
                  onChange={(e) => setLeagueName(e.target.value)}
                ></TextField>
                <TextField
                  label={"Thời gian bắt đầu"}
                  placeholder="Thời điểm bắt đầu (dd/mm/yyyy)"
                  value={startDate}
                  sx={{ mb: "0.5rem" }}
                  onChange={(e) => setStartDate(e.target.value)}
                ></TextField>
                <TextField
                  label={"Thời gian kết thúc"}
                  placeholder="Thời điểm kết thúc (dd/mm/yyyy)"
                  value={endDate}
                  sx={{ mb: "0.5rem" }}
                  onChange={(e) => setEndDate(e.target.value)}
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Rules
                maxPlayer={maxPlayer}
                setMaxPlayer={setMaxPlayer}
                minPlayer={minPlayer}
                setMinPlayer={setMinPlayer}
                maxForeignPlayer={maxForeignPlayer}
                setMaxForeignPlayer={setMaxForeignPlayer}
                minAge={minAge}
                maxAge={maxAge}
                setMinAge={setMinAge}
                setMaxAge={setMaxAge}
                winPoint={winPoint}
                drawPoint={drawPoint}
                losePoint={losePoint}
                isEditable={isEditable}
                numberOfClubs={numberOfClubs}
                setNumberOfClubs={setNumberOfClubs}
                setWinPoint={setWinPoint}
                setDrawPoint={setDrawPoint}
                setLosePoint={setLosePoint}
              ></Rules>
              <Box
                sx={{
                  mt: "0.5rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button variant="contained" onClick={handleAddLeague}>
                  Thêm giải đấu <Add></Add>
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {" "}
            <UploadImageSection></UploadImageSection>
          </Grid>
        </Grid>
        <CustomSnackbar
          isOpen={isOpenSnackbar}
          setIsOpen={setIsOpenSnackbar}
          message={snackbarContent}
          type={snackbarType}
        ></CustomSnackbar>
      </Paper>
    </ComponentLayoutBackdrop>
  );
};

export default AddNewLeague;
