const {
  withNativeFederation,
  shareAll,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'sub-app',

  exposes: {
    // Expose the sub-app's route config so the shell can lazy-load it
    // via loadChildren. This gives the remote full control over its
    // own internal routing.
    './routes': './src/app/remote.routes.ts',
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
