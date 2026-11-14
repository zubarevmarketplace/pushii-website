import type { Metadata, Viewport } from 'next';
import { isIndexable, site } from '@/config/site';
import { Analytics } from '@/components/Analytics';
import './globals.css';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: '/' } } : {}),
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    title: site.title, description: site.description, siteName: site.name,
    type: 'website', locale: 'ru_RU',
    ...(site.url ? { url: site.url, images: [{ url: '/brand/og.jpg', width: 1200, height: 630, alt: 'PUSHII — забота, которую видно. Шампуни для собак и кошек.' }] } : {}),
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/brand/og.jpg'] },
  icons: { icon: [
    { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
    { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
  ], apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }] },
  manifest: '/site.webmanifest',
  verification: { google: site.googleVerification || undefined, yandex: site.yandexVerification || undefined },
};

export const viewport: Viewport = { themeColor: '#fff8f0' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><head><link rel="preload" href="/fonts/nunito-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/nunito-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}<Analytics/></body></html>;
}
