import Image from '../ui/ResponsiveImage';
import { Arrow, Paw } from '../ui/Brand';
import { SoftWave } from '../ui/SoftWave';
import styles from './Landing.module.css';

export function Hero() {
  return <section className={styles.hero} aria-labelledby="hero-heading">
    <div className={styles.lilacBackdrop} aria-hidden="true"/>
    <div className={`container ${styles.heroInner}`}>
      <div className={styles.heroCopy}>
        <p className={styles.intro}><Paw/> Знакомьтесь, PUSHII</p>
        <h1 id="hero-heading">Забота,<br/>которую<br/>видно</h1>
        <p className={styles.heroSubtitle}>Шампуни для собак<br/>и кошек</p>
        <p className={styles.heroDescription}>Понятный уход. Тёплый характер.<br/>И много любви в простых вещах.</p>
        <div className={styles.actions}><a className="button" href="#care"><span>Познакомиться<br/>с линейкой</span><Arrow/></a><a className="text-link" href="#about">О бренде</a></div>
      </div>
      <div className={styles.heroArt}>
        <Image className={styles.heroPets} src="/visuals/hero-shampoos-v3.webp" alt="Макеты шампуней PUSHII перед корги и котом на лавандовом подиуме" width={1254} height={1254} priority sizes="(max-width: 374px) 115vw, (max-width: 767px) 420px, (max-width: 900px) 410px, (max-width: 1023px) 500px, (max-width: 1199px) 630px, 730px"/>
      </div>
    </div>
    <SoftWave id="hero" className={styles.heroWave}/>
  </section>;
}
