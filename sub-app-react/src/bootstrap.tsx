/**
 * Bootstrap module for the React micro frontend.
 *
 * This file registers a Custom Element (<sub-app-react>) that wraps the
 * entire React application. This is the recommended pattern for cross-
 * framework micro frontends with Native Federation:
 *
 * 1. The Angular shell calls loadRemoteModule('sub-app-react', './web-component')
 * 2. That triggers this file, which registers the custom element
 * 3. The Angular WrapperComponent creates a <sub-app-react> DOM element
 * 4. The browser calls connectedCallback(), which mounts React into it
 *
 * Auth state is received from the Angular shell via element attributes,
 * bridging Angular signals -> DOM attributes -> React props.
 *
 * NOTE: We import from 'react-dom' (not 'react-dom/client') and use
 * tsconfig "jsx": "react" (not "react-jsx") to avoid subpath imports
 * like 'react/jsx-runtime' and 'react-dom/client'. Native Federation's
 * import map only maps top-level packages, so subpath bare specifiers
 * would fail at runtime.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

/**
 * User data shape matching the @skv/shared User interface.
 */
export interface UserData {
  id: string;
  displayName: string;
  email: string;
  role: string;
}

// react-dom in React 19 exports createRoot from the top-level entry,
// but the TypeScript types still only declare it on 'react-dom/client'.
// We cast through any to access it at runtime.
const createRoot = (ReactDOM as any).createRoot as (
  container: Element | DocumentFragment
) => { render(children: React.ReactNode): void; unmount(): void };

interface ReactRoot {
  render(children: React.ReactNode): void;
  unmount(): void;
}

class SubAppReactElement extends HTMLElement {
  private root: ReactRoot | null = null;

  /**
   * Observed attributes — when the Angular wrapper sets these,
   * attributeChangedCallback fires and we re-render with new props.
   */
  static get observedAttributes() {
    return ['user-data', 'base-path'];
  }

  connectedCallback() {
    this.mountReact();
  }

  attributeChangedCallback() {
    // Re-render when attributes change (e.g., user logs in/out)
    if (this.root) {
      this.mountReact();
    }
  }

  disconnectedCallback() {
    // Clean up React tree when the element is removed from the DOM.
    // This prevents memory leaks when navigating away in the shell.
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  private mountReact() {
    const userData = this.parseUserData();
    const basePath = this.getAttribute('base-path') || '/sub-app-react';

    if (!this.root) {
      this.root = createRoot(this);
    }

    this.root.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(App, { userData, basePath })
      )
    );
  }

  private parseUserData(): UserData | null {
    const raw = this.getAttribute('user-data');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserData;
    } catch {
      return null;
    }
  }
}

// Register the custom element. The Angular shell will create this element
// after loading the remote module.
if (!customElements.get('sub-app-react')) {
  customElements.define('sub-app-react', SubAppReactElement);
}
