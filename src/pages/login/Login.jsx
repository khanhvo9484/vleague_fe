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
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import MyAxios from "../../api/MyAxios";

export default function Login() {
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    console.log({ username, password });
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
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      console.log(accessToken);
      setAuth({ username, password, role, accessToken });
    } catch (error) {
      console.log(error, error?.message);
      if (!error.response) {
        console.log("Network error");
      } else if (error.response.status === 403) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
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
            Sign in
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
