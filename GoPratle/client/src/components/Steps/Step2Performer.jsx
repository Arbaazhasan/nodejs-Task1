'use client';

import styles from '../FormStyles.module.css';

const roles = [
  'Live Band',
  'Solo Singer / Acoustic',
  'DJ',
  'Stand-up Comedian',
  'Anchor / MC',
  'Dance Troupe',
  'Magician / Illusionist',
  'Celebrity Artist',
];

export default function Step2Performer({ formData, onChange, errors = {} }) {
  const perf = formData.performerDetails || {};
  const genres = perf.genres || [];

  const handleFieldChange = (field, value) => {
    onChange('performerDetails', {
      ...perf,
      [field]: value,
    });
  };

  const handleGenreInput = (val) => {
    const list = val.split(',').map((s) => s.trim()).filter(Boolean);
    handleFieldChange('genres', list);
  };

  return (
    <div className={styles.formSection}>
      <div>
        <div className="badge badge-performer" style={{ marginBottom: '6px' }}>
          Performer • Step 2
        </div>
        <h2 className={styles.sectionTitle}>Performer Type & Genre</h2>
        <p className={styles.sectionSubtitle}>Specify the type of entertainer and performance length.</p>
      </div>

      <div className={styles.formGrid}>
        {/* Performer Role */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="performerRole">
            Performer Type / Role <span className={styles.requiredStar}>*</span>
          </label>
          <select
            id="performerRole"
            className={`${styles.select} ${errors.performerRole ? styles.inputError : ''}`}
            value={perf.performerRole || 'Live Band'}
            onChange={(e) => handleFieldChange('performerRole', e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.performerRole && <span className={styles.errorMessage}>{errors.performerRole}</span>}
        </div>

        {/* Music Genre / Style */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="genres">
            Music Genres / Style <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="genres"
            type="text"
            className={`${styles.input} ${errors.genres ? styles.inputError : ''}`}
            placeholder="e.g. Bollywood, Pop, Rock, Sufi (comma separated)"
            value={genres.join(', ')}
            onChange={(e) => handleGenreInput(e.target.value)}
          />
          {errors.genres && <span className={styles.errorMessage}>{errors.genres}</span>}
        </div>

        {/* Duration */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="durationMinutes">
            Duration (Minutes) <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="durationMinutes"
            type="number"
            min="15"
            step="15"
            className={`${styles.input} ${errors.durationMinutes ? styles.inputError : ''}`}
            placeholder="e.g. 60 or 90"
            value={perf.durationMinutes || ''}
            onChange={(e) => handleFieldChange('durationMinutes', Number(e.target.value))}
          />
          {errors.durationMinutes && <span className={styles.errorMessage}>{errors.durationMinutes}</span>}
        </div>
      </div>
    </div>
  );
}
