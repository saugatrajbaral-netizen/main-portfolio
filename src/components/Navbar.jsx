import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import DigitalClock from './DigitalClock';
import { getPortfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenResume, lang = 'en', setLang }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const navItems = [
    { labelEn: 'Home', labelNp: 'गृहपृष्ठ', to: '/' },
    { labelEn: 'About', labelNp: 'परिचय', to: '/about' },
    { labelEn: 'Experience', labelNp: 'कार्य अनुभव', to: '/experience' },
    { labelEn: 'Education', labelNp: 'शिक्षा', to: '/education' },
    { labelEn: 'Research', labelNp: 'अनुसन्धान', to: '/research' },
    { labelEn: 'Publications', labelNp: 'प्रकाशनहरू', to: '/publications' },
    { labelEn: 'Talks & Media', labelNp: 'मिडिया', to: '/media' },
    { labelEn: 'CV', labelNp: 'विवरण (CV)', to: '/cv' },
    { labelEn: 'Contact', labelNp: 'सम्पर्क', to: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Live Time Ribbon (Nepali & English Time Only) */}
      <div className="gov-top-ribbon">
        <div className="container-wide gov-top-inner-clean">
          <DigitalClock variant="compact" />
        </div>
      </div>

      <div className="container-wide header-inner">
        {/* Brand Left: Officer Name & Designation */}
        <Link to="/" className="brand" onClick={closeMobileMenu}>
          <div className="brand-mark">
            <NepalEmblem size={28} variant="full" />
          </div>
          <div className="brand-copy">
            <span className="brand-name">{personal.name}</span>
            <span className="brand-role">
              {lang === 'np' ? 'कर अधिकृत | नेपाल सरकार' : 'Tax Officer | Government of Nepal'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Crimson Active-State Underline/Dot */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const currentLabel = lang === 'np' ? item.labelNp : item.labelEn;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <span className="nav-primary-label">{currentLabel}</span>
                    {isActive && <span className="nav-active-dot" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Header Actions: Language Switcher & CV Button */}
        <div className="header-actions">
          {/* Dual Language Switcher */}
          {setLang && (
            <div className="language-tab-switcher" role="group" aria-label="Language Selector">
              <button
                type="button"
                className={`lang-tab-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                title="View website in English"
              >
                <span className="lang-flag">🇬🇧</span>
                <span>EN</span>
              </button>
              <button
                type="button"
                className={`lang-tab-btn ${lang === 'np' ? 'active' : ''}`}
                onClick={() => setLang('np')}
                title="नेपाली भाषामा हेर्नुहोस्"
              >
                <span className="lang-flag">🇳🇵</span>
                <span>नेपाली</span>
              </button>
            </div>
          )}

          <Link
            to="/cv"
            className="header-cv-btn"
            title="Curriculum Vitae"
            onClick={closeMobileMenu}
          >
            <FileText size={13} />
            <span>{lang === 'np' ? 'CV' : 'CV'}</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="mobile-panel">
          {/* Mobile Language Switcher */}
          {setLang && (
            <div className="mobile-lang-bar">
              <button
                type="button"
                className={`mobile-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => {
                  setLang('en');
                  closeMobileMenu();
                }}
              >
                <span>🇬🇧 English</span>
              </button>
              <button
                type="button"
                className={`mobile-lang-btn ${lang === 'np' ? 'active' : ''}`}
                onClick={() => {
                  setLang('np');
                  closeMobileMenu();
                }}
              >
                <span>🇳🇵 नेपाली</span>
              </button>
            </div>
          )}

          <div className="mobile-nav-links">
            {navItems.map((item) => {
              const currentLabel = lang === 'np' ? item.labelNp : item.labelEn;
              const subLabel = lang === 'np' ? item.labelEn : item.labelNp;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="mobile-nav-main">{currentLabel}</span>
                  <span className="mobile-nav-sub">{subLabel}</span>
                </NavLink>
              );
            })}

            <Link
              to="/cv"
              className="mobile-cv-action-btn"
              onClick={closeMobileMenu}
            >
              <FileText size={15} />
              <span>{lang === 'np' ? 'पूरा व्यक्तिगत विवरण (CV) हेर्नुहोस्' : 'View Full Curriculum Vitae (CV)'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
