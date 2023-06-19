import { Paper, Box, Grid, Typography } from "@mui/material";
import Helper from "../../../utils/Helper";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const MangerCard = (props) => {
  const classes = useStyles();
  const { manager, verticalLayout } = props;
  return (
    <Grid
      item
      lg={verticalLayout ? 11 : 6}
      xs={verticalLayout ? 11 : 6}
      container
      sx={{ alignContent: "flex-start" }}
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
          {"Quản lý"}
        </Typography>
      </Grid>
      <Paper elevation={3} sx={{ width: "100%", display: "flex" }}>
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
              <Typography variant="h6">Họ tên: </Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="subtitle1">{manager?.hoTen}</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.allCenter}>
            <Grid item sm={4}>
              <Typography variant="h6">Ngày sinh: </Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="subtitle1">
                {Helper.formatDateToLocal(manager?.ngaySinh)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={verticalLayout ? 6 : 3}
          className={classes.allCenter}
        >
          <Box
            sx={{
              backgroundImage: `url(${manager?.hinhAnh})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",

              width: "12rem",
              height: "10rem",
              margin: "1rem 0 1rem 0",
              borderRadius: "4px",
            }}
          ></Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MangerCard;
