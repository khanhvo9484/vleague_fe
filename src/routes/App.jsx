import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import PlayerInfor from "../pages/playerInfor/PlayerInfor";
import { baselightTheme } from "../theme/DefaultTheme";
import { ThemeProvider } from "@mui/material/styles";
const App = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/playerInfor" component={PlayerInfor}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
export default App;
