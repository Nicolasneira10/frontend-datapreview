import React, { useState } from 'react';
import axios from 'axios';
import TopBar from './components/TopBar';
import FileUpload from './components/FileUpload';
import ColumnSelector from './components/ColumnSelector';
import FunnelSelector from './components/FunnelSelector';
import DataTable from './components/DataTable';
import ActionButton from './components/ActionButton';
import FunnelFAB from './components/FunnelFAB';
import CurvePlot from './components/CurvePlot';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const [excelData, setExcelData] = useState([]);
  const [xCol, setXCol] = useState('');
  const [yCol, setYCol] = useState('');
  const [funnelStage, setFunnelStage] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showLimitSnackbar, setShowLimitSnackbar] = useState(false);

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(prefersDark);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const columns = excelData.length > 0 ? Object.keys(excelData[0]) : [];

  // ---------- NUEVO: control de uso diario ----------
  const MAX_ANALISIS_DIARIOS = 25;

  const getTodayKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `analisis_count_${today}`;
  };

  const getAnalysisCount = () => {
    const key = getTodayKey();
    return parseInt(localStorage.getItem(key) || '0', 10);
  };

  const incrementAnalysisCount = () => {
    const key = getTodayKey();
    const current = getAnalysisCount();
    localStorage.setItem(key, current + 1);
  };
  // ---------------------------------------------------

  const handleRunAnalysis = async () => {
    if (!archivo || !xCol || !yCol || !funnelStage) {
      alert("Faltan datos: archivo, columnas o embudo.");
      return;
    }

    const count = getAnalysisCount();
    if (count >= MAX_ANALISIS_DIARIOS) {
      setShowLimitSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('y_col', yCol);
    formData.append('x_cols[]', xCol);
    formData.append('funnel', funnelStage);

    try {
      const res = await axios.post(`${API_BASE_URL}/analyze`, formData);
      setResultado(res.data);
      incrementAnalysisCount();
      setShowSnackbar(true);
    } catch (error) {
      const msg = error.response?.data?.error || "Error al analizar el archivo";
      alert("❌ " + msg);
      console.error("❌ Error en análisis:", error);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#0e0e1c' : '#f8fafc',
        paper: darkMode ? '#1e1e2f' : '#ffffff',
      },
      primary: {
        main: '#4f46e5',
      },
      secondary: {
        main: '#f97316',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#111111',
      },
    },
    typography: {
      fontFamily: 'Segoe UI, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <div className="main-container">
          <main className="main-content">
            <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />

            <Container maxWidth="md">
              <div className="card" style={{ marginBottom: '1rem' }}>
                <FileUpload onDataParsed={setExcelData} onFileSelected={setArchivo} />
              </div>

              <div
                className="card"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ flex: '1 1 200px' }}>
                  <ColumnSelector
                    columns={columns}
                    xCol={xCol}
                    yCol={yCol}
                    onXChange={setXCol}
                    onYChange={setYCol}
                  />
                </div>

                <div style={{ flex: '1 1 200px' }}>
                  <FunnelSelector
                    funnelStage={funnelStage}
                    setFunnelStage={setFunnelStage}
                  />
                </div>

                <div style={{ flex: '1 1 200px', textAlign: 'center' }}>
                  <ActionButton onClick={handleRunAnalysis} />
                </div>
              </div>

              <div className="card" style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1rem' }}>
                <DataTable data={excelData} />
              </div>

              {resultado && resultado.plot && (
                <div className="card" style={{ marginBottom: '1rem' }}>
                  <CurvePlot base64Img={resultado.plot} r2={resultado.r2} params={resultado.params} medios={resultado.curve.medios} />

                  <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <button
                      style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '8px 16px',
                        fontSize: '14px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                      onClick={async () => {
                        try {
                          const res = await fetch(`${API_BASE_URL}/download`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(resultado),
                          });

                          const blob = await res.blob();
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'adbudg_resultado.xlsx';
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          window.URL.revokeObjectURL(url);
                        } catch (err) {
                          alert("❌ Error al descargar Excel");
                          console.error(err);
                        }
                      }}
                    >
                      📥 Descargar Información
                    </button>
                  </div>
                </div>
              )}

              <FunnelFAB darkMode={darkMode} />

              {/* Snackbar ÉXITO */}
              <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={() => setShowSnackbar(false)}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  ✅ Análisis completado con éxito
                </MuiAlert>
              </Snackbar>

              {/* Snackbar LÍMITE ALCANZADO */}
              <Snackbar
                open={showLimitSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowLimitSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={() => setShowLimitSnackbar(false)}
                  severity="warning"
                  sx={{ width: '100%' }}
                >
                  ⚠️ Has alcanzado tu uso diario de 25 solicitudes. Vuelve mañana a esta misma hora.
                </MuiAlert>
              </Snackbar>
            </Container>
          </main>

          <footer className="footer">© Annalect 2025</footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
