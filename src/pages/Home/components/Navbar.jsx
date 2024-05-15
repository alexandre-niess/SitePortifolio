import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpenDrawer(false);
    }
  };


  return (
    <Box
      id="navbar"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Centraliza verticalmente os elementos
        padding: '15px',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <img
          id='logo'
          src='https://svgshare.com/i/15sX.svg'
          style={{ height: '15%', width: '15%', marginRight: '15px' }}
        />
        <Typography variant="h6" color="text.default" >  Alexandre Niess</Typography>
      </  Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <MenuItem onClick={() => scrollToSection('sobre-mim')} sx={{ py: '6px', px: '12px' }}>
            <Typography variant="body2" color="text.default" >
              Sobre Mim
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => scrollToSection('principais-projetos')} sx={{ py: '6px', px: '12px' }}>
            <Typography variant="body2" color="text.default" >
              Projetos
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => scrollToSection('highlights')} sx={{ py: '6px', px: '12px' }}>
            <Typography variant="body2" color="text.default" >
              Habilidades
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => scrollToSection('curriculo')} sx={{ py: '6px', px: '12px' }}>
            <Typography variant="body2" color="text.default" >
              Currículo
            </Typography>
          </MenuItem>
          <MenuItem sx={{ py: '6px', px: '12px' }}>
            <Button variant='contained' color='secondary' onClick={() => scrollToSection('contato')} sx={{ borderRadius: '100px', color: '#fff' }}>Contato</Button>
          </MenuItem>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={toggleDrawer(true)} sx={{ ml: 2 }}>
            <MenuIcon />
          </Button>
        </Box>
      </Box>

      <Drawer anchor="top" open={openDrawer} onClose={toggleDrawer(false)} sx={{
        '& .MuiDrawer-paper': {
          padding: '20px',
          background: '#fff',
          color: '#242424',
          alignItems: 'center',
          justifyContent: 'center',
        },

      }}>
        <MenuItem onClick={() => scrollToSection('features')}>
          <Typography variant="body2" onClick={() => scrollToSection('sobre-mim')} color="text.default" sx={{ color: '#000' }}>
            Sobre Mim
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('testimonials')}>
          <Typography variant="body2" onClick={() => scrollToSection('principais-projetos')} color="text.primary" sx={{ color: '#000' }}>
            Projetos
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('highlights')}>
          <Typography variant="body2" color="text.primary" sx={{ color: '#000' }}>
            Habilidades
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('curriculo')}>
          <Typography variant="body2" color="text.primary" sx={{ color: '#000' }}>
            Currículo
          </Typography>
        </MenuItem>
        <MenuItem sx={{ py: '6px', px: '12px' }}>
          <Button variant='contained' color='secondary' onClick={() => scrollToSection('contato')} sx={{ borderRadius: '100px', color: '#fff' }}>Contato</Button>
        </MenuItem>
      </Drawer>
    </Box>
  );
}

export default Navbar;
