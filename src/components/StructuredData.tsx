import { site } from '@/config/site';

export function StructuredData() {
  if (!site.url) return null;
  const url = site.url + '/';
  const data = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': url + '#website', url, name: site.name, inLanguage: 'ru-RU', publisher: { '@id': url + '#organization' } },
    { '@type': 'Organization', '@id': url + '#organization', name: site.name, legalName: site.operator, url, logo: { '@type': 'ImageObject', url: url + 'brand/logo.png', width: 600, height: 300 }, email: site.email },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}/>;
}
