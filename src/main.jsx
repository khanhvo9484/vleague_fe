import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import "./assets/css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CurrentLeagueProvider } from "./context/CurrentLeagueContext";
import { EditClubProvider } from "./context/EditInfoContext";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <CurrentLeagueProvider>
            <EditClubProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </EditClubProvider>
          </CurrentLeagueProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
