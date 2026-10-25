'use client';

import styles from '../FormStyles.module.css';

export default function Step3Performer({ formData, onChange }) {
  const perf = formData.performerDetails || {};
  const budget = perf.budget || { min: 0, max: 0, currency: 'INR' };

  const handleFieldChange = (field, value) => {
    onChange('performerDetails', {
      ...perf,
      [field]: value,
    });
  };

  return (
    <div className={styles.formSection}>
      <div>
        <div className="badge badge-performer" style={{ marginBottom: '6px' }}>
          Performer • Step 3
        </div>
        <h2 className={styles.sectionTitle}>Sound & Budget</h2>
        <p className={styles.sectionSubtitle}>Specify equipment availability and artist fee.</p>
      </div>

      <div className={styles.formGrid}>
        {/* Sound System Provided */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="soundProvided">
            Is Sound System Provided by Venue?
          </label>
          <select
            id="soundProvided"
            className={styles.select}
            value={perf.soundEquipmentProvided ? 'yes' : 'no'}
            onChange={(e) => handleFieldChange('soundEquipmentProvided', e.target.value === 'yes')}
          >
            <option value="yes">Yes (Venue / Organizer provides sound)</option>
            <option value="no">No (Artist must bring own sound)</option>
          </select>
        </div>

        {/* Honorarium Budget */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="budgetMax">
            Budget / Artist Fee (₹ INR)
          </label>
          <input
            id="budgetMax"
            type="number"
            min="0"
            className={styles.input}
            placeholder="e.g. 50000"
            value={budget.max || ''}
            onChange={(e) =>
              onChange('performerDetails', {
                ...perf,
                budget: { ...budget, max: Number(e.target.value) || 0 },
              })
            }
          />
        </div>

        {/* Special Requests */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="specialNotes">
            Special Requests & Notes
          </label>
          <textarea
            id="specialNotes"
            className={styles.textarea}
            placeholder="e.g. Specific songs needed, wireless mics required, green room provisions..."
            value={perf.specialNotes || ''}
            onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
