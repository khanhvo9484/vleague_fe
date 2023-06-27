import ManagerLayout from "../../../layout/ManagerLayout";
import { Box, Paper, Typography, Grid, Select, MenuItem } from "@mui/material";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import { useState, useEffect } from "react";
import RegistrationForm from "../../../components/form/RegistrationForm";
import useAuth from "../../../hooks/useAuth";
import MyAxios from "../../../api/MyAxios";
const RegisterList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listRegis, setListRegis] = useState([]);
  const [allListRegis, setAllListRegis] = useState([]);
  const [selectValue, setSelectValue] = useState("Chờ duyệt");
  const { auth } = useAuth();
  useEffect(async () => {
    try {
      setIsLoading(true);
      const res = await MyAxios.get(`/hosodangky/${auth?.teamId}/danhsach`);
      setAllListRegis(res.data.data);
      setListRegis(res.data.data);
      // setCurrentForm(res.data.data[0]);
      console.log(res.data.data[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
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
  };
  return (
    <ManagerLayout title={"Danh sách đăng ký"} isLoading={isLoading}>
      <Grid
        container
        component={Paper}
        elevation={3}
        sx={{ mt: "1rem", padding: "0.5rem" }}
      >
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
            sx={{ width: "14rem" }}
          >
            <MenuItem key={1} value="Đã duyệt">
              Đã duyệt
            </MenuItem>
            <MenuItem key={0} value="Chờ duyệt">
              {" "}
              Chờ duyệt
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
          {listRegis?.length === 0 && (
            <Typography
              variant="h5"
              sx={{ backgroundColor: "none", textAlign: "center" }}
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
                  displayLeagueName={true}
                  isManager={true}
                ></RegistrationForm>
              </Box>
            ))}
        </Grid>
      </Grid>
    </ManagerLayout>
  );
};

export default RegisterList;
