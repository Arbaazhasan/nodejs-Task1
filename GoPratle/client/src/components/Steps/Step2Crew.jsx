'use client';

import styles from '../FormStyles.module.css';

const disciplines = [
  'Audio / Sound Engineer',
  'Lighting Technician',
  'Videographer / Camera Crew',
  'Photographer',
  'Stage Hand / Rigger',
  'Security / Bouncers',
  'Hospitality & Usher',
];

export default function Step2Crew({ formData, onChange, errors = {} }) {
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
          Crew • Step 2
        </div>
        <h2 className={styles.sectionTitle}>Crew Role & Headcount</h2>
        <p className={styles.sectionSubtitle}>Specify required discipline, headcount, and work hours.</p>
      </div>

      <div className={styles.formGrid}>
        {/* Crew Discipline */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="crewDiscipline">
            Crew Role / Discipline <span className={styles.requiredStar}>*</span>
          </label>
          <select
            id="crewDiscipline"
            className={`${styles.select} ${errors.crewDiscipline ? styles.inputError : ''}`}
            value={crew.crewDiscipline || 'Audio / Sound Engineer'}
            onChange={(e) => handleFieldChange('crewDiscipline', e.target.value)}
          >
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.crewDiscipline && <span className={styles.errorMessage}>{errors.crewDiscipline}</span>}
        </div>

        {/* Headcount */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="headcount">
            Number of Crew Needed <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="headcount"
            type="number"
            min="1"
            className={`${styles.input} ${errors.headcount ? styles.inputError : ''}`}
            placeholder="e.g. 3"
            value={crew.headcount || ''}
            onChange={(e) => handleFieldChange('headcount', e.target.value === '' ? '' : Number(e.target.value))}
          />
          {errors.headcount && <span className={styles.errorMessage}>{errors.headcount}</span>}
        </div>

        {/* Shift Duration */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="shiftHours">
            Shift Duration (Hours) <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="shiftHours"
            type="number"
            min="1"
            className={`${styles.input} ${errors.shiftHours ? styles.inputError : ''}`}
            placeholder="e.g. 8"
            value={crew.shiftHours || ''}
            onChange={(e) => handleFieldChange('shiftHours', e.target.value === '' ? '' : Number(e.target.value))}
          />
          {errors.shiftHours && <span className={styles.errorMessage}>{errors.shiftHours}</span>}
        </div>
      </div>
    </div>
  );
}
