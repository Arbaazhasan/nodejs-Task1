'use client';

import styles from './CategoryPicker.module.css';
import { CalendarRange, Mic, Sliders, CheckCircle2 } from 'lucide-react';

const categories = [
  {
    id: 'planner',
    title: 'Event Planner',
    description: 'Full-service event planners, day-of coordinators, and aesthetic stylists.',
    icon: CalendarRange,
    features: ['Guest coordination', 'Vendor sourcing', 'Decor & timeline'],
  },
  {
    id: 'performer',
    title: 'Performer',
    description: 'Live bands, DJs, acoustic soloists, comedians, anchors, and dancers.',
    icon: Mic,
    features: ['Stage riders', 'Genre setlists', 'Sound & backline'],
  },
  {
    id: 'crew',
    title: 'Crew',
    description: 'Sound engineers, lighting techs, videographers, riggers & security personnel.',
    icon: Sliders,
    features: ['Shift scheduling', 'Equipment ownership', 'Manpower headcount'],
  },
];

export default function CategoryPicker({ selectedCategory, onSelectCategory }) {
  return (
    <div className={styles.pickerGrid}>
      {categories.map((cat) => {
        const IconComponent = cat.icon;
        const isSelected = selectedCategory === cat.id;

        return (
          <div
            key={cat.id}
            className={`${styles.categoryCard} ${styles[cat.id]} ${
              isSelected ? styles.selected : ''
            }`}
            onClick={() => onSelectCategory(cat.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectCategory(cat.id);
              }
            }}
          >
            <div className={styles.iconWrapper}>
              <IconComponent size={24} />
            </div>

            <h3 className={styles.cardTitle}>{cat.title}</h3>
            <p className={styles.cardDescription}>{cat.description}</p>

            <div className={styles.selectedIndicator}>
              {isSelected ? (
                <>
                  <CheckCircle2 size={14} />
                  <span>Selected Category</span>
                </>
              ) : (
                <span>Click to Select</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
