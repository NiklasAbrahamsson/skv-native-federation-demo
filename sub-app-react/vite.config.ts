import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    federation({
      name: 'sub-app-react',
      filename: 'remoteEntry.js',
      exposes: {
        './web-component': './src/bootstrap.tsx',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    react(),
  ],
  server: {
    port: 4203,
    origin: 'http://localhost:4203',
    cors: true,
  },
  preview: {
    port: 4203,
  },
  build: {
    target: 'chrome89',
  },
});
