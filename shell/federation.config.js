const {
  withNativeFederation,
  shareAll,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell',

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
    // Skip all @module-federation packages from Native Federation sharing.
    // These are used by the MF runtime bridge and must NOT be processed
    // by Native Federation's shared dependency system.
    /^@module-federation/,
  ],

  features: {
    ignoreUnusedDeps: true,
  },
});
