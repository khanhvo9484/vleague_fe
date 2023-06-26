import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";

const RegistrationForm = (props) => {
  const { registration } = props;
  return (
    <Paper elevation={3}>
      <Typography>Đội</Typography>
      <Typography>{registration?.ten_doibong}</Typography>
      <Typography>Quản lý</Typography>
      <Typography>{registration?.ten_quanly}</Typography>
      <Typography>Thời gian tạo</Typography>
      <Typography>{registration?.thoiGianTao}</Typography>
      <Typography>Trạng thái</Typography>
      <Typography>{registration?.trangThai}</Typography>
    </Paper>
  );
};

export default RegistrationForm;
