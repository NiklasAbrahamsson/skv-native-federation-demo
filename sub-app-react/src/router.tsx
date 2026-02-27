import { createBrowserRouter, type RouteObject } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { Details } from './pages/Details';
import type { UserData } from './types';
import { App } from './App';

/**
 * Creates a React Router instance for the micro frontend.
 *
 * The basePath is set by the Angular shell (e.g. '/sub-app-react')
 * so that React Router handles only the routes under that prefix.
 *
 * The userData is passed through to the App layout component, which
 * in turn passes it to child routes that need it (Dashboard).
 */
export function createAppRouter(basePath: string, userData: UserData | null) {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <App userData={userData} />,
      children: [
        {
          index: true,
          element: <Dashboard userData={userData} />,
        },
        {
          path: 'details/:id',
          element: <Details />,
        },
      ],
    },
  ];

  return createBrowserRouter(routes, {
    basename: basePath,
  });
}
