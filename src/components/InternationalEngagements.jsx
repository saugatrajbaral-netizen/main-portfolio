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

          {/* Right Column: Actual Recommendation Letter Document Viewer */}
          <div className="intl-preview-col">
            <div className="intl-doc-actual-card">
              {/* Document Header Bar */}
              <div className="intl-doc-top-bar">
                <div className="intl-doc-file-info">
                  <FileText size={14} className="text-crimson" />
                  <span className="intl-doc-filename">yunus-centre-recommendation-letter.pdf</span>
                </div>
                <div className="intl-doc-top-actions">
                  <button
                    type="button"
                    className="intl-doc-expand-btn"
                    onClick={() => setIsModalOpen(true)}
                    title={lang === 'np' ? 'पूरा सिफारिस पत्र हेर्नुहोस्' : 'Expand Full Document'}
                  >
                    <Eye size={13} />
                    <span>{lang === 'np' ? 'ठूलो बनाउनुहोस्' : 'Expand'}</span>
                  </button>
                  <a
                    href="/yunus-centre-recommendation-letter.pdf"
                    download="Saugat-Raj-Baral-Yunus-Centre-Recommendation.pdf"
                    className="intl-doc-dl-btn"
                    title={lang === 'np' ? 'PDF डाउनलोड' : 'Download PDF'}
                  >
                    <Download size={13} />
                  </a>
                </div>
              </div>

              {/* Real PDF Document View Frame */}
              <div
                className="intl-pdf-frame-wrapper"
                onClick={() => setIsModalOpen(true)}
                title={lang === 'np' ? 'पूर्ण सिफारिस पत्र हेर्न क्लिक गर्नुहोस्' : 'Click to view full recommendation letter'}
              >
                <iframe
                  src="/yunus-centre-recommendation-letter.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                  title="Yunus Centre Recommendation Letter PDF"
                  className="intl-actual-doc-iframe"
                />
                <div className="intl-frame-click-overlay">
                  <div className="intl-overlay-pill">
                    <Eye size={14} />
                    <span>{lang === 'np' ? 'पूर्ण सिफारिस पत्र हेर्न क्लिक गर्नुहोस्' : 'Click to View Full Document'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Caption */}
            <div className="intl-doc-caption">
              <div className="intl-caption-badge">
                <ShieldCheck size={14} className="text-emerald" />
                <span>{lang === 'np' ? 'प्रमाणित मूल अभिलेख' : 'Verified Original Document'}</span>
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
