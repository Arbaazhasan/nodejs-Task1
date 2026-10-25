'use client';

import { useState } from 'react';
import styles from './SuccessModal.module.css';
import { CheckCircle2, Copy, Check, ArrowRight, RotateCcw, Download } from 'lucide-react';

export default function SuccessModal({ data, onClose, onViewDashboard, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopy = () => {
    if (data.referenceId) {
      navigator.clipboard.writeText(data.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${data.referenceId || 'requirement'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.celebrationIcon}>
          <CheckCircle2 size={36} />
        </div>

        <h3 className={styles.title}>Requirement Posted!</h3>
        <p className={styles.subtitle}>
          Your requirement is officially categorized under{' '}
          <span className={`badge badge-${data.category}`}>{data.category}</span> and stored in MongoDB.
        </p>

        {/* Reference Box */}
        <div className={styles.referenceBox}>
          <div className={styles.referenceLabelGroup}>
            <span className={styles.referenceLabel}>Unique Reference ID</span>
            <span className={styles.referenceId}>{data.referenceId}</span>
          </div>
          <button
            type="button"
            className={styles.copyButton}
            onClick={handleCopy}
            title="Copy Reference ID"
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className={styles.infoCards}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Event Name</span>
            <span className={styles.infoValue}>{data.eventBasics?.eventName || '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Location</span>
            <span className={styles.infoValue}>{data.eventBasics?.location?.city || '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Contact Person</span>
            <span className={styles.infoValue}>{data.contactPerson?.name || '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Initial Status</span>
            <span className="badge badge-success">{data.status || 'Open'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsGroup}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={onViewDashboard}
          >
            <span>View in Live Submissions</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className={styles.secondaryAction}
            onClick={handleDownloadJson}
            title="Download JSON Record"
          >
            <Download size={15} />
            <span>JSON</span>
          </button>

          <button
            type="button"
            className={styles.secondaryAction}
            onClick={onReset}
            title="Post Another Requirement"
          >
            <RotateCcw size={15} />
            <span>Post Another</span>
          </button>
        </div>
      </div>
    </div>
  );
}
