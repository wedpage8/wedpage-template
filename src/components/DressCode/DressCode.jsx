import styles from './DressCode.module.css';

export default function DressCode({ data }) {
  const { dressCode, copy } = data;

  return (
    <section className={styles.section} id="dress-code" aria-labelledby="dress-code-heading">
      <div className={styles.content}>
        <p className="eyebrow">{copy.dressCodeEyebrow}</p>
        <h2 id="dress-code-heading">{copy.dressCodeHeading}</h2>
        <p className={styles.attire}>{dressCode.attire}</p>
        <p className={styles.note}>{dressCode.note}</p>
        <h3 className={styles.paletteHeading}>{copy.dressCodePaletteLabel}</h3>
        <ul className={styles.palette}>
          {dressCode.colors.map(({ name, hex }) => (
            <li className={styles.color} key={name}>
              <span
                className={styles.swatch}
                style={{ '--swatch-color': hex }}
                aria-hidden="true"
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
