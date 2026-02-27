import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    federation({
      name: 'sub-app-vue',
      filename: 'remoteEntry.js',
      exposes: {
        './web-component': './src/bootstrap.ts',
      },
      shared: {
        vue: {
          singleton: true,
        },
      },
    }),
    vue(),
  ],
  server: {
    port: 4204,
    origin: 'http://localhost:4204',
    cors: true,
  },
  preview: {
    port: 4204,
  },
  build: {
    target: 'chrome89',
  },
});
