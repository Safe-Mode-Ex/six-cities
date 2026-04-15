/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_URL,
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
  };
});
