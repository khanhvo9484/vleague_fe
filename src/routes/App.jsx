import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import { baselightTheme } from "../theme/DefaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import RequiredAuth from "../utils/RequiredAuth";

const App = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <Routes>
        {/* Public routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        {/* Private routes */}
        <Route element={<RequiredAuth />}>
          {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
