import React, { useEffect } from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const { personal, curriculumVitae } = portfolioData;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-dialog-backdrop" onClick={onClose}>
      <div
        className="resume-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-title"
      >
        <div className="dialog-head">
          <div>
            <span className="eyebrow">Government of Nepal · Civil Service</span>
            <h2 id="cv-title" style={{ marginTop: '6px' }}>Curriculum Vitae</h2>
            <div style={{ color: 'var(--slate)', fontSize: '13px', fontFamily: 'var(--app-font-mono)', marginTop: '4px' }}>
              {personal.name} · {personal.title}
            </div>
          </div>
          <button
            type="button"
            className="dialog-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="dialog-content">
          <h3>1. Official Designation & Cadre</h3>
          <p>
            <strong>Position:</strong> {personal.title} (Gazetted Officer)<br />
            <strong>Department:</strong> {personal.department}<br />
            <strong>Service Cadre:</strong> {personal.service}<br />
            <strong>Jurisdiction:</strong> {personal.jurisdiction}
          </p>

          <h3>2. Educational Qualifications</h3>
          {curriculumVitae.education.map((edu, idx) => (
            <p key={idx} style={{ marginBottom: '8px' }}>
              <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
            </p>
          ))}

          <h3>3. Specialized In-Service Training & Certifications</h3>
          <ul>
            {curriculumVitae.training.map((t, idx) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>

          <h3>4. Key Areas of Competency</h3>
          <p>
            Income Tax Assessment · Value Added Tax (VAT) Law · Risk-Based Forensic Audits · Double Taxation Avoidance Agreements (DTAA) · Digital Taxpayer Administration · Public Financial Management (PFM).
          </p>

          <h3>5. Professional Affiliations</h3>
          <ul>
            {curriculumVitae.memberships.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="dialog-actions">
          <button type="button" className="button button-primary" onClick={handlePrint}>
            <Printer size={14} />
            <span>Print Official CV</span>
          </button>
          <button type="button" className="button button-secondary" style={{ color: 'var(--navy)', borderColor: '#d9e2eb' }} onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
