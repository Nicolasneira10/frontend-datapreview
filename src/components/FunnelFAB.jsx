import React, { useState } from 'react';
import {
  Fab,
  Drawer,
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const segmentData = [
  {
    title: 'Upper Funnel (Recordación)',
    description:
      'Este nivel se enfoca en generar conocimiento de marca y recordación. Las variables que se deben considerar en esta etapa están relacionadas con la construcción de marca y la visibilidad, por lo que se incluyen:',
    items: [
      'Awareness (conocimiento de marca)',
      'Top of Mind (primera marca recordada)',
      'Recordación publicitaria',
      'Alcance (reach)',
      'Impresiones',
    ],
    color: '#60a5fa',
    icon: <VisibilityIcon sx={{ mr: 1 }} />,
  },
  {
    title: 'Middle Funnel (Consideración)',
    description:
      'En esta etapa, el objetivo es mover a los consumidores desde el conocimiento hacia la intención o consideración de compra. Las variables que suelen reflejar este paso incluyen:',
    items: [
      'Consideración de marca',
      'Próxima marca a comprar',
      'Visitas al sitio web',
      'Visitas a tienda (física o virtual)',
      'Interacciones con publicaciones o anuncios',
      'Leads capturados',
      'Clics en anuncios',
    ],
    color: '#facc15',
    icon: <SearchIcon sx={{ mr: 1 }} />,
  },
  {
    title: 'Lower Funnel (Conversión)',
    description:
      'El enfoque aquí es la acción final, es decir, la compra o conversión. Las variables en este nivel deben estar directamente relacionadas con el resultado de negocio. Se incluyen:',
    items: [
      'Ventas en unidades',
      'Ventas en valor (sales)',
      'Tráfico efectivo (tráfico que convierte)',
      'Conversiones (en canales digitales o físicos)',
      'ROAS o retorno directo',
    ],
    color: '#f87171',
    icon: <CheckCircleIcon sx={{ mr: 1 }} />,
  },
];

const FunnelFAB = ({ darkMode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#7b2cbf',
          '&:hover': { backgroundColor: '#5a189a' },
          zIndex: 2000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 360,
            height: '100%',
            overflowY: 'auto',
            padding: 3,
            backgroundColor: darkMode ? '#1e1e2f' : '#fff',
            color: darkMode ? '#f5f5f5' : '#222',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Segmentos del Funnel
            </Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: darkMode ? '#aaa' : '#333' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {segmentData.map((segment, index) => (
            <Accordion
              key={index}
              disableGutters
              sx={{
                backgroundColor: darkMode ? '#2c2f40' : '#f9f9f9',
                color: darkMode ? '#e2e8f0' : '#111',
                mb: 2,
                borderRadius: '8px',
                boxShadow: 'none',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: segment.color }} />}>
                <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: segment.color }}>
                  {segment.icon}
                  {segment.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {segment.description}
                </Typography>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  {segment.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', marginBottom: '6px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default FunnelFAB;
