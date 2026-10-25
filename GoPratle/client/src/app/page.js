'use client';

import { useState } from 'react';
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
import LiveDashboard from '../components/LiveDashboard/LiveDashboard';

import { validateStep } from '../utils/validation';
import { api } from '../services/api';

const initialFormData = {
  category: 'planner',
  eventBasics: {
    eventName: '',
    eventType: 'Wedding',
    isDateRange: false,
    startDate: '',
    endDate: '',
    location: { city: '' },
    venue: { name: '' },
  },
  plannerDetails: {
    planningScope: 'Full Planning',
    guestCount: '',
    themePreference: '',
    budget: { max: '' },
    servicesNeeded: [],
    specialNotes: '',
  },
  performerDetails: {
    performerRole: 'Live Band',
    genres: [],
    durationMinutes: '',
    soundEquipmentProvided: true,
    budget: { max: '' },
    specialNotes: '',
  },
  crewDetails: {
    crewDiscipline: 'Audio / Sound Engineer',
    headcount: '',
    shiftHours: '',
    equipmentOwnership: 'Venue/Organizer Provides Equipment',
    rateAmount: '',
    specialNotes: '',
  },
  contactPerson: {
    name: '',
    email: '',
    phone: '',
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('wizard');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFieldChange = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
    setErrors({});
    setSubmitError(null);
  };

  const handleNext = () => {
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    const validation = validateStep(4, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await api.postRequirement(formData);
      if (res.success && res.data) {
        // 1. Reset form completely to fresh state and Step 1
        handleResetForm();

        // 2. Set success banner and forward directly to the Submissions page
        setSuccessMessage(`Requirement posted successfully! Reference ID: ${res.data.referenceId}`);
        setActiveTab('dashboard');
      } else {
        setSubmitError(res.message || 'Submission failed');
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit requirement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'wizard') {
      // Whenever navigating to post requirement from submissions or when finished, start fresh
      if (activeTab === 'dashboard' || currentStep === 4) {
        handleResetForm();
      }
    }
    setActiveTab(tab);
  };

  const handlePostNew = () => {
    handleResetForm();
    setSuccessMessage(null);
    setActiveTab('wizard');
  };

  return (
    <div className={styles.main}>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className={`container ${styles.content}`}>
        {activeTab === 'dashboard' ? (
          <LiveDashboard
            onPostNew={handlePostNew}
            successMessage={successMessage}
            onDismissSuccess={() => setSuccessMessage(null)}
          />
        ) : (
          <div className={styles.card}>
            <Stepper currentStep={currentStep} onStepClick={setCurrentStep} />

            {submitError && (
              <div className={styles.alert}>
                <strong>Error:</strong> {submitError}
              </div>
            )}

            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <Step1Basics
                formData={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}

            {/* Step 2: Role & Scope */}
            {currentStep === 2 && (
              <>
                {formData.category === 'planner' && (
                  <Step2Planner formData={formData} onChange={handleFieldChange} errors={errors} />
                )}
                {formData.category === 'performer' && (
                  <Step2Performer formData={formData} onChange={handleFieldChange} errors={errors} />
                )}
                {formData.category === 'crew' && (
                  <Step2Crew formData={formData} onChange={handleFieldChange} errors={errors} />
                )}
              </>
            )}

            {/* Step 3: Requirements */}
            {currentStep === 3 && (
              <>
                {formData.category === 'planner' && (
                  <Step3Planner formData={formData} onChange={handleFieldChange} />
                )}
                {formData.category === 'performer' && (
                  <Step3Performer formData={formData} onChange={handleFieldChange} />
                )}
                {formData.category === 'crew' && (
                  <Step3Crew formData={formData} onChange={handleFieldChange} />
                )}
              </>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <Step4Review
                formData={formData}
                onChange={handleFieldChange}
                onJumpToStep={setCurrentStep}
                errors={errors}
              />
            )}

            {/* Navigation buttons */}
            <div className={formStyles.navFooter}>
              <button
                type="button"
                className={formStyles.backButton}
                onClick={handleBack}
                disabled={currentStep === 1 || submitting}
              >
                Back
              </button>

              <button
                type="button"
                className={formStyles.nextButton}
                onClick={handleNext}
                disabled={submitting}
              >
                {currentStep < 4
                  ? 'Continue'
                  : submitting
                  ? 'Submitting...'
                  : 'Submit Requirement'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
