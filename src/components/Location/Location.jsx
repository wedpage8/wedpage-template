import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import styles from './Location.module.css';

export default function Location({ data }) {
  const { copy, venue, address, googleMapEmbedUrl, directionsUrl } = data;

  return (
    <section className={styles.section} id="location" aria-labelledby="location-heading">
      <div className={styles.details}>
        <p className="eyebrow">{copy.locationEyebrow}</p>
        <h2 id="location-heading">{copy.locationHeading}</h2>
        <h3>{venue}</h3>
        <p className={styles.address}>{address}</p>
        <a className={styles.directions} href={directionsUrl} target="_blank" rel="noreferrer">
          {copy.directions}<FaArrowUpRightFromSquare aria-hidden="true" />
          <span className="sr-only">{copy.newTab}</span>
        </a>
        <p className={styles.note}>{copy.locationNote}</p>
      </div>
      <div className={styles.mapFrame}>
        <iframe
          title={copy.mapTitle}
          src={googleMapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}