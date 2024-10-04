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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // Importar métodos do Firebase Storage
import CardPrincipalProjeto from "./CardPrincipalProjeto";
import { db, storage } from "../../../firebaseConfig"; // Importar o storage do Firebase
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const PrincipaisProjetos = () => {
  const [open, setOpen] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [selectedProjeto, setSelectedProjeto] = useState(null); // Estado para armazenar o projeto selecionado
  const [imageUpload, setImageUpload] = useState(null); // Estado para armazenar o arquivo de imagem
  const [imageUrl, setImageUrl] = useState(null); // URL da imagem carregada ou existente

  // Função para buscar dados do Firestore e ordenar por posicao
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "projetosDestacados")
        );
        let projetosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenar os projetos pela variável 'posicao'
        projetosList = projetosList.sort(
          (a, b) => (a.posicao ?? 0) - (b.posicao ?? 0)
        );

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
          : [true, false], // Valores padrão caso `icones` não esteja definido corretamente
    });
    setImageUrl(projeto.imagem || null); // Carregar a imagem existente (se houver)
    setOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProjeto(null);
    setImageUpload(null); // Resetar o upload de imagem ao fechar o modal
  };

  // Função para atualizar o estado das checkboxes individualmente
  const handleCheckboxChange = (index, checked) => {
    setSelectedProjeto((prevProjeto) => {
      const updatedIcons = [...prevProjeto.icones]; // Clone do array
      updatedIcons[index] = checked; // Atualiza o valor da checkbox correta
      return { ...prevProjeto, icones: updatedIcons }; // Retorna o novo estado
    });
  };

  // Função para lidar com upload de imagem
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]); // Armazena o arquivo no estado
    }
  };

  // Função para salvar as alterações no Firestore
  const handleSave = async () => {
    if (selectedProjeto?.id) {
      try {
        const projetoDocRef = doc(db, "projetosDestacados", selectedProjeto.id);

        // Verificar se uma nova imagem foi carregada
        let imageUrlToSave = imageUrl;
        if (imageUpload) {
          const storageRef = ref(storage, `projetos/${selectedProjeto.id}`); // Define o local de upload no Storage
          const uploadTask = uploadBytesResumable(storageRef, imageUpload);

          // Esperar o upload ser concluído e obter a URL da imagem
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                setImageUrl(downloadURL); // Atualiza a URL da imagem
                imageUrlToSave = downloadURL; // Salva a URL no Firestore
                resolve();
              }
            );
          });
        }

        // Atualiza o Firestore com os dados e a URL da imagem
        await updateDoc(projetoDocRef, {
          titulo: selectedProjeto.titulo
            ? selectedProjeto.titulo.toString()
            : "", // Garantindo que o título seja string
          descricao: selectedProjeto.descricao
            ? selectedProjeto.descricao.toString()
            : "", // Garantindo que a descrição seja string
          ano: selectedProjeto.ano ? selectedProjeto.ano.toString() : "", // Garantindo que o ano seja string
          icones: selectedProjeto.icones || [false, false], // Array booleano para os ícones
          posicao: selectedProjeto.posicao
            ? parseInt(selectedProjeto.posicao)
            : 0, // Garantindo que a posicao seja um inteiro
          imagem: imageUrlToSave, // Salva a URL da imagem
        });

        alert("Alterações salvas com sucesso!");
        handleCloseModal(); // Fechar o modal após salvar
      } catch (error) {
        console.error("Erro ao salvar alterações: ", error);
        alert("Ocorreu um erro ao salvar as alterações.");
      }
    }
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
              <TextField
                label="Ano"
                value={selectedProjeto.ano}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) =>
                  setSelectedProjeto({
                    ...selectedProjeto,
                    ano: e.target.value,
                  })
                } // Permitir a edição do ano
              />
              <TextField
                label="Posição"
                type="number"
                value={selectedProjeto.posicao || 0}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) =>
                  setSelectedProjeto({
                    ...selectedProjeto,
                    posicao: parseInt(e.target.value, 10),
                  })
                } // Permitir a edição da posição
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

              {/* Exibir imagem existente ou campo de upload */}
              {imageUrl ? (
                <Box>
                  <Typography variant="subtitle1">Imagem Atual:</Typography>
                  <img
                    src={imageUrl}
                    alt="Imagem do Projeto"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <Button variant="outlined" component="label">
                    Alterar Imagem
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="subtitle1">Adicionar Imagem:</Typography>
                  <Button variant="outlined" component="label">
                    Escolher Imagem
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSave} // Salvar alterações no Firestore
                sx={{ mt: 2 }}
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
