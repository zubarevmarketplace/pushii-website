import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const html = await readFile('out/index.html', 'utf8');
const site = JSON.parse(await readFile('src/config/site.json', 'utf8'));
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'One H1');
assert.match(html, /<html[^>]*lang="ru"/);
for (const id of ['care', 'about', 'production', 'questions', 'contacts']) assert.ok(html.includes(`id="${id}"`), `Section ${id}`);
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
  const path = decodeURIComponent(match[1]);
  if (path === '/') continue;
  await access(resolve('out', '.' + path));
}
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), `Anchor ${match[1]}`);
for (const forbidden of ['DATA_GAP', 'Биосфера', 'гипоаллергенный', 'без слёз', '355 мл', '150–200', 'localhost:3000']) assert.ok(!html.includes(forbidden), `No draft/internal claim: ${forbidden}`);
if (site.mode === 'preview') {
  assert.match(html, /name="robots" content="noindex, nofollow"/);
}
if (site.mode === 'production') {
  assert.ok(site.publicationReady && site.url, 'Production domain confirmed');
  assert.match(html, /name="robots" content="index, follow"/);
  assert.ok(html.includes(`href="${site.url}/"`), 'Canonical points to production origin');
  assert.ok((await readFile('out/sitemap.xml', 'utf8')).includes(`${site.url}/`));
  assert.ok(!(await readFile('out/robots.txt', 'utf8')).includes('Disallow: /'));
}
if (!site.url) { assert.ok(!html.includes('rel="canonical"')); assert.ok(!(await readdir('out')).includes('sitemap.xml')); }
if (!site.telegramUrl) { assert.ok(!html.includes('href="https://t.me/')); assert.ok(!html.includes('Скоро в Telegram')); }
for (const removed of ['Антарес', 'antares-production', 'Готовим к запуску', 'Будущая линейка', 'Скоро знакомство', 'Готовим первую линейку']) assert.ok(!html.includes(removed), `Removed launch placeholder or supplier promotion: ${removed}`);
assert.ok(!/<form[ >]/.test(html));
assert.ok((html.match(/<details[ >]/g) || []).length >= 6);
assert.ok(!(await readdir('out')).some(x => /README|DECISIONS|SOURCES|package|\.env|\.qa/.test(x)));
console.log('PASS: static HTML, sections, assets, anchors, SEO, draft-content boundaries, FAQ and Telegram state.');

for (const path of ['out/index.html', 'out/privacy/index.html']) {
  const page = await readFile(path, 'utf8');
  assert.equal((page.match(/<title>/g) || []).length, 1, `${path}: one title`);
  assert.equal((page.match(/<meta name="description"/g) || []).length, 1, `${path}: one description`);
  assert.equal((page.match(/<link rel="canonical"/g) || []).length, 1, `${path}: one canonical`);
  assert.equal((page.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`);
  for (const tag of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card', 'twitter:image']) assert.ok(page.includes(`="${tag}"`), `${path}: ${tag}`);
  for (const img of page.matchAll(/<img\b[^>]*>/g)) assert.match(img[0], /\balt="[^"]*"/);
  assert.ok(!/<(?:script|img)[^>]*(?:src="https:\/\/mc\.yandex|src="https:\/\/www\.googletagmanager)/.test(page), 'No tracker request before consent');
}
const privacy = await readFile('out/privacy/index.html', 'utf8');
assert.ok(privacy.includes(`href="${site.url}/privacy/"`), 'Privacy canonical');
assert.ok(privacy.includes(site.operator) && privacy.includes(site.email), 'Confirmed operator and contact');
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || '{}');
assert.equal(schema['@context'], 'https://schema.org');
assert.deepEqual(schema['@graph'].map(node => node['@type']), ['WebSite', 'Organization']);
assert.equal(schema['@graph'][0].url, `${site.url}/`);
assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'No invented ratings');
const manifest = JSON.parse(await readFile('out/site.webmanifest', 'utf8'));
for (const icon of manifest.icons) await access(resolve('out', '.' + icon.src));
for (const filename of ['favicon-48.png', 'favicon-192.png', 'favicon-512.png', 'apple-touch-icon.png', 'brand/og.jpg', 'brand/logo.png', 'favicon.ico', 'analytics.js']) await access(`out/${filename}`);
const ico = await readFile('out/favicon.ico');
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
const errorPage = await readFile('out/404.html', 'utf8');
assert.equal((errorPage.match(/<meta name="robots"/g) || []).length, 1);
assert.ok(errorPage.includes('content="noindex, follow"'));
assert.ok(!errorPage.includes('rel="canonical"'));
if (site.yandexVerification) assert.ok(html.includes(`name="yandex-verification" content="${site.yandexVerification}"`));
if (site.mode === 'production') {
  const xml = await readFile('out/sitemap.xml', 'utf8');
  for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const url = new URL(match[1]);
    assert.equal(url.origin, site.url);
    await access(resolve('out', '.' + url.pathname, 'index.html'));
  }
}
console.log('PASS: social cards, structured data, icons, privacy, consent boundary, sitemap targets and 404 metadata.');

const variants = JSON.parse(await readFile('src/config/image-variants.json', 'utf8'));
for (const images of Object.values(variants)) for (const image of images) await access(resolve('out', '.' + image.src));
assert.ok(html.includes('fetchPriority="high"') || html.includes('fetchpriority="high"'), 'Hero has high fetch priority');
assert.ok(html.includes('/visuals/responsive/hero-shampoos-v3-768.webp 768w'), 'Responsive hero is present');
console.log('PASS: responsive image sources and hero priority.');
