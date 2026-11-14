'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation, site } from '@/config/site';
import { Logo, Arrow } from './ui/Brand';
import styles from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  function navigate(href: string) {
    setOpen(false);
    document.getElementById(href.slice(1))?.focus({ preventScroll: true });
  }

  return <header ref={header} className={styles.header}>
    <div className={`container ${styles.inner}`}>
      <a className={styles.logo} href="#top" aria-label="PUSHII — на главную" onClick={() => navigate('#top')}><Logo width={184}/></a>
      <button ref={button} className={styles.toggle} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>
        <span>{open ? 'Закрыть' : 'Меню'}</span><span className={`${styles.burger} ${open ? styles.open : ''}`} aria-hidden="true"><i/><i/></span>
      </button>
      <nav id="main-navigation" aria-label="Основная навигация" className={`${styles.nav} ${open ? styles.expanded : ''}`} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== button.current) setOpen(false); }}>
        {navigation.map(item => <a key={item.href} href={item.href} onClick={() => navigate(item.href)}>{item.label}</a>)}
        {site.telegramUrl && <a className={styles.telegram} href={site.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram <Arrow diagonal /></a>}
      </nav>
    </div>
  </header>;
}
