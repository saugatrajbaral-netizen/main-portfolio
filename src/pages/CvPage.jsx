import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Printer, 
  Globe, 
  ExternalLink,
  X,
  Sparkles,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

/**
 * CvPage — Completely Redesigned CV Section
 * Definitive Visual Identity: Majestic Pumdikot Shiva Temple Background (Pokhara, Nepal)
 * Clean, executive presentation for Government of Nepal Tax Officer Saugat Raj Baral.
 */
export default function CvPage({ onOpenResume, lang = 'en' }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerMode, setViewerMode] = useState('pdf'); // 'pdf' | 'text'

  const portfolio = getPortfolioData(lang);
  const { personal, curriculumVitae } = portfolio;
  const cv = curriculumVitae;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-temple-experience">
      {/* =========================================================================
          1. PRIMARY SHIVA TEMPLE BACKGROUND (HIGH-DEFINITION LANDSCAPE PHOTOGRAPH)
          ========================================================================= */}
      <div className="cv-shiva-backdrop" aria-hidden="true">
        <picture className="cv-shiva-picture">
          <source type="image/webp" srcSet="/shiva-temple-pumdikot.webp" />
          <source type="image/png" srcSet="/shiva-temple-pumdikot.png" />
          <img
            src="/shiva-temple-pumdikot.png"
            alt="Pumdikot Shiva Temple overlooking the Himalayas in Pokhara, Nepal"
            className="cv-shiva-img"
            width={800}
            height={450}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        {/* Subtle, refined atmospheric overlay preserving natural colors & Himalayan depth */}
        <div className="cv-shiva-overlay" />
      </div>

      {/* =========================================================================
          2. FOREGROUND EXECUTIVE PORTAL & OFFICIAL CREDENTIALS
          ========================================================================= */}
      <div className="container-wide cv-portal-container">
        {/* Geographic / Spiritual Atmosphere Indicator */}
        <div className="cv-location-indicator">
          <MapPin size={13} className="location-pin-icon" />
          <span>{lang === 'np' ? 'पुम्दीकोट, पोखरा • नेपाल' : 'Pumdikot, Pokhara • Nepal'}</span>
        </div>

        {/* Central Executive Glass Card */}
        <div className="cv-executive-glass-card">
          {/* Header Strip */}
          <div className="cv-glass-header">
            <div className="cv-official-cadre-tag">
              <ShieldCheck size={14} className="shield-icon" />
              <span>
                {lang === 'np' 
                  ? 'नेपाल सरकार | कर अधिकृत (राजपत्राङ्कित तृतीय श्रेणी)' 
                  : 'Government of Nepal | Tax Officer (Gazetted Third Class)'}
              </span>
            </div>

            <div className="cv-official-doc-label">
              <span>{lang === 'np' ? 'आधिकारिक व्यक्तिगत तथा सेवा विवरण' : 'Official Curriculum Vitae'}</span>
            </div>
          </div>

          {/* Main Identity Presentation */}
          <div className="cv-identity-block">
            <h1 className="cv-officer-name">
              {personal.name}
              {lang === 'en' && <span className="cv-nepali-script-name">{personal.nepaliName}</span>}
            </h1>

            <div className="cv-specialization-strip">
              <span>
                {lang === 'np'
                  ? 'सार्वजनिक वित्त • कर प्रशासन • वित्तीय नीति • सुशासन'
                  : 'Public Finance • Tax Administration • Fiscal Policy • Governance'}
              </span>
            </div>

            <p className="cv-executive-synopsis">
              {lang === 'np'
                ? 'नेपाल सरकार अर्थ मन्त्रालय अन्तर्गत राजस्व प्रशासन, कर परीक्षण, मूल्य अभिवृद्धि कर (VAT), आयकर र अन्तःशुल्क कार्यान्वयन तथा सार्वजनिक वित्त व्यवस्थापनमा समर्पित निजामती अधिकृत।'
                : 'Permanent civil servant serving under the Ministry of Finance, Government of Nepal, with specialized expertise in statutory tax administration, revenue mobilization, public financial management, and evidence-based fiscal governance.'}
            </p>
          </div>

          {/* Three Focused Credential Pillars */}
          <div className="cv-pillars-grid">
            {/* Pillar 1: Cadre & Service */}
            <div className="cv-pillar-box">
              <div className="pillar-top-row">
                <Building2 size={16} className="pillar-icon" />
                <span className="pillar-eyebrow">{lang === 'np' ? 'निजामती सेवा' : 'Civil Service'}</span>
              </div>
              <h3 className="pillar-title">
                {lang === 'np' ? 'कर अधिकृत (राजस्व सेवा)' : 'Tax Officer (Revenue Cadre)'}
              </h3>
              <p className="pillar-desc">
                {lang === 'np'
                  ? 'अर्थ मन्त्रालय, नेपाल सरकार । करदाता सेवा, कर परीक्षण, संकलन तथा गण्डकी प्रदेशको बजेट तथा योजना शाखामा कार्य अनुभव।'
                  : 'Ministry of Finance, Government of Nepal. Experience across Taxpayer Services, Audit, Collections, and Provincial Budget & Planning.'}
              </p>
              <span className="pillar-badge">
                {lang === 'np' ? '२०२४–हालसम्म' : '2024–Present'}
              </span>
            </div>

            {/* Pillar 2: Academic Honors */}
            <div className="cv-pillar-box">
              <div className="pillar-top-row">
                <GraduationCap size={16} className="pillar-icon" />
                <span className="pillar-eyebrow">{lang === 'np' ? 'शैक्षिक विशिष्टता' : 'Academics'}</span>
              </div>
              <h3 className="pillar-title">
                {lang === 'np' ? 'BBA फाइनान्स (GPA ३.९५)' : 'BBA Finance (GPA 3.95/4.00)'}
              </h3>
              <p className="pillar-desc">
                {lang === 'np'
                  ? 'पोखरा विश्वविद्यालय (ला ग्रान्डे इन्टरनेसनल कलेज) । डीन्स लिस्ट विशिष्टता, कलेज टपर तथा शीर्ष १% उत्कृष्ट नतिजा।'
                  : "Pokhara University (La Grande Int'l College). Dean's List Honor, College Topper, graduating in the top 1% of the cohort."}
              </p>
              <span className="pillar-badge">
                {lang === 'np' ? 'प्रथम श्रेणी विशिष्टता' : "Dean's List Topper"}
              </span>
            </div>

            {/* Pillar 3: Administrative Training & Global Exposure */}
            <div className="cv-pillar-box">
              <div className="pillar-top-row">
                <Award size={16} className="pillar-icon" />
                <span className="pillar-eyebrow">{lang === 'np' ? 'तालिम तथा एक्सपोजर' : 'Executive Training'}</span>
              </div>
              <h3 className="pillar-title">
                {lang === 'np' ? 'NASC, PFMTC र युनुस सेन्टर' : 'NASC, PFMTC & Yunus Centre'}
              </h3>
              <p className="pillar-desc">
                {lang === 'np'
                  ? 'नेपाल प्रशासनिक प्रशिक्षण प्रतिष्ठान (४ महिने BAT), PFMTC सार्वजनिक वित्तीय व्यवस्थापन, र १५+ देशहरूको अन्तर्राष्ट्रिय अध्ययन।'
                  : 'Nepal Administrative Staff College (4-Month BAT), PFMTC Public Financial Management, and study exposure across 15+ countries.'}
              </p>
              <span className="pillar-badge">
                {lang === 'np' ? '१५+ देश भ्रमण' : '15+ Countries Visited'}
              </span>
            </div>
          </div>

          {/* Action Row: Clean, Purpose-Built Executive Controls */}
          <div className="cv-action-suite">
            {/* Download PDF Button */}
            <a
              href="/saugat-raj-baral-cv.pdf"
              download="Saugat-Raj-Baral-CV.pdf"
              className="cv-action-btn primary"
              title="Download official verified 3-page CV in PDF format"
            >
              <Download size={16} />
              <span>{lang === 'np' ? 'CV डाउनलोड गर्नुहोस् (PDF)' : 'Download Official CV (PDF)'}</span>
            </a>

            {/* View Full Document Online Button */}
            <button
              type="button"
              className="cv-action-btn secondary"
              onClick={() => setIsViewerOpen(true)}
              title="View full official CV document on-screen"
            >
              <Eye size={16} />
              <span>{lang === 'np' ? 'पूर्ण CV अनलाइन हेर्नुहोस्' : 'View Full Document'}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              className="cv-action-btn subtle"
              onClick={handlePrint}
              title="Print official CV record"
            >
              <Printer size={15} />
              <span>{lang === 'np' ? 'प्रिन्ट' : 'Print'}</span>
            </button>
          </div>

          {/* Institutional Verification Footer */}
          <div className="cv-institutional-footer">
            <div className="footer-coord-item">
              <MapPin size={12} />
              <span>{personal.aside?.office || 'Ministry of Finance, Government of Nepal'}</span>
            </div>
            <span className="footer-sep">•</span>
            <div className="footer-coord-item">
              <Mail size={12} />
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </div>
            <span className="footer-sep">•</span>
            <div className="footer-coord-item">
              <Globe size={12} />
              <span>saugatrajbaral.com.np</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. INTERACTIVE FULL CV DOCUMENT VIEWER (ELEGANT MODAL OVERLAY)
          ========================================================================= */}
      {isViewerOpen && (
        <div 
          className="cv-viewer-modal-backdrop"
          onClick={() => setIsViewerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Official Curriculum Vitae Viewer"
        >
          <div 
            className="cv-viewer-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="cv-viewer-topbar">
              <div className="viewer-title-box">
                <FileText size={16} className="text-gov-blue" />
                <span className="viewer-file-name">
                  <strong>saugat-raj-baral-cv.pdf</strong> · {lang === 'np' ? 'प्रमाणित अभिलेख' : 'Verified Civil Service Record'}
                </span>
              </div>

              <div className="viewer-controls">
                {/* View Mode Switcher */}
                <div className="viewer-tabs">
                  <button
                    type="button"
                    className={`viewer-tab-btn ${viewerMode === 'pdf' ? 'active' : ''}`}
                    onClick={() => setViewerMode('pdf')}
                  >
                    <span>{lang === 'np' ? 'मूल PDF' : 'Original PDF'}</span>
                  </button>
                  <button
                    type="button"
                    className={`viewer-tab-btn ${viewerMode === 'text' ? 'active' : ''}`}
                    onClick={() => setViewerMode('text')}
                  >
                    <span>{lang === 'np' ? 'ढाँचागत पाठ' : 'Formatted Text'}</span>
                  </button>
                </div>

                {/* Direct Download in Modal */}
                <a
                  href="/saugat-raj-baral-cv.pdf"
                  download="Saugat-Raj-Baral-CV.pdf"
                  className="viewer-download-link"
                  title="Download PDF"
                >
                  <Download size={15} />
                  <span>{lang === 'np' ? 'डाउनलोड' : 'Download'}</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  className="viewer-close-btn"
                  onClick={() => setIsViewerOpen(false)}
                  aria-label="Close viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content Stage */}
            <div className="cv-viewer-stage">
              {viewerMode === 'pdf' ? (
                <iframe
                  src="/saugat-raj-baral-cv.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
                  title="Official Curriculum Vitae Document PDF"
                  className="cv-pdf-iframe"
                />
              ) : (
                <div className="cv-formatted-document-sheet">
                  {/* Document Header */}
                  <div className="sheet-header">
                    <div>
                      <h2>{personal.name}</h2>
                      <div className="sheet-role">
                        {lang === 'np' 
                          ? 'कर अधिकृत | नेपाल सरकार | सार्वजनिक वित्त तथा आर्थिक नीति' 
                          : 'Tax Officer | Government of Nepal | Public Finance & Economic Policy'}
                      </div>
                      <div className="sheet-location">Pokhara-17, Birauta, Nepal • {personal.email}</div>
                    </div>
                  </div>

                  {/* Section 1: Professional Profile */}
                  <div className="sheet-section">
                    <h3>{lang === 'np' ? '१. व्यावसायिक पार्श्वचित्र (PROFESSIONAL PROFILE)' : '1. PROFESSIONAL PROFILE'}</h3>
                    <p className="sheet-prose">
                      Permanent civil servant of the Government of Nepal under the Ministry of Finance, combining statutory revenue administration with public financial management, taxpayer education, and provincial budget formulation.
                    </p>
                  </div>

                  {/* Section 2: Experience */}
                  <div className="sheet-section">
                    <h3>{lang === 'np' ? '२. व्यावसायिक अनुभव (PROFESSIONAL EXPERIENCE)' : '2. PROFESSIONAL EXPERIENCE'}</h3>
                    <div className="sheet-entry">
                      <div className="entry-head">
                        <strong>Tax Officer — Ministry of Finance, Government of Nepal</strong>
                        <span className="entry-date">2024–Present</span>
                      </div>
                      <p className="sheet-prose">
                        Administer Value Added Tax (VAT), Income Tax, and Excise legislation across Taxpayer Services, Audit & Investigation. Conduct district-wide taxpayer education sessions and analyze fiscal data for domestic revenue mobilization.
                      </p>
                    </div>

                    <div className="sheet-entry" style={{ marginTop: '12px' }}>
                      <div className="entry-head">
                        <strong>Administrative Officer (7th Level) — Ministry of Economic Affairs, Gandaki Province</strong>
                        <span className="entry-date">4 Months</span>
                      </div>
                      <p className="sheet-prose">
                        Supported provincial budget preparation, program planning, and public financial evaluation in the Budget and Planning Section.
                      </p>
                    </div>
                  </div>

                  {/* Section 3: Education */}
                  <div className="sheet-section">
                    <h3>{lang === 'np' ? '३. शैक्षिक योग्यता (EDUCATION)' : '3. EDUCATION'}</h3>
                    <div className="sheet-entry">
                      <div className="entry-head">
                        <strong>Bachelor of Business Administration (BBA) — Finance</strong>
                        <span className="entry-date">2021</span>
                      </div>
                      <div className="entry-meta">Pokhara University | La Grande International College</div>
                      <p className="sheet-prose">
                        <strong>GPA: 3.95 / 4.00</strong> — Dean's List Honor, College Topper, graduating in the top 1% of the cohort.
                      </p>
                    </div>
                  </div>

                  {/* Section 4: Competencies */}
                  <div className="sheet-section">
                    <h3>{lang === 'np' ? '४. मुख्य कार्यकुशलता (CORE COMPETENCIES)' : '4. CORE COMPETENCIES'}</h3>
                    <div className="sheet-tags-wrap">
                      {[
                        "Public Finance & Revenue Policy", "Tax Administration", "Economic Policy", 
                        "Budget & Planning", "Financial Analysis", "Government Relations", 
                        "Policy Implementation", "Stakeholder Engagement"
                      ].map((tag, idx) => (
                        <span key={idx} className="sheet-tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Section 5: Philosophy */}
                  <div className="sheet-section sheet-philosophy">
                    <blockquote>
                      “To serve effectively is to understand that public finance is not merely about numbers and revenue; it is ultimately about building institutions, creating opportunity and converting public policy into meaningful outcomes for people.”
                    </blockquote>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
