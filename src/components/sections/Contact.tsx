import { site } from '@/config/site';
import { Arrow, Paw } from '../ui/Brand';
import { SoftWave } from '../ui/SoftWave';
import styles from './Landing.module.css';

export function Contact() {
  return <section id="contacts" tabIndex={-1} className={styles.contact} aria-labelledby="contact-heading">
    <SoftWave id="contact" lilac className={styles.contactWave}/>
    <div className={`container ${styles.contactInner}`}>
      <div className={styles.contactCopy}><p className="eyebrow">С любовью, PUSHII</p><h2 id="contact-heading">Для тех,<br/>кого любим.</h2><p>Для мокрых носов, любопытных лап и любимых хвостов. Для маленьких ритуалов, которые делают нас ближе.</p>
        {site.telegramUrl ? <a className="button button-dark" href={site.telegramUrl} target="_blank" rel="noopener noreferrer">Написать PUSHII <Arrow diagonal/></a> : <a className="button button-dark" href={`mailto:${site.email}`}>Написать PUSHII <Arrow diagonal/></a>}
      </div>
      <div className={styles.brandSculpture} aria-hidden="true"><div className={styles.sculptureBase}/><div className={styles.sculptureHeart}>♡</div><div className={styles.sculpturePaw}><Paw/></div><p>Больше заботы.<br/>Больше счастливых хвостов.</p></div>
    </div>
  </section>;
}

