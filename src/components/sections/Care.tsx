import Image from '../ui/ResponsiveImage';
import { careDirections } from '@/data/products';
import styles from './Landing.module.css';

export function Care() {
  return <section id="care" tabIndex={-1} className={`container section ${styles.care}`} aria-labelledby="care-heading">
    <div className={styles.sectionHeading}><div><p className="eyebrow">Уход PUSHII</p><h2 id="care-heading">Чистая шерсть.<br/>Тёплые объятия.</h2></div><p>Для простых ритуалов,<br/>из которых складывается любовь.</p></div>
    {careDirections.map(direction => <article key={direction.id} id={direction.slug} className={styles.product}>
      <figure className={`${styles.productFigure} ${styles.bottleFigure}`}><Image className={styles.bottleDuo} src="/visuals/shampoo-duo-v3.webp" width={1000} height={1000} alt="Концептуальные макеты шампуней PUSHII в светлом и тёмном оформлении" sizes="(max-width: 767px) 90vw, 45vw"/></figure>
      <div className={styles.productCopy}><p className={styles.productPurpose}>{direction.purpose}</p><h3>{direction.name}</h3><p>{direction.description}</p>
        <details className={styles.productDetails}><summary>Как познакомиться со средством<span aria-hidden="true">+</span></summary><div>{direction.details.map(item => <div key={item.title}><h4>{item.title}</h4><p>{item.text}</p></div>)}</div></details>
        <p className={styles.smallNote}>У каждого питомца свой характер.<br/>И свои потребности в уходе.</p>
      </div>
    </article>)}
  </section>;
}

