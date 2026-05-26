import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pri-website/',

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['ofiicial-web-pri.onrender.com']
  },

  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['ofiicial-web-pri.onrender.com']
  }
})