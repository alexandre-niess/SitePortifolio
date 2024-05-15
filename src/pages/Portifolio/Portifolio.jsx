import * as React from "react";
import { useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Navbar from "./Navbar";
import GitHubCard from "./GitHubCard";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "./Footer";

export function Portifolio() {
  useEffect(() => {
    document.title = "Portifólio";
  }, []);

  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  // Dados simulados para cada card, incluindo as linguagens
  const cardData = [
    {
      languages: ["ReactJS", "CSS"],
      title: "Site Portifólio",
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
        "Repositórios com os códigos feitos na disciplina de Algoritmos e Estruturas de Dados II.",
    },
    {
      languages: ["HTML", "JavaScript", "CSS"],
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
          marginTop: "40px",
        }}
      >
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
          <Box sx={{ flexGrow: 1, padding: 2, marginTop: "20px" }}>
            <Grid container spacing={1}>
              {cardData.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <GitHubCard {...data} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {alignment === "android" && (
          <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
            <Grid container spacing={2}>
              {[
                "197649331",
                "196564537",
                "174655175",
                "174654903",
                "174654493",
                "174654093",
                "174653973",
                "174653875",
              ].map((id) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                  <iframe
                    src={`https://www.behance.net/embed/project/${id}?ilo0=1`}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "316px",
                    }}
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
                    allow="clipboard-write"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <Footer />
      </Container>
    </>
  );
}
