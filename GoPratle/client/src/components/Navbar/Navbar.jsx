'use client';

import styles from './Navbar.module.css';

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.brand} onClick={() => onTabChange('wizard')}>
          <span>GoPratle</span>
          <span className={styles.brandDot}>•</span>
        </div>

        <nav className={styles.navLinks}>
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'wizard' ? styles.active : ''}`}
            onClick={() => onTabChange('wizard')}
          >
            Post Requirement
          </button>

          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            Submissions
          </button>
        </nav>
      </div>
    </header>
  );
}
