import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

function FileUpload({ onDataParsed, onFileSelected }) {
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [fileData, setFileData] = useState(null); // archivo binario
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar que no exceda 1MB
    if (file.size > 1048576) {
      setShowSnackbar(true);
      return;
    }

    if (onFileSelected) onFileSelected(file);

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      if (file.name.endsWith('.csv')) {
        // CSV no tiene hojas
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        onDataParsed(jsonData);
        setSheetNames([]);
        setSelectedSheet('');
      } else {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheets = workbook.SheetNames;
        setSheetNames(sheets);
        setSelectedSheet(sheets[0]);
        setFileData(data);

        const sheet = workbook.Sheets[sheets[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        onDataParsed(jsonData);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleSheetChange = (e) => {
    const newSheet = e.target.value;
    setSelectedSheet(newSheet);

    const workbook = XLSX.read(fileData, { type: 'binary' });
    const sheet = workbook.Sheets[newSheet];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    onDataParsed(jsonData);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontWeight: '500', fontSize: '1.1rem', marginBottom: '1rem' }}>
        📁 Selecciona un archivo Excel o CSV
      </p>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      />

      {sheetNames.length > 1 && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="h6" gutterBottom>
            Selecciona una hoja:
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Hoja</InputLabel>
            <Select value={selectedSheet} label="Hoja" onChange={handleSheetChange}>
              {sheetNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={7000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          El archivo supera el límite de 1MB. Por favor, selecciona a uno menor.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FileUpload;

//tener en cuenta los cambios