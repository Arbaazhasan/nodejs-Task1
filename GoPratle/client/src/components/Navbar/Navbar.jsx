'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { api } from '@/services/api';
import { PlusCircle, List, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange, onFillSample }) {
  const [dbConnected, setDbConnected] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkDb = async () => {
      try {
        const res = await api.checkHealth();
        if (isMounted && res.database?.status === 'Connected') {
          setDbConnected(true);
        }
      } catch {
        if (isMounted) setDbConnected(false);
      }
    };
    checkDb();
    const interval = setInterval(checkDb, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.brandGroup} onClick={() => onTabChange('wizard')}>
          <div className={styles.logoIcon}>GP</div>
          <div className={styles.brandTitles}>
            <span className={styles.brandName}>GoPratle Events</span>
            <span className={styles.brandTagline}>Requirement Posting Flow • Intern Assignment</span>
          </div>
        </div>

        <div className={styles.navActions}>
          <div
            className={styles.statusIndicator}
            title={dbConnected ? 'Backend Server (Port 5000) & MongoDB are Live!' : 'Backend is offline. Run: npm run dev:backend'}
          >
            <span className={`${styles.statusDot} ${dbConnected ? styles.connected : ''}`} />
            <span>{dbConnected ? 'Backend Live' : 'Backend Offline'}</span>
          </div>

          <button
            type="button"
            className={`${styles.navButton} ${activeTab === 'wizard' ? styles.active : ''}`}
            onClick={() => onTabChange('wizard')}
          >
            <PlusCircle size={15} />
            <span>Post Requirement</span>
          </button>

          <button
            type="button"
            className={`${styles.navButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <List size={15} />
            <span>View Submissions</span>
          </button>

          <div className={styles.sampleMenu}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>Fill Sample Data</span>
              <ChevronDown size={14} />
            </button>

            {dropdownOpen && (
              <div className={styles.sampleDropdown}>
                <button
                  type="button"
                  className={styles.sampleItem}
                  onClick={() => {
                    onFillSample('planner');
                    setDropdownOpen(false);
                  }}
                >
                  <span className="badge badge-planner">Planner</span>
                  <span>Wedding Reception</span>
                </button>
                <button
                  type="button"
                  className={styles.sampleItem}
                  onClick={() => {
                    onFillSample('performer');
                    setDropdownOpen(false);
                  }}
                >
                  <span className="badge badge-performer">Performer</span>
                  <span>College Fest Band</span>
                </button>
                <button
                  type="button"
                  className={styles.sampleItem}
                  onClick={() => {
                    onFillSample('crew');
                    setDropdownOpen(false);
                  }}
                >
                  <span className="badge badge-crew">Crew</span>
                  <span>Sound Crew (5 Pax)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
