import styles from './Landing.module.css';

export function Production() {
  return <section id="production" tabIndex={-1} className={`container section ${styles.production}`} aria-labelledby="production-heading">
    <div className={styles.productionCopy}><p className="eyebrow">Сделано в России</p><h2 id="production-heading">За заботой —<br/>опыт и внимание<br/>к деталям.</h2><p>Мы работаем с российским производителем, который специализируется на косметике для животных. За средствами PUSHII — опыт в разработке рецептур и собственные линии изготовления, розлива и этикетирования нашего партнёра.</p><p>Мы отвечаем за характер бренда: понятное знакомство с уходом, продуманное оформление и внимание к тому, как средство становится частью жизни с питомцем.</p></div>
    <div className={styles.productionPanel}><p>В основе PUSHII</p><div className={styles.productionMotto}>Опыт.<br/>Внимание.<br/>Забота.</div><p className={styles.yearCaption}>От рецептуры<br/>до флакона на вашей полке</p><div className={styles.productionSteps}><span>Изготовление</span><span>Розлив</span><span>Этикетирование</span></div></div>
  </section>;
}

