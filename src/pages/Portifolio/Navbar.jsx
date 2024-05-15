import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
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
    </Box>
  );
}

export default Navbar;
