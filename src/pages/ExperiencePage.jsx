import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Briefcase, 
  ChevronRight, 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft,
  Layers
} from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import TaxpayerEducationProgram from '../components/TaxpayerEducationProgram';

export default function ExperiencePage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { journey } = portfolio;

  // Lightbox State
  const [activeGallery, setActiveGallery] = useState(null); // array of photos
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
    <div className="page-chapter-view experience-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'अनुभव' : 'Experience'}
        kicker={lang === 'np' ? 'दोस्रो अध्याय' : 'Chapter 2 · Service History'}
        title={lang === 'np' ? 'व्यावसायिक यात्रा तथा प्रशासनिक अनुभव' : 'Professional Journey & Experience'}
        subtitle={lang === 'np'
          ? 'नेपाल सरकारको अर्थ मन्त्रालय तथा प्रादेशिक प्रशासनिक संरचनामा सम्पादन गरिएका जिम्मेवारीहरूको कालक्रमिक विवरण।'
          : 'Chronological timeline of institutional leadership, statutory revenue enforcement, and provincial public finance administration.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        <div className="editorial-journey-timeline">
          {journey.map((item, idx) => (
            <article key={item.id || idx} className="journey-node">
              {/* Timeline Spine */}
              <div className="journey-spine">
                <div className="journey-bullet-ring">
                  <div className="journey-bullet-dot" />
                </div>
                {idx < journey.length - 1 && <div className="journey-line" />}
              </div>

              {/* Journey Card Content */}
              <div className="journey-card">
                {/* 1. Header: Position, Ministry, Duration, Jurisdiction */}
                <div className="journey-card-header">
                  <div className="journey-header-main">
                    <span className={`journey-period-pill ${item.period === 'Current' || item.period === 'हाल कार्यरत' ? 'current' : 'previous'}`}>
                      {item.period}
                    </span>
                    <h2 className="journey-role">{item.role}</h2>
                    <div className="journey-institution">{item.institution}</div>
                    {item.area && (
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '3px', fontWeight: 500 }}>
                        {item.area}
                      </div>
                    )}
                  </div>

                  <div className="journey-header-meta">
                    <div className="journey-office">
                      <Building2 size={13} className="text-gov-blue" />
                      <span>{item.office}</span>
                    </div>
                    <div className="journey-jurisdiction">
                      <MapPin size={13} className="text-accent" />
                      <span>{item.jurisdiction}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Concise Description / Overview */}
                <p className="journey-overview">{item.overview}</p>

                {/* 3. Key Responsibilities */}
                <div className="journey-responsibilities-box">
                  <h3 className="responsibilities-title">
                    {lang === 'np' ? 'प्रमुख जिम्मेवारी तथा कार्यक्षेत्र:' : 'Key Responsibilities & Professional Areas:'}
                  </h3>
                  <div className="responsibilities-grid">
                    {item.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="responsibility-item">
                        <CheckCircle2 size={13} className="resp-icon" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Photo Gallery (if available) */}
                {item.gallery && item.gallery.length > 0 && (
                  <div className="journey-gallery-wrap">
                    <div className="journey-gallery-header">
                      <div className="journey-gallery-title-box">
                        <Camera size={14} className="text-gov-blue" />
                        <span className="journey-gallery-badge">
                          {lang === 'np' ? 'आधिकारिक तस्वीर अभिलेख' : 'Official Photo Archive'}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="journey-view-all-btn"
                        onClick={() => openLightbox(item.gallery, 0)}
                        aria-label={lang === 'np' ? 'ग्यालरी हेर्नुहोस्' : 'View Gallery'}
                      >
                        <Layers size={13} />
                        <span>
                          {lang === 'np'
                            ? `सम्पूर्ण ग्यालरी (${item.gallery.length})`
                            : `View Gallery (${item.gallery.length})`}
                        </span>
                      </button>
                    </div>

                    <div className="journey-gallery-layout">
                      {/* Featured Main Cover Image */}
                      {item.gallery[0] && (
                        <div
                          className="journey-cover-card"
                          onClick={() => openLightbox(item.gallery, 0)}
                          role="button"
                          tabIndex={0}
                          aria-label={item.gallery[0].title}
                        >
                          <img
                            src={item.gallery[0].src}
                            alt={item.gallery[0].title}
                            className="journey-cover-img"
                            loading="lazy"
                          />
                          <div className="journey-cover-overlay">
                            <div className="journey-cover-top">
                              <span className="journey-cover-tag">{item.gallery[0].tag || 'Cover Photo'}</span>
                              <div className="journey-cover-expand-icon">
                                <Maximize2 size={14} />
                              </div>
                            </div>
                            <div className="journey-cover-caption">
                              {item.gallery[0].title}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Supporting Thumbnails Grid */}
                      <div className="journey-thumb-subgrid">
                        {item.gallery.slice(1, 5).map((photo, pIdx) => {
                          const actualIndex = pIdx + 1;
                          const isLast = pIdx === 3 && item.gallery.length > 5;
                          const remainingCount = item.gallery.length - 5;

                          return (
                            <div
                              key={photo.id || pIdx}
                              className="journey-thumb-card"
                              onClick={() => openLightbox(item.gallery, actualIndex)}
                              role="button"
                              tabIndex={0}
                              aria-label={photo.title}
                            >
                              <img
                                src={photo.src}
                                alt={photo.title}
                                className="journey-thumb-img"
                                loading="lazy"
                              />
                              {isLast ? (
                                <div className="journey-thumb-more-overlay">
                                  <span className="journey-more-count">+{remainingCount + 1}</span>
                                  <span className="journey-more-text">{lang === 'np' ? 'थप तस्वीर' : 'More'}</span>
                                </div>
                              ) : (
                                <div className="journey-thumb-overlay">
                                  <span className="journey-thumb-title">{photo.title}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Dedicated Field Outreach Program: Devghat / Tanahun / Lamjung / Shuklagandaki */}
        <div style={{ marginTop: '48px' }}>
          <TaxpayerEducationProgram lang={lang} />
        </div>
      </div>

      {/* =========================================================================
          FULLSCREEN ACCESSIBLE LIGHTBOX MODAL
          ========================================================================= */}
      {activeGallery && (
        <div
          className="exp-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Experience Photo Gallery Lightbox"
        >
          {/* Top Bar */}
          <div className="exp-lightbox-topbar" onClick={(e) => e.stopPropagation()}>
            <div className="exp-lightbox-meta">
              <span className="exp-lightbox-counter">
                {activePhotoIdx + 1} / {activeGallery.length}
              </span>
              {activeGallery[activePhotoIdx]?.tag && (
                <span className="exp-lightbox-tag">{activeGallery[activePhotoIdx].tag}</span>
              )}
            </div>

            <button
              type="button"
              className="exp-lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image Stage with Prev / Next Navigation */}
          <div className="exp-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            {activeGallery.length > 1 && (
              <button
                type="button"
                className="exp-lightbox-nav-btn prev"
                onClick={prevPhoto}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img
              src={activeGallery[activePhotoIdx]?.src}
              alt={activeGallery[activePhotoIdx]?.title}
              className="exp-lightbox-main-img"
            />

            {activeGallery.length > 1 && (
              <button
                type="button"
                className="exp-lightbox-nav-btn next"
                onClick={nextPhoto}
                aria-label="Next photograph"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Bar: Title, Caption & Thumbnail Strip */}
          <div className="exp-lightbox-bottombar" onClick={(e) => e.stopPropagation()}>
            <div className="exp-lightbox-caption-title">
              {activeGallery[activePhotoIdx]?.title}
            </div>
            {activeGallery[activePhotoIdx]?.caption && (
              <div className="exp-lightbox-caption-desc">
                {activeGallery[activePhotoIdx].caption}
              </div>
            )}

            {activeGallery.length > 1 && (
              <div className="exp-lightbox-thumbs-strip">
                {activeGallery.map((photo, tIdx) => (
                  <button
                    key={photo.id || tIdx}
                    type="button"
                    className={`exp-lightbox-thumb-item ${tIdx === activePhotoIdx ? 'active' : ''}`}
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
    </div>
  );
}

