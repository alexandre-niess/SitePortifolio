import React from "react";
import { Card, CardActionArea, Typography, Box } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import TerminalIcon from "@mui/icons-material/Terminal";

const CardPrincipalProjeto = ({ titulo, descricao, ano, icones, onClick }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 0.5,
        bgcolor: "#fff",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        border: "1px solid #dddddd",
        borderRadius: "10px",
      }}
      onClick={onClick} // Aqui certifique-se de que o onClick está no componente certo
    >
      <CardActionArea sx={{ height: "100%" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            color: "#000",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {icones[0] && <BrushIcon sx={{ color: "primary.main" }} />}
            {icones[1] && <TerminalIcon sx={{ color: "primary.main" }} />}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">
              {titulo} | {ano}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">{descricao}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CardPrincipalProjeto;
