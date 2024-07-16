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
                src="https://svgshare.com/i/167Y.svg"
                alt="GitHub Icon"
                style={{ marginLeft: "8px", width: "18px", height: "auto" }}
              />
            </Button>
            <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={1}>
                  {cardData.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <GitHubCard {...data} />
                    </Grid>
                  ))}
                </Grid>
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
                src="https://svgshare.com/i/167P.svg"
                alt="Behance Icon"
                style={{ marginLeft: "8px", width: "18px", height: "auto" }}
              />
            </Button>
            <Box sx={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={2}>
                  {behanceProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <div
                        style={{
                          width: "100%",
                          height: 0,
                          paddingBottom: `${(158 / 202) * 100}%`, // Calculando a proporção
                          position: "relative",
                        }}
                      >
                        {loading && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <CircularProgress />
                          </div>
                        )}
                        <iframe
                          src={`https://www.behance.net/embed/project/${project.id}?ilo0=1`}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            display: loading ? "none" : "block",
                          }}
                          onLoad={() => setLoading(false)}
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
              )}
            </Box>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
