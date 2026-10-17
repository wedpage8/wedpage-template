import styles from './Story.module.css';

export default function Story({ data }) {
  const { story, copy } = data;

  return (
    <section className={styles.section} id="story" aria-labelledby="story-heading">
      <div className={styles.intro}>
        <p className="eyebrow">{copy.storyEyebrow}</p>
        <h2 id="story-heading">{copy.storyHeading}</h2>
      </div>
      <ol className={styles.timeline}>
        {story.map((chapter, index) => (
          <li className={styles.chapter} key={chapter.date}>
            <span className={styles.marker} aria-hidden="true">0{index + 1}</span>
            <div className={styles.chapterBody}>
              <p className={styles.date}>{chapter.date}</p>
              <h3>{chapter.title}</h3>
              <p className={styles.description}>{chapter.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}