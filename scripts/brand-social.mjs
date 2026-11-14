import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const logo = await readFile('public/brand/logo-plum.svg');
const paw = await readFile('public/icon.svg');
const dog = await sharp('public/visuals/hero-shampoos-v3.webp').png().toBuffer();
const uri = (bytes, type) => `data:${type};base64,${bytes.toString('base64')}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#FFF8F0"/><rect x="690" y="40" width="470" height="600" rx="235" fill="#E4CBF3"/><image href="${uri(logo, 'image/svg+xml')}" x="70" y="55" width="240" height="105"/><g fill="#30103E" font-family="Arial, sans-serif" font-size="68" font-weight="700"><text x="70" y="260">Забота</text><text x="70" y="340">которую видно</text></g><text x="74" y="417" fill="#754591" font-family="Arial, sans-serif" font-size="26">Знакомьтесь с PUSHII</text><image href="${uri(dog, 'image/png')}" x="640" y="35" width="560" height="560"/><path d="M0 560Q230 640 600 560T1200 560V630H0Z" fill="#DFC4F2"/></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/brand/og.png');
await sharp(paw).resize(132, 132, { fit: 'contain' }).extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#fafaf6' }).png().toFile('public/apple-touch-icon.png');
console.log('Created social image and Apple icon from original brand elements.');


