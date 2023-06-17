import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import "./assets/css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { initializeFontAwesome } from "./theme/FontAwesome";
import { CurrentLeagueProvider } from "./context/CurrentLeagueContext";
initializeFontAwesome();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CurrentLeagueProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </CurrentLeagueProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
