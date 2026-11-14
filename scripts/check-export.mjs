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
  assert.match(await readFile('out/_headers', 'utf8'), /X-Robots-Tag: noindex/);
}
if (!site.url) { assert.ok(!html.includes('rel="canonical"')); assert.ok(!(await readdir('out')).includes('sitemap.xml')); }
if (!site.telegramUrl) { assert.ok(!html.includes('href="https://t.me/')); assert.ok(!html.includes('Скоро в Telegram')); }
for (const removed of ['Антарес', 'antares-production', 'Готовим к запуску', 'Будущая линейка', 'Скоро знакомство', 'Готовим первую линейку']) assert.ok(!html.includes(removed), `Removed launch placeholder or supplier promotion: ${removed}`);
assert.ok(!/<form[ >]/.test(html));
assert.ok((html.match(/<details[ >]/g) || []).length >= 6);
assert.ok(!(await readdir('out')).some(x => /README|DECISIONS|SOURCES|package|\.env|\.qa/.test(x)));
console.log('PASS: static HTML, sections, assets, anchors, SEO, draft-content boundaries, FAQ and Telegram state.');
