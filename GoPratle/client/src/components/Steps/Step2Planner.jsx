'use client';

import styles from '../FormStyles.module.css';
import { CalendarRange, Users, Palette, IndianRupee, AlertCircle } from 'lucide-react';

const scopeOptions = [
  { value: 'Full Planning', label: 'Full Planning (End-to-End)', desc: 'Concept, vendors, budgeting & day-of execution' },
  { value: 'Partial Planning', label: 'Partial Planning', desc: 'Guidance and vendor integration for pre-booked assets' },
  { value: 'Day-of Coordination', label: 'Day-of Coordination', desc: 'Execution on the event day and vendor management' },
  { value: 'Decor & Styling Only', label: 'Decor & Styling Only', desc: 'Stage design, florals, lighting & ambiance styling' },
];

const themePresets = [
  'Modern Minimalist',
  'Royal Rajputana Vintage',
  'Bohemian Chic',
  'Neon Futuristic / Cyber',
  'Rustic Botanical & Florals',
  'Traditional Indian Festive',
  'Corporate Sleek',
];

const serviceOptions = [
  'Vendor Management',
  'Venue Sourcing',
  'Catering Coordination',
  'Guest Hospitality & RSVP',
  'Timeline Management',
  'Permits & Licensing',
  'Stage & Lighting Design',
  'Gifting & Favors',
];

export default function Step2Planner({ formData, onChange, errors = {} }) {
  const planner = formData.plannerDetails || {};
  const budget = planner.budget || { min: 0, max: 0, currency: 'INR' };
  const services = planner.servicesNeeded || [];

  const handleFieldChange = (field, value) => {
    onChange('plannerDetails', {
      ...planner,
      [field]: value,
    });
  };

  const handleBudgetChange = (field, value) => {
    onChange('plannerDetails', {
      ...planner,
      budget: {
        ...budget,
        [field]: Number(value) || 0,
      },
    });
  };

  const toggleService = (service) => {
    const updated = services.includes(service)
      ? services.filter((s) => s !== service)
      : [...services, service];
    handleFieldChange('servicesNeeded', updated);
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <div className="badge badge-planner" style={{ marginBottom: '8px' }}>
          Event Planner • Step 02
        </div>
        <h2 className={styles.sectionTitle}>
          <CalendarRange size={22} color="#c084fc" />
          Planning Scope, Scale & Aesthetics
        </h2>
        <p className={styles.sectionSubtitle}>
          Define how much involvement you need from the event planning team, your estimated crowd scale, and visual styling.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Planning Scope */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Planning Scope <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.chipsContainer}>
            {scopeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${styles.chipButton} ${planner.planningScope === opt.value ? styles.active : ''}`}
                onClick={() => handleFieldChange('planningScope', opt.value)}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          {errors.planningScope && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.planningScope}</span>
            </div>
          )}
        </div>

        {/* Guest Count */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="guestCount">
            Estimated Guest Count <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Users size={18} className={styles.inputIcon} />
            <input
              id="guestCount"
              type="number"
              min="1"
              className={`${styles.input} ${styles.hasIcon} ${errors.guestCount ? styles.inputError : ''}`}
              placeholder="e.g. 250"
              value={planner.guestCount || ''}
              onChange={(e) => handleFieldChange('guestCount', e.target.value)}
            />
          </div>
          {errors.guestCount && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.guestCount}</span>
            </div>
          )}
        </div>

        {/* Theme Preference */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="themePreference">
            Theme & Aesthetic Style
          </label>
          <div className={styles.inputWrapper}>
            <Palette size={18} className={styles.inputIcon} />
            <input
              id="themePreference"
              type="text"
              className={`${styles.input} ${styles.hasIcon}`}
              placeholder="e.g. Royal Rajputana, Modern Minimalist"
              value={planner.themePreference || ''}
              onChange={(e) => handleFieldChange('themePreference', e.target.value)}
            />
          </div>
        </div>

        {/* Theme Quick Chips */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.labelHint}>Popular Theme Presets:</label>
          <div className={styles.chipsContainer}>
            {themePresets.map((theme) => (
              <button
                key={theme}
                type="button"
                className={`${styles.chipButton} ${planner.themePreference === theme ? styles.active : ''}`}
                onClick={() => handleFieldChange('themePreference', theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range (INR) */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Estimated Planning & Decor Budget Range (₹ INR)
          </label>
          <div className={styles.rangeGrid}>
            <div className={styles.inputWrapper}>
              <IndianRupee size={16} className={styles.inputIcon} />
              <input
                type="number"
                min="0"
                step="5000"
                className={`${styles.input} ${styles.hasIcon}`}
                placeholder="Min Budget (e.g. 200000)"
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
                placeholder="Max Budget (e.g. 800000)"
                value={budget.max || ''}
                onChange={(e) => handleBudgetChange('max', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Key Services Needed */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Key Services Needed from Planner (Multi-select)</label>
          <div className={styles.chipsContainer}>
            {serviceOptions.map((serv) => (
              <button
                key={serv}
                type="button"
                className={`${styles.chipButton} ${services.includes(serv) ? styles.active : ''}`}
                onClick={() => toggleService(serv)}
              >
                <span>{services.includes(serv) ? '✓ ' : '+ '}</span>
                <span>{serv}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
