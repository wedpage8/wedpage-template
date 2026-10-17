import { FaArrowDown, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import styles from './Hero.module.css';

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export default function Hero({ data }) {
  const { copy, brideName, groomName, tagline, weddingDate, venue, heroImage, heroImageAlt, navigation, rsvpLink } = data;

  return (
    <header className={styles.hero} style={{ '--hero-image': `url("${heroImage}")` }}>
      <img className={styles.preloadImage} src={heroImage} alt={heroImageAlt} fetchPriority="high" />
      <div className={styles.shade} aria-hidden="true" />
      <nav className={styles.nav} aria-label="Main navigation">
        <a className={styles.brand} href="#top" aria-label={`${copy.brand} home`}>
          {copy.brand}<span>.</span>
        </a>
        <div className={styles.navLinks}>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>
        <a className={styles.navRsvp} href={rsvpLink} target="_blank" rel="noreferrer">
          {copy.rsvpCta}<FaArrowUpRightFromSquare aria-hidden="true" />
        </a>
      </nav>

      <div id="top" className={styles.heroContent}>
        <p className={styles.eyebrow}>{copy.invitation}</p>
        <h1>{brideName}<span className={styles.ampersand}> & </span>{groomName}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.dateBlock}>
          <span>{copy.heroDateLabel}</span>
          <time dateTime={weddingDate}>{formatDate(weddingDate, copy.dateTimeLocale)}</time>
          <span>{venue}</span>
        </div>
        <a className={styles.scrollLink} href="#countdown" aria-label={copy.heroCta}>
          <span>{copy.heroCta}</span><FaArrowDown aria-hidden="true" />
        </a>
      </div>
      <span className={styles.sideNote} aria-hidden="true">{formatDate(weddingDate, copy.dateTimeLocale)}</span>
    </header>
  );
}