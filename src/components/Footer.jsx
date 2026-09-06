import React from 'react';
import { Link } from 'react-router-dom';
import NepalEmblem from './NepalEmblem';
import { ArrowUp } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Footer({ onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-editorial-footer">
      <div className="container-wide footer-inner">
        {/* Main Footer Row */}
        <div className="footer-main-row">
          {/* Left Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-header">
              <NepalEmblem size={32} variant="full" />
              <div>
                <span className="footer-name">{personal.name}</span>
                <span className="footer-role">
                  {lang === 'np' ? 'कर अधिकृत · नेपाल सरकार' : 'Tax Officer | Government of Nepal'}
                </span>
              </div>
            </Link>
            <p className="footer-motto-statement">
              {lang === 'np'
                ? 'निजामती सेवा · सार्वजनिक वित्त · कर नीति · नेपाल'
                : 'Public Service • Public Finance • Policy • Nepal'}
            </p>
          </div>

          {/* Right Navigation Col */}
          <div className="footer-nav-col">
            <nav className="footer-nav-links">
              <Link to="/about">
                {lang === 'np' ? 'परिचय' : 'About'}
              </Link>
              <Link to="/experience">
                {lang === 'np' ? 'अनुभव' : 'Experience'}
              </Link>
              <Link to="/education">
                {lang === 'np' ? 'शिक्षा' : 'Education'}
              </Link>
              <Link to="/research">
                {lang === 'np' ? 'अनुसन्धान' : 'Research'}
              </Link>
              <Link to="/publications">
                {lang === 'np' ? 'प्रकाशनहरू' : 'Publications'}
              </Link>
              <Link to="/media">
                {lang === 'np' ? 'वार्ता तथा मिडिया' : 'Media'}
              </Link>
              <Link to="/cv">
                {lang === 'np' ? 'विवरण (CV)' : 'CV'}
              </Link>
              <Link to="/contact">
                {lang === 'np' ? 'सम्पर्क' : 'Contact'}
              </Link>
            </nav>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <span>{lang === 'np' ? 'माथि जानुहोस्' : 'Back to top'}</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 {personal.name}. {lang === 'np' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>

          <div className="footer-sub-statement">
            <span>{lang === 'np' ? 'जननी जन्मभूमिश्च स्वर्गादपि गरीयसी' : 'Public Service • Public Finance • Policy • Nepal'}</span>
          </div>

          {onOpenNationalSymbols && (
            <button
              type="button"
              className="footer-symbols-link"
              onClick={onOpenNationalSymbols}
            >
              <span>{lang === 'np' ? 'राष्ट्रिय चिन्हहरू' : 'National Symbols'}</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
