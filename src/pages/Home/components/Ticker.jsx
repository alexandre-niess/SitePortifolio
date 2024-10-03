import * as React from "react";
import "./Ticker.css"; // Importa o arquivo CSS para estilização
import { Box, Typography } from "@mui/material";

// Array com palavras
const palavras = [
  "PROTÓTIPOS",
  "UI DESIGN",
  "FRONT-END",
  "WEB",
  "WIREFRAMES",
  "UX DESIGN",
];

// URL da imagem
const imageUrl = "https://i.im.ge/2024/05/09/ZfUIAT.decoration.png";

export default function Ticker() {
  const [animationDuration, setAnimationDuration] = React.useState(25); // Define a duração padrão da animação

  React.useEffect(() => {
    // Função para ajustar a duração da animação com base no tamanho da tela
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Define uma duração de animação mais curta para telas menores
      if (screenWidth < 768) {
        setAnimationDuration(10);
      } else {
        setAnimationDuration(20);
      }
    };

    // Registra o evento de redimensionamento para ajustar dinamicamente a duração da animação
    window.addEventListener("resize", handleResize);
    // Executa a função de manipulação de redimensionamento quando o componente é montado
    handleResize();

    // Remove o listener de redimensionamento quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      style={{ overflowX: "hidden", width: "100%", backgroundColor: "#88AA55" }}
    >
      <Box
        className="ticker-wrap"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {palavras.map((palavra, index) => (
          <React.Fragment key={index}>
            <Typography className="ticker-item" variant="" fontWeight={"500"}>
              {palavra}
            </Typography>
            {index !== palavras.length - 1 && (
              <Box className="ticker-item">
                <img
                  src="separador.svg"
                  alt="Separator"
                  width={15}
                  height={15}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
