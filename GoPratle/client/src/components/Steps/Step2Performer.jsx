'use client';

import styles from '../FormStyles.module.css';
import { Mic, Music, Clock, Sparkles, AlertCircle } from 'lucide-react';

const performerRoles = [
  'Live Band',
  'Solo Singer / Acoustic',
  'DJ',
  'Stand-up Comedian',
  'Anchor / MC',
  'Dance Troupe',
  'Magician / Illusionist',
  'Celebrity Artist',
];

const genreOptions = [
  'Bollywood',
  'Sufi',
  'EDM / Electronic',
  'Pop / Rock',
  'Classical / Semi-Classical',
  'Jazz / Blues',
  'Punjabi / Folk',
  'Hip Hop / Rap',
  'Indie Acoustic',
];

const vibeOptions = [
  'High Energy / Party',
  'Elegant & Ambient',
  'Interactive & Humorous',
  'Family-Friendly / Festive',
];

const durationPresets = [45, 60, 90, 120, 180];

export default function Step2Performer({ formData, onChange, errors = {} }) {
  const perf = formData.performerDetails || {};
  const genres = perf.genres || [];

  const handleFieldChange = (field, value) => {
    onChange('performerDetails', {
      ...perf,
      [field]: value,
    });
  };

  const toggleGenre = (genre) => {
    const updated = genres.includes(genre)
      ? genres.filter((g) => g !== genre)
      : [...genres, genre];
    handleFieldChange('genres', updated);
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <div className="badge badge-performer" style={{ marginBottom: '8px' }}>
          Performer • Step 02
        </div>
        <h2 className={styles.sectionTitle}>
          <Mic size={22} color="#db2777" />
          Performer Role, Genres & Stage Vibe
        </h2>
        <p className={styles.sectionSubtitle}>
          Select the type of entertainer, musical or artistic genres, stage duration, and intended crowd energy.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Performer Role */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Performer Role / Talent Type <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.chipsContainer}>
            {performerRoles.map((role) => (
              <button
                key={role}
                type="button"
                className={`${styles.chipButton} ${perf.performerRole === role ? styles.active : ''}`}
                onClick={() => handleFieldChange('performerRole', role)}
              >
                <span>{role}</span>
              </button>
            ))}
          </div>
          {errors.performerRole && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.performerRole}</span>
            </div>
          )}
        </div>

        {/* Music Genres / Styles */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Music Genres / Performance Styles <span className={styles.requiredStar}>*</span>
            <span className={styles.labelHint}>(Select at least one)</span>
          </label>
          <div className={styles.chipsContainer}>
            {genreOptions.map((genre) => (
              <button
                key={genre}
                type="button"
                className={`${styles.chipButton} ${genres.includes(genre) ? styles.active : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                <span>{genres.includes(genre) ? '✓ ' : '+ '}</span>
                <span>{genre}</span>
              </button>
            ))}
          </div>
          {errors.genres && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.genres}</span>
            </div>
          )}
        </div>

        {/* Duration */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="durationMinutes">
            Performance Duration (Minutes) <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Clock size={18} className={styles.inputIcon} />
            <input
              id="durationMinutes"
              type="number"
              min="15"
              step="15"
              className={`${styles.input} ${styles.hasIcon} ${errors.durationMinutes ? styles.inputError : ''}`}
              placeholder="e.g. 90"
              value={perf.durationMinutes || ''}
              onChange={(e) => handleFieldChange('durationMinutes', Number(e.target.value))}
            />
          </div>
          <div className={styles.chipsContainer} style={{ marginTop: '6px' }}>
            {durationPresets.map((dur) => (
              <button
                key={dur}
                type="button"
                className={`${styles.chipButton} ${perf.durationMinutes === dur ? styles.active : ''}`}
                onClick={() => handleFieldChange('durationMinutes', dur)}
              >
                {dur} mins
              </button>
            ))}
          </div>
          {errors.durationMinutes && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.durationMinutes}</span>
            </div>
          )}
        </div>

        {/* Audience Vibe */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="audienceVibe">
            Target Audience Vibe & Energy
          </label>
          <select
            id="audienceVibe"
            className={styles.select}
            value={perf.audienceVibe || 'High Energy / Party'}
            onChange={(e) => handleFieldChange('audienceVibe', e.target.value)}
          >
            {vibeOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
