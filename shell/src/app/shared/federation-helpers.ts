/**
 * Federation bridge helpers.
 *
 * Bridges Native Federation's shared dependency system with Module
 * Federation's runtime. Native Federation stores shared packages in
 * `window.__NATIVE_FEDERATION__.externals` (an import map keyed by
 * `packageName@version`). This helper converts that data into the
 * format expected by @module-federation/enhanced's `init()` method.
 *
 * Based on Manfred Steyer's proof-of-concept:
 * https://github.com/manfredsteyer/mf-nf-poc
 */

/**
 * Shape of the Native Federation global state stored on `window`.
 */
interface NativeFederationContainer {
  __NATIVE_FEDERATION__: {
    baseUrlToRemoteNames: Map<string, string>;
    externals: Map<string, string>;
  };
}

/**
 * A single shared module entry for Module Federation's runtime.
 */
export interface ShareObject {
  version: string;
  scope?: string;
  get: () => Promise<() => unknown>;
  shareConfig?: {
    singleton?: boolean;
    requiredVersion: string;
  };
}

/**
 * The shared config map passed to Module Federation's `init()`.
 */
export type ShareConfig = {
  [pkgName: string]: Array<ShareObject>;
};

export interface ShareOptions {
  singleton: boolean;
  requiredVersionPrefix: '^' | '~' | '>' | '>=' | '';
}

const defaultShareOptions: ShareOptions = {
  singleton: false,
  requiredVersionPrefix: '',
};

/**
 * Reads the packages shared by Native Federation and converts them
 * into Module Federation's shared format. This allows MF-based remotes
 * to reuse libraries already loaded by Native Federation (e.g. Angular
 * core, RxJS, etc.) instead of downloading them again.
 *
 * Call this AFTER `initFederation()` has completed so that
 * `window.__NATIVE_FEDERATION__` is populated.
 */
export function getShared(
  options: ShareOptions = defaultShareOptions
): ShareConfig {
  const nfc = window as unknown as NativeFederationContainer;
  const externals = nfc.__NATIVE_FEDERATION__.externals;
  const shared: ShareConfig = {};

  const allKeys = [...externals.keys()];
  const keys = allKeys
    .filter(
      (k) =>
        !k.startsWith('/@id/') &&
        !k.startsWith('@module-federation') &&
        !k.endsWith('@')
    )
    .sort();

  for (const key of keys) {
    const idx = key.lastIndexOf('@');
    const pkgName = key.substring(0, idx);
    const version = key.substring(idx + 1);
    const path = externals.get(key) ?? '';

    const shareObj: ShareObject = {
      version,
      get: async () => {
        // Use importShim to load the package from Native Federation's
        // import map. This is the same mechanism NF uses internally.
        const lib = await (window as any).importShim(path);
        return () => lib;
      },
      shareConfig: {
        singleton: options.singleton,
        requiredVersion: options.requiredVersionPrefix + version,
      },
    };

    if (!shared[pkgName]) {
      shared[pkgName] = [];
    }

    shared[pkgName].push(shareObj);
  }

  return shared;
}
