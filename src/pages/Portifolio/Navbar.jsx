import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Voltar from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

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
        behavior: 'smooth',
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
          alignItems: "center", // Centraliza verticalmente os elementos
          padding: "15px",
          backgroundColor: "#443399",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/SitePortifolio/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <img
              id="logo"
              src="https://svgshare.com/i/15z8.svg"
              style={{ height: "15%", width: "15%", marginRight: "15px" }}
            />
            <Typography variant="h6">Portifólio</Typography>
          </Link>

        </Box>
        <Button variant='contained' color='secondary' onClick={() => scrollToSection('contato')} sx={{ borderRadius: '100px', color: '#fff' }}>Contato</Button>
      </Box>
      <Link to="/SitePortifolio/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            color: "#88AA55",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "20px",
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
