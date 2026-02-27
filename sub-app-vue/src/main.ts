/**
 * Standalone entry point for the Vue micro frontend.
 *
 * When running the Vue app independently (not federated), this file
 * creates a Vue app and mounts it directly. When loaded via federation,
 * bootstrap.ts is used instead.
 */
import { createApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router';

const router = createAppRouter('/sub-app-vue');

const app = createApp(App, {
  userData: null,
  basePath: '/sub-app-vue',
});

app.use(router);
app.mount('#app');
