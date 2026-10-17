import { useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import styles from './RSVP.module.css';

export default function RSVP({ data }) {
  const { copy, brideName, groomName } = data;
  const dialogRef = useRef(null);
  const [confirmation, setConfirmation] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('fullName').trim();
    const attendance = formData.get('attendance') === 'yes' ? copy.rsvpYes : copy.rsvpNo;

    setConfirmation(copy.rsvpPreviewConfirmation(name, attendance));
    dialogRef.current?.showModal();
  }

  return (
    <section className={styles.section} id="rsvp" aria-labelledby="rsvp-heading">
      <div className={styles.content}>
        <p className="eyebrow">{copy.rsvpEyebrow}</p>
        <h2 id="rsvp-heading">{copy.rsvpHeading}</h2>
        <p>{copy.rsvpDescription}</p>
        <form className={styles.form} onSubmit={handleSubmit} onChange={() => setConfirmation('')}>
          <label className={styles.fieldLabel} htmlFor="rsvp-full-name">{copy.rsvpNameLabel}</label>
          <input
            className={styles.nameInput}
            id="rsvp-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
          />
          <fieldset className={styles.attendance}>
            <legend className={styles.fieldLabel}>{copy.rsvpAttendanceLabel}</legend>
            <label className={styles.option}>
              <input type="radio" name="attendance" value="yes" required />
              <span>{copy.rsvpYes}</span>
            </label>
            <label className={styles.option}>
              <input type="radio" name="attendance" value="no" required />
              <span>{copy.rsvpNo}</span>
            </label>
          </fieldset>
          <button className={styles.button} type="submit">
            {copy.rsvpCta}<FaArrowRight aria-hidden="true" />
          </button>
          <p className={styles.notice}>{copy.rsvpPreviewNotice}</p>
        </form>
      </div>
      <p className={styles.names} aria-hidden="true">{brideName} <span>&</span> {groomName}</p>
      <dialog className={styles.dialog} ref={dialogRef} aria-labelledby="rsvp-dialog-heading">
        <h3 id="rsvp-dialog-heading">{copy.rsvpDialogHeading}</h3>
        <p className={styles.confirmation} role="status">{confirmation}</p>
        <button className={styles.button} type="button" onClick={() => dialogRef.current?.close()}>
          {copy.rsvpDialogClose}
        </button>
      </dialog>
    </section>
  );
}