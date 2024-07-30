/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    setupFiles: ['./src/tests/setupTests.ts'],
    globals: true,
    environment: 'jsdom',
  },
});
