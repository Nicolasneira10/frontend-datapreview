import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ✅ permite acceso desde red local
    port: 5173       // ✅ puerto default que ya usas
  }
})
