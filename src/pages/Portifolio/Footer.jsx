import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

function Footer() {
  const [openTooltipPhone, setOpenTooltipPhone] = React.useState(false);
  const [openTooltipEmail, setOpenTooltipEmail] = React.useState(false);

  const handleTooltipClose = () => {
    setOpenTooltipPhone(false);
    setOpenTooltipEmail(false);
  };

  const copyToClipboard = (text, isEmail = false) => {
    navigator.clipboard.writeText(text).then(() => {
      if (isEmail) {
        setOpenTooltipEmail(true);
      } else {
        setOpenTooltipPhone(true);
      }
      setTimeout(handleTooltipClose, 2000); // Fecha o tooltip automaticamente após 2 segundos
    });
  };

  return (
    <Container
      id="contato"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              style={{ width: "35px", height: "auto" }}
              src={"/logo_purple.svg"}
            />
            <Typography variant="h6" color="text.default">
              Alexandre Niess
            </Typography>
          </Box>
          <Typography
            variant="body2"
            fontWeight={600}
            gutterBottom
            sx={{ marginTop: "30px" }}
          >
            Contato
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Acredita que eu consigo ajudar você ou a sua empresa? Entre em
            contato comigo!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "left",
              alignItems: "left",
              marginTop: { xs: "30px", sm: 0 },
            }}
          >
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                title="Copiado!"
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openTooltipPhone}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "100px", color: "#fff" }}
                  onClick={() => copyToClipboard("(37)99103-5238")}
                >
                  (37)99103-5238
                </Button>
              </Tooltip>
            </ClickAwayListener>
            <Link
              href="https://www.linkedin.com/in/alexandre-niess-6a290721b"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: "100px",
                  color: "#fff",
                  backgroundColor: "#0A66C2",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                LINKEDIN
              </Button>
            </Link>

            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                title="Copiado!"
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openTooltipEmail}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "100px", color: "#fff" }}
                  onClick={() =>
                    copyToClipboard("alexandrefersoa@gmail.com", true)
                  }
                >
                  alexandrefersoa@gmail.com
                </Button>
              </Tooltip>
            </ClickAwayListener>
          </Box>
        </Box>
      </Box>

      {/* Restante do código */}
    </Container>
  );
}

export default Footer;
