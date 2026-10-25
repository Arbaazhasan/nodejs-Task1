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
import SuccessModal from '../components/SuccessModal/SuccessModal';
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
    guestCount: 150,
    themePreference: '',
    budget: { max: 200000 },
    servicesNeeded: ['Venue Sourcing', 'Catering Coordination'],
    specialNotes: '',
  },
  performerDetails: {
    performerRole: 'Live Band',
    genres: ['Bollywood', 'Pop'],
    durationMinutes: 60,
    soundEquipmentProvided: true,
    budget: { max: 40000 },
    specialNotes: '',
  },
  crewDetails: {
    crewDiscipline: 'Audio / Sound Engineer',
    headcount: 2,
    shiftHours: 8,
    equipmentOwnership: 'Venue/Organizer Provides Equipment',
    rateAmount: 4000,
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
  const [submittedData, setSubmittedData] = useState(null);

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
        setSubmittedData(res.data);
      } else {
        setSubmitError(res.message || 'Submission failed');
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit requirement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmittedData(null);
    setErrors({});
    setSubmitError(null);
  };

  return (
    <div className={styles.main}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={`container ${styles.content}`}>
        {activeTab === 'dashboard' ? (
          <LiveDashboard onPostNew={() => setActiveTab('wizard')} />
        ) : (
          <div className={styles.card}>
            <Stepper currentStep={currentStep} onStepClick={setCurrentStep} />

            {submitError && (
              <div className={styles.alert}>
                <strong>Connection Error:</strong> {submitError}
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

        {submittedData && (
          <SuccessModal
            data={submittedData}
            onViewDashboard={() => {
              setSubmittedData(null);
              setActiveTab('dashboard');
            }}
            onReset={handleReset}
          />
        )}

        <footer className={styles.footer}>
          GoPratle Requirement Flow • Next.js + Express + MongoDB
        </footer>
      </main>
    </div>
  );
}
