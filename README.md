# SKV Native Federation Demo

An Angular 20 micro-frontend demo using [@angular-architects/native-federation](https://www.npmjs.com/package/@angular-architects/native-federation). A **shell** (host) application loads a **sub-app** (remote) at runtime, sharing authentication state via a singleton service.

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (npm workspaces are used)

## Quick Start

```bash
# 1. Install all dependencies (workspaces: shared, shell, sub-app)
npm install

# 2. Build the shared library (must be done before starting the apps)
npm run build:shared

# 3. Start both apps (sub-app on :4201, then shell on :4200)
npm run start:all
```

Open **http://localhost:4200** in your browser.

### Starting individually

If you prefer to start them in separate terminals:

```bash
# Terminal 1 — Sub-app (remote)
npm run start:sub-app    # http://localhost:4201

# Terminal 2 — Shell (host)
npm run start:shell      # http://localhost:4200
```

The sub-app must be running before the shell starts, since the shell fetches the remote entry from `localhost:4201` at startup.

## Project Structure

```
skv-native-federation-demo/
├── shared/              # @skv/shared — Angular library (ng-packagr)
│   └── src/lib/
│       ├── auth.service.ts    # Singleton AuthService (signals-based)
│       └── user.model.ts      # User interface
├── shell/               # Host application (port 4200)
│   ├── federation.config.js   # Native Federation host config
│   ├── public/
│   │   └── federation.manifest.json  # Remote entry points
│   └── src/app/
│       ├── app.routes.ts      # Shell routes (loads sub-app via federation)
│       └── pages/home/        # Shell home page
├── sub-app/             # Remote micro-frontend (port 4201)
│   ├── federation.config.js   # Native Federation remote config
│   └── src/app/
│       ├── remote.routes.ts   # Routes exposed to the shell
│       └── pages/
│           ├── dashboard/     # Sub-app dashboard
│           └── details/       # Sub-app detail view (child route)
└── package.json         # Workspace root (npm workspaces)
```

## How It Works

### Native Federation

1. **Shell startup** — `main.ts` calls `initFederation('federation.manifest.json')`, which reads the manifest to discover that the `sub-app` remote is at `http://localhost:4201/remoteEntry.json`.
2. **Lazy loading** — The shell's router maps the `/sub-app` path to `loadRemoteModule('sub-app', './routes')`, which fetches the sub-app's exposed route configuration (`SUB_APP_ROUTES`) at runtime.
3. **Sub-app routing** — The sub-app exposes `./routes` in its `federation.config.js`, pointing to `remote.routes.ts`. This file defines two routes:
   - `''` → `Dashboard` component
   - `'details/:id'` → `Details` component
4. **Independent deployment** — Each app is built and served independently. Updating the sub-app requires no rebuild of the shell — the shell discovers remotes dynamically from the manifest.

### Shared Singleton Services

The `@skv/shared` library provides an `AuthService` built with Angular signals. Both federation configs include it in the shared bundle (`shareAll` with `singleton: true`), ensuring a **single instance** across the entire federation:

- The **shell** handles login/logout via the `AuthService`.
- The **sub-app** reads `isAuthenticated` and `currentUser` from the same `AuthService` instance — no message bus or custom events needed.
- State changes propagate instantly because Angular signals are reactive.

### Key Technologies

- **Angular 20** with standalone components (no NgModules)
- **Signal-based** state (`signal`, `computed`, `input.required`)
- **New control flow** syntax (`@if`, `@for`)
- **`withComponentInputBinding()`** for route parameter injection
- **ng-packagr** for building the shared library

## Available Scripts

| Script | Description |
|---|---|
| `npm run build:shared` | Build the `@skv/shared` library with ng-packagr |
| `npm run build:sub-app` | Production build of the sub-app |
| `npm run build:shell` | Production build of the shell |
| `npm run build:all` | Build shared, then sub-app, then shell (in order) |
| `npm run start:sub-app` | Serve sub-app on port 4201 |
| `npm run start:shell` | Serve shell on port 4200 |
| `npm run start:all` | Start sub-app, wait 10s, then start shell |
