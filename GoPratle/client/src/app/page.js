'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import formStyles from '../components/FormStyles.module.css';

import Navbar from '../components/Navbar/Navbar';
import Stepper from '../components/Stepper/Stepper';
import Step1Basics from '../components/Steps/Step1Basics';
import Step2Planner from '../components/Steps/Step2Planner';
import Step3Planner from '../components/Steps/Step3Planner';
import Step2Performer from '../components/Steps/Step2Performer';
import Step3Performer from '../components/Steps/Step3Performer';
import Step2Crew from '../components/Steps/Step2Crew';
import Step3Crew from '../components/Steps/Step3Crew';
import Step4Review from '../components/Steps/Step4Review';
import SuccessModal from '../components/SuccessModal/SuccessModal';
import LiveDashboard from '../components/LiveDashboard/LiveDashboard';

import { validateStep } from '../utils/validation';
import { samplePresets } from '../utils/presets';
import { api } from '../services/api';
import { ArrowLeft, ArrowRight, Send, Check, AlertCircle, Save } from 'lucide-react';

const initialFormData = {
  category: 'planner',
  urgencyLevel: 'Normal',
  eventBasics: {
    eventName: '',
    eventType: 'Wedding',
    isDateRange: false,
    startDate: '',
    endDate: '',
    location: {
      city: '',
      state: '',
      address: '',
      pincode: '',
    },
    venue: {
      name: '',
      venueType: 'Not Decided Yet',
    },
  },
  plannerDetails: {
    planningScope: 'Full Planning',
    guestCount: 250,
    themePreference: '',
    budget: { min: 200000, max: 600000, currency: 'INR' },
    servicesNeeded: ['Vendor Management', 'Venue Sourcing', 'Catering Coordination'],
    plannerTier: 'Experienced Mid-Tier',
    preferredLanguages: ['English', 'Hindi'],
    criticalMilestones: '',
    moodboardUrl: '',
    specialNotes: '',
  },
  performerDetails: {
    performerRole: 'Live Band',
    genres: ['Bollywood', 'Pop / Rock'],
    durationMinutes: 90,
    audienceVibe: 'High Energy / Party',
    soundEquipmentProvided: true,
    requiredInstruments: ['Wireless Handheld Mics (Shure/Sennheiser)'],
    customSongRequestsAllowed: true,
    budget: { min: 100000, max: 250000, currency: 'INR' },
    hospitalityProvided: ['Dedicated Private Green Room', 'Hot Meals & Backstage Refreshments'],
    recordingPermission: true,
    specialNotes: '',
  },
  crewDetails: {
    crewDiscipline: 'Audio / Sound Engineer',
    headcount: 3,
    callTime: '08:00 AM',
    shiftHours: 8,
    isOvernight: false,
    dressCode: 'All Black Production',
    skillLevel: 'Mid-Level Specialist',
    equipmentOwnership: 'Venue/Organizer Provides Equipment',
    rateType: 'Per Day',
    rateAmount: 6000,
    safetyProvisions: ['Safety Briefing & PPE Required'],
    mealsProvided: true,
    specialNotes: '',
  },
  contactPerson: {
    name: '',
    organization: '',
    email: '',
    phone: '',
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'dashboard'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);

  // Restore draft from localStorage on initial client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gopratle_requirement_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      }
    } catch (e) {
      console.warn('Could not read draft from localStorage', e);
    }
  }, []);

  // Autosave draft to localStorage when formData changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('gopratle_requirement_draft', JSON.stringify(formData));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
      } catch (e) {
        // storage quota or incognito
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleFieldChange = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
    // Clear section level errors
    setErrors({});
  };

  const handleNext = () => {
    // Validate current step
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepNumber) => {
    setErrors({});
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    // Validate step 4
    const validation = validateStep(4, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await api.postRequirement(formData);
      if (response.success && response.data) {
        setSubmittedData(response.data);
        // Clear draft on successful submission
        localStorage.removeItem('gopratle_requirement_draft');
      } else {
        setSubmissionError(response.message || 'Submission failed');
      }
    } catch (err) {
      setSubmissionError(err.message || 'Failed to submit requirement to backend.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillSample = (presetCategory) => {
    const preset = samplePresets[presetCategory];
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        ...preset,
      }));
      setErrors({});
      setActiveTab('wizard');
      setCurrentStep(1);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmittedData(null);
    setErrors({});
    localStorage.removeItem('gopratle_requirement_draft');
  };

  return (
    <div className={styles.mainWrapper}>
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onFillSample={handleFillSample}
      />

      <main className={`container ${styles.contentContainer}`}>
        {activeTab === 'dashboard' ? (
          <LiveDashboard onPostNew={() => setActiveTab('wizard')} />
        ) : (
          <>
            <div className={styles.heroHeader}>
              <div className={styles.heroBadge}>
                <span className="badge badge-planner">Interactive Requirement Workflow</span>
              </div>
              <h1 className={`${styles.heroTitle} gradient-text`}>
                Post Your Event Requirement
              </h1>
              <p className={styles.heroSubtitle}>
                Adaptive 4-step wizard designed for Event Planners, Live Performers, and Technical Crew.
                Saved directly to MongoDB with categorical isolation.
              </p>
            </div>

            <Stepper
              currentStep={currentStep}
              onStepClick={handleJumpToStep}
              category={formData.category}
            />

            <div className={styles.wizardCard}>
              {submissionError && (
                <div className={styles.alertBanner}>
                  <AlertCircle size={18} />
                  <span>{submissionError}</span>
                </div>
              )}

              {/* Step 1: Event Basics & Category Selector */}
              {currentStep === 1 && (
                <Step1Basics
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={errors}
                />
              )}

              {/* Step 2: Category-Specific Fields */}
              {currentStep === 2 && (
                <>
                  {formData.category === 'planner' && (
                    <Step2Planner
                      formData={formData}
                      onChange={handleFieldChange}
                      errors={errors}
                    />
                  )}
                  {formData.category === 'performer' && (
                    <Step2Performer
                      formData={formData}
                      onChange={handleFieldChange}
                      errors={errors}
                    />
                  )}
                  {formData.category === 'crew' && (
                    <Step2Crew
                      formData={formData}
                      onChange={handleFieldChange}
                      errors={errors}
                    />
                  )}
                </>
              )}

              {/* Step 3: Category-Specific Logistics & Execution */}
              {currentStep === 3 && (
                <>
                  {formData.category === 'planner' && (
                    <Step3Planner
                      formData={formData}
                      onChange={handleFieldChange}
                      errors={errors}
                    />
                  )}
                  {formData.category === 'performer' && (
                    <Step3Performer
                      formData={formData}
                      onChange={handleFieldChange}
                      errors={errors}
                    />
                  )}
                  {formData.category === 'crew' && (
                    <Step3Crew
                      formData={formData}
                      onChange={handleFieldChange}
                      errors={errors}
                    />
                  )}
                </>
              )}

              {/* Step 4: Review & Poster Contact Information */}
              {currentStep === 4 && (
                <Step4Review
                  formData={formData}
                  onChange={handleFieldChange}
                  onJumpToStep={handleJumpToStep}
                  errors={errors}
                />
              )}

              {/* Wizard Footer Navigation */}
              <div className={formStyles.navFooter}>
                <button
                  type="button"
                  className={formStyles.backButton}
                  onClick={handleBack}
                  disabled={currentStep === 1 || submitting}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <div className={formStyles.draftIndicator}>
                  <Save size={13} color={draftSaved ? '#10b981' : '#94a3b8'} />
                  <span>{draftSaved ? 'Draft saved locally' : 'Autosaved'}</span>
                </div>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    className={formStyles.nextButton}
                    onClick={handleNext}
                  >
                    <span>Proceed to Step 0{currentStep + 1}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={formStyles.nextButton}
                    onClick={handleNext}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span>Saving to MongoDB...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit & Publish Requirement</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Success Modal */}
        {submittedData && (
          <SuccessModal
            data={submittedData}
            onClose={() => setSubmittedData(null)}
            onViewDashboard={() => {
              setSubmittedData(null);
              setActiveTab('dashboard');
            }}
            onReset={handleResetForm}
          />
        )}

        <footer className={styles.footerInfo}>
          <p>
            GoPratle Technical Assignment • Full-Stack Developer Assessment • Built with Next.js, Express, MongoDB
          </p>
        </footer>
      </main>
    </div>
  );
}
