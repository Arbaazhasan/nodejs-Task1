'use client';

import styles from '../FormStyles.module.css';
import { ShieldCheck, Tool, IndianRupee, Utensils, Wrench } from 'lucide-react';

const skillOptions = [
  { value: 'Entry Level / Assistant', label: 'Entry Level / Assistant', desc: 'Assists senior leads with cabling, staging & runner tasks' },
  { value: 'Mid-Level Specialist', label: 'Mid-Level Specialist', desc: 'Independent operator (camera op, console tech, sound engineer)' },
  { value: 'Senior Lead / Director', label: 'Senior Lead / Director', desc: 'Technical director, master rigger, live broadcast head' },
];

const equipmentOwnershipOptions = [
  { value: 'Crew Must Bring Own Equipment', label: 'Crew Brings Own Gear (Cameras/Kits/Gimbals)' },
  { value: 'Venue/Organizer Provides Equipment', label: 'Venue / Production House Provides Gear' },
  { value: 'Hybrid', label: 'Hybrid (Base gear on-site, crew brings personal tools)' },
];

const rateTypeOptions = ['Per Day', 'Per Shift', 'Hourly', 'Fixed Contract'];

const safetyOptions = [
  'Safety Briefing & PPE Required',
  'High-Risk Rigging Insurance Provided',
  'First Aid & Paramedic On-Site',
  'Heavy Lifting Assistance Provided',
];

export default function Step3Crew({ formData, onChange }) {
  const crew = formData.crewDetails || {};
  const safety = crew.safetyProvisions || [];

  const handleFieldChange = (field, value) => {
    onChange('crewDetails', {
      ...crew,
      [field]: value,
    });
  };

  const toggleSafety = (item) => {
    const updated = safety.includes(item)
      ? safety.filter((s) => s !== item)
      : [...safety, item];
    handleFieldChange('safetyProvisions', updated);
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <div className="badge badge-crew" style={{ marginBottom: '8px' }}>
          Crew • Step 03
        </div>
        <h2 className={styles.sectionTitle}>
          <ShieldCheck size={22} color="#22d3ee" />
          Crew Skill Level, Rates & Safety Provisions
        </h2>
        <p className={styles.sectionSubtitle}>
          Define technical certification levels, gear ownership responsibility, payout terms, and safety precautions.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Skill Level */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Crew Seniority & Skill Level</label>
          <div className={styles.chipsContainer}>
            {skillOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${styles.chipButton} ${crew.skillLevel === opt.value ? styles.active : ''}`}
                onClick={() => handleFieldChange('skillLevel', opt.value)}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Ownership */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Equipment & Gear Responsibility</label>
          <div className={styles.chipsContainer}>
            {equipmentOwnershipOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${styles.chipButton} ${crew.equipmentOwnership === opt.value ? styles.active : ''}`}
                onClick={() => handleFieldChange('equipmentOwnership', opt.value)}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rate Structure */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="rateType">
            Rate Payment Basis
          </label>
          <select
            id="rateType"
            className={styles.select}
            value={crew.rateType || 'Per Day'}
            onChange={(e) => handleFieldChange('rateType', e.target.value)}
          >
            {rateTypeOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Rate Amount (INR) */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="rateAmount">
            Rate Amount per Head (₹ INR)
          </label>
          <div className={styles.inputWrapper}>
            <IndianRupee size={16} className={styles.inputIcon} />
            <input
              id="rateAmount"
              type="number"
              min="0"
              step="500"
              className={`${styles.input} ${styles.hasIcon}`}
              placeholder="e.g. 5000"
              value={crew.rateAmount || ''}
              onChange={(e) => handleFieldChange('rateAmount', Number(e.target.value))}
            />
          </div>
        </div>

        {/* Meals Provided Toggle */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabelGroup}>
              <span className={styles.toggleLabel}>Crew Meals & Refreshments Provided?</span>
              <span className={styles.toggleDescription}>
                Provide hot meals, bottled water, and tea/coffee across production shifts
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={crew.mealsProvided !== false}
                onChange={(e) => handleFieldChange('mealsProvided', e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        {/* Safety Provisions */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Production Safety Protocols & Provisions</label>
          <div className={styles.chipsContainer}>
            {safetyOptions.map((item) => (
              <button
                key={item}
                type="button"
                className={`${styles.chipButton} ${safety.includes(item) ? styles.active : ''}`}
                onClick={() => toggleSafety(item)}
              >
                <span>{safety.includes(item) ? '✓ ' : '+ '}</span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="specialNotes">
            Technical Specs, Rigging Protocols or Special Instructions
          </label>
          <textarea
            id="specialNotes"
            className={styles.textarea}
            placeholder="e.g. Bring own harness if working on trusses; must report to stage manager at door #4..."
            value={crew.specialNotes || ''}
            onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
