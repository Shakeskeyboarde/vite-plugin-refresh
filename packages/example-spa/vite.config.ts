import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import refresh from 'vite-plugin-refresh';

export default defineConfig({
  plugins: [(react as any)(), refresh({ log: true })],
});
