'use client';

import formStyles from '../FormStyles.module.css';
import styles from './Step4Review.module.css';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Edit2,
  User,
  Mail,
  Phone,
  Building,
  Zap,
  AlertCircle,
} from 'lucide-react';

export default function Step4Review({ formData, onChange, onJumpToStep, errors = {} }) {
  const basics = formData.eventBasics || {};
  const location = basics.location || {};
  const venue = basics.venue || {};
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

  const urgencyOptions = ['Normal', 'Urgent (Within 48h)', 'Immediate (Same Day)'];

  return (
    <div className={`${formStyles.formSection} animate-fade-in`}>
      <div className={formStyles.sectionHeader}>
        <div className="badge badge-success" style={{ marginBottom: '8px' }}>
          Step 04 • Final Verification
        </div>
        <h2 className={formStyles.sectionTitle}>
          <CheckCircle2 size={22} color="#10b981" />
          Review Requirement & Poster Details
        </h2>
        <p className={formStyles.sectionSubtitle}>
          Verify your posted requirements, specify contact details for quotes/proposals, and publish to the backend.
        </p>
      </div>

      <div className={styles.reviewSummary}>
        {/* Event Basics Card */}
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Calendar size={18} color="#6366f1" />
              <span>Event Basics</span>
            </div>
            <button
              type="button"
              className={styles.editButton}
              onClick={() => onJumpToStep(1)}
            >
              <Edit2 size={12} />
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Event Name</span>
              <span className={styles.detailValue}>{basics.eventName || '—'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Type</span>
              <span className={styles.detailValue}>{basics.eventType || '—'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Category</span>
              <span className={styles.detailValue}>
                <span className={`badge badge-${category}`}>{category}</span>
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Date(s)</span>
              <span className={styles.detailValue}>
                {basics.startDate || '—'}{' '}
                {basics.isDateRange && basics.endDate ? `to ${basics.endDate}` : ''}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>
                {location.city || '—'} {location.state ? `, ${location.state}` : ''}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Venue</span>
              <span className={styles.detailValue}>
                {venue.name || 'Not specified'} ({venue.venueType || 'TBD'})
              </span>
            </div>
          </div>
        </div>

        {/* Category Specific Summary Card */}
        {category === 'planner' && (
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Sparkles size={18} color="#7c3aed" />
                <span>Planner Specifications</span>
              </div>
              <button
                type="button"
                className={styles.editButton}
                onClick={() => onJumpToStep(2)}
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Planning Scope</span>
                <span className={styles.detailValue}>{planner.planningScope || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Guest Count</span>
                <span className={styles.detailValue}>{planner.guestCount ? `${planner.guestCount} guests` : '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Theme</span>
                <span className={styles.detailValue}>{planner.themePreference || 'Not specified'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Budget Range</span>
                <span className={styles.detailValue}>
                  ₹{planner.budget?.min?.toLocaleString('en-IN') || 0} - ₹{planner.budget?.max?.toLocaleString('en-IN') || 0}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Planner Tier</span>
                <span className={styles.detailValue}>{planner.plannerTier || 'Any'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Languages</span>
                <span className={styles.detailValue}>
                  {planner.preferredLanguages?.join(', ') || 'Any'}
                </span>
              </div>
            </div>

            {planner.servicesNeeded?.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Services Required</span>
                <div className={styles.chipsList}>
                  {planner.servicesNeeded.map((s) => (
                    <span key={s} className={styles.chip}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {category === 'performer' && (
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Sparkles size={18} color="#db2777" />
                <span>Performer Specifications</span>
              </div>
              <button
                type="button"
                className={styles.editButton}
                onClick={() => onJumpToStep(2)}
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Role / Act</span>
                <span className={styles.detailValue}>{perf.performerRole || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Duration</span>
                <span className={styles.detailValue}>{perf.durationMinutes ? `${perf.durationMinutes} mins` : '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Audience Vibe</span>
                <span className={styles.detailValue}>{perf.audienceVibe || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Honorarium Budget</span>
                <span className={styles.detailValue}>
                  ₹{perf.budget?.min?.toLocaleString('en-IN') || 0} - ₹{perf.budget?.max?.toLocaleString('en-IN') || 0}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Sound Equipment</span>
                <span className={styles.detailValue}>
                  {perf.soundEquipmentProvided ? 'Provided by Organizer' : 'Required from Artist'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Song Requests</span>
                <span className={styles.detailValue}>
                  {perf.customSongRequestsAllowed !== false ? 'Permitted' : 'Strict Repertoire'}
                </span>
              </div>
            </div>

            {perf.genres?.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Genres & Styles</span>
                <div className={styles.chipsList}>
                  {perf.genres.map((g) => (
                    <span key={g} className={styles.chip}>{g}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {category === 'crew' && (
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Sparkles size={18} color="#0284c7" />
                <span>Crew Specifications</span>
              </div>
              <button
                type="button"
                className={styles.editButton}
                onClick={() => onJumpToStep(2)}
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Discipline</span>
                <span className={styles.detailValue}>{crew.crewDiscipline || '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Headcount Needed</span>
                <span className={styles.detailValue}>{crew.headcount ? `${crew.headcount} crew members` : '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Shift Duration</span>
                <span className={styles.detailValue}>{crew.shiftHours ? `${crew.shiftHours} hours` : '—'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Call Time</span>
                <span className={styles.detailValue}>{crew.callTime || 'To be communicated'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Rate per Head</span>
                <span className={styles.detailValue}>
                  ₹{crew.rateAmount?.toLocaleString('en-IN') || 0} ({crew.rateType || 'Per Day'})
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Gear Ownership</span>
                <span className={styles.detailValue}>{crew.equipmentOwnership || 'Venue/Organizer'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Poster / Contact Information */}
      <div className={styles.contactSection}>
        <div className={styles.contactHeading}>
          <User size={20} color="#4f46e5" />
          <span>Poster Contact Details</span>
        </div>

        <div className={formStyles.formGrid}>
          {/* Full Name */}
          <div className={formStyles.formGroup}>
            <label className={formStyles.label} htmlFor="contactName">
              Contact Person Name <span className={formStyles.requiredStar}>*</span>
            </label>
            <div className={formStyles.inputWrapper}>
              <User size={18} className={formStyles.inputIcon} />
              <input
                id="contactName"
                type="text"
                className={`${formStyles.input} ${formStyles.hasIcon} ${errors.contactName ? formStyles.inputError : ''}`}
                placeholder="e.g. Vikramaditya Rathore"
                value={contact.name || ''}
                onChange={(e) => handleContactChange('name', e.target.value)}
              />
            </div>
            {errors.contactName && (
              <div className={formStyles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.contactName}</span>
              </div>
            )}
          </div>

          {/* Organization */}
          <div className={formStyles.formGroup}>
            <label className={formStyles.label} htmlFor="organization">
              Company / Agency / Production House <span className={formStyles.labelHint}>(Optional)</span>
            </label>
            <div className={formStyles.inputWrapper}>
              <Building size={18} className={formStyles.inputIcon} />
              <input
                id="organization"
                type="text"
                className={`${formStyles.input} ${formStyles.hasIcon}`}
                placeholder="e.g. Starline Entertainment Pvt Ltd"
                value={contact.organization || ''}
                onChange={(e) => handleContactChange('organization', e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className={formStyles.formGroup}>
            <label className={formStyles.label} htmlFor="contactEmail">
              Official Email <span className={formStyles.requiredStar}>*</span>
            </label>
            <div className={formStyles.inputWrapper}>
              <Mail size={18} className={formStyles.inputIcon} />
              <input
                id="contactEmail"
                type="email"
                className={`${formStyles.input} ${formStyles.hasIcon} ${errors.contactEmail ? formStyles.inputError : ''}`}
                placeholder="vikram@rathoreevents.in"
                value={contact.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
              />
            </div>
            {errors.contactEmail && (
              <div className={formStyles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.contactEmail}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className={formStyles.formGroup}>
            <label className={formStyles.label} htmlFor="contactPhone">
              Phone Number <span className={formStyles.requiredStar}>*</span>
            </label>
            <div className={formStyles.inputWrapper}>
              <Phone size={18} className={formStyles.inputIcon} />
              <input
                id="contactPhone"
                type="tel"
                className={`${formStyles.input} ${formStyles.hasIcon} ${errors.contactPhone ? formStyles.inputError : ''}`}
                placeholder="+91 98765 43210"
                value={contact.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
              />
            </div>
            {errors.contactPhone && (
              <div className={formStyles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.contactPhone}</span>
              </div>
            )}
          </div>

          {/* Urgency Level */}
          <div className={`${formStyles.formGroup} ${formStyles.fullWidth}`}>
            <label className={formStyles.label}>
              <Zap size={16} color="#f59e0b" />
              <span>Requirement Urgency Level</span>
            </label>
            <div className={styles.urgencyChips}>
              {urgencyOptions.map((urg) => (
                <button
                  key={urg}
                  type="button"
                  className={`${styles.urgencyChip} ${formData.urgencyLevel === urg ? styles.active : ''}`}
                  onClick={() => onChange('urgencyLevel', urg)}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
