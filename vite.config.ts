// vite.config.ts (đặt ở GỐC repo)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(() => ({
  // Thư mục gốc của Vite là client/
  root: resolve(__dirname, 'client'),

  plugins: [react()], // Bỏ plugin Replit trong build production cho gọn/ổn định

  resolve: {
    alias: {
      '@': resolve(__dirname, 'client', 'src'),
      '@shared': resolve(__dirname, 'shared'),
      '@assets': resolve(__dirname, 'attached_assets'),
    },
  },

  build: {
    // Build đúng vào client/dist để Vercel lấy ra publish
    outDir: resolve(__dirname, 'client', 'dist'),
    emptyOutDir: true,
  },

  server: {
    fs: {
      strict: true,
      deny: ['**/.*'],
    },
  },
}))
