import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    watch: {
      usePolling: true, // 在某些系統上強制 HMR 偵測變更
    },
  },
  build: {
    outDir: 'dist', // Firebase Hosting 預設讀取 dist 資料夾
  },
})
