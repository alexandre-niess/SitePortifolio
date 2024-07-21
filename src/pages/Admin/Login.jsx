import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig"; // Certifique-se de que o caminho está correto
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado com sucesso!");
      navigate("/admin"); // Redireciona para a tela de admin após login bem-sucedido
    } catch (error) {
      setError("Erro ao logar usuário: " + error.message);
      console.error("Erro ao logar usuário:", error);
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
        }}
      >
        <Link to="/">
          <IconButton sx={{ color: "#fff" }}>
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" color="white">
          Login
        </Typography>
      </Box>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
