import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Seta from "@mui/icons-material/ChevronRight";

function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(""); // Estado para rastrear a seção ativa

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Obtém os elementos de seção e seus limites
      const sections = [
        "sobre-mim",
        "principais-projetos",
        "highlights",
        "curriculo",
      ];
      const sectionOffsets = sections.map((sectionId) => ({
        id: sectionId,
        offsetTop: document.getElementById(sectionId).offsetTop - 100, // Offset adicional
        offsetBottom:
          document.getElementById(sectionId).offsetTop +
          document.getElementById(sectionId).offsetHeight +
          50, // Offset adicional
      }));

      // Determina qual seção está visível com base na posição de rolagem
      const visibleSection = sectionOffsets.find(
        ({ offsetTop, offsetBottom }) =>
          scrollPosition >= offsetTop && scrollPosition < offsetBottom
      );

      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    };

    // Adiciona o listener de evento de rolagem ao carregar o componente
    window.addEventListener("scroll", handleScroll);

    // Remove o listener de evento de rolagem ao descarregar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      // Atualiza a seção ativa após o scroll ser concluído
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 500); // Ajuste o tempo conforme necessário
      setOpenDrawer(false);
    }
  };

  return (
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
        to="/portfolio"
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
          src="https://svgshare.com/i/15z8.svg"
          style={{ height: "15%", width: "15%", marginRight: "15px" }}
        />
        <Typography variant="h6">Alexandre Niess</Typography>
      </Link>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <MenuItem
            onClick={() => scrollToSection("sobre-mim")}
            sx={{
              py: "6px",
              px: "12px",
              borderBottom:
                activeSection === "sobre-mim" ? "2px solid #fff" : "none",
            }} // Adiciona borda inferior se estiver ativo
          >
            <Typography variant="body2" color="#fff">
              Sobre Mim
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("principais-projetos")}
            sx={{
              py: "6px",
              px: "12px",
              borderBottom:
                activeSection === "principais-projetos"
                  ? "2px solid #fff"
                  : "none",
            }} // Adiciona borda inferior se estiver ativo
          >
            <Typography variant="body2" color="#fff">
              Projetos
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("highlights")}
            sx={{
              py: "6px",
              px: "12px",
              borderBottom:
                activeSection === "highlights" ? "2px solid #fff" : "none",
            }} // Adiciona borda inferior se estiver ativo
          >
            <Typography variant="body2" color="#fff">
              Habilidades
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("curriculo")}
            sx={{
              py: "6px",
              px: "12px",
              borderBottom:
                activeSection === "curriculo" ? "2px solid #fff" : "none",
            }} // Adiciona borda inferior se estiver ativo
          >
            <Typography variant="body2" color="#fff">
              Currículo
            </Typography>
          </MenuItem>
          <MenuItem sx={{ py: "6px", px: "12px" }}>
            <Link to="portifolio" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "100px", color: "#fff" }}
              >
                Portfólio <Seta />
              </Button>
            </Link>
          </MenuItem>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={toggleDrawer(true)} sx={{ ml: 2 }}>
            <MenuIcon sx={{ color: "#fff" }} />
          </Button>
        </Box>
      </Box>

      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            padding: "20px",
            background: "#fff",
            color: "#242424",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <MenuItem onClick={() => scrollToSection("features")}>
          <Typography
            variant="body2"
            onClick={() => scrollToSection("sobre-mim")}
            color="#fff"
            sx={{ color: "#000" }}
          >
            Sobre Mim
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection("testimonials")}>
          <Typography
            variant="body2"
            onClick={() => scrollToSection("principais-projetos")}
            color="text.primary"
            sx={{ color: "#000" }}
          >
            Projetos
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection("highlights")}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ color: "#000" }}
          >
            Habilidades
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection("curriculo")}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ color: "#000" }}
          >
            Currículo
          </Typography>
        </MenuItem>
        <MenuItem sx={{ py: "6px", px: "12px" }}>
          <Link to="/portfolio" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: "100px", color: "#fff" }}
            >
              Portifolio
            </Button>
          </Link>
        </MenuItem>
      </Drawer>
    </Box>
  );
}

export default Navbar;
