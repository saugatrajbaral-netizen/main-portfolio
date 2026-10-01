import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Building2, 
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
  CheckCircle2, 
  UserCheck, 
  Users,
  ShieldCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function TaxpayerEducationProgram({ lang = 'en', defaultProgram = 'lamjung' }) {
  const portfolio = getPortfolioData(lang);
  
  const lamjungData = portfolio.taxpayerEducationProgramLamjung;
  const shuklagandakiData = portfolio.taxpayerEducationProgramShuklagandaki;
  const tanahunData = portfolio.taxpayerEducationProgramTanahun;
  const devghatData = portfolio.taxpayerEducationProgram;

  const programs = [
    {
      id: 'lamjung',
      tabLabel: lang === 'np' ? 'लमजुङ कार्यक्रम' : 'Lamjung Program',
      subLabel: lang === 'np' ? 'लमजुङ उद्योग वाणिज्य संघ' : 'Lamjung CCI Hall',
      badgeText: lang === 'np' ? '४ तस्बिरहरू' : '4 Verified Photos',
      icon: Landmark,
      data: lamjungData
    },
    {
      id: 'shuklagandaki',
      tabLabel: lang === 'np' ? 'शुक्लागण्डकी कार्यक्रम' : 'Shuklagandaki Program',
      subLabel: lang === 'np' ? 'ब्राइट हाउस पार्टी प्यालेस' : 'Party Palace, Dulegaunda',
      badgeText: lang === 'np' ? '४ तस्बिरहरू' : '4 Verified Photos',
      icon: Building2,
      data: shuklagandakiData
    },
    {
      id: 'tanahun',
      tabLabel: lang === 'np' ? 'दमौली कार्यक्रम' : 'Tanahun Program',
      subLabel: lang === 'np' ? 'तनहुँ उद्योग वाणिज्य संघ' : 'Chamber of Commerce Hall',
      badgeText: lang === 'np' ? '५ तस्बिरहरू' : '5 Verified Photos',
      icon: Landmark,
      data: tanahunData
    },
    {
      id: 'devghat',
      tabLabel: lang === 'np' ? 'देवघाट कार्यक्रम' : 'Devghat Program',
      subLabel: lang === 'np' ? 'गाउँपालिका सभाहल' : 'Rural Municipality Hall',
      badgeText: lang === 'np' ? '३ तस्बिरहरू' : '3 Verified Photos',
      icon: Users,
      data: devghatData
    }
  ].filter(p => !!p.data);

  const [activeTabId, setActiveTabId] = useState(defaultProgram);


  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentProgramObj = programs.find(p => p.id === activeTabId) || programs[0];
  const data = currentProgramObj?.data;

  if (!data) return null;

  const {
    sectionKicker,
    sectionTitle,
    subtitle,
    badgeLabel,
    program,
    location,
    role,
    organizer,
    technicalSupport,
    theme,
    description,
    motto,
    specifications = [],
    heroPhoto,
    supportingGallery = []
  } = data;

  // Combine all photos for lightbox navigation: Hero photo at index 0, followed by supporting gallery
  const allPhotos = [
    {
      id: `${activeTabId}-hero-photo`,
      image: heroPhoto.image,
      title: heroPhoto.title,
      role: heroPhoto.role,
      location: heroPhoto.location,
      authority: heroPhoto.authority,
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
    <section id="taxpayer-education-programs" className="polling-duty-section taxpayer-program-section">
      {/* Multi-Program Switcher Tabs */}
      {programs.length > 1 && (
        <div className="taxpayer-program-nav" role="tablist" aria-label="Taxpayer Education Programs">
          {programs.map((prog) => {
            const Icon = prog.icon;
            const isActive = prog.id === activeTabId;
            return (
              <button
                key={prog.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`taxpayer-program-tab ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTabId(prog.id);
                  setLightboxIndex(0);
                  setZoomLevel(1);
                }}
              >
                <div className="program-tab-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="program-tab-content">
                  <div className="program-tab-title-row">
                    <span className="program-tab-title">{prog.tabLabel}</span>
                    <span className="program-tab-badge">{prog.badgeText}</span>
                  </div>
                  <div className="program-tab-location">
                    <MapPin size={12} style={{ flexShrink: 0 }} />
                    <span>{prog.subLabel}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

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

      {/* Top Split Layout: Program Specs on Left, Hero Photo on Right */}
      <div className="polling-hero-split-grid">
        {/* Left Column: Program Details & Specifications */}
        <div className="polling-info-column">
          {/* Prominent Program Card */}
          <div className="prominent-role-card">
            <div className="role-card-badge-row">
              <span className="official-duty-badge">
                <BookOpen size={13} />
                <span>{role}</span>
              </span>
              <span className="role-nature-tag">{lang === 'np' ? 'नागरिक तथा करदाता सचेतना' : 'Taxpayer Outreach'}</span>
            </div>

            <h3 className="role-headline-title">{program}</h3>

            <div className="role-location-row">
              <MapPin size={16} className="text-accent" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div className="role-location-main">{location}</div>
                <div className="role-location-sub">{organizer}</div>
              </div>
            </div>

            <div className="role-description-quote">
              <p>“{description}”</p>
            </div>

            {motto && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gov-blue, #003893)' }}>
                <Sparkles size={14} className="text-accent" />
                <span>{lang === 'np' ? `नारा: "${motto}"` : `Motto: "${motto}"`}</span>
              </div>
            )}
          </div>

          {/* Program Specifications Card */}
          <div className="polling-specs-card">
            <div className="specs-card-title">
              <Scale size={14} className="text-gov-blue" />
              <span>{lang === 'np' ? 'कार्यक्रम विवरण तथा व्यवस्थापकीय पक्ष' : 'Program Specifications & Overview'}</span>
            </div>

            <div className="specs-items-list">
              {specifications.map((spec, idx) => (
                <div key={idx} className="spec-item-row">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="specs-note-strip">
              <ShieldCheck size={14} className="text-gov-blue" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                {lang === 'np' 
                  ? 'स्थानीय तहमा करदाता सचेतना, करको कानुनी दायरा, छुट सुविधा र करदाताका अधिकार तथा कर्तव्यबारे आयोजित आधिकारिक अभिमुखीकरण।'
                  : 'Official field tax literacy initiative fostering voluntary tax compliance, statutory orientation, and informed civic awareness at the district level.'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Photograph Card */}
        <div className="polling-hero-frame" onClick={() => handleOpenLightbox(0)}>
          <div className="hero-photo-topbar">
            <span className="hero-badge">{heroPhoto.badge}</span>
            <button 
              type="button" 
              className="hero-expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenLightbox(0);
              }}
            >
              <Maximize2 size={12} />
              <span>{lang === 'np' ? 'ठूलो तस्बिर' : 'Inspect Photo'}</span>
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
              <Maximize2 size={24} />
              <span>{lang === 'np' ? 'तस्बिर हेर्न क्लिक गर्नुहोस्' : 'Click to View Full Photograph'}</span>
            </div>
            <div className="hero-duty-watermark">
              <Award size={11} />
              <span>{location}</span>
            </div>
          </div>

          <div className="hero-caption-box">
            <h4 className="hero-photo-title">{heroPhoto.title}</h4>
            <p className="hero-photo-desc">{heroPhoto.caption}</p>
          </div>
        </div>
      </div>

      {/* Supporting Photo Gallery */}
      <div className="polling-supporting-gallery-section">
        <div className="gallery-section-heading">
          <FileText size={15} className="text-gov-blue" />
          <span>{lang === 'np' ? 'सम्बन्धित कार्यक्रम तस्बिर तथा विवरण' : 'Supporting Program Photographs & Gallery'}</span>
          <span className="gallery-count-badge">{allPhotos.length} {lang === 'np' ? 'तस्बिरहरू' : 'Photographs'}</span>
        </div>

        <div className="supporting-photos-grid">
          {allPhotos.map((photo, pIdx) => (
            <div 
              key={photo.id || pIdx} 
              className="supporting-photo-card"
              onClick={() => handleOpenLightbox(pIdx)}
            >
              <div className="supporting-img-wrap">
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="supporting-thumb-img"
                  loading="lazy"
                />
                <div className="supporting-hover-overlay">
                  <Maximize2 size={18} />
                </div>
                <span className="supporting-badge-tag">{photo.badge || `${pIdx + 1}`}</span>
              </div>
              <div className="supporting-info-wrap">
                <h5 className="supporting-title">{photo.title}</h5>
                <div className="supporting-meta-row">{photo.location}</div>
                <p className="supporting-desc">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="election-lightbox-backdrop" onClick={handleCloseLightbox}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div className="lightbox-top-toolbar">
              <div className="lightbox-item-title">
                <BookOpen size={16} className="text-gov-blue" />
                <span>{activePhoto.title}</span>
                <span className="item-counter">({lightboxIndex + 1} / {allPhotos.length})</span>
              </div>

              <div className="lightbox-actions-right">
                <button 
                  type="button" 
                  className="lightbox-tool-btn" 
                  onClick={toggleZoom}
                  title="Toggle Zoom"
                >
                  {zoomLevel > 1 ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                  <span>{zoomLevel > 1 ? `${Math.round(zoomLevel * 100)}%` : 'Zoom'}</span>
                </button>
                <button 
                  type="button" 
                  className="lightbox-close-btn" 
                  onClick={handleCloseLightbox}
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Stage */}
            <div className="lightbox-image-stage">
              <button 
                type="button" 
                className="lightbox-nav-btn prev-btn" 
                onClick={handlePrevPhoto}
                aria-label="Previous Photo"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="lightbox-img-viewport">
                <img 
                  src={activePhoto.image} 
                  alt={activePhoto.title}
                  className="lightbox-main-img"
                  style={{ transform: `scale(${zoomLevel})`, cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in' }}
                  onClick={toggleZoom}
                />
              </div>

              <button 
                type="button" 
                className="lightbox-nav-btn next-btn" 
                onClick={handleNextPhoto}
                aria-label="Next Photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Meta & Caption */}
            <div className="lightbox-bottom-info">
              <div className="lightbox-meta-grid">
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'कार्यक्रम' : 'Program'}</div>
                  <div className="lb-val">{program}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'स्थान' : 'Location'}</div>
                  <div className="lb-val">{activePhoto.location || location}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'भूमिका' : 'Role'}</div>
                  <div className="lb-val">{activePhoto.role || role}</div>
                </div>
                <div className="lb-meta-cell">
                  <div className="lb-lbl">{lang === 'np' ? 'संस्थागत समन्वय' : 'Authority'}</div>
                  <div className="lb-val">{activePhoto.authority || technicalSupport}</div>
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

