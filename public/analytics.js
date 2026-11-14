(() => {
  'use strict';
  const root = document.getElementById('analytics-controls');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const id = Number(root.dataset.counter);
  if (!Number.isSafeInteger(id) || id <= 0) return;
  const trackingAllowed = location.origin === root.dataset.origin;
  const panel = document.getElementById('analytics-consent');
  const settings = document.getElementById('analytics-settings');
  const status = document.getElementById('analytics-status');
  const key = 'pushii-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let consent = null;
  let active = false;
  let loading = false;
  let loaded = false;
  const sent = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && saved.expires > Date.now() && ['accepted', 'rejected'].includes(saved.value)) consent = saved.value;
  } catch { /* Storage can be blocked. */ }
  const remember = value => {
    consent = value;
    try { localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + lifetime })); } catch { /* In-memory choice for this page. */ }
  };
  const cleanUrl = value => { try { const url = new URL(value); return url.origin + url.pathname; } catch { return ''; } };
  const goal = (name, once = false) => {
    if (!active || consent !== 'accepted' || (once && sent.has(name))) return;
    window.ym(id, 'reachGoal', name);
    if (once) sent.add(name);
  };
  const start = () => {
    if (!trackingAllowed || consent !== 'accepted' || active) return;
    if (loaded && window.ym) {
      active = true;
      window.ym(id, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, disableYtm: true, url: cleanUrl(location.href), referrer: cleanUrl(document.referrer) });
      return;
    }
    if (loading) return;
    loading = true;
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    const script = document.createElement('script');
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${id}`;
    script.async = true;
    script.onload = () => { loading = false; loaded = true; start(); };
    script.onerror = () => { loading = false; script.remove(); };
    document.head.append(script);
  };
  const clearAnalyticsStorage = () => {
    for (const entry of document.cookie.split(';')) {
      const name = entry.trim().split('=')[0];
      if (!name.startsWith('_ym')) continue;
      for (const domain of ['', location.hostname, '.' + location.hostname]) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax; Secure`;
    }
    try { for (let n = localStorage.length - 1; n >= 0; n--) { const name = localStorage.key(n); if (name && name.startsWith('_ym')) localStorage.removeItem(name); } } catch { /* Storage may be blocked. */ }
  };
  const stop = () => {
    if (active && window.ym) window.ym(id, 'destruct');
    active = false; sent.clear(); clearAnalyticsStorage();
  };
  const close = () => { panel.hidden = true; settings.hidden = false; settings.focus({ preventScroll: true }); };
  settings.addEventListener('click', () => { panel.hidden = false; settings.hidden = true; document.getElementById('analytics-accept').focus({ preventScroll: true }); });
  document.getElementById('analytics-accept').addEventListener('click', () => {
    remember('accepted'); start(); close(); status.textContent = 'Аналитика разрешена. Решение можно изменить в настройках cookie.';
  });
  document.getElementById('analytics-reject').addEventListener('click', () => {
    remember('rejected'); stop(); close(); status.textContent = 'Аналитика отключена.';
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    try { const saved = JSON.parse(event.newValue || 'null'); consent = saved && saved.expires > Date.now() && ['accepted', 'rejected'].includes(saved.value) ? saved.value : null; } catch { consent = null; }
    if (consent === 'accepted') start(); else stop();
    panel.hidden = consent !== null; settings.hidden = consent === null;
  });
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href === '#care') goal('view_products', true);
    if (href.startsWith('mailto:') || href.startsWith('https://t.me/')) goal('click_contact');
  });
  document.addEventListener('toggle', event => {
    if (!(event.target instanceof HTMLDetailsElement) || !event.target.open) return;
    if (event.target.closest('#care')) goal('open_product_details');
    if (event.target.closest('#questions')) goal('view_faq');
  }, true);
  if ('IntersectionObserver' in window) {
    const products = document.getElementById('care');
    if (products) new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) goal('view_products', true); }, { threshold: 0.25 }).observe(products);
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight * 0.75) goal('scroll_75', true);
  }, { passive: true });
  panel.hidden = consent !== null; settings.hidden = consent === null;
  if (consent === 'accepted') start();
})();
