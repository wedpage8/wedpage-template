import { useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import styles from './RSVP.module.css';

export default function RSVP({ data }) {
  const { copy, brideName, groomName } = data;
  const dialogRef = useRef(null);
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('fullName').trim();
    const attendanceValue = formData.get('attendance');
    const attendance = attendanceValue === 'yes' ? copy.rsvpYes : copy.rsvpNo;

    if (!name) {
      setErrorMessage(copy.rsvpNameRequired);
      form.elements.fullName.focus();
      return;
    }

    setErrorMessage('');
    setConfirmation('');
    setIsSubmitting(true);

    try {
      const response = await fetch(data.rsvpEmailEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          attendance,
          message: `Attendance: ${attendance}`,
          _subject: `Wedding RSVP: ${name}`,
          _template: 'table',
          _honey: '',
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        setErrorMessage(`${copy.rsvpSubmitError} (HTTP ${response.status})`);
        return;
      }

      const needsActivation =
        typeof result.message === 'string' && /activat/i.test(result.message);
      if (needsActivation) {
        setErrorMessage(copy.rsvpActivationNotice);
        return;
      }

      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        const providerMessage =
          typeof result.message === 'string' ? result.message.trim().slice(0, 200) : '';
        console.error('FormSubmit rejected the RSVP', {
          status: response.status,
          message: providerMessage || undefined,
        });
        setErrorMessage(
          providerMessage
            ? `${copy.rsvpSubmitError} ${providerMessage}`
            : `${copy.rsvpSubmitError} (HTTP ${response.status})`,
        );
        return;
      }

      setConfirmation(copy.rsvpDialogSuccess(name, attendance));
      form.reset();
      dialogRef.current?.showModal();
    } catch (error) {
      console.error('Could not reach FormSubmit to send the RSVP', error);
      setErrorMessage(copy.rsvpSubmitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.section} id="rsvp" aria-labelledby="rsvp-heading">
      <div className={styles.content}>
        <p className="eyebrow">{copy.rsvpEyebrow}</p>
        <h2 id="rsvp-heading">{copy.rsvpHeading}</h2>
        <p>{copy.rsvpDescription}</p>
        <form className={styles.form} onSubmit={handleSubmit} onChange={() => setErrorMessage('')}>
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
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? copy.rsvpSubmitting : copy.rsvpCta}
            {!isSubmitting && <FaArrowRight aria-hidden="true" />}
          </button>
          {errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}
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