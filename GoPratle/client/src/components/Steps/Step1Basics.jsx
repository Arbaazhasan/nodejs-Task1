'use client';

import styles from '../FormStyles.module.css';
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import { Calendar, MapPin, Building, Sparkles, AlertCircle } from 'lucide-react';

const eventTypePresets = [
  'Wedding',
  'Corporate',
  'Concert / Music Festival',
  'Birthday Party',
  'College Fest',
  'Exhibition / Trade Show',
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

  const handleVenueChange = (field, value) => {
    onChange('eventBasics', {
      ...basics,
      venue: {
        ...venue,
        [field]: value,
      },
    });
  };

  return (
    <div className={`${styles.formSection} animate-fade-in`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <Sparkles size={22} className="brand-gradient-text" />
          Step 1: Event Basics & Category
        </h2>
        <p className={styles.sectionSubtitle}>
          Provide core event details and choose whether you are hiring an Event Planner, Performer, or Production Crew.
        </p>
      </div>

      {/* Category Selector */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Target Requirement Category <span className={styles.requiredStar}>*</span>
          <span className={styles.labelHint}>(Steps 2 & 3 dynamically adapt to this choice)</span>
        </label>
        <CategoryPicker
          selectedCategory={formData.category}
          onSelectCategory={(cat) => onChange('category', cat)}
        />
        {errors.category && (
          <div className={styles.errorMessage}>
            <AlertCircle size={14} />
            <span>{errors.category}</span>
          </div>
        )}
      </div>

      {/* Event Details Grid */}
      <div className={styles.formGrid}>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="eventName">
            Event Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="eventName"
            type="text"
            className={`${styles.input} ${errors.eventName ? styles.inputError : ''}`}
            placeholder="e.g. Lumina Tech Summit 2026, Grand Royal Reception"
            value={basics.eventName || ''}
            onChange={(e) => handleBasicsChange('eventName', e.target.value)}
          />
          {errors.eventName && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.eventName}</span>
            </div>
          )}
        </div>

        {/* Event Type */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Event Type <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.chipsContainer}>
            {eventTypePresets.map((type) => (
              <button
                key={type}
                type="button"
                className={`${styles.chipButton} ${basics.eventType === type ? styles.active : ''}`}
                onClick={() => handleBasicsChange('eventType', type)}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.eventType && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.eventType}</span>
            </div>
          )}
        </div>

        {/* Date Range Toggle */}
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabelGroup}>
              <span className={styles.toggleLabel}>Multi-Day Event / Date Range?</span>
              <span className={styles.toggleDescription}>
                Toggle on if your event spans across multiple dates
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={Boolean(basics.isDateRange)}
                onChange={(e) => handleBasicsChange('isDateRange', e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        {/* Start Date */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="startDate">
            {basics.isDateRange ? 'Event Start Date' : 'Event Date'}{' '}
            <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Calendar size={18} className={styles.inputIcon} />
            <input
              id="startDate"
              type="date"
              className={`${styles.input} ${styles.hasIcon} ${errors.startDate ? styles.inputError : ''}`}
              value={basics.startDate || ''}
              onChange={(e) => handleBasicsChange('startDate', e.target.value)}
            />
          </div>
          {errors.startDate && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.startDate}</span>
            </div>
          )}
        </div>

        {/* End Date (if isDateRange) */}
        {basics.isDateRange && (
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="endDate">
              Event End Date <span className={styles.requiredStar}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.inputIcon} />
              <input
                id="endDate"
                type="date"
                className={`${styles.input} ${styles.hasIcon} ${errors.endDate ? styles.inputError : ''}`}
                value={basics.endDate || ''}
                min={basics.startDate || ''}
                onChange={(e) => handleBasicsChange('endDate', e.target.value)}
              />
            </div>
            {errors.endDate && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.endDate}</span>
              </div>
            )}
          </div>
        )}

        {/* Location City */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="city">
            City <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <MapPin size={18} className={styles.inputIcon} />
            <input
              id="city"
              type="text"
              className={`${styles.input} ${styles.hasIcon} ${errors.city ? styles.inputError : ''}`}
              placeholder="e.g. Mumbai, Bengaluru, Delhi, Goa"
              value={location.city || ''}
              onChange={(e) => handleLocationChange('city', e.target.value)}
            />
          </div>
          {errors.city && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} />
              <span>{errors.city}</span>
            </div>
          )}
        </div>

        {/* Location State */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="state">
            State / Region <span className={styles.labelHint}>(Optional)</span>
          </label>
          <input
            id="state"
            type="text"
            className={styles.input}
            placeholder="e.g. Maharashtra, Karnataka"
            value={location.state || ''}
            onChange={(e) => handleLocationChange('state', e.target.value)}
          />
        </div>

        {/* Venue Name */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="venueName">
            Venue Name <span className={styles.labelHint}>(Optional)</span>
          </label>
          <div className={styles.inputWrapper}>
            <Building size={18} className={styles.inputIcon} />
            <input
              id="venueName"
              type="text"
              className={`${styles.input} ${styles.hasIcon}`}
              placeholder="e.g. Grand Hyatt Ballroom, Palace Grounds"
              value={venue.name || ''}
              onChange={(e) => handleVenueChange('name', e.target.value)}
            />
          </div>
        </div>

        {/* Venue Type */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="venueType">
            Venue Environment
          </label>
          <select
            id="venueType"
            className={styles.select}
            value={venue.venueType || 'Not Decided Yet'}
            onChange={(e) => handleVenueChange('venueType', e.target.value)}
          >
            <option value="Not Decided Yet">Not Decided Yet</option>
            <option value="Indoor">Indoor (AC Hall / Banquet)</option>
            <option value="Outdoor">Outdoor (Lawn / Amphitheater)</option>
            <option value="Hybrid">Hybrid (Indoor + Outdoor Courtyard)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
