import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, ExternalLink, FileText, CheckCircle2, Award, Building, Globe, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function RecommendationLetterModal({
  isOpen,
  onClose,
  documentData,
  lang = 'en'
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'document'

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      className="rec-letter-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rec-letter-modal-title"
    >
      <div
        className="rec-letter-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="rec-modal-header">
          <div className="rec-modal-header-left">
            <div className="rec-modal-badge-icon">
              <Award size={18} />
            </div>
            <div>
              <div className="rec-modal-kicker">
                {lang === 'np' ? 'आधिकारिक सिफारिस पत्र' : 'Official Recommendation Letter'}
              </div>
              <h3 id="rec-letter-modal-title" className="rec-modal-title">
                {lang === 'np' ? 'युनुस सेन्टर, ढाका, बङ्गलादेश' : 'Yunus Centre · Dhaka, Bangladesh'}
              </h3>
            </div>
          </div>

          <div className="rec-modal-header-actions">
            {/* View Mode Tabs */}
            <div className="rec-modal-tab-group" role="tablist">
              <button
                type="button"
                className={`rec-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
                onClick={() => setActiveTab('pdf')}
                role="tab"
                aria-selected={activeTab === 'pdf'}
              >
                <FileText size={14} />
                <span>{lang === 'np' ? 'मूल PDF' : 'Original PDF'}</span>
              </button>
              <button
                type="button"
                className={`rec-tab-btn ${activeTab === 'document' ? 'active' : ''}`}
                onClick={() => setActiveTab('document')}
                role="tab"
                aria-selected={activeTab === 'document'}
              >
                <Award size={14} />
                <span>{lang === 'np' ? 'प्रमाणित पाठ' : 'Document View'}</span>
              </button>
            </div>

            {/* Download Link */}
            <a
              href="/yunus-centre-recommendation-letter.pdf"
              download="Saugat-Raj-Baral-Yunus-Centre-Recommendation.pdf"
              className="rec-action-icon-btn download"
              title={lang === 'np' ? 'PDF डाउनलोड गर्नुहोस्' : 'Download Original PDF'}
              aria-label="Download Original PDF"
            >
              <Download size={16} />
              <span className="rec-btn-text">{lang === 'np' ? 'डाउनलोड' : 'Download'}</span>
            </a>

            {/* Open in New Window */}
            <a
              href="/yunus-centre-recommendation-letter.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rec-action-icon-btn"
              title={lang === 'np' ? 'नयाँ ट्याबमा खोल्नुहोस्' : 'Open in New Tab'}
              aria-label="Open PDF in New Tab"
            >
              <ExternalLink size={16} />
            </a>

            {/* Close Button */}
            <button
              type="button"
              className="rec-modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Zoom Toolbar (When Document View is Active) */}
        {activeTab === 'document' && (
          <div className="rec-modal-toolbar">
            <div className="rec-zoom-controls">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                className="rec-zoom-btn"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="rec-zoom-level-text">{Math.round(zoomLevel * 100)}%</span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 1.75}
                className="rec-zoom-btn"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="rec-zoom-btn reset"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="rec-toolbar-signatory-note">
              <CheckCircle2 size={14} className="text-emerald" />
              <span>
                {lang === 'np'
                  ? 'नोबेल शान्ति पुरस्कार विजेता (२००६) मुहम्मद युनुसद्वारा हस्ताक्षरित'
                  : 'Signed by Nobel Peace Prize Laureate 2006, Muhammad Yunus'}
              </span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="rec-modal-body">
          {activeTab === 'pdf' ? (
            /* Tab 1: Direct Native PDF Viewer with full fidelity */
            <div className="rec-pdf-viewer-wrap">
              <iframe
                src="/yunus-centre-recommendation-letter.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
                title="Yunus Centre Recommendation Letter PDF"
                className="rec-pdf-iframe"
              />
            </div>
          ) : (
            /* Tab 2: High-Definition Document Layout View */
            <div className="rec-document-outer-canvas">
              <div
                className="rec-document-paper-sheet"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              >
                {/* Official Letterhead Header */}
                <div className="letterhead-header-row">
                  <div className="letterhead-logo-wrap">
                    {/* Yunus Centre stylized tree leaf emblem */}
                    <svg
                      className="yunus-centre-svg-logo"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 32,58 L 32,12"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Left leaves */}
                      <path
                        d="M 32,48 C 22,48 14,40 14,32 C 22,32 30,36 32,48 Z"
                        fill="#3b82f6"
                        opacity="0.85"
                      />
                      <path
                        d="M 32,36 C 24,36 18,28 18,20 C 24,20 30,24 32,36 Z"
                        fill="#60a5fa"
                        opacity="0.9"
                      />
                      {/* Right leaves */}
                      <path
                        d="M 32,44 C 42,44 50,36 50,28 C 42,28 34,32 32,44 Z"
                        fill="#2563eb"
                        opacity="0.85"
                      />
                      <path
                        d="M 32,30 C 40,30 46,22 46,16 C 40,16 34,20 32,30 Z"
                        fill="#1d4ed8"
                        opacity="0.9"
                      />
                      {/* Top leaf */}
                      <path
                        d="M 32,18 C 28,10 32,4 32,4 C 32,4 36,10 32,18 Z"
                        fill="#1e3a8a"
                      />
                    </svg>
                  </div>

                  <div className="letterhead-brand-title">
                    <span className="brand-primary">Yunus Centre</span>
                  </div>
                </div>

                {/* Letter Recipient Title */}
                <div className="letter-salutation-center">
                  <h2>To Whom It May Concern</h2>
                </div>

                {/* Date */}
                <div className="letter-date-right">
                  <span>December 26, 2019</span>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="letter-body-prose">
                  <p>
                    Mr. Saugat Raj Baral attended a one-month Immersion Program in October 2019 at Yunus Centre. During the Program, Saugat was exposed to the concept of social business through various presentations, interactive meetings and field visits to social businesses companies in Bangladesh. He demonstrated sincerity and attentiveness throughout the program.
                  </p>
                  <p>
                    I wish him the best in the future.
                  </p>
                </div>

                {/* Sign-off & Signature Area */}
                <div className="letter-signature-block">
                  <div className="sig-sincerely">Sincerely,</div>

                  {/* High-definition Signature Simulation from original */}
                  <div className="sig-image-holder">
                    <svg
                      className="yunus-signature-svg"
                      viewBox="0 0 280 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Vectorized path representing Muhammad Yunus signature */}
                      <path
                        d="M 18,52 C 32,30 50,22 72,48 C 84,62 98,34 112,38 C 128,42 142,66 160,32 C 172,12 188,44 205,36 C 224,28 245,55 268,42 M 35,68 C 95,65 170,68 250,64 M 65,42 C 85,20 120,18 145,35"
                        stroke="#0f172a"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="sig-meta-lines">
                    <div className="sig-name">Muhammad Yunus</div>
                    <div className="sig-title">Nobel Peace Prize Laureate 2006</div>
                    <div className="sig-role">Founder, Grameen Bank</div>
                    <div className="sig-role">Chairman, Yunus Centre</div>
                  </div>
                </div>

                {/* Official Letterhead Footer */}
                <div className="letterhead-footer-bar">
                  <div className="footer-line-accent" />
                  <div className="footer-address-line">
                    Grameen Bank Bhaban, Mirpur 2, Dhaka 1216, Bangladesh
                  </div>
                  <div className="footer-contact-line">
                    Tel : 880 2 9035755 Fax : 880 2 9012039 E-mail : Yunus@yunuscentre.org web www.yunuscentre.org
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="rec-modal-footer">
          <div className="rec-footer-meta">
            <span className="rec-verified-pill">
              <CheckCircle2 size={13} />
              {lang === 'np' ? 'प्रमाणित मूल प्रति' : 'Verified Original Document'}
            </span>
            <span className="rec-footer-date-tag">
              {lang === 'np' ? 'जारी मिति: २६ डिसेम्बर २०१९' : 'Issued: December 26, 2019'}
            </span>
          </div>

          <div className="rec-footer-btn-group">
            <a
              href="/yunus-centre-recommendation-letter.pdf"
              download="Saugat-Raj-Baral-Yunus-Centre-Recommendation.pdf"
              className="btn btn-primary rec-footer-download-btn"
            >
              <Download size={14} />
              <span>{lang === 'np' ? 'मूल PDF डाउनलोड' : 'Download Original PDF'}</span>
            </a>
            <button
              type="button"
              className="btn btn-secondary rec-footer-close-btn"
              onClick={onClose}
            >
              <span>{lang === 'np' ? 'बन्द गर्नुहोस्' : 'Close'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
