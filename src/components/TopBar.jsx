import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';

import logoAnnalect from "../styles/annalect.png"; // Ruta correcta logo

const TopBar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={logoAnnalect} alt="Annalect" style={{ height: 40 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Data Preview
            </Typography>
          </Box>

          <Box>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: darkMode ? '#facc15' : '#0f172a' }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton onClick={handleLogout} sx={{ color: '#ef4444', ml: 1 }}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
