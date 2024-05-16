import React, { useEffect, useState } from "react"; // Importando useEffect diretamente
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

const TRACKING_ID = "G-0V46XG8971"; // Substitua com seu ID de rastreamento real
ReactGA.initialize(TRACKING_ID);

export default function Apresentacao() {
  const [isMobile, setIsMobile] = useState(false); // Uso de useState diretamente

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    ReactGA.pageview("/home"); // Rastreia a página inicial
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          color="#242424"
          fontWeight={600}
          sx={{ fontSize: { xs: "6vw", sm: "5vw", md: "4vw", lg: "3vw" } }}
        >
          Olá, sou Alexandre 👋
        </Typography>
        <Typography
          component="h2"
          variant="h2"
          color="#242424"
          fontWeight={600}
          sx={{ fontSize: { xs: "6vw", sm: "5vw", md: "4vw", lg: "3vw" } }}
        >
          Programador e Designer
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: "40px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Link to="portifolio" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="secondary"
            href="#sobre"
            sx={{ borderRadius: "100px" }}
          >
            Portifólio
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          href="#sobre"
          sx={{ borderRadius: "100px", color: "#fff" }}
          onClick={() => scrollToSection("contato")}
        >
          Entrar em contato
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "120px",
        }}
      >
        <Box
          component="img"
          src="https://i.im.ge/2024/05/09/Zf6RC8.myself.png"
          width={{ xs: "80%", sm: "60%", md: "50%", lg: "40%" }}
        />
      </Box>
    </>
  );
}
