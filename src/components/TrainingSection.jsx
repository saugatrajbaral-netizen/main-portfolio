import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Landmark, 
  MapPin, 
  Calendar, 
  Layers, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Award,
  BookOpen
} from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function TrainingSection({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const trainings = portfolio.professionalTrainings || [];

  // Lightbox State
  const [activeGallery, setActiveGallery] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeGallery) return;
      if (e.key === 'Escape') {
        setActiveGallery(null);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : activeGallery.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) => (prev < activeGallery.length - 1 ? prev + 1 : 0));
      }
    };

    if (activeGallery) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeGallery]);

  const openLightbox = (gallery, index = 0) => {
    setActiveGallery(gallery);
    setActivePhotoIdx(index);
  };

  const closeLightbox = () => {
    setActiveGallery(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (!activeGallery) return;
    setActivePhotoIdx((prev) => (prev < activeGallery.length - 1 ? prev + 1 : 0));
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (!activeGallery) return;
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : activeGallery.length - 1));
  };

  return (
    <section id="training" className="training-unified-section">
      <div className="training-section-header">
        <div className="training-kicker-badge">
          <GraduationCap size={14} className="text-gov-blue" />
          <span>{lang === 'np' ? 'व्यावसायिक तालिम तथा क्षमता विकास' : 'TRAINING & PROFESSIONAL DEVELOPMENT'}</span>
        </div>
        <h2 className="training-section-title">
          {lang === 'np' ? (
            <>संस्थागत तालिम तथा <span className="text-accent">क्षमता अभिवृद्धि</span></>
          ) : (
            <>Training & <span className="text-accent">Professional Development</span></>
          )}
        </h2>
        <p className="training-section-lead">
          {lang === 'np'
            ? 'नेपाल सरकारको निजामती प्रशासन, सार्वजनिक वित्तीय व्यवस्थापन र राजस्व प्रणालीमा नेतृत्वदायी भूमिकाका लागि सम्पादित आधारभूत तथा विशेषीकृत तालिमहरू।'
            : 'Core administrative leadership, public financial management, and statutory revenue programs under the Government of Nepal.'}
        </p>
      </div>

      {/* Side-by-side Dual Training Cards Grid */}
      <div className="training-dual-grid">
        {trainings.map((item) => (
          <article key={item.id} className="training-card">
            {/* Representative Cover Image Container */}
            <div 
              className="training-cover-viewport"
              onClick={() => openLightbox(item.gallery, 0)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.program} gallery`}
            >
              <img
                src={item.coverImage}
                alt={item.program}
                className="training-cover-img"
                loading="lazy"
              />
              <div className="training-cover-overlay">
                <div className="training-overlay-top">
                  <span className="training-cover-badge">{item.badge}</span>
                  <div className="training-expand-btn">
                    <Maximize2 size={14} />
                  </div>
                </div>

                <div className="training-overlay-bottom">
                  <span className="training-photo-count-pill">
                    <Layers size={12} />
                    <span>{item.gallery.length} {lang === 'np' ? 'तस्वीरहरू' : 'Photos'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Training Card Content Body */}
            <div className="training-card-body">
              <div className="training-card-meta-row">
                <span className="training-duration-pill">{item.duration}</span>
                <div className="training-location-tag">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
              </div>

              <h3 className="training-program-title">{item.program}</h3>
              <div className="training-institution-name">
                <Landmark size={14} className="text-gov-blue" />
                <span>{item.institution}</span>
              </div>

              <p className="training-description">{item.description}</p>

              {/* View Gallery Action Trigger */}
              <div className="training-card-actions">
                <button
                  type="button"
                  className="training-view-gallery-btn"
                  onClick={() => openLightbox(item.gallery, 0)}
                  aria-label={`Open ${item.program} photo gallery`}
                >
                  <Layers size={14} />
                  <span>
                    {lang === 'np'
                      ? `ग्यालरी हेर्नुहोस् (${item.gallery.length})`
                      : `View Gallery (${item.gallery.length} Photos)`}
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* =========================================================================
          FULLSCREEN ACCESSIBLE LIGHTBOX MODAL
          ========================================================================= */}
      {activeGallery && (
        <div
          className="training-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Training Photo Gallery Lightbox"
        >
          {/* Top Bar */}
          <div className="training-lightbox-topbar" onClick={(e) => e.stopPropagation()}>
            <div className="training-lightbox-meta">
              <span className="training-lightbox-counter">
                {activePhotoIdx + 1} / {activeGallery.length}
              </span>
              {activeGallery[activePhotoIdx]?.tag && (
                <span className="training-lightbox-tag">{activeGallery[activePhotoIdx].tag}</span>
              )}
            </div>

            <button
              type="button"
              className="training-lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image Stage with Prev / Next Navigation */}
          <div className="training-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            {activeGallery.length > 1 && (
              <button
                type="button"
                className="training-lightbox-nav-btn prev"
                onClick={prevPhoto}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img
              src={activeGallery[activePhotoIdx]?.src}
              alt={activeGallery[activePhotoIdx]?.title}
              className="training-lightbox-main-img"
            />

            {activeGallery.length > 1 && (
              <button
                type="button"
                className="training-lightbox-nav-btn next"
                onClick={nextPhoto}
                aria-label="Next photograph"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Bar: Title, Caption & Thumbnail Strip */}
          <div className="training-lightbox-bottombar" onClick={(e) => e.stopPropagation()}>
            <div className="training-lightbox-caption-title">
              {activeGallery[activePhotoIdx]?.title}
            </div>
            {activeGallery[activePhotoIdx]?.caption && (
              <div className="training-lightbox-caption-desc">
                {activeGallery[activePhotoIdx].caption}
              </div>
            )}

            {activeGallery.length > 1 && (
              <div className="training-lightbox-thumbs-strip">
                {activeGallery.map((photo, tIdx) => (
                  <button
                    key={photo.id || tIdx}
                    type="button"
                    className={`training-lightbox-thumb-item ${tIdx === activePhotoIdx ? 'active' : ''}`}
                    onClick={() => setActivePhotoIdx(tIdx)}
                    aria-label={`Jump to photo ${tIdx + 1}`}
                  >
                    <img src={photo.src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
