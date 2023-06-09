import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import { baselightTheme } from "../theme/DefaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "../context/AuthProvider";
const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={baselightTheme}>
        <Router>
          <Switch>
            {/*Public routes */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            {/*Private routes */}
            <Route exact path="/dashboard" component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};
export default App;
