import { Outlet } from 'react-router';
import type { UserData } from './types';

interface AppProps {
  userData: UserData | null;
}

/**
 * Root component for the React micro frontend.
 *
 * Displays a framework badge and auth state info at the top,
 * then renders the active child route via React Router's <Outlet />.
 *
 * The userData prop is updated reactively by the Custom Element wrapper
 * whenever the Angular shell's AuthService signal changes.
 */
export function App({ userData }: AppProps) {
  const isAuthenticated = userData !== null;

  return (
    <div style={styles.app}>
      <div style={styles.badge}>React 19 + Vite + Module Federation</div>
      {isAuthenticated ? (
        <div style={styles.authInfo}>
          Logged in as: <strong>{userData.displayName}</strong> ({userData.role})
        </div>
      ) : (
        <div style={{ ...styles.authInfo, ...styles.authInfoGuest }}>
          Not logged in (use the shell to log in)
        </div>
      )}
      <Outlet />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    padding: '1.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  badge: {
    display: 'inline-block',
    background: '#61dafb',
    color: '#222',
    padding: '0.25rem 0.75rem',
    borderRadius: 4,
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  authInfo: {
    background: '#e3f2fd',
    borderLeft: '4px solid #61dafb',
    padding: '0.75rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: '0 4px 4px 0',
    fontSize: '0.9rem',
  },
  authInfoGuest: {
    background: '#fff3e0',
    borderLeftColor: '#ff9800',
  },
};
