const {
  withNativeFederation,
  shareAll,
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'sub-app-react',

  exposes: {
    // Expose the bootstrap file which registers a Custom Element.
    // The Angular shell loads this and creates the <sub-app-react> element.
    './web-component': './src/bootstrap.tsx',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: false,
    }),
  },

  skip: [],
});
