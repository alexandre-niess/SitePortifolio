import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CardAdmin from "./CardAdmin";
import { db } from "../../../firebaseConfig"; // Certifique-se de ajustar o caminho
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

export function Admin() {
  const [cardData, setCardData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [behanceProjects, setBehanceProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState([]);
  const [githubLink, setGithubLink] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [posicao, setPosicao] = useState(0);
  const [loading, setLoading] = useState(true);
  const [behanceOpen, setBehanceOpen] = useState(false);
  const [behanceId, setBehanceId] = useState("");
  const [bannerUrl, setBannerUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/portfolio-alexandre-niess.appspot.com/o/image%203.jpg?alt=media&token=0b4900f7-7769-4e12-8f1b-88656ef686f0"
  );

  useEffect(() => {
    document.title = "Painel do Admin";

    const fetchData = async () => {
      try {
        const projectQuery = query(
          collection(db, "projects"),
          orderBy("posicao")
        );
        const querySnapshot = await getDocs(projectQuery);
        const projects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCardData(projects);

        const langSnapshot = await getDocs(collection(db, "languages"));
        const langs = langSnapshot.docs.map((doc) => doc.data().name);
        setLanguagesData(langs);

        const behanceSnapshot = await getDocs(
          collection(db, "behanceProjects")
        );
        const behanceProjects = behanceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBehanceProjects(behanceProjects);

        const maxPosicao =
          projects.length > 0 ? projects[projects.length - 1].posicao : 0;
        const maxBehancePosicao =
          behanceProjects.length > 0
            ? behanceProjects[behanceProjects.length - 1].posicao
            : 0;
        setPosicao(Math.max(maxPosicao, maxBehancePosicao) + 1);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setEditMode(false);
    setProjectName("");
    setDescription("");
    setLanguages([]);
    setGithubLink("");
    setOpen(true);
  };

  const handleBehanceOpen = () => {
    setEditMode(false);
    setBehanceId("");
    setPosicao(posicao);
    setBehanceOpen(true);
  };

  const handleEditOpen = (id) => {
    const project = cardData.find((proj) => proj.id === id);
    setCurrentId(id);
    setProjectName(project.title);
    setDescription(project.description);
    setLanguages(project.languages);
    setGithubLink(project.link);
    setPosicao(project.posicao);
    setEditMode(true);
    setOpen(true);
  };

  const handleEditBehanceOpen = (id) => {
    const project = behanceProjects.find((proj) => proj.id === id);
    setCurrentId(id);
    setBehanceId(project.id);
    setPosicao(project.posicao);
    setEditMode(true);
    setBehanceOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBehanceClose = () => {
    setBehanceOpen(false);
  };

  const handleLanguageOpen = () => {
    setNewLanguage("");
    setLanguageOpen(true);
  };

  const handleLanguageClose = () => {
    setLanguageOpen(false);
  };

  const handleSaveLanguage = async () => {
    try {
      await addDoc(collection(db, "languages"), { name: newLanguage });
      setLanguagesData([...languagesData, newLanguage]);
      setLanguageOpen(false);
      setNewLanguage("");
    } catch (error) {
      console.error("Erro ao adicionar linguagem:", error);
    }
  };

  const handleSave = async () => {
    try {
      const newProject = {
        title: projectName,
        description,
        languages,
        link: githubLink,
        posicao,
        createdAt: serverTimestamp(),
      };
      if (editMode) {
        const projectRef = doc(db, "projects", currentId);
        await updateDoc(projectRef, newProject);
        setCardData(
          cardData.map((proj) =>
            proj.id === currentId ? { id: currentId, ...newProject } : proj
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "projects"), newProject);
        setCardData([...cardData, { id: docRef.id, ...newProject }]);
        setPosicao(posicao + 1);
      }
      setOpen(false);
      setProjectName("");
      setDescription("");
      setLanguages([]);
      setGithubLink("");
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    }
  };

  const handleSaveBehance = async () => {
    try {
      const newBehanceProject = {
        id: behanceId,
        posicao,
        createdAt: serverTimestamp(),
      };
      if (editMode) {
        const behanceRef = doc(db, "behanceProjects", currentId);
        await updateDoc(behanceRef, newBehanceProject);
        setBehanceProjects(
          behanceProjects.map((proj) =>
            proj.id === currentId
              ? { id: currentId, ...newBehanceProject }
              : proj
          )
        );
      } else {
        const docRef = await addDoc(
          collection(db, "behanceProjects"),
          newBehanceProject
        );
        setBehanceProjects([
          ...behanceProjects,
          { id: docRef.id, ...newBehanceProject },
        ]);
        setPosicao(posicao + 1);
      }
      setBehanceOpen(false);
      setBehanceId("");
    } catch (error) {
      console.error("Erro ao salvar projeto do Behance:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const projectRef = doc(db, "projects", currentId);
      await deleteDoc(projectRef);
      setCardData(cardData.filter((proj) => proj.id !== currentId));
      setOpen(false);
      setProjectName("");
      setDescription("");
      setLanguages([]);
      setGithubLink("");
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleDeleteBehance = async () => {
    try {
      const behanceRef = doc(db, "behanceProjects", currentId);
      await deleteDoc(behanceRef);
      setBehanceProjects(
        behanceProjects.filter((proj) => proj.id !== currentId)
      );
      setBehanceOpen(false);
      setBehanceId("");
    } catch (error) {
      console.error("Erro ao deletar projeto do Behance:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "60px",
          backgroundColor: "primary.main",
          alignItems: "center",
          justifyContent: "left",
          padding: "0 16px",
        }}
      >
        <Link to="/">
          <IconButton sx={{ color: "#fff" }}>
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" color="white">
          Painel do Admin
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
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
            Projetos do GitHub
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
              onClick={handleLanguageOpen}
              sx={{ borderRadius: "1000px" }}
            >
              Adicionar Linguagem
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ borderRadius: "1000px" }}
            >
              Adicionar Projeto
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            padding: 2,
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari and Opera
            },
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            cardData.map((data, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "300px",
                  marginRight: 2,
                }}
              >
                <CardAdmin {...data} onEdit={handleEditOpen} />
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            padding: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            border: "1px solid #dddddd",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
            marginTop: "16px", // Adiciona espaço entre as seções
          }}
        >
          <Typography variant="h6" color="primary.main">
            Projetos do Behance
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBehanceOpen}
            sx={{ borderRadius: "1000px" }}
          >
            Adicionar Projeto
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            padding: 2,
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari and Opera
            },
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            behanceProjects.map((project) => (
              <Box
                key={project.id}
                sx={{
                  minWidth: "300px",
                  marginRight: 2,
                }}
              >
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
                  <IconButton
                    onClick={() => handleEditBehanceOpen(project.id)}
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      color: "#fff",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              </Box>
            ))
          )}
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editMode ? "Editar Projeto" : "Adicionar Novo Projeto"}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nome do Projeto"
              fullWidth
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Descrição"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Linguagens"
              fullWidth
              variant="outlined"
              select
              SelectProps={{
                multiple: true,
                value: languages,
                onChange: (e) => setLanguages(e.target.value),
              }}
            >
              {languagesData.map((linguagem) => (
                <MenuItem key={linguagem} value={linguagem}>
                  {linguagem}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Link do GitHub"
              fullWidth
              variant="outlined"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Posição"
              fullWidth
              variant="outlined"
              type="number"
              value={posicao}
              onChange={(e) => setPosicao(parseInt(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            {editMode && (
              <Button onClick={handleDelete} color="secondary">
                Excluir
              </Button>
            )}
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={behanceOpen} onClose={handleBehanceClose}>
          <DialogTitle>
            {editMode
              ? "Editar Projeto do Behance"
              : "Adicionar Novo Projeto do Behance"}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="ID do Projeto (Behance)"
              fullWidth
              variant="outlined"
              value={behanceId}
              onChange={(e) => setBehanceId(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Posição"
              fullWidth
              variant="outlined"
              type="number"
              value={posicao}
              onChange={(e) => setPosicao(parseInt(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            {editMode && (
              <Button onClick={handleDeleteBehance} color="secondary">
                Excluir
              </Button>
            )}
            <Button onClick={handleBehanceClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveBehance} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={languageOpen} onClose={handleLanguageClose}>
          <DialogTitle>Adicionar Nova Linguagem</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nome da Linguagem"
              fullWidth
              variant="outlined"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLanguageClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveLanguage} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
