import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const manifest = {};
await mkdir('public/visuals/responsive', { recursive: true });
for (const name of ['hero-shampoos-v3', 'cat-v2', 'dog-v2', 'shampoo-duo-v3']) {
  const path = `public/visuals/${name}.webp`;
  const metadata = await sharp(path).metadata();
  const variants = [];
  for (const width of [320, 480, 768, 1024].filter(width => width < metadata.width)) {
    const src = `/visuals/responsive/${name}-${width}.webp`;
    await sharp(path).resize({ width }).webp({ quality: 82, effort: 6 }).toFile(`public${src}`);
    variants.push({ src, width });
  }
  variants.push({ src: `/visuals/${name}.webp`, width: metadata.width });
  manifest[`/visuals/${name}.webp`] = variants;
}
await writeFile('src/config/image-variants.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Generated responsive WebP variants without changing source artwork.');
