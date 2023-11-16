import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['dotenv/config'],
		coverage: {
			provider: 'v8',
			all: true,
			exclude: ['.next/*', '*.{mjs,cjs}', '*.d.*', '*.config.*', 'src/app/home/flights-testing/**/*'],
			enabled: true,
			reporter: ['text', 'html'],
			include: ['src/**/*'],
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
