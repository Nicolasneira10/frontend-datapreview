import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const analizarArchivo = async (archivo, yColumn, xColumns, funnel) => {
  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('y_col', yColumn);
  xColumns.forEach(col => formData.append('x_cols[]', col));
  formData.append('funnel', funnel);

  try {
    const response = await axios.post(`${API_BASE}/analyze`, formData);
    return response.data;
  } catch (error) {
    console.error('Error al analizar el archivo:', error);
    throw error;
  }
};
