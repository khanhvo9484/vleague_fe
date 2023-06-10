import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import { baselightTheme } from "../theme/DefaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import RequiredAuth from "../utils/RequiredAuth";
import Unauthorized from "../pages/unauthorized/Unauthorized";
const App = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <Routes>
        {/* Public routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />

        {/* Private routes for manager*/}
        <Route element={<RequiredAuth allowedRoles={["QLGD"]} />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Protected route for admin */}
        <Route element={<RequiredAuth allowedRoles={["ADMIN"]} />}>
          <Route exact path="/dashboard/admin" />
        </Route>
        <Route
          exact
          path="/unauthorized"
          element={<Unauthorized></Unauthorized>}
        ></Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
