/// <reference types="vitest" />
import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  test: {
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
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      all: true,
      provider: 'istanbul',
      reporter: ['html', 'text'],
      reportsDirectory: './coverage',
    },
  },
});
