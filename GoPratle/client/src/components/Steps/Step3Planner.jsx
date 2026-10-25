'use client';

import styles from '../FormStyles.module.css';
import { Award, Globe, Link2, FileText, CalendarCheck2 } from 'lucide-react';

const tierOptions = [
  { value: 'Emerging / Budget Friendly', label: 'Emerging / Budget Friendly', desc: 'Up-and-coming talent, cost-effective execution' },
  { value: 'Experienced Mid-Tier', label: 'Experienced Mid-Tier', desc: '5+ years track record, reliable vendor network' },
  { value: 'Luxury & Celebrity Specialist', label: 'Luxury & Celebrity Specialist', desc: 'High-profile bespoke events, top-tier production' },
];

const languageOptions = ['English', 'Hindi', 'Punjabi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu'];

export default function Step3Planner({ formData, onChange }) {
  const planner = formData.plannerDetails || {};
  const languages = planner.preferredLanguages || [];

  const handleFieldChange = (field, value) => {
    onChange('plannerDetails', {
      ...planner,
      [field]: value,
    });
  };

  const toggleLanguage = (lang) => {
    const updated = languages.includes(lang)
      ? languages.filter((l) => l !== lang)
      : [...languages, lang];
    handleFieldChange('preferredLanguages', updated);
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <div className="badge badge-planner" style={{ marginBottom: '8px' }}>
          Event Planner • Step 03
        </div>
        <h2 className={styles.sectionTitle}>
          <Award size={22} color="#7c3aed" />
          Execution Milestones & Planner Tier
        </h2>
        <p className={styles.sectionSubtitle}>
          Specify coordinator experience tier, language fluency requirements, moodboards, and critical planning deadlines.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Planner Experience Tier */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Planner Experience Tier</label>
          <div className={styles.chipsContainer}>
            {tierOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${styles.chipButton} ${planner.plannerTier === opt.value ? styles.active : ''}`}
                onClick={() => handleFieldChange('plannerTier', opt.value)}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Languages */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Preferred Languages for On-Site Coordinators (Multi-select)
          </label>
          <div className={styles.chipsContainer}>
            {languageOptions.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`${styles.chipButton} ${languages.includes(lang) ? styles.active : ''}`}
                onClick={() => toggleLanguage(lang)}
              >
                <span>{languages.includes(lang) ? '✓ ' : '+ '}</span>
                <span>{lang}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Moodboard URL */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="moodboardUrl">
            Moodboard or Inspiration Link <span className={styles.labelHint}>(Pinterest, Google Drive, Canva)</span>
          </label>
          <div className={styles.inputWrapper}>
            <Link2 size={18} className={styles.inputIcon} />
            <input
              id="moodboardUrl"
              type="url"
              className={`${styles.input} ${styles.hasIcon}`}
              placeholder="https://pinterest.com/pin/example or Drive link"
              value={planner.moodboardUrl || ''}
              onChange={(e) => handleFieldChange('moodboardUrl', e.target.value)}
            />
          </div>
        </div>

        {/* Critical Milestones */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="criticalMilestones">
            Critical Deadlines & Milestones
          </label>
          <div className={styles.inputWrapper}>
            <CalendarCheck2 size={18} className={styles.inputIcon} />
            <input
              id="criticalMilestones"
              type="text"
              className={`${styles.input} ${styles.hasIcon}`}
              placeholder="e.g. Venue lock-in by Nov 1, Final decor rendering 30 days prior"
              value={planner.criticalMilestones || ''}
              onChange={(e) => handleFieldChange('criticalMilestones', e.target.value)}
            />
          </div>
        </div>

        {/* Special Notes */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="specialNotes">
            Special Instructions & Cultural Considerations
          </label>
          <textarea
            id="specialNotes"
            className={styles.textarea}
            placeholder="Mention any VIP guests, strict dietary rules (e.g. Pure Jain / Halal), or auspicious timing requirements..."
            value={planner.specialNotes || ''}
            onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
