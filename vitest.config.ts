import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['dotenv/config'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['html', 'text'],
      include: ['src/**/*'],
      exclude: ['src/types/**/*']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
