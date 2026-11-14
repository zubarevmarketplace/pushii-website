import { faq } from '@/data/faq';
import styles from './Landing.module.css';

export function Questions() {
  return <section id="questions" tabIndex={-1} className={`container section ${styles.questions}`} aria-labelledby="questions-heading"><div><p className="eyebrow">Будем знакомы</p><h2 id="questions-heading">Возможно,<br/>вам интересно</h2><p className={styles.faqIntro}>О бренде, средствах<br/>и понятном уходе.</p></div><div className={styles.faqList}>{faq.map(item => <details key={item.question} name="pushii-faq"><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>;
}

