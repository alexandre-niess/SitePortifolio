import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Importar métodos de upload e download do Firebase Storage
import { storage } from "../../../firebaseConfig"; // Importar o storage do Firebase

const Curriculo = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  // Função para carregar o URL de download do Firebase Storage ao montar o componente
  useEffect(() => {
    const fetchDownloadURL = async () => {
      const storageRef = ref(storage, "cv_alexandre_niess.pdf");
      try {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url); // Define a URL do currículo atual
      } catch (error) {
        console.error("Erro ao buscar o URL do currículo:", error);
      }
    };

    fetchDownloadURL(); // Carrega a URL de download ao montar o componente
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      console.error("Nenhum arquivo selecionado");
      return;
    }

    const storageRef = ref(storage, "cv_alexandre_niess.pdf"); // Definindo o local fixo
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // Acompanhar o progresso do upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Progresso do upload: ${progress}%`);
      },
      (error) => {
        // Tratar erros no upload
        console.error("Erro ao fazer upload:", error);
      },
      () => {
        // Upload concluído com sucesso
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("Currículo disponível em:", url);
          setDownloadURL(url); // Atualiza a URL para a nova versão
          handleClose();
        });
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          border: "1px solid #dddddd",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2%",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" color="primary.main">
          Currículo
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: "1000px" }}
            onClick={handleOpen}
          >
            Trocar currículo
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "1000px" }}
            onClick={() => window.open(downloadURL, "_blank")} // Abre o currículo no navegador
            disabled={!downloadURL} // Desabilita o botão até o downloadURL estar disponível
          >
            Baixar currículo
          </Button>
        </Box>
      </Box>

      {/* Modal para selecionar novo PDF */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Selecionar novo currículo</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            inputProps={{ accept: "application/pdf" }}
            onChange={handleFileChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {uploadProgress > 0 && uploadProgress < 100
              ? `Enviando... ${Math.round(uploadProgress)}%`
              : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Curriculo;
