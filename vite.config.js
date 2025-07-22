import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',                           // bind mọi interface
    port: 5173,    // lấy từ ENV hoặc fallback
    strictPort: true                           // nếu port đang mở, fail thẳng
  }
})
