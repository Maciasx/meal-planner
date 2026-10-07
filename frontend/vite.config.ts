import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// W dev Vite proxuje /api na Spring Boota (localhost:8080) -> brak problemów z CORS.
// Na produkcji to samo robi nginx (frontend/nginx.conf).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
