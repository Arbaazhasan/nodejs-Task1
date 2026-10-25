'use client';

import styles from '../FormStyles.module.css';
import { Sliders, Users, Clock, Moon, Shirt, AlertCircle } from 'lucide-react';

const disciplines = [
  'Audio / Sound Engineer',
  'Lighting Technician',
  'Videographer / Camera Crew',
  'Photographer',
  'Stage Hand / Rigger',
  'Security / Bouncers',
  'Hospitality & Usher',
];

const dressCodeOptions = [
  { value: 'All Black Production', label: 'All Black (Crew Standard)' },
  { value: 'Formal / Business Attire', label: 'Formal / Business Suit' },
  { value: 'Casual / Branded Tee', label: 'Casual / Event T-Shirt' },
  { value: 'Traditional', label: 'Traditional Ethnic' },
];

const hourPresets = [4, 6, 8, 10, 12, 14];

export default function Step2Crew({ formData, onChange, errors = {} }) {
  const crew = formData.crewDetails || {};

  const handleFieldChange = (field, value) => {
    onChange('crewDetails', {
      ...crew,
      [field]: value,
    });
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <div className="badge badge-crew" style={{ marginBottom: '8px' }}>
          Crew • Step 02
        </div>
        <h2 className={styles.sectionTitle}>
          <Sliders size={22} color="#0284c7" />
          Crew Discipline, Headcount & Call Time
        </h2>
        <p className={styles.sectionSubtitle}>
          Select required technical expertise, number of crew members required, shift timing, and dress code.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Crew Discipline */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Technical Discipline / Role <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.chipsContainer}>
            {disciplines.map((role) => (
              <button
                key={role}
                type="button"
                className={`${styles.chipButton} ${crew.crewDiscipline === role ? styles.active : ''}`}
                onClick={() => handleFieldChange('crewDiscipline', role)}
              >
                <span>{role}</span>
              </button>
            ))}
          </div>
          {errors.crewDiscipline && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.crewDiscipline}</span>
            </div>
          )}
        </div>

        {/* Headcount */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="headcount">
            Total Crew Members Needed (Headcount) <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Users size={18} className={styles.inputIcon} />
            <input
              id="headcount"
              type="number"
              min="1"
              max="100"
              className={`${styles.input} ${styles.hasIcon} ${errors.headcount ? styles.inputError : ''}`}
              placeholder="e.g. 4"
              value={crew.headcount || ''}
              onChange={(e) => handleFieldChange('headcount', Number(e.target.value))}
            />
          </div>
          {errors.headcount && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.headcount}</span>
            </div>
          )}
        </div>

        {/* Call Time */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="callTime">
            Call Time on Venue
          </label>
          <div className={styles.inputWrapper}>
            <Clock size={18} className={styles.inputIcon} />
            <input
              id="callTime"
              type="text"
              className={`${styles.input} ${styles.hasIcon}`}
              placeholder="e.g. 07:30 AM or 2 hours prior to doors open"
              value={crew.callTime || ''}
              onChange={(e) => handleFieldChange('callTime', e.target.value)}
            />
          </div>
        </div>

        {/* Shift Duration (Hours) */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="shiftHours">
            Shift Duration (Hours) <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Clock size={18} className={styles.inputIcon} />
            <input
              id="shiftHours"
              type="number"
              min="1"
              max="24"
              className={`${styles.input} ${styles.hasIcon} ${errors.shiftHours ? styles.inputError : ''}`}
              placeholder="e.g. 8"
              value={crew.shiftHours || ''}
              onChange={(e) => handleFieldChange('shiftHours', Number(e.target.value))}
            />
          </div>
          <div className={styles.chipsContainer} style={{ marginTop: '6px' }}>
            {hourPresets.map((hrs) => (
              <button
                key={hrs}
                type="button"
                className={`${styles.chipButton} ${crew.shiftHours === hrs ? styles.active : ''}`}
                onClick={() => handleFieldChange('shiftHours', hrs)}
              >
                {hrs} hrs
              </button>
            ))}
          </div>
          {errors.shiftHours && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.shiftHours}</span>
            </div>
          )}
        </div>

        {/* Dress Code */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="dressCode">
            Required Dress Code
          </label>
          <select
            id="dressCode"
            className={styles.select}
            value={crew.dressCode || 'All Black Production'}
            onChange={(e) => handleFieldChange('dressCode', e.target.value)}
          >
            {dressCodeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Overnight Shift Toggle */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabelGroup}>
              <span className={styles.toggleLabel}>Overnight / Late Night Breakdown Shift?</span>
              <span className={styles.toggleDescription}>
                Requires crew availability past 11:00 PM for teardown or overnight setup
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={Boolean(crew.isOvernight)}
                onChange={(e) => handleFieldChange('isOvernight', e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
