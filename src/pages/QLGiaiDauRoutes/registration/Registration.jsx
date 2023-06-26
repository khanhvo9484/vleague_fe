import { useState, useEffect } from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import MyAxios from "../../../api/MyAxios";
import RegistrationForm from "../../../components/form/RegistrationForm";
import PlayerTable from "../../../components/form/PlayersList";
import { Add, Close } from "@mui/icons-material";
const Registration = () => {
  const [currentLeague, setCurrentLeague] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listRegis, setListRegis] = useState([]);
  const [currentForm, setCurrentForm] = useState([]);
  useEffect(async () => {
    if (currentLeague) {
      try {
        setIsLoading(true);
        const res = await MyAxios.get(`/hosodangky/${currentLeague?.id}`);

        setListRegis(res.data.data);
        // setCurrentForm(res.data.data[0]);
        console.log(res.data.data[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentLeague]);
  useEffect(() => {
    //   console.log(listRegis);
    console.log(currentForm);
  }, [listRegis]);
  return (
    <OrganizerLayout title={"Hồ sơ đăng ký"}>
      <AllLeaguesSelector
        currentLeague={currentLeague}
        setCurrentLeague={setCurrentLeague}
      ></AllLeaguesSelector>
      <ComponentLayoutBackdrop isLoading={isLoading}>
        <Grid container>
          <Grid item xs={6}>
            {listRegis?.length > 0 &&
              listRegis.map((regis, index) => (
                <RegistrationForm
                  key={index}
                  registration={regis}
                ></RegistrationForm>
              ))}
          </Grid>
          <Grid item xs={6}>
            <PlayerTable data={currentForm?.dsCauThuDangKy}></PlayerTable>
          </Grid>
        </Grid>
      </ComponentLayoutBackdrop>
    </OrganizerLayout>
  );
};

export default Registration;
