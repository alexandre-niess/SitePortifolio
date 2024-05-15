import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Navbar from "./components/Navbar";
import Habilidades from "./components/Habilidades";
import PrincipaisProjetos from "./components/PrincipaisProjetos";
import Footer from "./components/Footer";
import Ticker from "./components/Ticker";
import Apresentacao from "./components/Apresentacao";
import Curriculo from "./components/Curriculo";
import SobreMim from "./components/SobreMim";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Alexandre Niess";
  }, []);

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Apresentacao />
      <Ticker />
      <SobreMim />
      <PrincipaisProjetos />
      <Divider />
      <Divider />
      <Habilidades />
      <Curriculo />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Footer />
    </div>
  );
}
