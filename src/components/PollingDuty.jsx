import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
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
  Info,
  CheckCircle2,
  Vote,
  UserCheck,
  Building
} from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function PollingDuty({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const data = portfolio.pollingDuty;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!data) return null;

  const {
    sectionKicker,
    sectionTitle,
    subtitle,
    badgeLabel,
    roleCard,
    specifications = [],
    progression = [],
    heroPhoto,
    supportingGallery = []
  } = data;

  // Combine all photos for lightbox navigation: Hero photo at index 0, followed by supporting gallery
  const allPhotos = [
    {
      id: 'hero-photo',
      image: heroPhoto.image,
      title: heroPhoto.title,
      role: heroPhoto.role,
      location: heroPhoto.location,
      authority: heroPhoto.context,
      description: heroPhoto.caption,
      badge: heroPhoto.badge
    },
    ...supportingGallery
  ];

  const activePhoto = allPhotos[lightboxIndex] || allPhotos[0];

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const toggleZoom = (e) => {
    e?.stopPropagation();
    setZoomLevel((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1));
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allPhotos.length]);

  return (
    <section id="election-administration-polling-duty" className="polling-duty-section">
      {/* Section Header */}
      <div className="polling-duty-header">
        <div className="polling-badge-pill">
          <span className="polling-flag-dot"></span>
          <span className="polling-kicker-text">{sectionKicker}</span>
          <span className="polling-badge-divider">•</span>
          <span className="polling-badge-sub">{badgeLabel}</span>
        </div>

        <h2 className="polling-section-title">{sectionTitle}</h2>
        <p className="polling-section-subtitle">{subtitle}</p>
      </div>

      {/* Top Split Layout: Role Card & Specs on Left, Hero Photo on Right */}
      <div className="polling-hero-split-grid">
        {/* Left Column: Role Card & Specifications */}
        <div className="polling-info-column">
          {/* Prominent Role Card */}
          <div className="prominent-role-card">
            <div className="role-card-badge-row">
              <span className="official-duty-badge">
                <CheckCircle2 size={12} />
                <span>{lang === 'np' ? 'आधिकारिक निर्वाचन दायित्व' : 'Official Election Duty'}</span>
              </span>
              <span className="role-nature-tag">{roleCard.nature}</span>
            </div>

            <h3 className="role-headline-title">{roleCard.role}</h3>
            
            <div className="role-location-row">
              <MapPin size={15} className="text-accent flex-shrink-0" />
              <div>
                <div className="role-location-main">{roleCard.location}</div>
                <div className="role-location-sub">{roleCard.region}</div>
              </div>
            </div>

            <div className="role-description-quote">
              <p>“{roleCard.description}”</p>
            </div>
          </div>

          {/* Role & Responsibility Specifications Card */}
          <div className="polling-specs-card">
            <div className="specs-card-title">
              <FileText size={15} className="text-gov-blue" />
              <span>{lang === 'np' ? 'दायित्व तथा कार्यक्षेत्र विवरण' : 'Role & Responsibility Details'}</span>
            </div>

            <div className="specs-items-list">
              {specifications.map((spec, idx) => (
                <div key={idx} className="spec-item-row">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>

            <div className="specs-note-strip">
              <Info size={13} className="text-accent flex-shrink-0" />
              <span>
                {lang === 'np'
                  ? 'यो दायित्व अस्थायी निर्वाचन सार्वजनिक सेवा हो, स्थायी सरकारी रोजगारी होइन।'
                  : 'This role reflects temporary official election public service, distinct from permanent civil service employment.'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Large Hero Photograph Display */}
        <div className="polling-hero-photo-column">
          <div className="polling-hero-frame" onClick={() => handleOpenLightbox(0)}>
            <div className="hero-photo-top-bar">
              <span className="hero-badge">{heroPhoto.badge}</span>
              <button
                type="button"
                className="hero-expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenLightbox(0);
                }}
                title={lang === 'np' ? 'पूर्ण तस्वीर हेर्नुहोस्' : 'Expand High-Resolution Photo'}
              >
                <Maximize2 size={14} />
                <span>{lang === 'np' ? 'विस्तृत हेर्नुहोस्' : 'Expand Photo'}</span>
              </button>
            </div>

            <div className="hero-img-container">
              <img
                src={heroPhoto.image}
                alt={heroPhoto.title}
                className="hero-main-documentary-img"
                loading="lazy"
              />
              <div className="hero-img-hover-overlay">
                <Maximize2 size={28} />
                <span>{lang === 'np' ? 'क्लिक गरी पूर्ण तस्वीर हेर्नुहोस्' : 'Click to View Full Photo'}</span>
              </div>
              <div className="hero-duty-watermark">
                <ShieldCheck size={13} />
                <span>ELECTION ADMINISTRATION · TANAHUN</span>
              </div>
            </div>

            <div className="hero-caption-box">
              <h4 className="hero-photo-title">{heroPhoto.title}</h4>
              <p className="hero-photo-desc">{heroPhoto.caption}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Professional Career & Civic Progression Roadmap */}
      <div className="polling-progression-section">
        <div className="progression-header-label">
          <Award size={15} className="text-gov-blue" />
          <span>{lang === 'np' ? 'नागरिक संलग्नता देखि निजामती सेवासम्मको व्यावसायिक यात्रा' : 'Professional Progression: Civic Engagement to Civil Service'}</span>
        </div>

        <div className="progression-steps-grid">
          {progression.map((item, idx) => (
            <div key={idx} className="progression-milestone-card">
              <div className="milestone-top-row">
                <span className="milestone-num">{item.step}</span>
                <span className="milestone-type-pill">{item.type}</span>
              </div>
              <h4 className="milestone-title">{item.title}</h4>
              <p className="milestone-desc">{item.desc}</p>
              {idx < progression.length - 1 && (
                <div className="milestone-arrow-indicator">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Supporting Documentary Photography Gallery */}
      <div className="polling-supporting-gallery-section">
        <div className="gallery-section-heading">
          <Building size={16} className="text-gov-blue" />
          <span>{lang === 'np' ? 'मतदान केन्द्र अभिलेख तथा प्रमाणहरू' : 'Documentary Photographic Records'}</span>
          <span className="gallery-count-badge">4 {lang === 'np' ? 'तस्वीरहरू' : 'Records'}</span>
        </div>

        <div className="supporting-photos-grid">
          {supportingGallery.map((photo, idx) => {
            const globalIndex = idx + 1; // 0 is hero
            return (
              <div
                key={photo.id}
                className="supporting-photo-card"
                onClick={() => handleOpenLightbox(globalIndex)}
              >
                <div className="supporting-img-wrap">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="supporting-thumb-img"
                    loading="lazy"
                  />
                  <div className="supporting-hover-overlay">
                    <Maximize2 size={20} />
                  </div>
                  <span className="supporting-badge-tag">{photo.badge}</span>
                </div>

                <div className="supporting-info-wrap">
                  <h5 className="supporting-title">{photo.title}</h5>
                  <div className="supporting-meta-row">
                    <span>{photo.location || photo.authority}</span>
                  </div>
                  <p className="supporting-desc">{photo.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen High-Resolution Lightbox Modal */}
      {lightboxOpen && (
        <div className="election-lightbox-backdrop" onClick={handleCloseLightbox}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div className="lightbox-top-toolbar">
              <div className="lightbox-item-title">
                <ShieldCheck size={18} className="text-gov-blue" />
                <span className="item-title-text">{activePhoto.title}</span>
                <span className="item-counter">({lightboxIndex + 1} / {allPhotos.length})</span>
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
                  src={activePhoto.image}
                  alt={activePhoto.title}
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

            {/* Bottom Info Strip */}
            <div className="lightbox-bottom-info">
              <div className="lightbox-meta-grid">
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'भूमिका / पद' : 'Role / Designation'}</div>
                  <div className="lb-val">{activePhoto.role}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'स्थान' : 'Location'}</div>
                  <div className="lb-val">{activePhoto.location || 'Tanahun District'}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'सन्दर्भ / निकाय' : 'Context / Authority'}</div>
                  <div className="lb-val text-accent">{activePhoto.authority || 'Election Administration'}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'संलग्नता प्रकृति' : 'Engagement Type'}</div>
                  <div className="lb-val">{lang === 'np' ? 'आधिकारिक निर्वाचन दायित्व' : 'Official Electoral Duty'}</div>
                </div>
              </div>

              <p className="lightbox-caption-text">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
