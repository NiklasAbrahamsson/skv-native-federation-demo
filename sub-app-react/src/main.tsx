/**
 * Standalone entry point for the React micro frontend.
 *
 * When running the React app independently (not federated), this file
 * creates a React root and mounts the app directly. When loaded via
 * federation, bootstrap.tsx is used instead.
 */
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createAppRouter } from './router';

const router = createAppRouter('/sub-app-react', null);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
