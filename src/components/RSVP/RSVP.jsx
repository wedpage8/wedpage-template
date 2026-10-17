import { FaArrowRight } from 'react-icons/fa6';
import styles from './RSVP.module.css';

export default function RSVP({ data }) {
  const { copy, rsvpLink, brideName, groomName } = data;

  return (
    <section className={styles.section} aria-labelledby="rsvp-heading">
      <div className={styles.content}>
        <p className="eyebrow">{copy.rsvpEyebrow}</p>
        <h2 id="rsvp-heading">{copy.rsvpHeading}</h2>
        <p>{copy.rsvpDescription}</p>
        <a className={styles.button} href={rsvpLink} target="_blank" rel="noreferrer">
          {copy.rsvpCta}<FaArrowRight aria-hidden="true" />
          <span className="sr-only">{copy.newTab}</span>
        </a>
      </div>
      <p className={styles.names} aria-hidden="true">{brideName} <span>&</span> {groomName}</p>
    </section>
  );
}