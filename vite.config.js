import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    host:"172.30.6.12",
    port:"3150",
 
    proxy:{
      "/api":{
        target:"http://172.30.6.12:3150",
        changeOrigin: true
      }
    }
  },
})