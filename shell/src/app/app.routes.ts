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
    // Standalone sub-app: exposes a Routes array, loaded directly.
    path: 'sub-app',
    loadChildren: () =>
      loadRemoteModule('sub-app', './routes').then((m) => m.SUB_APP_ROUTES),
  },
  {
    // NgModule sub-app: exposes an NgModule with RouterModule.forChild().
    path: 'sub-app-module',
    loadChildren: () =>
      loadRemoteModule('sub-app-module', './Module').then((m) => m.RemoteModule),
  },
];
