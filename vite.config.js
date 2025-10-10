import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // ✅ tambahkan import ini

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),               // untuk import umum dari src
      '@layouts': path.resolve(__dirname, './src/layouts'), // untuk import layout
      '@components': path.resolve(__dirname, './src/components'), // untuk komponen
    },
  },
})
