import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * Details page — mirrors the Angular sub-app's details page.
 *
 * Reads the :id route parameter via React Router's useParams() hook,
 * similar to how the Angular version uses input.required<string>()
 * with withComponentInputBinding().
 */
export function Details() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="details">
      <Link to="/" className="back-link">Back to dashboard</Link>

      <h1>Details for Item {id}</h1>
      <p className="badge react-badge">React micro frontend — child route</p>

      <div className="detail-card">
        <p>
          This page demonstrates that the React sub-app manages its own child
          routes internally using React Router. The URL
          is <code>/sub-app-react/details/{id}</code> — the shell's Angular
          Router delegates everything under <code>/sub-app-react</code> to this
          remote's Custom Element, and React Router handles the rest.
        </p>
        <p>
          The route parameter <code>:id</code> is read via React
          Router's <code>useParams()</code> hook — the React equivalent of
          Angular's <code>input.required()</code> with route binding.
        </p>
      </div>
    </div>
  );
}
