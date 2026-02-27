import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import { federationBuilder } from '@softarc/native-federation/build';

const projectRoot = path.join(import.meta.dirname, '..');
const outputPath = path.join(projectRoot, 'dist');
const tsConfig = path.join(projectRoot, 'tsconfig.json');
const federationConfig = path.join(projectRoot, 'federation.config.js');
const isWatch = process.argv.includes('--watch');

/**
 * React 19 file replacements for Native Federation's shared package bundling.
 *
 * React uses CommonJS with a conditional require in index.js:
 *   module.exports = require('./cjs/react.production.js')
 *
 * When rollup/commonjs sees this single object assignment, it only produces
 * a `default` export — but consumers like react-router-dom expect named
 * exports (createContext, useState, etc.).
 *
 * By redirecting the entry point to the raw CJS production file (which uses
 * individual `exports.X = ...` assignments), rollup/commonjs can properly
 * detect and emit named ESM exports.
 *
 * NOTE: React 19 uses `react.production.js` (not `.min.js` like React 18).
 */
const react19Replacements: Record<string, { file: string }> = {
  'node_modules/react/index.js': {
    file: 'node_modules/react/cjs/react.production.js',
  },
  'node_modules/react/jsx-runtime.js': {
    file: 'node_modules/react/cjs/react-jsx-runtime.production.js',
  },
  'node_modules/react-dom/index.js': {
    file: 'node_modules/react-dom/cjs/react-dom.production.js',
  },
};

async function build() {
  // Step 1: Initialize Native Federation
  // This reads federation.config.js, resolves shared deps, and prepares
  // the list of externals that esbuild should NOT bundle.
  await federationBuilder.init({
    options: {
      workspaceRoot: projectRoot,
      outputPath: 'dist',
      tsConfig: 'tsconfig.json',
      federationConfig: 'federation.config.js',
      verbose: false,
    },
    adapter: createEsBuildAdapter({
      plugins: [],
      fileReplacements: react19Replacements,
    }),
  });

  // Step 2: Run esbuild to bundle the application
  // The key is `external: federationBuilder.externals` which ensures shared
  // dependencies are loaded at runtime via Native Federation, not bundled.
  fs.rmSync(outputPath, { force: true, recursive: true });

  // Native Federation gives us externals like ['react', 'react-dom', 'react-router-dom'].
  // esbuild's `external` treats these as prefixes, so 'react' also externalizes
  // 'react/jsx-runtime' and 'react-dom' externalizes 'react-dom/client'. Those
  // subpath imports aren't in the import map and cause runtime errors.
  //
  // Fix: use a plugin that only externalizes exact top-level package matches,
  // letting subpath imports (react/jsx-runtime, react-dom/client) be bundled.
  const externals = new Set(federationBuilder.externals as string[]);

  const exactExternalsPlugin: esbuild.Plugin = {
    name: 'exact-externals',
    setup(build) {
      // Match any bare specifier (not relative/absolute paths)
      build.onResolve({ filter: /^[^./]/ }, (args) => {
        // Only externalize exact matches, not subpath imports
        if (externals.has(args.path)) {
          return { path: args.path, external: true };
        }
        return undefined;
      });
    },
  };

  const buildOptions: esbuild.BuildOptions = {
    entryPoints: [path.join(projectRoot, 'src/main.ts')],
    // Do NOT use the `external` option — the plugin handles it precisely.
    plugins: [exactExternalsPlugin],
    outdir: outputPath,
    bundle: true,
    platform: 'browser',
    format: 'esm',
    mainFields: ['es2020', 'browser', 'module', 'main'],
    conditions: ['es2020', 'es2015', 'module'],
    resolveExtensions: ['.ts', '.tsx', '.mjs', '.js'],
    tsconfig: tsConfig,
    splitting: true,
    sourcemap: true,
    minify: !isWatch,
  };

  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('[sub-app-react] Watching for changes...');
  } else {
    await esbuild.build(buildOptions);
  }

  // Copy static assets to dist
  fs.copyFileSync(
    path.join(projectRoot, 'src/index.html'),
    path.join(outputPath, 'index.html')
  );
  fs.copyFileSync(
    path.join(projectRoot, 'src/styles.css'),
    path.join(outputPath, 'styles.css')
  );

  // Step 3: Let Native Federation produce remoteEntry.json and shared bundles
  // This generates the metadata file that the Angular shell reads to discover
  // what this remote exposes and which shared deps it needs.
  await federationBuilder.build();

  console.log('[sub-app-react] Build complete.');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
