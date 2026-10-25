'use client';

import styles from '../FormStyles.module.css';
import CategoryPicker from '../CategoryPicker/CategoryPicker';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Concert / Music Festival',
  'Birthday Party',
  'College Fest',
  'Exhibition',
  'Private Celebration',
  'Other',
];

export default function Step1Basics({ formData, onChange, errors = {} }) {
  const basics = formData.eventBasics || {};
  const location = basics.location || {};
  const venue = basics.venue || {};

  const handleBasicsChange = (field, value) => {
    onChange('eventBasics', {
      ...basics,
      [field]: value,
    });
  };

  const handleLocationChange = (field, value) => {
    onChange('eventBasics', {
      ...basics,
      location: {
        ...location,
        [field]: value,
      },
    });
  };

  return (
    <div className={styles.formSection}>
      <div>
        <h2 className={styles.sectionTitle}>Step 1: Event Basics</h2>
        <p className={styles.sectionSubtitle}>
          Enter core event information and choose the required category.
        </p>
      </div>

      {/* Category Selector */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Select Category <span className={styles.requiredStar}>*</span>
        </label>
        <CategoryPicker
          selectedCategory={formData.category}
          onSelectCategory={(cat) => onChange('category', cat)}
        />
        {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
      </div>

      <div className={styles.formGrid}>
        {/* Event Name */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="eventName">
            Event Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="eventName"
            type="text"
            className={`${styles.input} ${errors.eventName ? styles.inputError : ''}`}
            placeholder="e.g. Annual Tech Fest 2026, Wedding Reception"
            value={basics.eventName || ''}
            onChange={(e) => handleBasicsChange('eventName', e.target.value)}
          />
          {errors.eventName && <span className={styles.errorMessage}>{errors.eventName}</span>}
        </div>

        {/* Event Type */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="eventType">
            Event Type <span className={styles.requiredStar}>*</span>
          </label>
          <select
            id="eventType"
            className={`${styles.select} ${errors.eventType ? styles.inputError : ''}`}
            value={basics.eventType || 'Wedding'}
            onChange={(e) => handleBasicsChange('eventType', e.target.value)}
          >
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && <span className={styles.errorMessage}>{errors.eventType}</span>}
        </div>

        {/* Location City */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="city">
            Location / City <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="city"
            type="text"
            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
            placeholder="e.g. Mumbai, Bengaluru, Delhi"
            value={location.city || ''}
            onChange={(e) => handleLocationChange('city', e.target.value)}
          />
          {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
        </div>

        {/* Date Range Checkbox */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={Boolean(basics.isDateRange)}
              onChange={(e) => handleBasicsChange('isDateRange', e.target.checked)}
            />
            <span>This is a multi-day event (Date Range)</span>
          </label>
        </div>

        {/* Start Date */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="startDate">
            {basics.isDateRange ? 'Start Date' : 'Event Date'} <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="startDate"
            type="date"
            className={`${styles.input} ${errors.startDate ? styles.inputError : ''}`}
            value={basics.startDate || ''}
            onChange={(e) => handleBasicsChange('startDate', e.target.value)}
          />
          {errors.startDate && <span className={styles.errorMessage}>{errors.startDate}</span>}
        </div>

        {/* End Date (if isDateRange) */}
        {basics.isDateRange && (
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="endDate">
              End Date <span className={styles.requiredStar}>*</span>
            </label>
            <input
              id="endDate"
              type="date"
              className={`${styles.input} ${errors.endDate ? styles.inputError : ''}`}
              value={basics.endDate || ''}
              min={basics.startDate || ''}
              onChange={(e) => handleBasicsChange('endDate', e.target.value)}
            />
            {errors.endDate && <span className={styles.errorMessage}>{errors.endDate}</span>}
          </div>
        )}

        {/* Venue Name (Optional) */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="venueName">
            Venue Name <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
          </label>
          <input
            id="venueName"
            type="text"
            className={styles.input}
            placeholder="e.g. Grand Banquet Hall, Community Centre"
            value={venue.name || ''}
            onChange={(e) =>
              onChange('eventBasics', {
                ...basics,
                venue: { ...(basics.venue || {}), name: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
