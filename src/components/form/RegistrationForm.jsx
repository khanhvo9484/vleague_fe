import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import Helper from "../../utils/Helper";
import { regisStatus } from "../../data/GlobalConstant";
import { useNavigate } from "react-router-dom";
const RegistrationForm = (props) => {
  const navigate = useNavigate();
  const { registration, isDetail, displayLeagueName, isManager } = props;
  return (
    <Paper elevation={3}>
      <Grid
        container
        sx={{
          padding: "1rem",
          // backgroundImage:
          // "linear-gradient(45deg, #eeeef9 0%, #d5e9f1 50%, #eef6fd 100%)",
        }}
      >
        <Grid item xs={3}>
          {displayLeagueName && (
            <img
              src={registration?.hinhAnhGiai}
              style={{ height: "35px" }}
            ></img>
          )}

          <Typography variant="h6" sx={{ color: "primary.dark" }}>
            {displayLeagueName
              ? registration?.tenGiai
              : registration?.ten_doibong}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Quản lý</Typography>
          <Typography variant="h6">{registration?.ten_quanly}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Thời gian đăng ký: </Typography>
          <Typography>
            {Helper.formatDateToLocal(registration?.thoiGianTao)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Trạng thái: </Typography>
            &nbsp;
            <Typography
              variant="h6"
              color={regisStatus[registration?.trangThai]}
            >
              {registration?.trangThai}
            </Typography>
          </Box>
          {!isDetail && (
            <Box>
              <Typography
                sx={{
                  textAlign: "right",
                  "&: hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "primary.dark",
                  },
                }}
                onClick={() => {
                  if (isManager) {
                    navigate(
                      `/manager/register-list/detail?id=${registration?.id}`,
                      { replace: true }
                    );
                  } else {
                    navigate(
                      `/organizer/league-registration/detail?id=${registration?.id}`,
                      { replace: true }
                    );
                  }
                }}
              >
                Xem chi tiết
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegistrationForm;
