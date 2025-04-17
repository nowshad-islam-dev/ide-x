import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://ide-x.onrender.com/', // Backend server URL
        changeOrigin: true,
        secure: true, // Set to true if using HTTPS
      },
    },
  },
});
