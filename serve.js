import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const DIST_PATH = path.join(__dirname, 'dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_PATH, req.url === '/' ? 'index.html' : req.url);
  
  if (!filePath.startsWith(DIST_PATH)) {
    filePath = path.join(DIST_PATH, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(DIST_PATH, 'index.html'), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else {
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.json') contentType = 'application/json';
      if (ext === '.svg') contentType = 'image/svg+xml';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      if (ext === '.gif') contentType = 'image/gif';
      if (ext === '.woff') contentType = 'font/woff';
      if (ext === '.woff2') contentType = 'font/woff2';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Network: http://172.16.7.12:${PORT}\n`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});
