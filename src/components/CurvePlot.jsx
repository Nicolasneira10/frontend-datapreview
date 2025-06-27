import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CurvePlot = ({ base64Img, r2, params }) => {
  return (
    <Card style={{ marginTop: 30, padding: 20 }}>
      <Typography variant="h6">Resultado del Modelo</Typography>
      <Typography variant="body1">R² ajustado: {r2.toFixed(4)}</Typography>
      <Typography variant="body1">
        Parámetros: A = {params.A.toFixed(2)}, B = {params.B.toFixed(2)}, C = {params.C.toFixed(2)}
      </Typography>

      <Typography variant="subtitle1" style={{ marginTop: 30 }}>Curva Estimada</Typography>
      <img
        src={`data:image/png;base64,${base64Img}`}
        alt="Curva AdBudg"
        style={{ width: '100%', marginTop: 20 }}
      />
    </Card>
  );
};

export default CurvePlot;
