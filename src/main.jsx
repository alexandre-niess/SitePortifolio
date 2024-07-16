// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portifolio } from "./pages/Portifolio/Portifolio.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";
import Login from "./pages/Admin/Login.jsx";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./context/PrivateRoute";
import ReactGA from "react-ga4";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#443399",
    },
    secondary: {
      main: "#88AA55",
    },
    text: {
      default: "#242424",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portifolio />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
