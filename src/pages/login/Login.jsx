import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DefaultLayout from "../../layout/DefaultLayout";

import useAuth from "../../hooks/useAuth";
import MyAxios from "../../api/MyAxios";
import { Label } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [notify, setNotify] = useState({ message: "", status: null });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");

    try {
      const response = await MyAxios.post(
        "/auth/login",
        JSON.stringify({
          taiKhoan: username,
          matKhau: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.data?.token;
      const role = response?.data?.role;
      setAuth({ username, password, role, accessToken });
      setNotify({ message: "Đăng nhập thành công", status: "success" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (!error.response) {
        setNotify({ message: "Lỗi mạng", status: "error" });
      } else if (error.response.status === 401) {
        setNotify({
          message: "Sai tên đăng nhập hoặc mật khẩu",
          status: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ đăng nhập"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: "1rem",
                bgcolor:
                  notify.status === "error"
                    ? "error.light"
                    : notify.status === "success"
                    ? "success.light"
                    : "inherit",
                borderRadius: "4px",
                opacity: 0.5,
              }}
            >
              <Box
                sx={{
                  display: loading ? "flex" : "none",
                  justifyContent: "center",
                }}
              >
                <Loader sx={{ textAlign: "center" }}></Loader>
              </Box>
              <Typography
                sx={{
                  display: loading ? "none" : "flex",
                  padding: "0.5rem",
                  alignItems: "center",
                  alignContent: "center",
                  color:
                    notify.status === "error"
                      ? "error.main"
                      : notify.status === "success"
                      ? "success.main"
                      : "inherit",
                  fontWeight: "550",
                }}
                variant="h6"
              >
                {notify.status === "error" ? (
                  <ErrorIcon sx={{ mr: "1rem" }}></ErrorIcon>
                ) : null}
                {notify.status === "success" ? (
                  <CheckIcon sx={{ mr: "1rem" }}></CheckIcon>
                ) : null}
                {notify.message}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
