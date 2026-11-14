import Script from 'next/script';
import { isIndexable, site } from '@/config/site';

export function Analytics() {
  if (!isIndexable || !site.metrikaId) return null;
  return <div id="analytics-controls" data-counter={site.metrikaId} data-origin={site.url}>
    <button type="button" id="analytics-settings" className="analytics-settings" hidden>Настройки cookie</button>
    <section id="analytics-consent" className="analytics-consent" aria-labelledby="analytics-title" hidden>
      <h2 id="analytics-title">Поможете сделать PUSHII удобнее?</h2>
      <p>С вашего согласия Яндекс Метрика использует cookie и записывает действия на сайте с помощью Вебвизора: клики и прокрутку. Отказ не мешает пользоваться сайтом. <a href="/privacy/">О данных и конфиденциальности</a>.</p>
      <div className="analytics-actions"><button type="button" id="analytics-accept">Разрешить аналитику</button><button type="button" id="analytics-reject">Отклонить</button></div>
    </section>
    <span id="analytics-status" className="sr-only" role="status" aria-live="polite"/>
    <Script src="/analytics.js" strategy="afterInteractive"/>
  </div>;
}
