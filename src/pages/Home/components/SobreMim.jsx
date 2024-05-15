import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PDF from "@mui/icons-material/PictureAsPdf";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export default function SobreMim() {
  return (
    <>
      <Container
        id="sobre-mim"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" sx={{ marginBottom: "10px" }}>
            Sobre Mim
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Natural de Itaúna/MG, me mudei para Belo Horizonte em 2022 para
            estudar Ciência da Computação na PUC Minas. Desde então, tenho
            ampliado meus horizontes tanto na computação quanto no design, que
            levava apenas como hobby até pouco tempo atrás.
          </Typography>
          <br />
          <Typography variant="body1" color="text.secondary">
            Com habilidades em computação e design, sempre tive dois portfólios
            separados, os códigos no GitHub e os designs no Behance. Pensando em
            compartilhar minhas experiências em um só lugar, decidi criar este
            site, onde posso expor meus trabalhos para o mundo de maneira
            unificada. Este é o meu espaço digital, onde apresento meu trabalho
            e minha jornada de aprendizado.
          </Typography>
          <Link to="portifolio" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: "100px",
                color: "#fff",
                marginTop: "30px",
                gap: "8px",
              }}
            >
              Ver protifólio
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
