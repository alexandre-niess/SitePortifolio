import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import ReactGA from "react-ga4";

ReactGA.initialize("G-0V46XG8971");

function App() {
  const [count, setCount] = useState(0);

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
