import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT = 4203;
const DIST_DIR = path.join(import.meta.dirname, '..', 'dist');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// First, run the build
const { execSync } = await import('child_process');
console.log('[sub-app-react] Building...');
execSync('npm run build', {
  cwd: path.join(import.meta.dirname, '..'),
  stdio: 'inherit',
});

const server = http.createServer((req, res) => {
  // CORS headers — required so the Angular shell (port 4200) can fetch
  // remoteEntry.json and JS bundles from this origin (port 4203).
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let urlPath = req.url?.split('?')[0] ?? '/';
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(DIST_DIR, urlPath);
  const ext = path.extname(filePath);

  if (!fs.existsSync(filePath)) {
    // SPA fallback — serve index.html for client-side routing
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(indexPath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`[sub-app-react] Dev server running at http://localhost:${PORT}`);
});
