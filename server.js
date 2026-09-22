import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable gzip compression
app.use(compression());

// Serve static files with caching and html extension support
app.use(express.static(__dirname, {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    // Service Worker and Logo assets must always be revalidated immediately
    if (filePath.endsWith('sw.js') || filePath.includes('logo') || filePath.includes('icon')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      if (filePath.endsWith('sw.js')) {
        res.setHeader('Service-Worker-Allowed', '/');
      }
    }
    // Cache HTML
    else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
    // Cache other static assets
    else if (filePath.match(/\.(css|js|webp|png|jpg|jpeg|gif|ico|woff|woff2|ttf|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// Explicit clean route handlers for top-level pages
const pages = ['services', 'technology', 'about', 'contact', 'partnerships', 'smart-assist', 'intake', 'labour'];
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

// Fallback to index.html for single-page applications or routing
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
