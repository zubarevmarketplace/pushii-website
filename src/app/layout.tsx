import type { Metadata } from 'next';
import { isIndexable, site } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: '/' } } : {}),
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    title: site.title, description: site.description, siteName: site.name,
    type: 'website', locale: 'ru_RU',
    ...(site.url ? { url: site.url, images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'PUSHII — забота по доброй цене' }] } : {}),
  },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><head><link rel="preload" href="/fonts/nunito-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/nunito-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
