/**
 * Bootstrap module for the React micro frontend.
 *
 * This file registers a Custom Element (<sub-app-react>) that wraps
 * the entire React application. This follows the same pattern as sub-app-vue:
 *
 * 1. The Angular shell calls loadRemote('sub-app-react/web-component')
 *    via @module-federation/enhanced/runtime
 * 2. That triggers this file, which registers the custom element
 * 3. The Angular WrapperComponent creates a <sub-app-react> DOM element
 * 4. The browser calls connectedCallback(), which mounts React into it
 *
 * Auth state is received from the Angular shell via element attributes,
 * bridging Angular signals -> DOM attributes -> React state.
 */
import { createRoot, type Root } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createAppRouter } from './router';
import type { UserData } from './types';

class SubAppReactElement extends HTMLElement {
  private reactRoot: Root | null = null;
  private mountPoint: HTMLDivElement | null = null;
  private userData: UserData | null = null;
  private basePath = '/sub-app-react';

  /**
   * Observed attributes — when the Angular wrapper sets these,
   * attributeChangedCallback fires and we update the React app.
   */
  static get observedAttributes() {
    return ['user-data', 'base-path'];
  }

  connectedCallback() {
    this.mountReact();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    if (name === 'user-data') {
      this.userData = this.parseUserData(newValue);
    } else if (name === 'base-path') {
      this.basePath = newValue || '/sub-app-react';
    }

    // Re-render React with updated data.
    // React Router is recreated to reflect the new state since
    // createBrowserRouter doesn't support dynamic basename changes.
    // In practice, basePath never changes — only userData does.
    this.renderApp();
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    if (this.mountPoint) {
      this.mountPoint.remove();
      this.mountPoint = null;
    }
  }

  private mountReact() {
    if (this.reactRoot) return;

    // Parse initial attribute values
    this.userData = this.parseUserData(this.getAttribute('user-data'));
    const bp = this.getAttribute('base-path');
    if (bp) this.basePath = bp;

    // Create a mount point inside the custom element
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);

    // Create React root
    this.reactRoot = createRoot(this.mountPoint);

    this.renderApp();
  }

  private renderApp() {
    if (!this.reactRoot) return;

    const router = createAppRouter(this.basePath, this.userData);
    this.reactRoot.render(<RouterProvider router={router} />);
  }

  private parseUserData(raw: string | null): UserData | null {
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
