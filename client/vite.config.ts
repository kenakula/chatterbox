import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  plugins: [react(), svgr()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.svg'],
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@tests': path.resolve(__dirname, './src/tests'),
      '@core': path.resolve(__dirname, './src/core'),
    },
  },
  server: {
    cors: {
      credentials: true,
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
