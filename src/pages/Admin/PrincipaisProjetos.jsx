import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import CardPrincipalProjeto from "./CardPrincipalProjeto";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const PrincipaisProjetos = () => {
  const [open, setOpen] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [selectedProjeto, setSelectedProjeto] = useState(null); // Estado para armazenar o projeto selecionado

  // Função para buscar dados do Firestore
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "projetosDestacados")
        );
        const projetosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjetos(projetosList);
      } catch (error) {
        console.error("Erro ao buscar projetos: ", error);
      }
    };

    fetchProjetos();
  }, []);

  // Função para abrir o modal e definir o projeto selecionado
  const handleOpenModal = (projeto) => {
    setSelectedProjeto({
      ...projeto,
      icones:
        projeto.icones && projeto.icones.length >= 2
          ? projeto.icones
          : [false, false], // Valores padrão caso `icones` não esteja definido corretamente
    });
    setOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProjeto(null);
  };

  // Função para atualizar o estado das checkboxes individualmente
  const handleCheckboxChange = (index, checked) => {
    setSelectedProjeto((prevProjeto) => {
      const updatedIcons = [...prevProjeto.icones]; // Clone do array
      updatedIcons[index] = checked; // Atualiza o valor da checkbox correta
      return { ...prevProjeto, icones: updatedIcons }; // Retorna o novo estado
    });
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
          Principais Projetos
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
        {projetos.map((projeto) => (
          <CardPrincipalProjeto
            key={projeto.id}
            titulo={projeto.titulo}
            descricao={projeto.descricao || projeto.descrição}
            ano={projeto.ano}
            icones={projeto.icones || projeto.icone}
            onClick={() => handleOpenModal(projeto)} // Abre o modal com os dados do projeto
          />
        ))}
      </Box>

      {/* Modal de Edição */}
      <Modal
        open={open}
        onClose={handleCloseModal}
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
            Editar Projeto
          </Typography>
          {selectedProjeto && (
            <>
              <TextField
                label="Título do Projeto"
                value={selectedProjeto.titulo}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) =>
                  setSelectedProjeto({
                    ...selectedProjeto,
                    titulo: e.target.value,
                  })
                } // Permitir a edição do título
              />
              <TextField
                label="Descrição"
                value={selectedProjeto.descricao || selectedProjeto.descrição}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) =>
                  setSelectedProjeto({
                    ...selectedProjeto,
                    descricao: e.target.value,
                  })
                } // Permitir a edição da descrição
              />
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedProjeto.icones?.[0] ?? false}
                      onChange={(e) =>
                        setSelectedProjeto({
                          ...selectedProjeto,
                          icones: [
                            e.target.checked,
                            selectedProjeto.icones?.[1] ?? false,
                          ],
                        })
                      }
                    />
                  }
                  label="Brush Icon"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedProjeto.icones?.[1] ?? false}
                      onChange={(e) =>
                        setSelectedProjeto({
                          ...selectedProjeto,
                          icones: [
                            selectedProjeto.icones?.[0] ?? false,
                            e.target.checked,
                          ],
                        })
                      }
                    />
                  }
                  label="Terminal Icon"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Salvar Alterações
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PrincipaisProjetos;
