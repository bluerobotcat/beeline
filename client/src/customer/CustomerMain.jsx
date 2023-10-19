import React from "react";
import CustomerFooter from "./components/CustomerFooter";
import CustomerLayout from "./components/CustomerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CartProvider } from "./pages/CartProvider";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FBD75D",
      main: "#FBCD35",
      dark: "#AF8F25",
      contrastText: "#000",
    },
    secondary: {
      light: "#FEBB55",
      main: "#FEAA2B",
      dark: "#B1761E",
      contrastText: "#FFF",
    },
  },
});

export default function CustomerMain() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CustomerLayout />
          <CustomerFooter />
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}
