'use client';

import styles from './SuccessModal.module.css';

export default function SuccessModal({ data, onViewDashboard, onReset }) {
  if (!data) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Requirement Posted!</h3>
        <p className={styles.subtitle}>
          Your requirement is saved under{' '}
          <span className={`badge badge-${data.category}`}>{data.category}</span>.
        </p>

        <div className={styles.refBox}>
          ID: {data.referenceId}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onViewDashboard}
          >
            View Submissions
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onReset}
          >
            Post Another
          </button>
        </div>
      </div>
    </div>
  );
}
