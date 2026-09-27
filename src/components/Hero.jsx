import React from 'react';
import { ArrowDown, FileText, ChevronRight, MapPin, Building, ShieldCheck, Download, Sparkles } from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import DigitalClock from './DigitalClock';
import { getPortfolioData } from '../data/portfolioData';

export default function Hero({ onOpenResume, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-editorial-section">
      {/* Background Subtle Lines & National Emblem Watermark */}
      <div className="hero-editorial-grid" aria-hidden="true" />
      <div className="hero-watermark-emblem" aria-hidden="true">
        <NepalEmblem size={520} variant="white" />
      </div>

      <div className="container-wide hero-editorial-container">
        <div className="hero-editorial-layout">
          {/* Left Column: Typography & Narrative */}
          <div className="hero-editorial-text-col">
            {/* Officer Name */}
            <div className="hero-officer-name">
              <span>{personal.name}</span>
              {lang === 'en' && <span className="nepali-subname">({personal.nepaliName})</span>}
            </div>

            {/* Large Headline */}
            <h1 className="hero-editorial-headline">
              {personal.headline}
            </h1>

            {/* Supporting Tagline */}
            <p className="hero-editorial-supporting">
              {personal.supportingText}
            </p>

            {/* Explanatory Paragraph */}
            <p className="hero-editorial-paragraph">
              {personal.heroParagraph}
            </p>

            {/* CTA Buttons */}
            <div className="hero-editorial-actions">
              <a
                href="#about"
                className="button button-primary"
                onClick={(e) => scrollToSection(e, '#about')}
              >
                <span>{lang === 'np' ? 'मेरो कार्य अन्वेषण गर्नुहोस्' : 'Explore My Work'}</span>
                <ChevronRight size={15} />
              </a>

              <button
                type="button"
                className="button button-secondary"
                onClick={onOpenResume}
              >
                <FileText size={15} />
                <span>{lang === 'np' ? 'व्यक्तिगत विवरण (CV)' : 'Download CV'}</span>
              </button>
            </div>

            {/* Live Jurisdictional Tag */}
            <div className="hero-status-strip">
              <div className="status-item">
                <MapPin size={13} className="text-accent" />
                <span>{lang === 'np' ? 'आन्तरिक राजस्व कार्यालय, दमौली' : 'Inland Revenue Office, Damauli'}</span>
              </div>
              <span className="status-divider">•</span>
              <div className="status-item">
                <ShieldCheck size={13} className="text-gov-blue" />
                <span>{lang === 'np' ? 'राजपत्राङ्कित तृतीय श्रेणी' : 'Gazetted Third-Class'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sophisticated Rectangular Editorial Portrait */}
          <div className="hero-editorial-portrait-col">
            <div className="editorial-portrait-wrapper">
              {/* Subtle Red Vertical Accent Line */}
              <div className="portrait-red-accent-line" aria-hidden="true" />
              
              {/* Rectangular Portrait Container */}
              <div className="editorial-portrait-frame">
                <picture className="editorial-portrait-picture">
                  <source type="image/webp" srcSet="/saugat-baral-portrait.webp 640w, /saugat-baral.webp 1024w" />
                  <source type="image/jpeg" srcSet="/saugat-baral.jpg" />
                  <img
                    src="/saugat-baral.jpg"
                    alt={`Portrait of ${personal.name}`}
                    className="editorial-portrait-image"
                    width={640}
                    height={800}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onError={(e) => {
                      // Fallback to stylized editorial placeholder
                      const picture = e.currentTarget.closest('picture');
                      if (picture) picture.style.display = 'none';
                      const placeholder = picture?.nextElementSibling;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                </picture>
                
                {/* Fallback Placeholder Frame */}
                <div className="editorial-portrait-placeholder" style={{ display: 'none' }}>
                  <NepalEmblem size={80} variant="full" />
                  <div className="placeholder-title">{personal.name}</div>
                  <div className="placeholder-role">{personal.role}</div>
                </div>
              </div>

              {/* Digital Live Clock Card below portrait */}
              <div className="portrait-live-clock-card">
                <DigitalClock variant="badge" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="hero-scroll-indicator">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="scroll-indicator-link"
          >
            <span>{lang === 'np' ? 'थप अध्ययनका लागि स्क्रोल गर्नुहोस्' : 'Scroll to explore'}</span>
            <ArrowDown size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
