/**
 * Entry point for the React micro frontend.
 *
 * This follows the same pattern as the Angular remotes:
 * 1. Initialize Native Federation (register shared deps, expose metadata)
 * 2. Dynamically import the bootstrap module
 *
 * The dynamic import is required because Native Federation needs to set up
 * the import map before any application code (React, React Router, etc.)
 * is loaded — otherwise the shared dependency resolution would fail.
 */
import { initFederation } from '@softarc/native-federation';

(async () => {
  await initFederation();
  await import('./bootstrap');
})();
