import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, Typography } from '@mui/material';

function ColumnSelector({ columns = [], xCol, yCol, onXChange, onYChange }) {
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Selecciona columnas
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel> X (variable independiente)</InputLabel>
        <Select
          value={xCol}
          label="Columna X"
          onChange={(e) => onXChange(e.target.value)}
        >
          {columns.map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel> Y (variable dependiente)</InputLabel>
        <Select
          value={yCol}
          label="Columna Y"
          onChange={(e) => onYChange(e.target.value)}
        >
          {columns.map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ColumnSelector;
