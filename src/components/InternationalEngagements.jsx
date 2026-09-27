import React, { useState } from 'react';
import { Globe, MapPin, Calendar, Award, CheckCircle2, FileText, ExternalLink, Download, Eye, Sparkles, Building2, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import RecommendationLetterModal from './RecommendationLetterModal';
import { getPortfolioData } from '../data/portfolioData';

export default function InternationalEngagements({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const engagements = portfolio.internationalEngagements || [];
  const yunusEngagement = engagements[0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!yunusEngagement) return null;

  const {
    organization,
    organizationType,
    location,
    countryFlag,
    period,
    programName,
    role,
    signatory,
    overview,
    exposurePoints,
    recommendationDocument
  } = yunusEngagement;

  return (
    <section id="international-engagements" className="international-engagements-section">
      <div className="intl-section-header">
        <div className="section-label-tag">
          <Globe size={14} className="text-gov-blue" />
          <span>{lang === 'np' ? 'अन्तर्राष्ट्रिय संलग्नता' : 'International & Development'}</span>
        </div>
        <h2 className="chapter-section-title">
          {lang === 'np' ? 'अन्तर्राष्ट्रिय तथा विकास संलग्नता' : 'International & Development Engagements'}
        </h2>
        <p className="intl-section-subtitle">
          {lang === 'np'
            ? 'सामाजिक व्यवसाय, समावेशी अर्थतन्त्र र ग्रामीण विकास मोडेल सम्बन्धी अन्तर्राष्ट्रिय प्राज्ञिक तथा व्यावहारिक सिकाइ।'
            : 'Global exposure in social business, inclusive microfinance frameworks, and grassroots development models.'}
        </p>
      </div>

      {/* Main Feature Card */}
      <div className="intl-engagement-feature-card">
        <div className="intl-card-grid">
          {/* Left Column: Organization Details & Exposure */}
          <div className="intl-info-col">
            {/* Top Badges */}
            <div className="intl-badges-bar">
              <span className="intl-flag-badge">
                <span className="intl-flag-icon">{countryFlag}</span>
                <span>{location}</span>
              </span>
              <span className="intl-period-badge">
                <Calendar size={13} />
                <span>{period}</span>
              </span>
              <span className="intl-category-badge">
                <Building2 size={13} />
                <span>{programName}</span>
              </span>
            </div>

            {/* Title & Organization */}
            <h3 className="intl-org-title">{organization}</h3>
            <div className="intl-org-type">{organizationType}</div>

            {/* Overview */}
            <p className="intl-overview-text">{overview}</p>

            {/* Signatory Highlight Badge */}
            <div className="intl-signatory-box">
              <div className="intl-signatory-icon">
                <Award size={20} />
              </div>
              <div className="intl-signatory-details">
                <div className="intl-sig-label">
                  {lang === 'np' ? 'सिफारिस पत्र हस्ताक्षरकर्ता:' : 'Recommendation Letter Signatory:'}
                </div>
                <div className="intl-sig-name">
                  <strong>{signatory.name}</strong>
                  <span className="intl-sig-laureate"> — {signatory.title}</span>
                </div>
                <div className="intl-sig-roles">
                  {signatory.roles.join(' · ')}
                </div>
              </div>
            </div>

            {/* Key Exposure Points */}
            <div className="intl-exposure-block">
              <h4 className="intl-exposure-heading">
                <Sparkles size={14} className="text-accent" />
                <span>{lang === 'np' ? 'प्रमुख सिकाइ तथा अनुभवका क्षेत्रहरू:' : 'Key Exposure & Professional Learning:'}</span>
              </h4>
              <ul className="intl-exposure-list">
                {exposurePoints.map((pt, idx) => (
                  <li key={idx} className="intl-exposure-item">
                    <CheckCircle2 size={16} className="intl-check-icon" />
                    <div>
                      <strong>{pt.title}:</strong> <span>{pt.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="intl-action-btn-row">
              <button
                type="button"
                className="btn btn-primary intl-view-doc-btn"
                onClick={() => setIsModalOpen(true)}
              >
                <Eye size={15} />
                <span>{lang === 'np' ? 'सिफारिस पत्र हेर्नुहोस्' : 'View Recommendation Letter'}</span>
              </button>

              <a
                href="/yunus-centre-recommendation-letter.pdf"
                download="Saugat-Raj-Baral-Yunus-Centre-Recommendation.pdf"
                className="btn btn-secondary intl-download-doc-btn"
                title={lang === 'np' ? 'मूल PDF डाउनलोड गर्नुहोस्' : 'Download Original PDF'}
              >
                <Download size={15} />
                <span>{lang === 'np' ? 'PDF डाउनलोड' : 'Download PDF'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Recommendation Letter Document Preview Card */}
          <div className="intl-preview-col">
            <div
              className="intl-doc-preview-wrapper"
              onClick={() => setIsModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              aria-label={lang === 'np' ? 'सिफारिस पत्र पूर्ण रूपमा हेर्न क्लिक गर्नुहोस्' : 'Click to view full recommendation letter'}
            >
              {/* Paper Document Preview Simulation */}
              <div className="intl-preview-sheet">
                {/* Letterhead Header */}
                <div className="preview-letterhead">
                  <div className="preview-logo-box">
                    <svg className="preview-yunus-logo" viewBox="0 0 64 64" fill="none">
                      <path d="M 32,58 L 32,12" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 32,48 C 22,48 14,40 14,32 C 22,32 30,36 32,48 Z" fill="#3b82f6" opacity="0.85" />
                      <path d="M 32,36 C 24,36 18,28 18,20 C 24,20 30,24 32,36 Z" fill="#60a5fa" opacity="0.9" />
                      <path d="M 32,44 C 42,44 50,36 50,28 C 42,28 34,32 32,44 Z" fill="#2563eb" opacity="0.85" />
                      <path d="M 32,30 C 40,30 46,22 46,16 C 40,16 34,20 32,30 Z" fill="#1d4ed8" opacity="0.9" />
                      <path d="M 32,18 C 28,10 32,4 32,4 C 32,4 36,10 32,18 Z" fill="#1e3a8a" />
                    </svg>
                  </div>
                  <span className="preview-brand-name">Yunus Centre</span>
                </div>

                <div className="preview-salutation">To Whom It May Concern</div>
                <div className="preview-date">December 26, 2019</div>

                <div className="preview-body-text">
                  <p>
                    Mr. Saugat Raj Baral attended a one-month Immersion Program in October 2019 at Yunus Centre. During the Program, Saugat was exposed to the concept of social business through various presentations, interactive meetings and field visits to social businesses companies in Bangladesh...
                  </p>
                </div>

                <div className="preview-sig-block">
                  <div className="preview-sincerely">Sincerely,</div>
                  <div className="preview-sig-signature">
                    <svg viewBox="0 0 200 50" fill="none" className="sig-preview-svg">
                      <path
                        d="M 10,35 C 20,20 35,15 50,32 C 60,42 70,22 80,25 C 92,28 102,45 115,22 C 124,8 135,30 148,24 C 162,18 176,38 192,28 M 25,45 C 70,43 125,45 180,42"
                        stroke="#0f172a"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="preview-sig-name">Muhammad Yunus</div>
                  <div className="preview-sig-title">Nobel Peace Prize Laureate 2006</div>
                  <div className="preview-sig-sub">Founder, Grameen Bank · Chairman, Yunus Centre</div>
                </div>

                <div className="preview-footer-line">
                  Grameen Bank Bhaban, Mirpur 2, Dhaka 1216, Bangladesh
                </div>
              </div>

              {/* Hover Overlay Prompt */}
              <div className="intl-preview-overlay">
                <div className="intl-preview-overlay-btn">
                  <Eye size={18} />
                  <span>{lang === 'np' ? 'सिफारिस पत्र पूर्ण हेर्नुहोस्' : 'Click to View Full Letter'}</span>
                </div>
                <span className="intl-preview-overlay-sub">
                  {lang === 'np' ? 'PDF जुम तथा डाउनलोड उपलब्ध' : 'High-definition zoom & PDF available'}
                </span>
              </div>
            </div>

            {/* Document Caption */}
            <div className="intl-doc-caption">
              <div className="intl-caption-badge">
                <ShieldCheck size={14} className="text-emerald" />
                <span>{lang === 'np' ? 'प्रमाणित अभिलेख' : 'Verified Original Document'}</span>
              </div>
              <p className="intl-caption-text">
                {lang === 'np'
                  ? 'युनुस सेन्टर, बङ्गलादेशद्वारा जारी गरिएको आधिकारिक सिफारिस पत्र (डिसेम्बर २६, २०१९)'
                  : 'Official recommendation letter issued by Yunus Centre, Dhaka, Bangladesh (Dec 26, 2019)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Document Modal */}
      <RecommendationLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        documentData={recommendationDocument}
        lang={lang}
      />
    </section>
  );
}
