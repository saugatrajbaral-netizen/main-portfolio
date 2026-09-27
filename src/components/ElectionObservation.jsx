import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Eye, 
  MapPin, 
  Calendar, 
  Award, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  Scale, 
  Landmark, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import { getPortfolioData } from '../data/portfolioData';

export default function ElectionObservation({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const data = portfolio.electoralObservation;

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!data) return null;

  const {
    sectionKicker,
    sectionTitle,
    subtitle,
    badgeLabel,
    introParagraph,
    progressionRoadmap = [],
    experiences = [],
    closingStatement
  } = data;

  const currentItem = experiences[activeIndex] || experiences[0];
  const activeLightboxItem = experiences[lightboxIndex] || experiences[0];

  // Open Lightbox
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close Lightbox
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setLightboxIndex((prev) => (prev + 1) % experiences.length);
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setLightboxIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const toggleZoom = (e) => {
    e?.stopPropagation();
    setZoomLevel((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, experiences.length]);

  return (
    <section id="civic-electoral-engagement" className="election-observation-section">
      {/* Section Header */}
      <div className="election-obs-header">
        <div className="election-obs-badge-pill">
          <span className="election-flag-dot"></span>
          <span className="election-kicker-text">{sectionKicker}</span>
          <span className="election-badge-divider">•</span>
          <span className="election-badge-sub">{badgeLabel}</span>
        </div>

        <h2 className="election-obs-title">{sectionTitle}</h2>
        <p className="election-obs-subtitle">{subtitle}</p>

        <div className="election-obs-intro-box">
          <p className="election-obs-intro-text">
            {introParagraph}
          </p>
          <div className="election-obs-note">
            <Info size={15} className="text-accent flex-shrink-0" />
            <span>
              {lang === 'np' 
                ? 'टिप्पणी: यो अनुभव निजामती सेवा प्रवेशपूर्वको स्वतन्त्र नागरिक एवं लोकतान्त्रिक संलग्नता हो, औपचारिक सरकारी रोजगारी होइन।' 
                : 'Note: These engagements represent independent civic and democratic observation prior to civil service appointment, conducted strictly under Election Commission observer frameworks.'}
            </span>
          </div>
        </div>
      </div>

      {/* Progression Roadmap Timeline */}
      <div className="election-progression-wrapper">
        <div className="election-progression-heading">
          <span>{lang === 'np' ? 'नागरिक सहभागिता देखि सार्वजनिक सेवासम्मको यात्रा' : 'Civic Engagement to Public Service Trajectory'}</span>
        </div>
        <div className="election-progression-grid">
          {progressionRoadmap.map((step, idx) => (
            <div key={idx} className="progression-step-card">
              <div className="step-num-badge">{step.step}</div>
              <div className="step-content">
                <div className="step-label">{step.label}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
              {idx < progressionRoadmap.length - 1 && (
                <div className="step-connector-arrow">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Split & Mobile Timeline Layout */}
      <div className="election-experience-layout">
        {/* Left Column: Timeline Items Selector */}
        <div className="election-timeline-col">
          <div className="timeline-col-header">
            <Award size={16} className="text-gov-blue" />
            <span>{lang === 'np' ? 'तीन निर्वाचन पर्यवेक्षण अनुभवहरू' : 'Documented Observation Records'}</span>
          </div>

          <div className="election-cards-list">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={exp.id}
                  className={`election-record-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="record-card-top">
                    <span className="record-badge">{exp.badge}</span>
                    <span className="record-year">{exp.year}</span>
                  </div>

                  <h3 className="record-card-title">{exp.title}</h3>
                  <div className="record-assignment">{exp.assignment}</div>

                  <div className="record-meta-list">
                    <div className="record-meta-item">
                      <Calendar size={13} className="meta-icon" />
                      <span>{exp.date}</span>
                    </div>
                    <div className="record-meta-item">
                      <MapPin size={13} className="meta-icon" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="record-meta-item">
                      <Shield size={13} className="meta-icon text-gov-blue" />
                      <span>{exp.role}</span>
                    </div>
                  </div>

                  <p className="record-description">{exp.description}</p>

                  {exp.quote && (
                    <div className="record-quote-snippet">
                      <span className="quote-mark">“</span>
                      <em>{exp.quote}</em>
                      <span className="quote-mark">”</span>
                    </div>
                  )}

                  {/* Mobile-only inline photo preview button */}
                  <div className="record-card-actions">
                    <button
                      type="button"
                      className="view-photo-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(idx);
                      }}
                    >
                      <Eye size={14} />
                      <span>{lang === 'np' ? 'प्रमाण / तस्वीर हेर्नुहोस् (High Res)' : 'View Document / Photo (High Res)'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Featured Archival Photo Gallery & Viewer */}
        <div className="election-gallery-col">
          <div className="featured-photo-card">
            <div className="photo-card-topbar">
              <div className="photo-tag-group">
                <span className="photo-index-pill">
                  {lang === 'np' ? `अभिलेख ०${activeIndex + 1} / ०${experiences.length}` : `Record 0${activeIndex + 1} of 0${experiences.length}`}
                </span>
                <span className="photo-authority-tag">{currentItem.authority}</span>
              </div>
              <button
                type="button"
                className="zoom-inspect-btn"
                onClick={() => handleOpenLightbox(activeIndex)}
                title={lang === 'np' ? 'पूर्ण आकारमा हेर्नुहोस्' : 'Open in Fullscreen High-Resolution Lightbox'}
              >
                <Maximize2 size={15} />
                <span>{lang === 'np' ? 'विस्तृत हेर्नुहोस्' : 'Expand Photo'}</span>
              </button>
            </div>

            {/* Photo Preview Container (Uncropped) */}
            <div
              className="featured-image-wrapper"
              onClick={() => handleOpenLightbox(activeIndex)}
            >
              <img
                src={currentItem.image}
                alt={currentItem.imageAlt || currentItem.title}
                className="featured-document-img"
                loading="lazy"
              />
              <div className="image-hover-overlay">
                <div className="overlay-content">
                  <Maximize2 size={24} />
                  <span>{lang === 'np' ? 'क्लिक गरी पूर्ण तस्वीर हेर्नुहोस्' : 'Click to View Full Uncropped Photo'}</span>
                </div>
              </div>
              <div className="photo-watermark-tag">
                <NepalEmblem size={14} variant="simple" />
                <span>ELECTION COMMISSION OF NEPAL · OBSERVER</span>
              </div>
            </div>

            {/* Caption & Metadata Strip */}
            <div className="photo-caption-panel">
              <div className="caption-header">
                <h4 className="caption-title">{currentItem.title}</h4>
                <div className="caption-role-badge">{currentItem.role}</div>
              </div>

              {currentItem.credentialNo && (
                <div className="caption-credential-pill">
                  <FileText size={13} className="text-gov-blue" />
                  <span>{currentItem.credentialNo}</span>
                </div>
              )}

              <p className="caption-desc">{currentItem.description}</p>
            </div>

            {/* Quick Switcher Thumbnails */}
            <div className="gallery-thumb-strip">
              {experiences.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`thumb-button ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <img src={item.image} alt={item.title} className="thumb-img" />
                  <span className="thumb-badge">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Statement */}
      {closingStatement && (
        <div className="election-closing-statement-box">
          <div className="statement-emblem-wrap">
            <NepalEmblem size={32} variant="full" />
          </div>
          <div className="statement-content">
            <blockquote className="statement-quote">
              “{closingStatement}”
            </blockquote>
            <div className="statement-author">
              <span className="statement-name">{portfolio.personal?.name}</span>
              <span className="statement-role">
                {lang === 'np' 
                  ? 'निजामती सेवा पूर्वको नागरिक तथा लोकतान्त्रिक संलग्नता' 
                  : 'Civic & Democratic Engagement Prior to Civil Service Entry'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen High-Resolution Lightbox Viewer */}
      {lightboxOpen && (
        <div className="election-lightbox-backdrop" onClick={handleCloseLightbox}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div className="lightbox-top-toolbar">
              <div className="lightbox-item-title">
                <NepalEmblem size={20} variant="simple" />
                <span className="item-title-text">{activeLightboxItem.title}</span>
                <span className="item-counter">({lightboxIndex + 1} / {experiences.length})</span>
              </div>

              <div className="lightbox-actions-right">
                <button
                  type="button"
                  className="lightbox-tool-btn"
                  onClick={toggleZoom}
                  title="Toggle Zoom"
                >
                  {zoomLevel > 1 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  <span className="zoom-text">{Math.round(zoomLevel * 100)}%</span>
                </button>

                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={handleCloseLightbox}
                  title="Close (ESC)"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div className="lightbox-image-stage">
              <button
                type="button"
                className="lightbox-nav-btn prev-btn"
                onClick={handlePrevPhoto}
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="lightbox-img-viewport" onClick={toggleZoom}>
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="lightbox-main-img"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in'
                  }}
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next-btn"
                onClick={handleNextPhoto}
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Lightbox Information Bar */}
            <div className="lightbox-bottom-info">
              <div className="lightbox-meta-grid">
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'भूमिका' : 'Role'}</div>
                  <div className="lb-val">{activeLightboxItem.role}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'मिति / वर्ष' : 'Date / Year'}</div>
                  <div className="lb-val">{activeLightboxItem.date}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'स्थान' : 'Location'}</div>
                  <div className="lb-val">{activeLightboxItem.location}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'प्रमाणीकरण' : 'Authority / Credentials'}</div>
                  <div className="lb-val text-accent">{activeLightboxItem.credentialNo || activeLightboxItem.authority}</div>
                </div>
              </div>

              <p className="lightbox-caption-text">{activeLightboxItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
