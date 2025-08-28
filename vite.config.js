import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // NOUVEAU : Ajoute cette ligne pour les chemins relatifs
  base: '/mon-app-meteo/',
})