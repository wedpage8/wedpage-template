import { FaRegClock } from 'react-icons/fa6';
import styles from './EventDetails.module.css';

export default function EventDetails({ data }) {
  const { events, weddingDate, address, copy } = data;

  return (
    <section className={styles.section} id="details" aria-labelledby="details-heading">
      <div className={styles.heading}>
        <p className="eyebrow">{copy.detailsEyebrow}</p>
        <h2 id="details-heading">{copy.detailsHeading}</h2>
      </div>
      <div className={styles.eventGrid}>
        {events.map((event, index) => (
          <article className={styles.event} key={event.name}>
            <span className={styles.eventNumber}>0{index + 1}</span>
            <h3>{event.name}</h3>
            <p className={styles.eventDate}><time dateTime={weddingDate}>{event.date}</time></p>
            <p className={styles.eventTime}><FaRegClock aria-hidden="true" />{event.time}</p>
            <p>{event.location}</p>
            <p className={styles.note}>{event.detail}</p>
          </article>
        ))}
      </div>
      <p className={styles.address}>{address}</p>
    </section>
  );
}