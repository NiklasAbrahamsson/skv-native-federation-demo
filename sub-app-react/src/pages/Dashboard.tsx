import { Link } from 'react-router';
import type { UserData } from '../types';

interface DashboardProps {
  userData: UserData | null;
}

export function Dashboard({ userData }: DashboardProps) {
  const isAuthenticated = userData !== null;

  return (
    <div style={{ maxWidth: 800 }}>
      <h1>Sub-App React Dashboard</h1>
      <span style={styles.badge}>React micro frontend</span>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Shared Auth State</h2>
        {isAuthenticated ? (
          <div style={{ ...styles.authCard, ...styles.authenticated }}>
            <p style={styles.status}>Authenticated</p>
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
              This data comes from the Angular shell's <code>AuthService</code>{' '}
              in <code>@skv/shared</code>. The shell passes it to this React
              micro frontend via Custom Element attributes — bridging Angular
              signals to React state through the DOM.
            </p>
          </div>
        ) : (
          <div style={{ ...styles.authCard, ...styles.unauthenticated }}>
            <p style={styles.status}>Not authenticated</p>
            <p style={styles.explanation}>
              Go back to the shell header and click <strong>Log in</strong>.
              Then return here — you'll see the user data appear without any
              reload, because the Angular <code>WrapperComponent</code> passes
              the auth state from the shared <code>AuthService</code> into this
              React app via element attributes.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2>React Internal Routing</h2>
        <p>
          This remote uses React Router for its own child routes, all rendered
          inside the Angular shell's <code>&lt;router-outlet&gt;</code>:
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
  badge: {
    display: 'inline-block',
    background: '#61dafb',
    color: '#222',
    padding: '0.25rem 0.75rem',
    borderRadius: 4,
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  authCard: {
    borderRadius: 8,
    padding: '1.25rem',
    marginTop: '0.75rem',
  },
  authenticated: {
    background: '#e3f2fd',
    border: '1px solid #90caf9',
  },
  unauthenticated: {
    background: '#fff3e0',
    border: '1px solid #ffcc80',
  },
  status: {
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  dl: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '0.25rem 1rem',
    margin: '0.75rem 0',
  },
  dt: {
    fontWeight: 600,
    color: '#555',
  },
  dd: {
    margin: 0,
  },
  explanation: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.75rem',
  },
  detailLinks: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.75rem',
  },
  detailLink: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#61dafb',
    color: '#222',
    textDecoration: 'none',
    borderRadius: 4,
    fontWeight: 500,
  },
};
