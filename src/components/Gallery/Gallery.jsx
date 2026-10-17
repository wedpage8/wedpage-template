import styles from './Gallery.module.css';

export default function Gallery({ data }) {
  const { gallery, copy } = data;

  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-heading">
      <div className={styles.heading}>
        <p className="eyebrow">{copy.galleryEyebrow}</p>
        <h2 id="gallery-heading">{copy.galleryHeading}</h2>
      </div>
      <div className={styles.grid}>
        {gallery.map((image, index) => (
          <figure className={`${styles.image} ${styles[image.shape]}`} key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className={styles.index} aria-hidden="true">0{index + 1}</span>
          </figure>
        ))}
      </div>
    </section>
  );
}