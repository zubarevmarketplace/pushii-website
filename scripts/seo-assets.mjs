import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

// Derive sizes from the approved brand asset; no new artwork.
const paw = await readFile('public/icon.svg');
const png = size => sharp(paw).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
for (const size of [48, 192, 512]) await writeFile(`public/favicon-${size}.png`, await png(size));
const frames = await Promise.all([16, 32, 48].map(png));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  const at = 6 + i * 16;
  header[at] = header[at + 1] = [16, 32, 48][i];
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(frame.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += frame.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...frames]));
await sharp('public/brand/og.png').flatten({ background: '#fff8f0' }).jpeg({ quality: 88, mozjpeg: true }).toFile('public/brand/og.jpg');
await sharp('public/brand/logo-plum.svg').resize(600, 300, { fit: 'contain', background: '#fff8f0' }).png().toFile('public/brand/logo.png');
console.log('Generated ICO, PNG icons, organization logo and compressed social preview.');
