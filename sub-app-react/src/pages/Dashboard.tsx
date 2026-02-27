import { Link, useOutletContext } from 'react-router';
import type { UserData } from '../types';

export function Dashboard() {
  const userData = useOutletContext<UserData | null>();
  const isAuthenticated = userData !== null;

  return (
    <div className="dashboard" style={styles.dashboard}>
      <h1 style={styles.h1}>Sub-App React Dashboard</h1>
      <p style={styles.badge}>React micro frontend</p>

      <section style={styles.authStatus}>
        <h2 style={styles.h2}>Shared Auth State</h2>
        {isAuthenticated ? (
          <div style={styles.authCard}>
            <p style={{ ...styles.status, color: '#2e7d32' }}>Authenticated</p>
            <dl style={styles.dl}>
              <dt style={styles.dt}>Name</dt>
              <dd style={styles.dd}>{userData.displayName}</dd>
              <dt style={styles.dt}>Email</dt>
              <dd style={styles.dd}>{userData.email}</dd>
              <dt style={styles.dt}>Role</dt>
              <dd style={styles.dd}>{userData.role}</dd>
              <dt style={styles.dt}>ID</dt>
              <dd style={styles.dd}>{userData.id}</dd>
            </dl>
            <p style={styles.explanation}>
              This data comes from the <code style={styles.code}>AuthService</code>{' '}
              in <code style={styles.code}>@skv/shared</code>. The shell passes
              it to this React micro frontend via Custom Element attributes —
              bridging Angular signals to React state through the DOM.
            </p>
          </div>
        ) : (
          <div style={styles.authCard}>
            <p style={{ ...styles.status, color: '#c62828' }}>
              Not authenticated
            </p>
            <p style={styles.explanation}>
              Go back to the shell header and click <strong>Log in</strong>.
              Then return here — you'll see the user data appear without any
              reload, because the Angular <code style={styles.code}>WrapperComponent</code>{' '}
              passes the auth state from the shared{' '}
              <code style={styles.code}>AuthService</code> into this React app
              via element attributes.
            </p>
          </div>
        )}
      </section>

      <section style={styles.navDemo}>
        <h2 style={styles.h2}>React Internal Routing</h2>
        <p style={styles.navText}>
          This remote uses React Router for its own child routes, all rendered
          inside the Angular shell's{' '}
          <code style={styles.code}>&lt;router-outlet&gt;</code>:
        </p>
        <div style={styles.detailLinks}>
          <Link to="/details/1" style={styles.detailLink}>
            View Item 1
          </Link>
          <Link to="/details/2" style={styles.detailLink}>
            View Item 2
          </Link>
          <Link to="/details/3" style={styles.detailLink}>
            View Item 3
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  dashboard: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  h1: {
    fontSize: '1.8rem',
    marginBottom: '0.25rem',
    color: '#1a1a2e',
  },
  h2: {
    fontSize: '1.2rem',
    marginBottom: '0.75rem',
    color: '#333',
  },
  badge: {
    display: 'inline-block',
    background: '#e3f2fd',
    color: '#1565c0',
    fontSize: '0.8rem',
    fontWeight: 500,
    padding: '0.2rem 0.6rem',
    borderRadius: 12,
    marginBottom: '2rem',
  },
  authStatus: {
    marginBottom: '2rem',
  },
  authCard: {
    background: '#fff',
    borderRadius: 8,
    padding: '1.5rem',
    border: '1px solid #e0e0e0',
  },
  status: {
    fontWeight: 600,
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  dl: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '0.4rem 1rem',
    marginBottom: '1rem',
  },
  dt: {
    fontWeight: 500,
    color: '#666',
    fontSize: '0.9rem',
  },
  dd: {
    margin: 0,
    fontSize: '0.9rem',
  },
  explanation: {
    fontSize: '0.85rem',
    color: '#666',
    lineHeight: 1.5,
    margin: 0,
  },
  code: {
    background: '#f0f0f0',
    padding: '0.1em 0.35em',
    borderRadius: 3,
    fontSize: '0.9em',
  },
  navDemo: {
    marginBottom: '2rem',
  },
  navText: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1rem',
  },
  detailLinks: {
    display: 'flex',
    gap: '0.75rem',
  },
  detailLink: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#1565c0',
    color: '#fff',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'background 0.15s',
  },
};
