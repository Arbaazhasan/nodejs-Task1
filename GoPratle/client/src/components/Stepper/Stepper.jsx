'use client';

import styles from './Stepper.module.css';
import { Check } from 'lucide-react';

export default function Stepper({ currentStep, onStepClick, category = 'planner' }) {
  const getCategoryStep2Title = () => {
    switch (category) {
      case 'performer':
        return { title: 'Role & Genres', sub: 'Performer specs' };
      case 'crew':
        return { title: 'Discipline & Shift', sub: 'Crew headcount' };
      default:
        return { title: 'Scope & Guests', sub: 'Planning services' };
    }
  };

  const getCategoryStep3Title = () => {
    switch (category) {
      case 'performer':
        return { title: 'Sound & Logistics', sub: 'Hospitality & gear' };
      case 'crew':
        return { title: 'Skills & Gear', sub: 'Rates & safety' };
      default:
        return { title: 'Execution & Tier', sub: 'Milestones & style' };
    }
  };

  const step2Info = getCategoryStep2Title();
  const step3Info = getCategoryStep3Title();

  const steps = [
    { number: 1, title: 'Event Basics', sub: 'Category & details' },
    { number: 2, title: step2Info.title, sub: step2Info.sub },
    { number: 3, title: step3Info.title, sub: step3Info.sub },
    { number: 4, title: 'Review & Post', sub: 'Contact & publish' },
  ];

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.trackLine}>
        <div className={styles.trackProgress} style={{ width: `${progressPercent}%` }} />
      </div>

      {steps.map((step) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <button
            key={step.number}
            type="button"
            className={`${styles.stepItem} ${isActive ? styles.active : ''} ${
              isCompleted ? styles.completed : ''
            }`}
            onClick={() => {
              // Allow jumping to already completed steps or current step
              if (step.number <= currentStep) {
                onStepClick(step.number);
              }
            }}
          >
            <div className={styles.stepBubble}>
              {isCompleted ? <Check size={20} strokeWidth={3} /> : step.number}
            </div>

            <div className={styles.stepLabelGroup}>
              <span className={styles.stepNumber}>Step 0{step.number}</span>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.stepSubtitle}>{step.sub}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
