import { Paw } from '../ui/Brand';
import { SoftWave } from '../ui/SoftWave';
import styles from './Landing.module.css';

export function About() {
  return <section id="about" tabIndex={-1} className={styles.about} aria-labelledby="about-heading"><SoftWave id="about" lilac className={styles.aboutWave}/><div className={`container ${styles.aboutInner}`}>
    <div className={styles.aboutHeading}><p className="eyebrow">О PUSHII</p><h2 id="about-heading">Забота складывается из простых вещей</h2><div className={styles.aboutNote}><Paw/><span>Рядом каждый день.<br/>С любовью, без лишнего.</span></div></div>
    <div className={styles.story}><p className={styles.storyLead}>Вымыть лапы после прогулки.<br/>Привести в порядок шерсть.<br/>Завернуть в полотенце<br/>и побыть рядом.</p><p>Для нас забота — это не только средство на полке. Это внимание к привычкам питомца, спокойный голос и знакомые руки рядом. Из таких мелочей складывается ваша общая история.</p><p>PUSHII соединяет опыт российского производителя зоокосметики и наш взгляд на повседневный уход: понятное назначение, дружелюбное оформление и доступность. Нам хочется, чтобы даже обычный флакон в ванной напоминал о ком-то очень любимом.</p><p className={styles.storyConclusion}>Наш принцип прост: забота о любимом питомце должна быть доступной частью жизни.</p></div>
  </div></section>;
}

export function Principles() {
  return <section className={`container ${styles.principles}`} aria-labelledby="principles-heading"><h2 id="principles-heading">Наш подход</h2><div className={styles.principleGrid}>
    <div><span className={styles.principleIcon} aria-hidden="true">♡</span><h3>Доступный уход</h3><p>Стремимся сделать средства для обычной заботы о питомце доступной покупкой.</p></div>
    <div><span className={styles.principleIcon}><Paw/></span><h3>Опыт производителя</h3><p>Работаем с командой, которая специализируется на косметике для животных.</p></div>
    <div><span className={styles.principleIcon} aria-hidden="true">✓</span><h3>Понятный выбор</h3><p>Объясняем назначение средств и способ применения простым языком.</p></div>
  </div></section>;
}
