import Image from 'next/image';
import { Arrow } from '../ui/Brand';
import styles from './Landing.module.css';

export function PetWorld() {
  return <section className={`container ${styles.petWorld}`} aria-label="Для кого мы создаём PUSHII">
    <a href="#about" className={`${styles.petTile} ${styles.dogTile}`}><div><span className={styles.tileEyebrow}>Вся нежность — им</span><h2>Для собак</h2><span className={styles.tileLink}>Наша забота <Arrow/></span></div><Image src="/visuals/dog-v2.webp" width={900} height={600} alt="Радостный джек-рассел-терьер" sizes="(max-width: 767px) 100vw, 50vw"/></a>
    <a href="#about" className={`${styles.petTile} ${styles.catTile}`}><div><span className={styles.tileEyebrow}>И их независимых друзей</span><h2>Для кошек</h2><span className={styles.tileLink}>Наш подход <Arrow/></span></div><Image src="/visuals/cat-v2.webp" width={900} height={600} alt="Любопытный полосатый кот поднимает лапу" sizes="(max-width: 767px) 100vw, 50vw"/></a>
  </section>;
}
