import {
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import useEditClubInfo from "../../../hooks/useEditInfo";
import MyAxios from "../../../api/MyAxios";
import LoadingBox from "../../../components/ui/LoadingBox";
import { set } from "date-fns";
const useStyles = makeStyles((theme) => ({
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StadiumCard = (props) => {
  const classes = useStyles();
  const { homeStadium, verticalLayout, isEditable, setCurrentStadium } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [newStadium, setNewStadium] = useState("");
  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await MyAxios.get(`/sanbong/chuadangky`);
      setStadiums(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [isEditable]);
  useEffect(() => {
    if (newStadium) {
      setCurrentStadium(newStadium);
    }
  }, [newStadium]);
  return (
    <>
      <Grid
        item
        lg={verticalLayout ? 11 : 5}
        xs={verticalLayout ? 11 : 5}
        sx={{ alignContent: "flex-start" }}
        container
      >
        <Grid
          item
          xs={12}
          className={classes.allCenter}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "4px",
            maxHeight: "2rem",
          }}
        >
          <Typography variant="h6" sx={{ padding: "0.5rem" }}>
            {"Sân nhà"}
          </Typography>
        </Grid>
        <Grid
          component={Paper}
          elevation={3}
          sx={{ width: "100%", display: "flex" }}
        >
          {!isEditable ? (
            <>
              <Grid
                container
                item
                xs={verticalLayout ? 5 : 8}
                className={classes.allCenter}
                sx={{
                  alignContent: "center",
                  paddingLeft: "0.5rem",
                }}
              >
                <Grid container className={classes.allCenter} sx={{}}>
                  <Grid item sm={4}>
                    <Typography variant="h6">Tên sân: </Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <Typography variant="subtitle1">
                      {homeStadium?.tenSan}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className={classes.allCenter}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Grid item sm={4}>
                    <Typography variant="h6">Địa điểm: </Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <Typography variant="subtitle1">
                      {homeStadium?.diaDiem}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                item
                xs={verticalLayout ? 5 : 4}
                sm={verticalLayout ? 5 : 4}
                className={classes.allCenter}
              >
                <Box
                  sx={{
                    paddingTop: "1rem",
                    paddingBottom: "0.8rem",
                    backgroundImage: `url(${"https://upload.wikimedia.org/wikipedia/commons/b/b8/Etihad_Stadium.jpg"})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",

                    width: "10rem",
                    height: "3rem",
                    margin: "1rem 0.5rem 1rem 0",
                    borderRadius: "4px",
                  }}
                ></Box>
              </Grid>
            </>
          ) : (
            <>
              {isLoading && !stadiums && (
                <Box>
                  <LoadingBox></LoadingBox>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FormControl sx={{ marginTop: "2rem", mb: "2rem" }}>
                  <InputLabel id="label"> Chọn sân </InputLabel>
                  <Select
                    labelId="label"
                    label="Chọn sân"
                    value={newStadium}
                    size="small"
                    sx={{ minWidth: "15rem" }}
                    onChange={(e) => {
                      setNewStadium(e.target.value);
                    }}
                  >
                    {stadiums &&
                      Array.isArray(stadiums) &&
                      stadiums.map((stadium) => (
                        <MenuItem key={stadium.id} value={stadium.id}>
                          {stadium.tenSan}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default StadiumCard;
