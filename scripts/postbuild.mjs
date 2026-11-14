import { readFile, writeFile } from 'node:fs/promises';

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
await writeFile('out/_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n${indexable ? '' : '  X-Robots-Tag: noindex, nofollow\n'}`);
if (indexable) {
  const url = site.url.replace(/\/$/, '') + '/';
  await writeFile('out/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.replaceAll('&', '&amp;')}</loc></url></urlset>\n`);
}
console.log(`Static export ready: ${site.mode}; indexing ${indexable ? 'enabled' : 'disabled'}.`);
