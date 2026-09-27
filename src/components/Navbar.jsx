import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, FileText, ChevronDown, User, 
  Briefcase, GraduationCap, BookOpen, Newspaper 
} from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import DigitalClock from './DigitalClock';
import { getPortfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenResume, lang = 'en', setLang }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimerRef = useRef(null);

  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  // Sub-items for About dropdown menu (Experience, Education, Research, Publications)
  const aboutSubItems = [
    {
      to: '/about',
      labelEn: 'About Overview',
      labelNp: 'परिचय (अवलोकन)',
      descEn: 'Public service background & biography',
      descNp: 'सार्वजनिक सेवा पृष्ठभूमि तथा परिचय',
      icon: User
    },
    {
      to: '/experience',
      labelEn: 'Experience',
      labelNp: 'कार्य अनुभव',
      descEn: 'Tax administration, roles & assignments',
      descNp: 'कर प्रशासन, जिम्मेवारी तथा पदस्थापन',
      icon: Briefcase
    },
    {
      to: '/education',
      labelEn: 'Education',
      labelNp: 'शिक्षा तथा तालिम',
      descEn: 'Academic degrees & civil training',
      descNp: 'शैक्षिक योग्यता तथा सेवाकालीन तालिम',
      icon: GraduationCap
    },
    {
      to: '/research',
      labelEn: 'Research & Commentary',
      labelNp: 'अनुसन्धान तथा विचार',
      descEn: 'Policy research, papers & fiscal analysis',
      descNp: 'नीतिगत अनुसन्धान, कार्यपत्र र विश्लेषण',
      icon: BookOpen
    },
    {
      to: '/publications',
      labelEn: 'Publications',
      labelNp: 'प्रकाशनहरू',
      descEn: 'Books, articles & public op-eds',
      descNp: 'पुस्तक, लेख तथा स्तम्भहरू',
      icon: Newspaper
    }
  ];

  // Check if current route is under About section
  const isAboutActive = [
    '/about',
    '/experience',
    '/education',
    '/research',
    '/publications'
  ].some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileAboutExpanded(false);
  }, [location.pathname]);

  // Click outside listener for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setAboutDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 160);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAboutExpanded(false);
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
            <NepalEmblem size={24} variant="full" />
          </div>
          <div className="brand-copy">
            <span className="brand-name">{personal.name}</span>
            <span className="brand-role">
              {lang === 'np' ? 'कर अधिकृत | नेपाल सरकार' : 'Tax Officer | Government of Nepal'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {/* Home Link */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <span className="nav-primary-label">{lang === 'np' ? 'गृहपृष्ठ' : 'Home'}</span>
                {isActive && <span className="nav-active-dot" />}
              </>
            )}
          </NavLink>

          {/* About Dropdown Menu Trigger */}
          <div
            ref={dropdownRef}
            className={`nav-dropdown-wrapper ${aboutDropdownOpen ? 'is-open' : ''}`}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <button
              type="button"
              className={`nav-link nav-dropdown-trigger ${isAboutActive ? 'active' : ''}`}
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              aria-expanded={aboutDropdownOpen}
              aria-haspopup="true"
            >
              <span className="nav-primary-label">{lang === 'np' ? 'परिचय' : 'About'}</span>
              <ChevronDown size={13} className={`nav-dropdown-chevron ${aboutDropdownOpen ? 'rotated' : ''}`} />
              {isAboutActive && <span className="nav-active-dot" />}
            </button>

            {/* Desktop Dropdown Card Menu */}
            <div className={`nav-dropdown-menu ${aboutDropdownOpen ? 'show' : ''}`} role="menu">
              <div className="nav-dropdown-header">
                <span className="dropdown-section-title">
                  {lang === 'np' ? 'व्यक्तिगत तथा पेशागत विवरण' : 'Biography & Professional Portfolio'}
                </span>
              </div>
              <div className="nav-dropdown-list">
                {aboutSubItems.map((sub) => {
                  const Icon = sub.icon;
                  const isCurrent = location.pathname === sub.to;
                  return (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      className={`nav-dropdown-item ${isCurrent ? 'active' : ''}`}
                      onClick={() => setAboutDropdownOpen(false)}
                      role="menuitem"
                    >
                      <div className="dropdown-item-icon-wrap">
                        <Icon size={16} className="dropdown-item-icon" />
                      </div>
                      <div className="dropdown-item-content">
                        <div className="dropdown-item-title">
                          <span>{lang === 'np' ? sub.labelNp : sub.labelEn}</span>
                          {isCurrent && <span className="dropdown-current-tag">●</span>}
                        </div>
                        <div className="dropdown-item-desc">
                          {lang === 'np' ? sub.descNp : sub.descEn}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Talks & Media */}
          <NavLink
            to="/media"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <span className="nav-primary-label">{lang === 'np' ? 'वार्ता तथा मिडिया' : 'Talks & Media'}</span>
                {isActive && <span className="nav-active-dot" />}
              </>
            )}
          </NavLink>

          {/* CV Link */}
          <NavLink
            to="/cv"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <span className="nav-primary-label">{lang === 'np' ? 'विवरण (CV)' : 'CV'}</span>
                {isActive && <span className="nav-active-dot" />}
              </>
            )}
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <span className="nav-primary-label">{lang === 'np' ? 'सम्पर्क' : 'Contact'}</span>
                {isActive && <span className="nav-active-dot" />}
              </>
            )}
          </NavLink>
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
            aria-expanded={mobileMenuOpen}
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
            {/* Mobile Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="mobile-nav-main">{lang === 'np' ? 'गृहपृष्ठ' : 'Home'}</span>
              <span className="mobile-nav-sub">{lang === 'np' ? 'Home' : 'गृहपृष्ठ'}</span>
            </NavLink>

            {/* Mobile About Accordion */}
            <div className={`mobile-accordion-wrap ${mobileAboutExpanded ? 'is-expanded' : ''}`}>
              <button
                type="button"
                className={`mobile-accordion-trigger ${isAboutActive ? 'active' : ''}`}
                onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                aria-expanded={mobileAboutExpanded}
              >
                <div className="accordion-trigger-labels">
                  <span className="mobile-nav-main">{lang === 'np' ? 'परिचय' : 'About'}</span>
                  <span className="mobile-nav-sub">{lang === 'np' ? 'About & Portfolio' : 'परिचय तथा विवरण'}</span>
                </div>
                <ChevronDown size={16} className={`accordion-chevron ${mobileAboutExpanded ? 'rotated' : ''}`} />
              </button>

              {mobileAboutExpanded && (
                <div className="mobile-accordion-content">
                  {aboutSubItems.map((sub) => {
                    const Icon = sub.icon;
                    const isCurrent = location.pathname === sub.to;
                    return (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={`mobile-subnav-link ${isCurrent ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                      >
                        <Icon size={15} className="mobile-subnav-icon" />
                        <div>
                          <span className="mobile-subnav-title">{lang === 'np' ? sub.labelNp : sub.labelEn}</span>
                          <span className="mobile-subnav-desc">{lang === 'np' ? sub.descNp : sub.descEn}</span>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Talks & Media */}
            <NavLink
              to="/media"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="mobile-nav-main">{lang === 'np' ? 'वार्ता तथा मिडिया' : 'Talks & Media'}</span>
              <span className="mobile-nav-sub">{lang === 'np' ? 'Media' : 'वार्ता तथा मिडिया'}</span>
            </NavLink>

            {/* CV */}
            <NavLink
              to="/cv"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="mobile-nav-main">{lang === 'np' ? 'विवरण (CV)' : 'Curriculum Vitae (CV)'}</span>
              <span className="mobile-nav-sub">{lang === 'np' ? 'CV' : 'विवरण (CV)'}</span>
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="mobile-nav-main">{lang === 'np' ? 'सम्पर्क' : 'Contact'}</span>
              <span className="mobile-nav-sub">{lang === 'np' ? 'Contact' : 'सम्पर्क'}</span>
            </NavLink>

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
