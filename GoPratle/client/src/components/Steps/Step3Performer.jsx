'use client';

import styles from '../FormStyles.module.css';
import { Volume2, IndianRupee, Coffee, Video, Radio, FileText } from 'lucide-react';

const backlinePresets = [
  'Full Acoustic Drum Kit',
  'Guitar Amplifier (Fender/Marshall)',
  'Bass Amplifier (Ampeg/Markbass)',
  'Wireless Handheld Mics (Shure/Sennheiser)',
  'In-Ear Monitoring (IEMs)',
  'Pioneer CDJ-3000 DJ Console',
  'Keyboard / Stage Piano (Nord/Yamaha)',
];

const hospitalityOptions = [
  'Dedicated Private Green Room',
  'Hot Meals & Backstage Refreshments',
  'Local Airport / Venue Transit',
  '4/5-Star Hotel Stay',
  'Dedicated Soundcheck Slot (2 hrs prior)',
];

export default function Step3Performer({ formData, onChange }) {
  const perf = formData.performerDetails || {};
  const budget = perf.budget || { min: 0, max: 0, currency: 'INR' };
  const instruments = perf.requiredInstruments || [];
  const hospitality = perf.hospitalityProvided || [];

  const handleFieldChange = (field, value) => {
    onChange('performerDetails', {
      ...perf,
      [field]: value,
    });
  };

  const handleBudgetChange = (field, value) => {
    onChange('performerDetails', {
      ...perf,
      budget: {
        ...budget,
        [field]: Number(value) || 0,
      },
    });
  };

  const toggleInstrument = (item) => {
    const updated = instruments.includes(item)
      ? instruments.filter((i) => i !== item)
      : [...instruments, item];
    handleFieldChange('requiredInstruments', updated);
  };

  const toggleHospitality = (item) => {
    const updated = hospitality.includes(item)
      ? hospitality.filter((h) => h !== item)
      : [...hospitality, item];
    handleFieldChange('hospitalityProvided', updated);
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <div className="badge badge-performer" style={{ marginBottom: '8px' }}>
          Performer • Step 03
        </div>
        <h2 className={styles.sectionTitle}>
          <Volume2 size={22} color="#db2777" />
          Stage Sound, Backline & Rider Logistics
        </h2>
        <p className={styles.sectionSubtitle}>
          Clarify PA sound provisions, backstage hospitality, song requests, and media filming permissions.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Sound System Provision Toggle */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabelGroup}>
              <span className={styles.toggleLabel}>PA Sound & Stage Audio Provided by Venue/Organizer?</span>
              <span className={styles.toggleDescription}>
                Toggle ON if you already have stage speakers, mixers, and audio technicians on-site
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={Boolean(perf.soundEquipmentProvided)}
                onChange={(e) => handleFieldChange('soundEquipmentProvided', e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        {/* Backline Instruments */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Backline Instruments & Hardware Needed</label>
          <div className={styles.chipsContainer}>
            {backlinePresets.map((gear) => (
              <button
                key={gear}
                type="button"
                className={`${styles.chipButton} ${instruments.includes(gear) ? styles.active : ''}`}
                onClick={() => toggleInstrument(gear)}
              >
                <span>{instruments.includes(gear) ? '✓ ' : '+ '}</span>
                <span>{gear}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Song Request Policy */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabelGroup}>
              <span className={styles.toggleLabel}>Custom Song Requests & Track Customization Permitted?</span>
              <span className={styles.toggleDescription}>
                Allows client to request specific entrance anthems or favorite tracks
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={perf.customSongRequestsAllowed !== false}
                onChange={(e) => handleFieldChange('customSongRequestsAllowed', e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        {/* Recording Permission */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabelGroup}>
              <span className={styles.toggleLabel}>Media Live-Streaming & Video Recording Allowed?</span>
              <span className={styles.toggleDescription}>
                Permission to photograph and record the performer for event archives/reels
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={perf.recordingPermission !== false}
                onChange={(e) => handleFieldChange('recordingPermission', e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        {/* Performer Honorarium Budget Range */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Performer Honorarium Budget Range (₹ INR)</label>
          <div className={styles.rangeGrid}>
            <div className={styles.inputWrapper}>
              <IndianRupee size={16} className={styles.inputIcon} />
              <input
                type="number"
                min="0"
                step="5000"
                className={`${styles.input} ${styles.hasIcon}`}
                placeholder="Min Budget (e.g. 50000)"
                value={budget.min || ''}
                onChange={(e) => handleBudgetChange('min', e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <IndianRupee size={16} className={styles.inputIcon} />
              <input
                type="number"
                min="0"
                step="5000"
                className={`${styles.input} ${styles.hasIcon}`}
                placeholder="Max Budget (e.g. 200000)"
                value={budget.max || ''}
                onChange={(e) => handleBudgetChange('max', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Hospitality Provisions */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Hospitality Provisions Provided for Artists</label>
          <div className={styles.chipsContainer}>
            {hospitalityOptions.map((hosp) => (
              <button
                key={hosp}
                type="button"
                className={`${styles.chipButton} ${hospitality.includes(hosp) ? styles.active : ''}`}
                onClick={() => toggleHospitality(hosp)}
              >
                <span>{hospitality.includes(hosp) ? '✓ ' : '+ '}</span>
                <span>{hosp}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="specialNotes">
            Stage Rider Notes / Specific Performance Instructions
          </label>
          <textarea
            id="specialNotes"
            className={styles.textarea}
            placeholder="e.g. Artist will need wireless mic for walking into the crowd, stage height min 3 feet..."
            value={perf.specialNotes || ''}
            onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
