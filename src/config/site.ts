import settings from './site.json';

export const site = settings as Omit<typeof settings, 'url' | 'telegramUrl'> & {
  url: string | null;
  telegramUrl: string | null;
};
export const isIndexable = site.mode === 'production' && site.publicationReady && !!site.url;
export const navigation = [
  { href: '#care', label: 'Средства' },
  { href: '#about', label: 'О PUSHII' },
  { href: '#production', label: 'Производство' },
  { href: '#questions', label: 'Вопросы' },
  ...(site.telegramUrl ? [{ href: '#contacts', label: 'Контакты' }] : []),
] as const;
