const {
  withNativeFederation,
  shareAll,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'sub-app-module',

  exposes: {
    // Expose an NgModule with RouterModule.forChild(routes) — the classic
    // NgModule approach to federated lazy loading. Compare with sub-app
    // which exposes a bare Routes array (standalone approach).
    './Module': './src/app/remote-entry/remote.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
    '@skv/shared': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '1.0.0',
    },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    ignoreUnusedDeps: true,
  },
});
