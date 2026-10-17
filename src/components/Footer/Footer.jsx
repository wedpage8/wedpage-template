import { FaArrowUp } from 'react-icons/fa6';
import styles from './Footer.module.css';

export default function Footer({ data }) {
  const { copy, brideName, groomName, weddingDate } = data;
  const year = new Date(weddingDate).getUTCFullYear();

  return (
    <footer className={styles.footer}>
      <a className={styles.brand} href="#top">{brideName} <span>&</span> {groomName}</a>
      <p>{copy.footerNote}</p>
      <span className={styles.credit}>{copy.brand} · {year}</span>
      <a className={styles.top} href="#top" aria-label={copy.backToTop}><FaArrowUp aria-hidden="true" /></a>
    </footer>
  );
}