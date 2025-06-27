import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FunnelSelector = ({ funnelStage, setFunnelStage }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Etapa del embudo</InputLabel>
      <Select
        value={funnelStage}
        onChange={(e) => setFunnelStage(e.target.value)}
        label="Etapa del embudo"
      >
        <MenuItem value="Upper">Upper (Awareness)</MenuItem>
        <MenuItem value="Middle">Middle</MenuItem>
        <MenuItem value="Lower">Lower (Proxima compra)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FunnelSelector;
