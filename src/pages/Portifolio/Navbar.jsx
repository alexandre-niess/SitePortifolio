import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Voltar from "@mui/icons-material/ArrowBack";

function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpenDrawer(false);
    }
  };

  return (
    <>
      <Box
        id="navbar"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#443399",
          position: "fixed", // Adiciona fixação ao topo
          width: "100%", // Garante que a barra de navegação ocupe toda a largura
          top: 0, // Alinha a barra de navegação ao topo
          zIndex: 100, // Garante que a barra de navegação esteja acima de outros elementos
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adiciona sombra na base
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "white",
          }}
        >
          <img
            id="logo"
            src="/logo_white.svg"
            style={{ height: "7%", width: "7%", marginRight: "15px" }}
          />
          <Typography variant="h6">Portfólio</Typography>
        </Link>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => scrollToSection("contato")}
          sx={{
            borderRadius: "100px",
            color: "#fff",
            padding: "10px 20px", // Padding aplicado em todas as telas
            textAlign: "center",
            // Aplicar minWidth apenas em telas pequenas
            minWidth: {
              xs: "100px", // minWidth para telas pequenas
            },
          }}
        >
          Contato
        </Button>
      </Box>

      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            color: "#88AA55",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "20px",
            marginTop: "70px",
          }}
        >
          <Voltar sx={{ height: "20px", width: "auto", color: "#88AA55" }} />{" "}
          Voltar para a Home
        </Typography>
      </Link>
    </>
  );
}

export default Navbar;
