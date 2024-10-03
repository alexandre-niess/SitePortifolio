import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import CardPrincipalProjeto from "./CardPrincipalProjeto";

const PrincipaisProjetos = () => {
  const [open, setOpen] = useState(false);

  // Funções para abrir e fechar o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          Principais Projetos
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "1000px" }}
            onClick={handleOpen} // Abre o modal ao clicar no botão
          >
            Editar Projetos
          </Button>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose} // Fecha o modal ao clicar fora ou em uma ação específica
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Editar Projeto Principal
          </Typography>
          <TextField
            id="project-name"
            label="Nome do Projeto"
            variant="outlined"
            fullWidth
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{ marginLeft: 1 }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
      <CardPrincipalProjeto />
    </>
  );
};

export default PrincipaisProjetos;
