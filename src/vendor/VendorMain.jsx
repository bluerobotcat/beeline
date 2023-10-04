import React from "react";
// import CustomerFooter from "./components/CustomerFooter";
// import CustomerLayout from "./components/CustomerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import VendorLayout from "./components/VendorLayout";
import VendorFooter from "./components/VendorFooter";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFAC33",
      main: "#FF9800",
      dark: "#B26A00",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#FFDD72",
      main: "#FFD54F",
      dark: "#B29537",
      contrastText: "#000",
    },
  },
});

export default function VendorMain() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <VendorLayout />
        <VendorFooter />
      </ThemeProvider>
    </div>
  );
}
