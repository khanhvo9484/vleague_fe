import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
// import PlayerInfor from "../pages/playerInfor/PlayerInfor";
import Player from "../pages/player/Player";
import Club from "../pages/club/Club";

import Standings from "../pages/standings/Standings";
import Schedule from "../pages/schedule/Schedule";

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
        <Route path="/clubs/:id" element={<Club />} />
        <Route path="/players/:id" element={<Player />} />
        <Route exact path="/standings" element={<Standings />} />
        <Route exact path="/schedule" element={<Schedule />} />
        {/* Private routes for manager*/}
        <Route element={<RequiredAuth allowedRoles={["QLDB"]} />}>
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
