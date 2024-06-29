import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Слушает на всех интерфейсах
    port: Number(process.env.CLIENT_PORT) || 3000,
    strictPort: true, // Не переключаться на другой порт
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    format: 'cjs',
  },
  define: {
    __SERVER_PORT__: 80,
  },
  plugins: [react()],
})
