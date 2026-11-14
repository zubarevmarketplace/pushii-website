import { readFile, writeFile, rm } from 'node:fs/promises';

const site = JSON.parse(await readFile(new URL('../src/config/site.json', import.meta.url), 'utf8'));
if (!['preview', 'production'].includes(site.mode)) throw new Error('site.mode must be preview or production');
if (site.url && (new URL(site.url).protocol !== 'https:' || new URL(site.url).pathname !== '/')) {
  throw new Error('Use a confirmed HTTPS origin in site.url, without a path.');
}
if (site.telegramUrl && !/^https:\/\/t\.me\/[A-Za-z0-9_]+\/?$/.test(site.telegramUrl)) {
  throw new Error('telegramUrl must be a verified https://t.me/ link.');
}
if (site.mode === 'production' && (!site.publicationReady || !site.url)) {
  throw new Error('Production requires a confirmed domain and publicationReady: true. Review README first.');
}
const indexable = site.mode === 'production' && site.publicationReady && site.url;
await writeFile('out/robots.txt', indexable ? `User-agent: *\nAllow: /\nSitemap: ${site.url.replace(/\/$/, '')}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
// GitHub Pages does not apply a Netlify/Cloudflare _headers file.
await rm('out/_headers', { force: true });
await writeFile('out/.nojekyll', '');
// Next inherits the root metadata in its static 404; avoid contradictory robots
// directives and a canonical that falsely identifies the error as the homepage.
for (const path of ['out/404.html', 'out/_not-found/index.html']) {
  const html = await readFile(path, 'utf8');
  const clean = html.replace(/<meta name="robots"[^>]*>/g, '').replace(/<link rel="canonical"[^>]*>/g, '').replace('</head>', '<meta name="robots" content="noindex, follow"/></head>');
  await writeFile(path, clean);
}
if (site.metrikaId !== null && (!Number.isSafeInteger(site.metrikaId) || site.metrikaId <= 0)) throw new Error('Invalid Metrika counter ID');
if (indexable) {
  const urls = ['/', '/privacy/'].map(path => site.url.replace(/\/$/, '') + path);
  await writeFile('out/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url.replaceAll('&', '&amp;')}</loc></url>`).join('')}</urlset>\n`);
} else {
  await rm('out/sitemap.xml', { force: true });
}
console.log(`Static export ready: ${site.mode}; indexing ${indexable ? 'enabled' : 'disabled'}.`);
