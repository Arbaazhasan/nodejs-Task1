'use client';

import styles from './CategoryPicker.module.css';

const categories = [
  { id: 'planner', title: 'Event Planner', desc: 'Decor, planning & coordinators' },
  { id: 'performer', title: 'Performer', desc: 'Singers, live bands, DJs & artists' },
  { id: 'crew', title: 'Crew', desc: 'Sound, lighting, camera & tech' },
];

export default function CategoryPicker({ selectedCategory, onSelectCategory }) {
  return (
    <div className={styles.grid}>
      {categories.map((c) => {
        const isSelected = selectedCategory === c.id;
        return (
          <div
            key={c.id}
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelectCategory(c.id)}
            role="button"
            tabIndex={0}
          >
            <span className={styles.title}>{c.title}</span>
            <span className={styles.subtitle}>{c.desc}</span>
          </div>
        );
      })}
    </div>
  );
}
