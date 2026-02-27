import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './pages/home/home';
import { WrapperComponent } from './wrapper/wrapper';

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
  {
    // React sub-app: exposes a Web Component, loaded via WrapperComponent.
    // The '**' wildcard ensures all child routes (e.g. /sub-app-react/details/1)
    // are captured by this route and delegated to React Router inside the
    // custom element, rather than being handled by Angular's router.
    path: 'sub-app-react',
    children: [
      {
        path: '**',
        component: WrapperComponent,
        data: {
          config: {
            remoteName: 'sub-app-react',
            exposedModule: './web-component',
            elementName: 'sub-app-react',
          },
        },
      },
    ],
  },
  {
    // Vue sub-app: uses @module-federation/vite (Webpack MF protocol),
    // bridged into this Native Federation shell via @module-federation/enhanced
    // runtime. Like the React sub-app, it exposes a Web Component.
    path: 'sub-app-vue',
    children: [
      {
        path: '**',
        component: WrapperComponent,
        data: {
          config: {
            remoteName: 'sub-app-vue',
            exposedModule: './web-component',
            elementName: 'sub-app-vue',
            // Flag to indicate this remote uses Module Federation (not Native Federation)
            useModuleFederation: true,
          },
        },
      },
    ],
  },
];
