'use client';

import styles from './Stepper.module.css';

const steps = [
  { id: 1, title: 'Event Basics' },
  { id: 2, title: 'Category Details' },
  { id: 3, title: 'Requirements' },
  { id: 4, title: 'Review & Submit' },
];

export default function Stepper({ currentStep, onStepClick }) {
  return (
    <div className={styles.stepper}>
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 'none' }}>
            <button
              type="button"
              className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={() => {
                if (step.id <= currentStep) onStepClick(step.id);
              }}
            >
              <div className={styles.stepNumber}>
                {isCompleted ? '✓' : step.id}
              </div>
              <span className={styles.stepTitle}>{step.title}</span>
            </button>
            {idx < steps.length - 1 && <div className={styles.divider} />}
          </div>
        );
      })}
    </div>
  );
}
