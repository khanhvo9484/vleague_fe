import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import "./assets/css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CurrentLeagueProvider } from "./context/CurrentLeagueContext";
import { EditClubProvider } from "./context/EditInfoContext";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <CurrentLeagueProvider>
            <EditClubProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </EditClubProvider>
          </CurrentLeagueProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
