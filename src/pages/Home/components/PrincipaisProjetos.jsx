import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TerminalIcon from "@mui/icons-material/Terminal";
import BrushIcon from "@mui/icons-material/Brush";
import Tooltip from "@mui/material/Tooltip";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export default function PrincipaisProjetos() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [projects, setProjects] = useState([]); // Estado para armazenar os dados dinâmicos da coleção

  // Função para buscar dados da coleção "projetosDestacados"
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "projetosDestacados")
        );
        const projetosList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.posicao - b.posicao); // Ordenação por 'posicao'

        setProjects(projetosList); // Atualiza o estado com os projetos do Firestore
      } catch (error) {
        console.error("Erro ao buscar projetos: ", error);
      }
    };

    fetchProjetos();
  }, []);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = projects[selectedItemIndex] || {}; // Verifica se há um projeto selecionado

  return (
    <Container id="principais-projetos" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              component="h2"
              variant="h4"
              color="text.primary"
              sx={{ marginBottom: "10px" }}
            >
              Principais Projetos
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Aqui você encontra os principais trabalhos desenvolvidos por mim.
              Cada projeto é único e foi desenvolvido com muito carinho e
              dedicação. Espero que goste!
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {projects.map(({ titulo }, index) => (
              <Chip
                key={index}
                label={titulo}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    return selectedItemIndex === index ? "secondary.light" : "";
                  },
                  backgroundColor:
                    selectedItemIndex === index ? "secondary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedItemIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${selectedFeature.imagem})`, // Exibe a imagem do projeto
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.secondary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedFeature.titulo} | {selectedFeature.ano}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedFeature.descricao}
              </Typography>
              <Link to="portfolio" style={{ textDecoration: "none" }}>
                <Typography
                  color="secondary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "& > svg": { transition: "0.2s" },
                    "&:hover > svg": { transform: "translateX(2px)" },
                    textDecoration: "none",
                  }}
                >
                  Ver portfólio completo
                  <ChevronRightRoundedIcon
                    fontSize="small"
                    sx={{ mt: "1px", ml: "2px" }}
                  />
                </Typography>
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {projects.map(({ titulo, descricao, icones, ano }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) => {
                    return selectedItemIndex === index
                      ? "primary.light"
                      : "grey.200";
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box>
                    {/* Renderizar ícones (se existirem) */}
                    {icones && (
                      <div>
                        {icones[0] && (
                          <Tooltip title="Design">
                            <BrushIcon
                              sx={{
                                color:
                                  selectedItemIndex === index
                                    ? "primary.main"
                                    : "#E0E0E0", // Cor #E0E0E0 quando não ativo
                              }}
                            />
                          </Tooltip>
                        )}
                        {icones[1] && (
                          <Tooltip title="Programação">
                            <TerminalIcon
                              sx={{
                                color:
                                  selectedItemIndex === index
                                    ? "primary.main"
                                    : "#E0E0E0", // Cor #E0E0E0 quando não ativo
                              }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    )}
                  </Box>
                  <Box sx={{ textTransform: "none" }}>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {titulo} | {ano}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {descricao}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                m: "auto",
                width: 350,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: `url(${selectedFeature.imagem})`, // Exibe a imagem no card
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
