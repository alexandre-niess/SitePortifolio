import * as React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Container,
  CssBaseline,
  CircularProgress,
  Divider,
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Navbar from "./Navbar";
import GitHubCard from "./GitHubCard";
import Footer from "./Footer";
import { db } from "../../../firebaseConfig"; // Ajuste o caminho conforme necessário
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function Portifolio() {
  useEffect(() => {
    document.title = "Portfólio";
  }, []);

  const [alignment, setAlignment] = React.useState("web");
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [behanceProjects, setBehanceProjects] = useState([]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectQuery = query(
          collection(db, "projects"),
          orderBy("posicao")
        );
        const behanceQuery = query(
          collection(db, "behanceProjects"),
          orderBy("posicao")
        );

        const [projectSnapshot, behanceSnapshot] = await Promise.all([
          getDocs(projectQuery),
          getDocs(behanceQuery),
        ]);

        const projects = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const behanceProjects = behanceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCardData(projects);
        setBehanceProjects(behanceProjects);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              sx={{ borderRadius: "100px", marginTop: "40px" }}
            >
              Ver no GitHub
              <img
                src="/github_logo_green.svg"
                alt="GitHub Icon"
                style={{ marginLeft: "8px", width: "18px", height: "auto" }}
              />
            </Button>
            <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {Object.entries(
                    cardData.reduce((acc, project) => {
                      const year = project.ano || "Outros"; // Use "Outros" para projetos sem ano
                      if (!acc[year]) acc[year] = [];
                      acc[year].push(project);
                      return acc;
                    }, {})
                  )
                    .sort(([a], [b]) => b - a) // Ordena por ano de forma decrescente
                    .map(([year, projects]) => (
                      <Box key={year} sx={{ marginBottom: "40px" }}>
                        <Typography variant="h6" color="text.primary">
                          {year}
                        </Typography>
                        <Divider
                          sx={{
                            marginBottom: "20px",
                          }}
                        />
                        <Grid container spacing={1}>
                          {projects.map((data, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                              <GitHubCard {...data} />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    ))}
                </>
              )}
            </Box>
          </>
        )}

        {alignment === "android" && (
          <>
            <Button
              href="https://www.behance.net/alexandrefersoa"
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "100px", marginTop: "40px" }}
            >
              Ver no Behance
              <img
                src="/behance_logo.svg"
                alt="Behance Icon"
                style={{ marginLeft: "8px", width: "18px", height: "auto" }}
              />
            </Button>
            <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {Object.entries(
                    behanceProjects.reduce((acc, project) => {
                      const year = project.ano || "Outros"; // Use "Outros" para projetos sem ano
                      if (!acc[year]) acc[year] = [];
                      acc[year].push(project);
                      return acc;
                    }, {})
                  )
                    .sort(([a], [b]) => b - a) // Ordena por ano de forma decrescente
                    .map(([year, projects]) => (
                      <Box key={year} sx={{ marginBottom: "40px" }}>
                        <Typography variant="h6" color="text.primary">
                          {year}
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }} />
                        <Grid container spacing={2}>
                          {projects.map((project, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                              <div
                                style={{
                                  width: "100%",
                                  height: 0,
                                  paddingBottom: `${(158 / 202) * 100}%`, // Calculando a proporção
                                  position: "relative",
                                }}
                              >
                                <iframe
                                  src={`https://www.behance.net/embed/project/${project.behanceId}?ilo0=1`}
                                  style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: 0,
                                    left: 0,
                                  }}
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
                    ))}
                </>
              )}
            </Box>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
