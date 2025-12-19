import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <--- 1. Don't forget this import!

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 2. These two lines force all components to use your main project's React
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
})