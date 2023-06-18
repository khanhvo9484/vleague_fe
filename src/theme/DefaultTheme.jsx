import { createTheme } from "@mui/material/styles";
import { shadows } from "./Shadows";
import typography from "./Typography";

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#181823",
      light: "#ECF2FF",
      dark: "#0c3ba9b1",
    },
    blueBackground: {
      light: "#e4f0f9",
      main: "#c9deef",
      dark: "#a3c9e8",
      activeLink: "#78c8f6",
    },
    disabledBackground: {
      main: "#d6d6d6",
    },
    green: {
      main: "#89f0aa",
    },
    secondary: {
      main: "#04476a",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: "#07b696",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#fe0000",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    purple: {
      A50: "#EBF3FE",
      A100: "#6610f2",
      A200: "#557fb9",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      350: "#dfe5efcb",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },

  typography,
  shadows,
});

export { baselightTheme };
