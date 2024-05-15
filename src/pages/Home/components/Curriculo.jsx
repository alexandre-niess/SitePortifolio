import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PDF from "@mui/icons-material/PictureAsPdf";
import Container from "@mui/material/Container";

// Open PDF in browser
function openPDF() {
  // Substitua o ID do arquivo anterior pelo novo ID do arquivo fornecido no link
  window.open(
    "https://drive.google.com/uc?export=download&id=18AlTRlT1u-v6_7zLEBdmkH44hLWWr7ai",
    "_blank"
  );
}

export default function Curriculo() {
  return (
    <>
      <Container
        id="curriculo"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" sx={{ marginBottom: "10px" }}>
            Currículo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Todas as informações sobre minha carreira profissional.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={openPDF}
            sx={{
              borderRadius: "100px",
              color: "#fff",
              marginTop: "30px",
              gap: "8px",
            }}
          >
            Abrir Currículo <PDF />
          </Button>
        </Box>
      </Container>
    </>
  );
}
