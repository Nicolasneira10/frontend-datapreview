import axios from 'axios';

// Usa la URL actual de tu backend (expuesta por localtunnel)
const API_BASE = 'https://hip-carpets-marry.loca.lt'; // <-- tu backend

export const analizarArchivo = async (archivo, yColumn, xColumns, funnel) => {
  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('y_col', yColumn);              // ✅ CORREGIDO
  xColumns.forEach(col => formData.append('x_cols[]', col)); // ✅ CORREGIDO
  formData.append('funnel', funnel);

  try {
    const response = await axios.post(`${API_BASE}/analyze`, formData);
    return response.data;
  } catch (error) {
    console.error('Error al analizar el archivo:', error);
    throw error;
  }
};
