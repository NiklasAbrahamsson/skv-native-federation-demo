import React from 'react';
import { Link } from 'react-router-dom';
import type { UserData } from '../bootstrap';

interface DashboardProps {
  userData: UserData | null;
}

/**
 * Dashboard page — mirrors the Angular sub-app's dashboard.
 *
 * Displays the shared auth state received from the Angular shell
 * and provides links to detail pages to demonstrate internal routing.
 */
export function Dashboard({ userData }: DashboardProps) {
  return (
    <div className="dashboard">
      <h1>Sub-App React Dashboard</h1>
      <p className="badge react-badge">React micro frontend</p>

      <section className="auth-status">
        <h2>Shared Auth State</h2>
        {userData ? (
          <div className="auth-card authenticated">
            <p className="status">Authenticated</p>
            <dl>
              <dt>Name</dt>
              <dd>{userData.displayName}</dd>
              <dt>Email</dt>
              <dd>{userData.email}</dd>
              <dt>Role</dt>
              <dd>{userData.role}</dd>
              <dt>ID</dt>
              <dd>{userData.id}</dd>
            </dl>
            <p className="explanation">
              This data comes from the Angular shell's <code>AuthService</code> in{' '}
              <code>@skv/shared</code>. The shell passes it to this React micro
              frontend via Custom Element attributes — bridging Angular signals
              to React props through the DOM.
            </p>
          </div>
        ) : (
          <div className="auth-card unauthenticated">
            <p className="status">Not authenticated</p>
            <p className="explanation">
              Go back to the shell header and click <strong>Log in</strong>.
              Then return here — you'll see the user data appear without any
              reload, because the Angular <code>WrapperComponent</code> passes
              the auth state from the shared <code>AuthService</code> into this
              React app via element attributes.
            </p>
          </div>
        )}
      </section>

      <section className="nav-demo">
        <h2>React Internal Routing</h2>
        <p>
          This remote uses React Router for its own child routes, all rendered
          inside the Angular shell's <code>&lt;router-outlet&gt;</code>:
        </p>
        <div className="detail-links">
          <Link to="/details/1" className="detail-link">View Item 1</Link>
          <Link to="/details/2" className="detail-link">View Item 2</Link>
          <Link to="/details/3" className="detail-link">View Item 3</Link>
        </div>
      </section>
    </div>
  );
}
