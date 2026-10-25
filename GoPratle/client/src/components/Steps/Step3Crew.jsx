'use client';

import styles from '../FormStyles.module.css';

export default function Step3Crew({ formData, onChange }) {
  const crew = formData.crewDetails || {};

  const handleFieldChange = (field, value) => {
    onChange('crewDetails', {
      ...crew,
      [field]: value,
    });
  };

  return (
    <div className={styles.formSection}>
      <div>
        <div className="badge badge-crew" style={{ marginBottom: '6px' }}>
          Crew • Step 3
        </div>
        <h2 className={styles.sectionTitle}>Equipment & Payout</h2>
        <p className={styles.sectionSubtitle}>Specify equipment provisions and daily wage rate.</p>
      </div>

      <div className={styles.formGrid}>
        {/* Equipment Provided */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="equipmentOwnership">
            Equipment Responsibility
          </label>
          <select
            id="equipmentOwnership"
            className={styles.select}
            value={crew.equipmentOwnership || 'Venue/Organizer Provides Equipment'}
            onChange={(e) => handleFieldChange('equipmentOwnership', e.target.value)}
          >
            <option value="Venue/Organizer Provides Equipment">Organizer Provides Equipment</option>
            <option value="Crew Must Bring Own Equipment">Crew Must Bring Own Equipment</option>
            <option value="Hybrid">Hybrid / Shared</option>
          </select>
        </div>

        {/* Rate Amount */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="rateAmount">
            Rate per Person (₹ INR / Day)
          </label>
          <input
            id="rateAmount"
            type="number"
            min="0"
            className={styles.input}
            placeholder="e.g. 5000"
            value={crew.rateAmount || ''}
            onChange={(e) => handleFieldChange('rateAmount', Number(e.target.value) || 0)}
          />
        </div>

        {/* Special Notes */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="specialNotes">
            Reporting Instructions & Notes
          </label>
          <textarea
            id="specialNotes"
            className={styles.textarea}
            placeholder="e.g. Call time 8:00 AM, dress code all black, report to venue manager..."
            value={crew.specialNotes || ''}
            onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
