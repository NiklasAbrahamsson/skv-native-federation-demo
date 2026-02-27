import { initFederation as initNativeFederation } from '@angular-architects/native-federation';
import { init as initModuleFederation } from '@module-federation/enhanced/runtime';
import { getShared } from './app/shared/federation-helpers';

(async () => {
  // Step 1: Initialize Native Federation (for Angular and React remotes)
  await initNativeFederation('federation.manifest.json');

  // Step 2: Bridge shared deps from Native Federation to Module Federation.
  // This reads window.__NATIVE_FEDERATION__.externals and converts them into
  // the format MF's runtime expects, so MF remotes can reuse already-loaded
  // packages (Angular core, RxJS, etc.) without downloading them again.
  const shared = getShared();

  // Step 3: Initialize Module Federation runtime (for Vite-based remotes).
  // The Vue sub-app uses @module-federation/vite which produces a standard
  // MF remoteEntry.js — a different protocol from NF's remoteEntry.json.
  await initModuleFederation({
    name: 'shell',
    remotes: [
      {
        name: 'sub-app-vue',
        entry: 'http://localhost:4204/remoteEntry.js',
        type: 'esm',
      },
    ],
    shared,
  });

  // Step 4: Bootstrap the Angular application
  await import('./bootstrap');
})().catch((err) => console.error(err));
