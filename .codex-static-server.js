const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const port = 5173;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function send(res, code, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}

http.createServer((req, res) => {
  const raw = decodeURIComponent((req.url || '/').split('?')[0]);
  const pathname = raw === '/' ? '/index.html' : raw;
  const safePath = path.normalize(path.join(root, pathname));

  if (!safePath.startsWith(root)) {
    return send(res, 403, 'Forbidden');
  }

  fs.stat(safePath, (err, stat) => {
    if (err) return send(res, 404, 'Not Found');
    const target = stat.isDirectory() ? path.join(safePath, 'index.html') : safePath;

    fs.readFile(target, (readErr, data) => {
      if (readErr) return send(res, 404, 'Not Found');
      const ext = path.extname(target).toLowerCase();
      send(res, 200, data, mime[ext] || 'application/octet-stream');
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Static server running at http://127.0.0.1:${port}`);
});
