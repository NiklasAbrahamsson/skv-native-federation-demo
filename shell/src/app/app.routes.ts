import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    // The sub-app's routes are lazy-loaded at runtime via Native Federation.
    // 'sub-app' must match the key in federation.manifest.json.
    // './routes' must match the key in the sub-app's federation.config.js exposes.
    path: 'sub-app',
    loadChildren: () =>
      loadRemoteModule('sub-app', './routes').then((m) => m.SUB_APP_ROUTES),
  },
];
