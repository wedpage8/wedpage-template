import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

function getRemainingTime(target) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  return [
    Math.floor(difference / 86400000),
    Math.floor((difference / 3600000) % 24),
    Math.floor((difference / 60000) % 60),
    Math.floor((difference / 1000) % 60),
  ];
}

export default function Countdown({ data }) {
  const { weddingDate, copy } = data;
  const [time, setTime] = useState(() => getRemainingTime(weddingDate));
  const hasStarted = new Date(weddingDate).getTime() <= Date.now();

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getRemainingTime(weddingDate)), 1000);
    return () => window.clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className={styles.section} id="countdown" aria-labelledby="countdown-heading">
      <p className="eyebrow">{copy.countdownEyebrow}</p>
      <h2 id="countdown-heading">{hasStarted ? copy.countdownComplete : copy.countdownHeading}</h2>
      {!hasStarted && (
        <div className={styles.timer} aria-label={`${time.join(' ')} ${copy.countdownUnits.join(' ')}`}>
          {time.map((value, index) => (
            <div className={styles.unit} key={copy.countdownUnits[index]}>
              <span className={styles.number}>{String(value).padStart(2, '0')}</span>
              <span className={styles.label}>{copy.countdownUnits[index]}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}