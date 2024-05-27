import * as React from "react";
import { useEffect } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Navbar from "./Navbar";
import GitHubCard from "./GitHubCard";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export function Portifolio() {
  useEffect(() => {
    document.title = "Portfólio";
  }, []);

  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };


  // Dados simulados para cada card, incluindo as linguagens
  const cardData = [
    {
      languages: ["ReactJS", "CSS"],
      title: "Site Portfólio",
      link: "https://github.com/alexandre-niess/SitePortifolio",
      description: "Repositório em que estão os códigos desse site.",
    },
    {
      languages: ["ReactJS", "CSS"],
      title: "Calculadora Clisol",
      link: "https://github.com/alexandre-niess/CalculadoraClisol",
      description:
        "Conversão de uma planilha .xlsx para um App React para que pudesse ser acessado de qualquer dispositivo e com uma interface mais amigável.",
    },
    {
      languages: ["Java"],
      title: "Filtragem Form NuCommunity",
      link: "https://github.com/alexandre-niess/Filtragem-Form-NuCommunity",
      description:
        "Algoritmo em Java que fazia requisições GET para verificar se o usuário preenchia os requisitos para receber um brinde da NuCommunity.",
    },
    {
      languages: ["HTML", "CSS", "JavaScript"],
      title: "Trabalho-Engenharia-I",
      link: "https://github.com/alexandre-niess/Trabalho-Engenharia-I",
      description:
        "Este é um projeto desenvolvido como trabalho extra para a disciplina de Engenharia de Software I. O objetivo do projeto é simular um site de uma pizzaria fictícia chamada Freddy Fazbear's Pizza, proporcionando uma interface amigável e funcional.",
    },
    {
      languages: ["HTML", "CSS", "JavaScript"],
      title: "Malucão Sports",
      link: "https://github.com/alexandre-niess/Malucao-Sports",
      description:
        "Este repositório contém o código-fonte do MVP (Produto Mínimo Viável) para a loja online Malucão Sports. O projeto foi desenvolvido para ajudar um amigo que cursa Administração na PUC Minas. Devido ao prazo apertado, optamos por usar um template pronto e adaptá-lo para nossas necessidades específicas.",
    },
    {
      languages: ["Markdown"],
      title: "Meu Perfil GitHub",
      link: "https://github.com/alexandre-niess/alexandre-niess",
      description:
        "Criação do README para dar uma cara mais amigável ao perfil.",
    },
    {
      languages: ["C", "Java"],
      title: "Algoritmos e Estruturas de Dados II",
      link: "https://github.com/alexandre-niess/AEDs_2",
      description:
        "Repositório com os códigos feitos na disciplina de Algoritmos e Estruturas de Dados II.",
    },
    {
      languages: ["HTML", "CSS", "JavaScript"],
      title: "Trabalho Final DIW",
      link: "https://github.com/alexandre-niess/Trabalho-2-DIW",
      description:
        "Último trabalho feito para a disciplina de Desenvolvimento de Interfaces Web no meu primeiro período na PUC Minas. Foi feito um site de filmes que buscava informações em uma API e mostrava os filmes em cartaz.",
    },
  ];

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container
        id="sobre-mim"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Typography component="h2" variant="h4" sx={{ marginBottom: "10px" }}>
            Portfólio
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Esse é o meu portfólio, onde eu concentro os meus principais
            projetos.
          </Typography>
        </Box>
        <ToggleButtonGroup
          sx={{ marginTop: "20px" }}
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="web">Computação</ToggleButton>
          <ToggleButton value="android">Design</ToggleButton>
        </ToggleButtonGroup>

        {alignment === "web" && (
          <>
            <Button
              variant="outlined"
              href="https://github.com/alexandre-niess"
              color="secondary"
              onClick={() => scrollToSection("contato")}
              sx={{ borderRadius: "100px", marginTop: "40px" }}
            >
              Ver no GitHub
              <img
                src="https://svgshare.com/i/167Y.svg"
                alt="GitHub Icon"
                style={{ marginLeft: "8px", width: "18px", height: "auto" }}
              />
            </Button>
            <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
              <Grid container spacing={1}>
                {cardData.map((data, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <GitHubCard {...data} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {alignment === "android" && (
          <>
            <Button
              href="https://www.behance.net/alexandrefersoa"
              variant="outlined"
              color="secondary"
              onClick={() => scrollToSection("contato")}
              sx={{ borderRadius: "100px", marginTop: "40px" }}
            >
              Ver no Behance
              <img
                src="https://svgshare.com/i/167P.svg"
                alt="Behance Icon"
                style={{ marginLeft: "8px", width: "18px", height: "auto" }}
              />
            </Button>
            <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
              <Grid container spacing={2}>
                {[
                  "198581635",
                  "197649331",
                  "196564537",

                  "174654493",
                  "199609993",
                  "174654903",


                ].map((id) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                    <div
                      style={{
                        width: "100%",
                        height: 0,
                        paddingBottom: `${(158 / 202) * 100}%`, // Calculando a proporção
                        position: "relative"
                      }}
                    >
                      {loading && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          <CircularProgress />
                        </div>
                      )}
                      <iframe
                        src={`https://www.behance.net/embed/project/${id}?ilo0=1`}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          left: 0,
                          display: loading ? "none" : "block"
                        }}
                        onLoad={handleLoad}
                        allowFullScreen
                        loading="eager"
                        frameBorder="0"
                        allow="clipboard-write"
                        referrerPolicy="strict-origin-when-cross-origin"
                      ></iframe>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
