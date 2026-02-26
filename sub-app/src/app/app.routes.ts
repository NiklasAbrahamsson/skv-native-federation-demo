import { Routes } from '@angular/router';

/**
 * Routes used when running the sub-app standalone (not inside the shell).
 * We lazy-load the same remote routes so the sub-app works independently.
 */
export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./remote.routes').then((m) => m.SUB_APP_ROUTES),
  },
];
