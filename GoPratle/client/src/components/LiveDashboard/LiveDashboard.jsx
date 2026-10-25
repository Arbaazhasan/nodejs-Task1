'use client';

import { useState, useEffect } from 'react';
import styles from './LiveDashboard.module.css';
import { api } from '@/services/api';

export default function LiveDashboard({ onPostNew }) {
  const [requirements, setRequirements] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.getRequirements({
        category: category === 'all' ? undefined : category,
        search,
      });
      if (res.success) setRequirements(res.data || []);
    } catch (err) {
      console.error('Error fetching requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(loadData, 200);
    return () => clearTimeout(t);
  }, [category, search]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          {['all', 'planner', 'performer', 'crew'].map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.filterBtn} ${category === c ? styles.active : ''}`}
              onClick={() => setCategory(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by event or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className={styles.empty}>Loading postings...</div>
      ) : requirements.length === 0 ? (
        <div className={styles.empty}>
          <p>No requirements found.</p>
          <button
            type="button"
            onClick={onPostNew}
            style={{
              marginTop: '10px',
              padding: '6px 14px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            Post a Requirement
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {requirements.map((r) => (
            <div key={r._id} className={styles.card}>
              <div className={styles.cardLeft}>
                <span className={styles.cardTitle}>{r.eventBasics?.eventName}</span>
                <span className={styles.cardMeta}>
                  {r.eventBasics?.eventType} • {r.eventBasics?.location?.city} • Posted by {r.contactPerson?.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                  {r.referenceId}
                </span>
              </div>
              <span className={`badge badge-${r.category}`}>{r.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
