'use client';

import formStyles from '../FormStyles.module.css';
import styles from './Step4Review.module.css';

export default function Step4Review({ formData, onChange, onJumpToStep, errors = {} }) {
  const basics = formData.eventBasics || {};
  const contact = formData.contactPerson || {};
  const category = formData.category;

  const planner = formData.plannerDetails || {};
  const perf = formData.performerDetails || {};
  const crew = formData.crewDetails || {};

  const handleContactChange = (field, value) => {
    onChange('contactPerson', {
      ...contact,
      [field]: value,
    });
  };

  return (
    <div className={formStyles.formSection}>
      <div>
        <h2 className={formStyles.sectionTitle}>Step 4: Review & Submit</h2>
        <p className={formStyles.sectionSubtitle}>
          Review your requirement details and enter contact information.
        </p>
      </div>

      {/* Clean Minimalist Summary Box */}
      <div className={styles.summaryCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Requirement Summary</span>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            style={{ fontSize: '0.78rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Edit Basics
          </button>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.label}>Event Name:</span>
          <span className={styles.value}>{basics.eventName || '—'}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Type & Location:</span>
          <span className={styles.value}>{basics.eventType || '—'} ({basics.location?.city || '—'})</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Category:</span>
          <span className={`badge badge-${category}`}>{category}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Date:</span>
          <span className={styles.value}>
            {basics.startDate || '—'} {basics.isDateRange && basics.endDate ? `to ${basics.endDate}` : ''}
          </span>
        </div>

        {/* Category Details */}
        {category === 'planner' && (
          <>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Planning Scope:</span>
              <span className={styles.value}>{planner.planningScope || 'Full Planning'}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Guest Count:</span>
              <span className={styles.value}>{planner.guestCount ? `${planner.guestCount} guests` : '—'}</span>
            </div>
          </>
        )}

        {category === 'performer' && (
          <>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Performer Role:</span>
              <span className={styles.value}>{perf.performerRole || 'Live Band'}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Genres:</span>
              <span className={styles.value}>{perf.genres?.join(', ') || 'Any'}</span>
            </div>
          </>
        )}

        {category === 'crew' && (
          <>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Crew Role:</span>
              <span className={styles.value}>{crew.crewDiscipline || 'Sound Tech'}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Headcount & Shift:</span>
              <span className={styles.value}>{crew.headcount || 1} people ({crew.shiftHours || 8} hrs)</span>
            </div>
          </>
        )}
      </div>

      {/* Contact Details Form */}
      <div className={styles.contactBox}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
          Your Contact Information
        </h3>

        <div className={formStyles.formGrid}>
          {/* Name */}
          <div className={formStyles.formGroup}>
            <label className={formStyles.label} htmlFor="name">
              Full Name <span className={formStyles.requiredStar}>*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`${formStyles.input} ${errors.contactName ? formStyles.inputError : ''}`}
              placeholder="e.g. Arbaz Hasan"
              value={contact.name || ''}
              onChange={(e) => handleContactChange('name', e.target.value)}
            />
            {errors.contactName && <span className={formStyles.errorMessage}>{errors.contactName}</span>}
          </div>

          {/* Email */}
          <div className={formStyles.formGroup}>
            <label className={formStyles.label} htmlFor="email">
              Email Address <span className={formStyles.requiredStar}>*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`${formStyles.input} ${errors.contactEmail ? formStyles.inputError : ''}`}
              placeholder="e.g. arbaz@example.com"
              value={contact.email || ''}
              onChange={(e) => handleContactChange('email', e.target.value)}
            />
            {errors.contactEmail && <span className={formStyles.errorMessage}>{errors.contactEmail}</span>}
          </div>

          {/* Phone */}
          <div className={`${formStyles.formGroup} ${formStyles.fullWidth}`}>
            <label className={formStyles.label} htmlFor="phone">
              Phone Number <span className={formStyles.requiredStar}>*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className={`${formStyles.input} ${errors.contactPhone ? formStyles.inputError : ''}`}
              placeholder="e.g. 9876543210"
              value={contact.phone || ''}
              onChange={(e) => handleContactChange('phone', e.target.value)}
            />
            {errors.contactPhone && <span className={formStyles.errorMessage}>{errors.contactPhone}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
