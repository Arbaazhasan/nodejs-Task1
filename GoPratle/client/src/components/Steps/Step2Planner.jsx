'use client';

import styles from '../FormStyles.module.css';

const scopes = [
  'Full Planning',
  'Partial Planning',
  'Day-of Coordination',
  'Decor & Styling Only',
];

export default function Step2Planner({ formData, onChange, errors = {} }) {
  const planner = formData.plannerDetails || {};
  const budget = planner.budget || { min: 0, max: 0, currency: 'INR' };

  const handleFieldChange = (field, value) => {
    onChange('plannerDetails', {
      ...planner,
      [field]: value,
    });
  };

  return (
    <div className={styles.formSection}>
      <div>
        <div className="badge badge-planner" style={{ marginBottom: '6px' }}>
          Event Planner • Step 2
        </div>
        <h2 className={styles.sectionTitle}>Planning Scope & Guests</h2>
        <p className={styles.sectionSubtitle}>Define planner involvement and event scale.</p>
      </div>

      <div className={styles.formGrid}>
        {/* Planning Scope */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="planningScope">
            Planning Scope <span className={styles.requiredStar}>*</span>
          </label>
          <select
            id="planningScope"
            className={`${styles.select} ${errors.planningScope ? styles.inputError : ''}`}
            value={planner.planningScope || 'Full Planning'}
            onChange={(e) => handleFieldChange('planningScope', e.target.value)}
          >
            {scopes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.planningScope && <span className={styles.errorMessage}>{errors.planningScope}</span>}
        </div>

        {/* Guest Count */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="guestCount">
            Estimated Guest Count <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="guestCount"
            type="number"
            min="1"
            className={`${styles.input} ${errors.guestCount ? styles.inputError : ''}`}
            placeholder="e.g. 200"
            value={planner.guestCount || ''}
            onChange={(e) => handleFieldChange('guestCount', e.target.value === '' ? '' : Number(e.target.value))}
          />
          {errors.guestCount && <span className={styles.errorMessage}>{errors.guestCount}</span>}
        </div>

        {/* Estimated Budget */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="budgetMax">
            Estimated Budget (₹ INR)
          </label>
          <input
            id="budgetMax"
            type="number"
            min="0"
            className={styles.input}
            placeholder="e.g. 300000"
            value={budget.max || ''}
            onChange={(e) =>
              onChange('plannerDetails', {
                ...planner,
                budget: { ...budget, max: e.target.value === '' ? '' : Number(e.target.value) },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
