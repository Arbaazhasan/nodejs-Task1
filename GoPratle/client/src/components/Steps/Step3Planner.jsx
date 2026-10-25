'use client';

import styles from '../FormStyles.module.css';

const servicesList = [
  'Venue Sourcing',
  'Catering Coordination',
  'Decor & Styling',
  'Guest Hospitality',
  'Photography / Video',
  'Permits & Licenses',
];

export default function Step3Planner({ formData, onChange }) {
  const planner = formData.plannerDetails || {};
  const services = planner.servicesNeeded || [];

  const handleFieldChange = (field, value) => {
    onChange('plannerDetails', {
      ...planner,
      [field]: value,
    });
  };

  const toggleService = (item) => {
    const updated = services.includes(item)
      ? services.filter((s) => s !== item)
      : [...services, item];
    handleFieldChange('servicesNeeded', updated);
  };

  return (
    <div className={styles.formSection}>
      <div>
        <div className="badge badge-planner" style={{ marginBottom: '6px' }}>
          Event Planner • Step 3
        </div>
        <h2 className={styles.sectionTitle}>Services & Style</h2>
        <p className={styles.sectionSubtitle}>Specify required services and aesthetic theme.</p>
      </div>

      <div className={styles.formGrid}>
        {/* Theme Preference */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="themePreference">
            Theme / Style Preference
          </label>
          <input
            id="themePreference"
            type="text"
            className={styles.input}
            placeholder="e.g. Traditional Royal, Modern Minimalist, Floral Garden"
            value={planner.themePreference || ''}
            onChange={(e) => handleFieldChange('themePreference', e.target.value)}
          />
        </div>

        {/* Services Needed */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Services Required</label>
          <div className={styles.chipsContainer}>
            {servicesList.map((s) => (
              <button
                key={s}
                type="button"
                className={`${styles.chipButton} ${services.includes(s) ? styles.active : ''}`}
                onClick={() => toggleService(s)}
              >
                {services.includes(s) ? '✓ ' : '+ '}
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="specialNotes">
            Additional Notes & Instructions
          </label>
          <textarea
            id="specialNotes"
            className={styles.textarea}
            placeholder="Any special milestones, preferred coordinator languages, or instructions..."
            value={planner.specialNotes || ''}
            onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
