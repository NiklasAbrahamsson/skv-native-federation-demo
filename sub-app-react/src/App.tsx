import { Outlet } from 'react-router';
import type { UserData } from './types';

export interface AppProps {
  userData: UserData | null;
}

/**
 * Root component for the React micro frontend.
 *
 * Acts as a thin layout shell — renders the active child route
 * via React Router's <Outlet />. Each page component handles its
 * own container styling (max-width, centering, padding) to match
 * the same layout pattern used by the Angular sub-apps.
 *
 * The userData prop is updated reactively by the Custom Element wrapper
 * whenever the Angular shell's AuthService signal changes.
 */
export function App({ userData }: AppProps) {
  return <Outlet context={userData} />;
}
