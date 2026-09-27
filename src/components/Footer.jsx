import React from 'react';
import { Link } from 'react-router-dom';
import NepalEmblem from './NepalEmblem';
import { NepalFlagIcon } from './Flags';
import WebsiteViewCounter from './WebsiteViewCounter';
import { ArrowUp, Sparkles } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Footer({ onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-compact-footer" role="contentinfo">
      {/* Decorative Top Accent Line with Nepal Colors */}
      <div className="footer-top-accent-strip" aria-hidden="true" />

      <div className="container-wide footer-compact-container">
        {/* Main Row: Identity, Sleek Horizontal Navigation, Interactive Actions */}
        <div className="footer-compact-main-row">
          {/* Left: Officer Brand & Cadre */}
          <div className="footer-compact-brand">
            <NepalEmblem size={22} variant="full" />
            <div className="footer-compact-brand-text">
              <span className="footer-compact-name">{personal.name}</span>
              <span className="footer-compact-role">
                {lang === 'np' ? 'कर अधिकृत · नेपाल सरकार' : 'Tax Officer · Government of Nepal'}
              </span>
            </div>
          </div>

          {/* Center: Sleek Quick Navigation Links */}
          <nav className="footer-compact-nav" aria-label="Footer Navigation">
            <Link to="/">{lang === 'np' ? 'गृहपृष्ठ' : 'Home'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/about">{lang === 'np' ? 'परिचय' : 'About'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/experience">{lang === 'np' ? 'अनुभव' : 'Experience'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/education">{lang === 'np' ? 'शिक्षा' : 'Education'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/research">{lang === 'np' ? 'अनुसन्धान' : 'Research'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/publications">{lang === 'np' ? 'प्रकाशन' : 'Publications'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/media">{lang === 'np' ? 'मिडिया' : 'Media'}</Link>
            <span className="footer-nav-bullet" aria-hidden="true">•</span>
            <Link to="/contact">{lang === 'np' ? 'सम्पर्क' : 'Contact'}</Link>
          </nav>

          {/* Right: View Counter & Interactive Utility Buttons */}
          <div className="footer-compact-actions">
            <WebsiteViewCounter lang={lang} />

            {onOpenNationalSymbols && (
              <button
                type="button"
                className="footer-compact-symbols-btn"
                onClick={onOpenNationalSymbols}
                title={lang === 'np' ? 'नेपालका राष्ट्रिय चिन्हहरू हेर्नुहोस्' : 'National Symbols of Nepal'}
                aria-label="National Symbols of Nepal"
              >
                <NepalFlagIcon size={13} className="symbols-flag-badge" />
                <span className="symbols-btn-label">{lang === 'np' ? 'चिन्हहरू' : 'Symbols'}</span>
                <Sparkles size={11} className="symbols-sparkle-icon" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              className="footer-compact-top-btn"
              onClick={scrollToTop}
              title={lang === 'np' ? 'पृष्ठको माथि जानुहोस्' : 'Back to top of page'}
              aria-label="Back to top"
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

        {/* Bottom Sub-row: Copyright & National Motto */}
        <div className="footer-compact-sub-row">
          <span className="footer-compact-copy">
            © 2026 {personal.name}. {lang === 'np' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </span>
          <span className="footer-compact-motto">
            “जननी जन्मभूमिश्च स्वर्गादपि गरीयसी”
          </span>
        </div>
      </div>
    </footer>
  );
}
