import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Details } from './pages/details/details';

/**
 * These routes are exposed via Native Federation and loaded by the shell
 * using `loadChildren`. They are relative to whatever path the shell
 * mounts them under (e.g., /sub-app).
 *
 * This is the file referenced in federation.config.js -> exposes -> './routes'.
 */
export const SUB_APP_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'details/:id',
    component: Details,
  },
];
