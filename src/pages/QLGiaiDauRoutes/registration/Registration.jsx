import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
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
const Registration = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [currentLeague, setCurrentLeague] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listRegis, setListRegis] = useState([]);
  const [allListRegis, setAllListRegis] = useState([]);
  const [selectValue, setSelectValue] = useState("Tất cả");

  useEffect(async () => {
    if (currentLeague) {
      try {
        setIsLoading(true);
        const res = await MyAxios.get(`/hosodangky/${currentLeague?.id}`);

        setAllListRegis(res?.data?.data);
        setListRegis(
          res?.data?.data.filter((regis) => regis.trangThai != "Hủy")
        );
        // setCurrentForm(res.data.data[0]);
        console.log(res.data.data[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentLeague]);
  const handleChangeFilter = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value === "Đã duyệt") {
      setListRegis(
        allListRegis.filter((regis) => regis.trangThai == "Đã duyệt")
      );
    }
    if (e.target.value === "Chờ duyệt") {
      setListRegis(
        allListRegis.filter((regis) => regis.trangThai == "Chờ duyệt")
      );
    }
    if (e.target.value === "Từ chối") {
      setListRegis(
        allListRegis.filter((regis) => regis.trangThai == "Từ chối")
      );
    }
    if (e.target.value === "Tất cả") {
      setListRegis(allListRegis);
    }
  };
  return (
    <OrganizerLayout title={"Hồ sơ đăng ký"}>
      <AllLeaguesSelector
        currentLeague={currentLeague}
        setCurrentLeague={setCurrentLeague}
        selectId={id}
      ></AllLeaguesSelector>
      <ComponentLayoutBackdrop isLoading={isLoading}>
        <Grid container sx={{}}>
          <Box
            sx={{
              mt: "0.5rem",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography color="primary.dark" variant="h6">
              {" "}
              Lọc theo:
            </Typography>
            &nbsp;
            <Select
              value={selectValue}
              onChange={(e) => {
                handleChangeFilter(e);
              }}
              sx={{ width: "13.5rem" }}
            >
              <MenuItem key={0} value="Tất cả">
                {" "}
                Tất cả
              </MenuItem>
              <MenuItem key={1} value="Đã duyệt">
                Đã duyệt
              </MenuItem>
              <MenuItem key={2} value="Chờ duyệt">
                {" "}
                Chờ duyệt
              </MenuItem>
              <MenuItem key={3} value="Từ chối">
                {" "}
                Đã từ chối
              </MenuItem>
            </Select>
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
            {!currentLeague && (
              <Typography
                variant="h5"
                sx={{
                  backgroundColor: "none",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                Vui lòng chọn giải đấu
              </Typography>
            )}
            {currentLeague && listRegis?.length === 0 && (
              <Typography
                variant="h5"
                sx={{
                  backgroundColor: "none",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                Không có đơn đăng ký nào
              </Typography>
            )}
            {listRegis?.length > 0 &&
              listRegis.map((regis, index) => (
                <Box key={index} sx={{ padding: "0.5rem" }}>
                  <RegistrationForm
                    key={index}
                    registration={regis}
                    leagueId={currentLeague?.id}
                  ></RegistrationForm>
                </Box>
              ))}
          </Grid>
        </Grid>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default Registration;
