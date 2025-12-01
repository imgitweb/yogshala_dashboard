import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    
  ],
  optimizeDeps: {
    include: ['country-state-city']
  },
  server: {
    port: 5174,   
    host: true,   
  },


})
