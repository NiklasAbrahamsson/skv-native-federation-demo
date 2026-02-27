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
 * The userData is threaded through via React Router's Outlet context,
 * so child routes can access it via useOutletContext().
 */
export function createAppRouter(basePath: string, userData: UserData | null) {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <App userData={userData} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
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
