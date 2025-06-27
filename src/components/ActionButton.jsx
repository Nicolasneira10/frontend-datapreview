import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Box,
  LinearProgress,
  Typography,
  Zoom,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

function ActionButton({ onClick }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error("Error durante el análisis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Barra superior de progreso */}
      <Zoom in={loading}>
        <Box sx={{ width: '80%' }}>
          <Typography
            variant="body2"
            sx={{ color: '#7e57c2', textAlign: 'center', mb: 0.5 }}
          >
            Analizando archivo, por favor espera...
          </Typography>
          <LinearProgress
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#e1bee7',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#7e57c2',
              },
            }}
          />
        </Box>
      </Zoom>

      {/* Botón visualmente atractivo */}
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={loading}
        startIcon={!loading && <BarChartIcon />}
        sx={{
          position: 'relative',
          backgroundColor: '#7e57c2',
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          px: 4,
          py: 1.5,
          borderRadius: '30px',
          boxShadow: '0px 6px 12px rgba(126, 87, 194, 0.4)',
          transition: 'all 0.3s ease',
          animation: loading ? 'pulse 1.5s infinite ease-in-out' : 'none',
          '&:hover': {
            backgroundColor: '#5e35b1',
            transform: 'scale(1.05)',
            boxShadow: '0px 8px 16px rgba(94, 53, 177, 0.5)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Ejecutar Análisis'
        )}
      </Button>
    </Box>
  );
}

export default ActionButton;
