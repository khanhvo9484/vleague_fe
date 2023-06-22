import { Routes, Route } from "react-router-dom";
import Home from "../pages/publicRoutes/home/Home";
import Login from "../pages/publicRoutes/login/Login";
import Dashboard from "../pages/QLGiaiDauRoutes/allLeague/AllLeague";
// import PlayerInfor from "../pages/playerInfor/PlayerInfor";
import Player from "../pages/publicRoutes/player/Player";
import AllPlayers from "../pages/publicRoutes/allPlayers/AllPlayers";

import Club from "../pages/publicRoutes/club/Club";
import AllClubs from "../pages/publicRoutes/allClubs/AllClubs";
import Standings from "../pages/publicRoutes/standings/Standings";
import Schedule from "../pages/publicRoutes/schedule/Schedule";

import GDAllLeague from "../pages/QLGiaiDauRoutes/allLeague/AllLeague";

import DBHome from "../pages/QLDoiBongRoutes/home/Home";
import DBManageTeam from "../pages/QLDoiBongRoutes/manageTeam/ManageTeam";
import DBRegister from "../pages/QLDoiBongRoutes/register/Register";
import { baselightTheme } from "../theme/DefaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import RequiredAuth from "../utils/RequiredAuth";
import Unauthorized from "../pages/publicRoutes/unauthorized/Unauthorized";
import NotFound from "../pages/publicRoutes/notFound/404NotFound";

const App = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <Routes>
        {/* Public routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/clubs/:id" element={<Club />} />
        <Route path="/clubs" exact element={<AllClubs />} />
        <Route path="/players" exact element={<AllPlayers />} />
        <Route path="/players/:id" element={<Player />} />
        <Route exact path="/standings" element={<Standings />} />
        <Route exact path="/schedule" element={<Schedule />} />
        {/* Private routes for manager*/}
        <Route element={<RequiredAuth allowedRoles={["QLDB"]} />}>
          <Route exact path="/manager/home" element={<DBHome />} />
          <Route
            path="/manager/manage-club"
            element={<DBManageTeam></DBManageTeam>}
          ></Route>
          <Route
            path="/manager/register-league"
            element={<DBRegister></DBRegister>}
          ></Route>
        </Route>

        {/* Protected route for admin */}
        <Route element={<RequiredAuth allowedRoles={["QLGD"]} />}>
          <Route exact path="/organizer/home" element={<GDAllLeague />} />
        </Route>
        <Route
          exact
          path="/unauthorized"
          element={<Unauthorized></Unauthorized>}
        ></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
