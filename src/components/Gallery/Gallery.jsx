import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import styles from './Gallery.module.css';

export default function Gallery({ data }) {
  const { gallery, copy } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  function showSlide(index) {
    setActiveIndex((index + gallery.length) % gallery.length);
  }

  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-heading">
      <div className={styles.heading}>
        <p className="eyebrow">{copy.galleryEyebrow}</p>
        <h2 id="gallery-heading">{copy.galleryHeading}</h2>
      </div>
      <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label={copy.galleryHeading}>
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            aria-live="polite"
          >
            {gallery.map((image, index) => (
              <figure
                className={styles.image}
                key={image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} ${copy.gallerySlideOf} ${gallery.length}`}
                aria-hidden={index !== activeIndex}
              >
                <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                </span>
              </figure>
            ))}
          </div>
          <button
            className={`${styles.control} ${styles.previous}`}
            type="button"
            aria-label={copy.galleryPrevious}
            onClick={() => showSlide(activeIndex - 1)}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            className={`${styles.control} ${styles.next}`}
            type="button"
            aria-label={copy.galleryNext}
            onClick={() => showSlide(activeIndex + 1)}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className={styles.indicators} aria-label={copy.gallerySlideNavigation}>
          {gallery.map((image, index) => (
            <button
              className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ''}`}
              key={image.src}
              type="button"
              aria-label={`${copy.galleryGoToSlide} ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}