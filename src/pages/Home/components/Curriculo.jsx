import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PDF from "@mui/icons-material/PictureAsPdf";
import Container from "@mui/material/Container";
import { ref, getDownloadURL } from "firebase/storage"; // Importar Firebase Storage
import { storage } from "../../../../firebaseConfig"; // Importar o storage do Firebase

export default function Curriculo() {
  const [downloadURL, setDownloadURL] = useState("");

  // Função para buscar o URL atualizado do currículo
  useEffect(() => {
    const fetchDownloadURL = async () => {
      const storageRef = ref(storage, "cv_alexandre_niess.pdf"); // Certifique-se que o caminho esteja correto
      try {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url); // Definir o URL no estado
      } catch (error) {
        console.error("Erro ao buscar o URL do currículo:", error);
      }
    };

    fetchDownloadURL(); // Buscar o URL quando o componente montar
  }, []);

  // Função para abrir o PDF no navegador
  function openPDF() {
    if (downloadURL) {
      window.open(downloadURL, "_blank");
    } else {
      alert("Currículo não disponível no momento.");
    }
  }

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
            disabled={!downloadURL} // Desabilita o botão enquanto o link não é carregado
          >
            Abrir Currículo <PDF />
          </Button>
        </Box>
      </Container>
    </>
  );
}
