import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  // Discussion here: https://github.com/storybookjs/storybook/issues/25256#issuecomment-1866441206
  assetsInclude: ['/sb-preview/runtime.js'],
  server: {
    proxy: {},
  },
})
