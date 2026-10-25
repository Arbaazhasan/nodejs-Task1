'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { api } from '@/services/api';
import { Sparkles, Layers, ListFilter, ChevronDown, CheckCircle2 } from 'lucide-react';

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
    const interval = setInterval(checkDb, 15000);
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
            <span className={styles.brandName}>
              GoPratle <span className="brand-gradient-text">Engine</span>
            </span>
            <span className={styles.brandTagline}>Requirement Posting Flow</span>
          </div>
        </div>

        <div className={styles.navActions}>
          <div className={styles.statusIndicator} title={dbConnected ? 'Backend & MongoDB Connected' : 'Checking connection...'}>
            <span className={`${styles.statusDot} ${dbConnected ? styles.connected : ''}`} />
            <span>{dbConnected ? 'API & Mongo Live' : 'Connecting API...'}</span>
          </div>

          <button
            type="button"
            className={`${styles.navButton} ${activeTab === 'wizard' ? styles.active : ''}`}
            onClick={() => onTabChange('wizard')}
          >
            <Sparkles size={16} />
            <span>Post Requirement</span>
          </button>

          <button
            type="button"
            className={`${styles.navButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <Layers size={16} />
            <span>Live Submissions</span>
          </button>

          <div className={styles.sampleMenu}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>Demo Presets</span>
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
                  <span>Royal Wedding</span>
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
                  <span>Tech Fest Band</span>
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
                  <span>Sound Tech Team</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
