import React from "react";
import { Card, CardActionArea, Typography, Box, Chip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeGitHub = createTheme({
  typography: {
    fontFamily: "IBM Plex Mono, monospace",
  },
  palette: {
    primary: {
      main: "#443399",
    },
    text: {
      default: "#fff",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

// Definição da função getColorForLanguage
function getColorForLanguage(language) {
  if (language === "C++") return "#0084C5";
  const colors = {
    ReactJS: "#0084C5",
    Java: "#EA3434",
    C: "#0084C5",
    HTML: "#EC6432",
    CSS: "#0084C5",
    JavaScript: "#EAB334",
    Markdown: "#0084C5",
  };

  return colors[language] || "default";
}

function GitHubCard({ title, description, link, languages }) {
  // Função que ajusta o tamanho do título
  const tituloAjustado = (titulo) => {
    return titulo.length > 40 ? titulo.substring(0, 20) + "..." : titulo;
  };

  const descricaoAjustada = (descricao) => {
    return descricao.length > 130
      ? descricao.substring(0, 126) + "..."
      : descricao;
  };

  return (
    <ThemeProvider theme={themeGitHub}>
      <Card sx={{ maxWidth: 345, m: 0.5, bgcolor: "#0F131A" }}>
        <CardActionArea
          onClick={() => window.open(link, "_blank")}
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 300,
              color: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">{tituloAjustado(title)}</Typography>
              <Box
                component="img"
                src="https://svgshare.com/i/15zL.svg"
                sx={{ height: 30, width: 30 }}
                alt="Logo"
                marginLeft="10px"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "#8D95A1" }}>
                README.MD:
              </Typography>
              <Typography variant="body2">
                {descricaoAjustada(description)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">Linguagens Principais:</Typography>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {languages.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    sx={{
                      borderRadius: "100px",
                      backgroundColor: getColorForLanguage(language),
                      color: "#fff",
                      textTransform: "none",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}

export default GitHubCard;
