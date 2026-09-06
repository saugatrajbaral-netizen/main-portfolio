import React, { useEffect } from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Award, GraduationCap, Building2, MapPin, Mail, Phone } from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import { getPortfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose, onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal, education, journey, publications, credentials } = portfolio;

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
          <div className="cv-head-profile-strip">
            <img
              src="/saugat-baral.jpg"
              alt={personal.name}
              className="cv-head-avatar"
            />
            <NepalEmblem size={44} variant="full" />
            <div>
              <span className="eyebrow">
                {lang === 'np' ? 'नेपाल सरकार · अर्थ मन्त्रालय' : 'Government of Nepal · Ministry of Finance'}
              </span>
              <h2 id="cv-title" className="cv-modal-heading">
                {personal.name}
              </h2>
              <div className="cv-modal-sub">
                <span>{lang === 'np' ? 'कर अधिकृत (राजपत्राङ्कित तृतीय श्रेणी)' : 'Tax Officer (Gazetted Third-Class Civil Servant)'}</span>
              </div>
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
          {/* Contact Strip */}
          <div className="cv-contact-summary-strip">
            <div>
              <Mail size={13} className="text-accent" />
              <span>{personal.email}</span>
            </div>
            <div>
              <Phone size={13} className="text-accent" />
              <span>{personal.officialPhone} / {personal.personalPhone}</span>
            </div>
            <div>
              <MapPin size={13} className="text-gov-blue" />
              <span>{personal.aside.office}</span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <h3>{lang === 'np' ? '१. कार्यकारी सारांश' : '1. Executive Profile'}</h3>
          <p>{personal.heroParagraph}</p>

          {/* Section 2: Professional Service History */}
          <h3>{lang === 'np' ? '२. सेवा वृत्ति तथा प्रशासनिक अनुभव' : '2. Professional Journey & Service Cadre'}</h3>
          {journey.map((j, idx) => (
            <div key={idx} className="cv-section-item">
              <div className="cv-item-title-row">
                <strong>{j.role}</strong> — <span>{j.institution}</span>
                <span className="cv-period-tag">{j.period}</span>
              </div>
              <div className="cv-item-subtitle">{j.office} ({j.jurisdiction})</div>
              <p className="cv-item-desc">{j.overview}</p>
              <ul className="cv-resp-list">
                {j.responsibilities.slice(0, 5).map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Section 3: Education */}
          <h3>{lang === 'np' ? '३. शैक्षिक योग्यता' : '3. Educational Background'}</h3>
          {education.map((edu, idx) => (
            <div key={idx} className="cv-section-item">
              <div className="cv-item-title-row">
                <strong>{edu.degree}</strong>
                <span className="cv-period-tag">{edu.year}</span>
              </div>
              <div className="cv-item-subtitle">{edu.institution}</div>
              <ul className="cv-resp-list">
                {edu.highlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Section 4: Publications */}
          <h3>{lang === 'np' ? '४. प्रमुख नीतिगत तथा प्राज्ञिक प्रकाशनहरू' : '4. Key Scholarly & Policy Publications'}</h3>
          {publications.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: '600', color: 'var(--navy)' }}>
                {idx + 1}. {pub.title} ({pub.year})
              </div>
              <div style={{ fontSize: '12px', color: 'var(--slate)', fontStyle: 'italic' }}>
                {pub.citation}
              </div>
            </div>
          ))}

          {/* Section 5: Core Competencies */}
          <h3>{lang === 'np' ? '५. मुख्य कार्यक्षेत्र तथा विशेषज्ञता' : '5. Core Competencies & Subject Specialization'}</h3>
          <p>
            {lang === 'np'
              ? 'आयकर ऐन २०५८ · मूल्य अभिवृद्धि कर ऐन २०५२ · अन्तःशुल्क प्रशासन · केन्द्रीय बिजक अनुगमन प्रणाली (CBMS) · जोखिममा आधारित कर परीक्षण · प्रादेशिक बजेट तर्जुमा तथा वित्तीय संघीयता · प्रशासनिक कानुन।'
              : 'Direct & Corporate Taxation · Value Added Tax (VAT) · Central Billing Monitoring System (CBMS) · Risk-Based Forensic Audits · Provincial Fiscal Planning · Administrative & Constitutional Jurisprudence.'}
          </p>
        </div>

        <div className="dialog-actions">
          <button type="button" className="button button-primary" onClick={handlePrint}>
            <Printer size={14} />
            <span>{lang === 'np' ? 'आधिकारिक CV प्रिन्ट गर्नुहोस्' : 'Print Official CV'}</span>
          </button>
          <button type="button" className="button button-secondary" onClick={onClose}>
            <span>{lang === 'np' ? 'बन्द गर्नुहोस्' : 'Close'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
