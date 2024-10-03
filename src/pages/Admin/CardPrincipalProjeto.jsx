import React from "react";
import {
  Card,
  CardActionArea,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function CardPrincipalProjeto() {
  return (
    <Card sx={{ maxWidth: 345, m: 0.5, bgcolor: "#0F131A" }}>
      <CardActionArea sx={{ height: "100%" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 300,
            color: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">texto</Typography>
            <Box />
            <IconButton>
              <EditIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "#8D95A1" }}>
              README.MD:
            </Typography>
            <Typography variant="body2">descricao</Typography>
          </Box>
          <Box></Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default CardPrincipalProjeto;
