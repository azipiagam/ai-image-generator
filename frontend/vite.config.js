import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend_ai/frontend_dist',
    chunkSizeWarningLimit: 1000,
  },
})
