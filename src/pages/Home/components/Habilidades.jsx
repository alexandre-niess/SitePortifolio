import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Code from '@mui/icons-material/Code';
import Polyline from '@mui/icons-material/GridView';
import Apartment from '@mui/icons-material/Apartment';
import MenuBook from '@mui/icons-material/MenuBook';
import Translate from '@mui/icons-material/Translate';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

const items = [
  {
    icon: <Code />,
    title: 'Proficiência em diversas linguagens de programação',
    description:
      'C, C++, Java, ReactJS, JavaScript, HTML, CSS, SQL, entre outras.',
  },
  {
    icon: <Polyline />,
    title: 'Expertise em design avançado',
    description:
      'Experiência sólida em design avançado, indo desde tipografia até criação e manutenção de design systems.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Domínio avançado do Figma',
    description:
      'Competência avançada na utilização do software de design Figma.',
  },
  {
    icon: <Apartment />,
    title: 'Experiência em diversas empresas',
    description:
      'Histórico consistente de trabalho em diversas empresas. Algumas empresas de destaque foram: Nubank, Valle Consultores, PUC Minas',
  },
  {
    icon: <Translate />,
    title: 'Conhecimento de três idiomas',
    description:
      'Português, Inglês e Espanhol',
  },
  {
    icon: <MenuBook />,
    title: 'Projetos completos em meu portfólio',
    description:
      'Criei uma variedade de projetos que exemplificam habilidades e competências nas áreas de computação e design',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#0B0334',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" sx={{ marginBottom: '10px' }}>
            Principais Habilidades
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Conheça as habilidades que me destacam no mercado de trabalho
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: '#938CB5',
                  background: 'transparent',
                  backgroundColor: '#7C6CCC',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
