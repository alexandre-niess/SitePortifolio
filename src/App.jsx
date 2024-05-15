import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
