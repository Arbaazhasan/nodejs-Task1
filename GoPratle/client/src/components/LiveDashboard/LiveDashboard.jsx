'use client';

import { useState, useEffect } from 'react';
import styles from './LiveDashboard.module.css';
import { api } from '@/services/api';
import {
  Layers,
  CalendarRange,
  Mic,
  Sliders,
  Search,
  MapPin,
  Calendar,
  X,
  ExternalLink,
  RefreshCw,
  Clock,
  User,
  Mail,
  Phone,
} from 'lucide-react';

export default function LiveDashboard({ onPostNew }) {
  const [requirements, setRequirements] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    byCategory: { planner: 0, performer: 0, crew: 0 },
    byStatus: {},
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqRes, statsRes] = await Promise.all([
        api.getRequirements({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          search: searchQuery,
          limit: 50,
        }),
        api.getRequirementStats(),
      ]);

      if (reqRes.success) setRequirements(reqRes.data || []);
      if (statsRes.success) setStats(statsRes.data || {});
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.updateStatus(id, newStatus);
      if (res.success) {
        setRequirements((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
        if (selectedReq && selectedReq._id === id) {
          setSelectedReq((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert(`Could not update status: ${err.message}`);
    }
  };

  return (
    <div className={`${styles.dashboardSection} animate-fade-in`}>
      {/* Metrics Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#eef2ff', color: '#4f46e5' }}>
            <Layers size={22} />
          </div>
          <div>
            <div className={styles.statNumber}>{stats.total || 0}</div>
            <div className={styles.statLabel}>Total Requirements</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#f5f3ff', color: '#7c3aed' }}>
            <CalendarRange size={22} />
          </div>
          <div>
            <div className={styles.statNumber}>{stats.byCategory?.planner || 0}</div>
            <div className={styles.statLabel}>Planners Posted</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fdf2f8', color: '#db2777' }}>
            <Mic size={22} />
          </div>
          <div>
            <div className={styles.statNumber}>{stats.byCategory?.performer || 0}</div>
            <div className={styles.statLabel}>Performers Posted</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#f0f9ff', color: '#0284c7' }}>
            <Sliders size={22} />
          </div>
          <div>
            <div className={styles.statNumber}>{stats.byCategory?.crew || 0}</div>
            <div className={styles.statLabel}>Crew Requirements</div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.categoryTabs}>
          <button
            type="button"
            className={`${styles.tabButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>All Types</span>
            <span className={styles.tabCount}>{stats.total || 0}</span>
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${selectedCategory === 'planner' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('planner')}
          >
            <span>Planners</span>
            <span className={styles.tabCount}>{stats.byCategory?.planner || 0}</span>
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${selectedCategory === 'performer' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('performer')}
          >
            <span>Performers</span>
            <span className={styles.tabCount}>{stats.byCategory?.performer || 0}</span>
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${selectedCategory === 'crew' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('crew')}
          >
            <span>Crew</span>
            <span className={styles.tabCount}>{stats.byCategory?.crew || 0}</span>
          </button>
        </div>

        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by event, city, reference ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Postings Grid */}
      {loading ? (
        <div className={styles.emptyState}>
          <RefreshCw size={24} className="animate-spin" />
          <p>Querying MongoDB requirements database...</p>
        </div>
      ) : requirements.length === 0 ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>No Requirements Found</h3>
          <p className={styles.emptyText}>
            No postings match your current filter or search criteria. Use the form wizard to post a new requirement!
          </p>
          <button
            type="button"
            className="nextButton"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              color: '#fff',
              fontWeight: 600,
            }}
            onClick={onPostNew}
          >
            Post a Requirement Now
          </button>
        </div>
      ) : (
        <div className={styles.postingsGrid}>
          {requirements.map((req) => {
            const b = req.eventBasics || {};
            const cat = req.category;
            const planner = req.plannerDetails;
            const perf = req.performerDetails;
            const crew = req.crewDetails;

            return (
              <div
                key={req._id}
                className={styles.postingCard}
                onClick={() => setSelectedReq(req)}
              >
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.refCode}>{req.referenceId}</span>
                    <h4 className={styles.eventTitle}>{b.eventName}</h4>
                  </div>
                  <span className={`badge badge-${cat}`}>{cat}</span>
                </div>

                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} color="#6366f1" />
                    <span>{b.eventType}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <MapPin size={14} color="#10b981" />
                    <span>{b.location?.city}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={14} color="#f59e0b" />
                    <span>
                      {b.startDate ? new Date(b.startDate).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>

                {/* Category specific preview snippet */}
                <div className={styles.highlightSpecs}>
                  {cat === 'planner' && (
                    <p>
                      <strong>Scope:</strong> {planner?.planningScope || 'Full Planning'} •{' '}
                      <strong>Scale:</strong> {planner?.guestCount || '—'} guests •{' '}
                      <strong>Budget:</strong> ₹{planner?.budget?.min?.toLocaleString('en-IN') || 0} - ₹
                      {planner?.budget?.max?.toLocaleString('en-IN') || 0}
                    </p>
                  )}
                  {cat === 'performer' && (
                    <p>
                      <strong>Role:</strong> {perf?.performerRole || 'Live Artist'} •{' '}
                      <strong>Genres:</strong> {perf?.genres?.slice(0, 3).join(', ') || 'Any'} •{' '}
                      <strong>Duration:</strong> {perf?.durationMinutes || 60}m
                    </p>
                  )}
                  {cat === 'crew' && (
                    <p>
                      <strong>Discipline:</strong> {crew?.crewDiscipline || 'Production'} •{' '}
                      <strong>Headcount:</strong> {crew?.headcount || 1} •{' '}
                      <strong>Shift:</strong> {crew?.shiftHours || 8}h •{' '}
                      <strong>Rate:</strong> ₹{crew?.rateAmount?.toLocaleString('en-IN') || 0}/{crew?.rateType || 'Day'}
                    </p>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <span>
                    Posted by <span className={styles.posterName}>{req.contactPerson?.name}</span>
                  </span>
                  <span className="badge badge-success">{req.status || 'Open'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedReq && (
        <div
          className={styles.detailModalOverlay}
          onClick={() => setSelectedReq(null)}
        >
          <div
            className={styles.detailModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={`badge badge-${selectedReq.category}`}>
                  {selectedReq.category}
                </span>
                <span style={{ marginLeft: '10px', fontFamily: 'monospace', color: '#94a3b8' }}>
                  {selectedReq.referenceId}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '6px' }}>
                  {selectedReq.eventBasics?.eventName}
                </h3>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setSelectedReq(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Status Change Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Workflow Status:</span>
              <select
                value={selectedReq.status}
                onChange={(e) => handleStatusChange(selectedReq._id, e.target.value)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: '#0f172a',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                <option value="Open">Open</option>
                <option value="Under Review">Under Review</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Full raw JSON data inspector tab or formatted cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                Full MongoDB Document
              </h4>
              <pre
                style={{
                  background: '#07090e',
                  padding: '16px',
                  borderRadius: '10px',
                  overflowX: 'auto',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  color: '#38bdf8',
                  maxHeight: '320px',
                }}
              >
                {JSON.stringify(selectedReq, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
