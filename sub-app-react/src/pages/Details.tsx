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
    <div style={{ maxWidth: 800 }}>
      <Link to="/" style={styles.backLink}>
        Back to dashboard
      </Link>

      <h1>Details for Item {id}</h1>
      <span style={styles.badge}>React micro frontend — child route</span>

      <div style={styles.detailCard}>
        <p>
          This page demonstrates that the React sub-app manages its own child
          routes internally using React Router. The URL is{' '}
          <code>/sub-app-react/details/{id}</code> — the shell's Angular Router
          delegates everything under <code>/sub-app-react</code> to this
          remote's Custom Element, and React Router handles the rest.
        </p>
        <p>
          The route parameter <code>:id</code> is read via React Router's{' '}
          <code>useParams()</code> hook — the React equivalent of Angular's{' '}
          <code>input.required()</code> with route binding, or Vue Router's{' '}
          <code>useRoute()</code> composable.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backLink: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: '#61dafb',
    textDecoration: 'none',
    fontWeight: 500,
  },
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
  detailCard: {
    background: '#f5f5f5',
    borderRadius: 8,
    padding: '1.25rem',
    border: '1px solid #e0e0e0',
  },
};
