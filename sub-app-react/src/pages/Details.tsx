import { useParams, Link } from 'react-router';

/**
 * Details page — mirrors the Angular and Vue sub-apps' details pages.
 *
 * Reads the :id route parameter via React Router's useParams() hook,
 * similar to how the Angular version uses input.required<string>()
 * with withComponentInputBinding() and the Vue version uses useRoute().
 */
export function Details() {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={styles.details}>
      <Link to="/" style={styles.backLink}>
        ← Back to dashboard
      </Link>

      <h1 style={styles.h1}>Details for Item {id}</h1>
      <p style={styles.badge}>React micro frontend — child route</p>

      <div style={styles.detailCard}>
        <p style={styles.cardText}>
          This page demonstrates that the React sub-app manages its own child
          routes internally using React Router. The URL is{' '}
          <code style={styles.code}>/sub-app-react/details/{id}</code> — the
          shell's Angular Router delegates everything under{' '}
          <code style={styles.code}>/sub-app-react</code> to this remote's
          Custom Element, and React Router handles the rest.
        </p>
        <p style={{ ...styles.cardText, marginBottom: 0 }}>
          The route parameter <code style={styles.code}>:id</code> is read via
          React Router's <code style={styles.code}>useParams()</code> hook — the
          React equivalent of Angular's{' '}
          <code style={styles.code}>input.required()</code> with route binding,
          or Vue Router's <code style={styles.code}>useRoute()</code> composable.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  details: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  h1: {
    fontSize: '1.8rem',
    marginBottom: '0.25rem',
    color: '#1a1a2e',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: '#1a1a2e',
    fontSize: '0.9rem',
    textDecoration: 'none',
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
  detailCard: {
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: '1.5rem',
  },
  cardText: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: '#444',
    marginBottom: '1rem',
  },
  code: {
    background: '#f0f0f0',
    padding: '0.1em 0.35em',
    borderRadius: 3,
    fontSize: '0.9em',
  },
};
