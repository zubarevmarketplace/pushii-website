import { Logo, Paw } from './ui/Brand';
import { navigation, site } from '@/config/site';
import styles from './Footer.module.css';

export function Footer() {
  return <footer className={styles.footer}><div className={`container ${styles.inner}`}><div className={styles.brand}><a href="#top" aria-label="PUSHII — наверх"><Logo width={220}/></a><p>Забота по доброй цене.</p></div><nav aria-label="Навигация в подвале">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className={styles.note}><Paw/><span>Для собак, кошек<br/>и тех, кто их любит.</span></div><div className={styles.bottom}><span>© {new Date().getFullYear()} PUSHII</span>{site.telegramUrl && <a href={site.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram</a>}<a href="#top">Наверх ↑</a></div></div></footer>;
}

