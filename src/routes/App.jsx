import { Routes, Route } from "react-router-dom";
import Home from "../pages/publicRoutes/home/Home";
import Login from "../pages/publicRoutes/login/Login";
import Dashboard from "../pages/QLGiaiDauRoutes/seasonRules/SeasonRules";
// import PlayerInfor from "../pages/playerInfor/PlayerInfor";
import Player from "../pages/publicRoutes/player/Player";
import AllPlayers from "../pages/publicRoutes/allPlayers/AllPlayers";

import Club from "../pages/publicRoutes/club/Club";
import AllClubs from "../pages/publicRoutes/allClubs/AllClubs";
import Standings from "../pages/publicRoutes/standings/Standings";
import Schedule from "../pages/publicRoutes/schedule/Schedule";

import GDSeasonRules from "../pages/QLGiaiDauRoutes/seasonRules/SeasonRules";
import GDLeaguesList from "../pages/QLGiaiDauRoutes/leaguesList/LeaguesList";
import GDCreateSchedule from "../pages/QLGiaiDauRoutes/createSchedule/CreateSchedule";
import GDRegistration from "../pages/QLGiaiDauRoutes/registration/Registration";
import GDRegistrationDetail from "../pages/QLGiaiDauRoutes/registration/RegistrationDetail";
import GDMatches from "../pages/QLGiaiDauRoutes/matches/Matches";
import GDLeagueDetail from "../pages/QLGiaiDauRoutes/leaguesList/LeagueDetail";

import DBHome from "../pages/QLDoiBongRoutes/home/Home";
import DBManageTeam from "../pages/QLDoiBongRoutes/manageTeam/ManageTeam";
import DBRegister from "../pages/QLDoiBongRoutes/register/Register";
import DBRegisterList from "../pages/QLDoiBongRoutes/registerlist/RegisterList";
import DBRegisterDetail from "../pages/QLDoiBongRoutes/registerlist/RegisterDetail";

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
          <Route
            path="/manager/register-list"
            element={<DBRegisterList></DBRegisterList>}
          ></Route>
          <Route
            path="/manager/register-list/detail"
            element={<DBRegisterDetail />}
          />
        </Route>

        {/* Protected route for admin */}
        <Route element={<RequiredAuth allowedRoles={["QLGD"]} />}>
          <Route path="/organizer/season-rules" element={<GDSeasonRules />} />
          <Route
            exact
            path="/organizer/all-leagues"
            element={<GDLeaguesList />}
          />
          <Route
            path="/organizer/all-leagues/detail"
            element={<GDLeagueDetail />}
          />
          <Route
            exact
            path="/organizer/create-schedule"
            element={<GDCreateSchedule />}
          />
          <Route
            exact
            path="/organizer/league-registration"
            element={<GDRegistration />}
          />
          <Route
            path="/organizer/league-registration/detail"
            element={<GDRegistrationDetail />}
          />
          <Route path="/organizer/matches" element={<GDMatches />} />
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
