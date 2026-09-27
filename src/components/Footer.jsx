import React from 'react';
import { Link } from 'react-router-dom';
import NepalEmblem from './NepalEmblem';
import WebsiteViewCounter from './WebsiteViewCounter';
import { ArrowUp, Sparkles, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Footer({ onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-grand-footer" role="contentinfo">
      {/* Decorative Top Accent Line with Nepal Crimson */}
      <div className="footer-top-accent-strip" aria-hidden="true" />

      <div className="container-wide footer-grand-container">
        {/* Row 1: Executive Identity & State Motto */}
        <div className="footer-hero-identity-row">
          <div className="footer-identity-left">
            <div className="footer-emblem-wrap">
              <NepalEmblem size={42} variant="full" />
            </div>
            <div className="footer-identity-copy">
              <div className="footer-officer-title-row">
                <span className="footer-officer-name">{personal.name}</span>
                {personal.nepaliName && (
                  <span className="footer-officer-subname">({personal.nepaliName})</span>
                )}
              </div>
              <div className="footer-officer-cadre">
                <ShieldCheck size={13} className="text-crimson" />
                <span>
                  {lang === 'np'
                    ? 'कर अधिकृत (राजपत्राङ्कित तृतीय श्रेणी) · नेपाल सरकार'
                    : 'Tax Officer (Gazetted Third-Class) · Government of Nepal'}
                </span>
              </div>
              <div className="footer-office-location">
                <MapPin size={12} className="text-muted" />
                <span>
                  {lang === 'np'
                    ? 'आन्तरिक राजस्व कार्यालय, दमौली · अर्थ मन्त्रालय'
                    : 'Inland Revenue Office, Damauli · Ministry of Finance'}
                </span>
              </div>
            </div>
          </div>

          <div className="footer-identity-right">
            <div className="footer-motto-crest">
              <div className="motto-sanskrit-quote">
                “जननी जन्मभूमिश्च स्वर्गादपि गरीयसी”
              </div>
              <div className="motto-sub-translation">
                {lang === 'np'
                  ? 'आमा र जन्मभूमि स्वर्गभन्दा पनि महान् छन् ।'
                  : 'Mother and motherland are greater than heaven.'}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Four-Column Comprehensive Navigation Grid */}
        <div className="footer-columns-grid">
          {/* Col 1: Portfolio & Overview */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">
              {lang === 'np' ? 'परिचय तथा सेवा' : 'Biography & Service'}
            </h4>
            <ul className="footer-links-list">
              <li><Link to="/">{lang === 'np' ? 'गृहपृष्ठ (Home)' : 'Home'}</Link></li>
              <li><Link to="/about">{lang === 'np' ? 'व्यक्तिगत परिचय' : 'About Overview'}</Link></li>
              <li><Link to="/experience">{lang === 'np' ? 'कार्य अनुभव' : 'Professional Experience'}</Link></li>
              <li><Link to="/education">{lang === 'np' ? 'शैक्षिक योग्यता' : 'Education & Qualifications'}</Link></li>
              <li><Link to="/cv">{lang === 'np' ? 'व्यक्तिगत विवरण (CV)' : 'Curriculum Vitae (CV)'}</Link></li>
            </ul>
          </div>

          {/* Col 2: Research & Scholarly Works */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">
              {lang === 'np' ? 'अनुसन्धान र प्रकाशन' : 'Research & Publications'}
            </h4>
            <ul className="footer-links-list">
              <li><Link to="/research">{lang === 'np' ? 'नीतिगत अनुसन्धान' : 'Policy Research'}</Link></li>
              <li><Link to="/publications">{lang === 'np' ? 'प्रकाशन तथा लेख' : 'Books & Publications'}</Link></li>
              <li><Link to="/research">{lang === 'np' ? 'सार्वजनिक वित्त विश्लेषण' : 'Fiscal Governance Analysis'}</Link></li>
              <li><Link to="/publications">{lang === 'np' ? 'स्तम्भ तथा विचार' : 'Public Opinion & Op-Eds'}</Link></li>
            </ul>
          </div>

          {/* Col 3: Public Engagements & Media */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">
              {lang === 'np' ? 'सार्वजनिक सरोकार' : 'Public Engagement'}
            </h4>
            <ul className="footer-links-list">
              <li><Link to="/media">{lang === 'np' ? 'वार्ता तथा मिडिया' : 'Media Coverage & Talks'}</Link></li>
              <li><Link to="/media">{lang === 'np' ? 'संवैधानिक बहस' : 'Public Interest Writs'}</Link></li>
              <li><Link to="/about">{lang === 'np' ? 'निर्वाचन अवलोकन' : 'Electoral Observation'}</Link></li>
              <li><Link to="/about">{lang === 'np' ? 'नागरिक संलग्नता' : 'Civic Engagements'}</Link></li>
            </ul>
          </div>

          {/* Col 4: Institutional Links & Inquiries */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">
              {lang === 'np' ? 'सम्पर्क तथा निकाय' : 'Official Contact'}
            </h4>
            <ul className="footer-links-list">
              <li><Link to="/contact">{lang === 'np' ? 'सम्पर्क फारम' : 'Get in Touch / Inquiries'}</Link></li>
              <li>
                <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
                  <span>{lang === 'np' ? 'आन्तरिक राजस्व विभाग' : 'Inland Revenue Dept (IRD)'}</span>
                  <ExternalLink size={10} className="ext-icon" />
                </a>
              </li>
              <li>
                <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
                  <span>{lang === 'np' ? 'अर्थ मन्त्रालय' : 'Ministry of Finance (MoF)'}</span>
                  <ExternalLink size={10} className="ext-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 3: Interactive Utilities & View Counter */}
        <div className="footer-utility-row">
          <div className="footer-utility-left">
            <WebsiteViewCounter lang={lang} />
          </div>

          <div className="footer-utility-right">
            {onOpenNationalSymbols && (
              <button
                type="button"
                className="footer-symbols-btn"
                onClick={onOpenNationalSymbols}
                title={lang === 'np' ? 'नेपालका राष्ट्रिय चिन्हहरू हेर्नुहोस्' : 'Explore National Symbols of Nepal'}
                aria-label="National Symbols of Nepal"
              >
                <span className="symbols-flag-badge" aria-hidden="true">🇳🇵</span>
                <span className="symbols-btn-label">
                  {lang === 'np' ? 'राष्ट्रिय चिन्हहरू' : 'National Symbols of Nepal'}
                </span>
                <Sparkles size={12} className="symbols-sparkle-icon" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              className="footer-back-to-top-btn"
              onClick={scrollToTop}
              title={lang === 'np' ? 'पृष्ठको माथि जानुहोस्' : 'Back to top of page'}
            >
              <span>{lang === 'np' ? 'माथि जानुहोस्' : 'Back to Top'}</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

        {/* Row 4: Copyright & Bottom Affirmation */}
        <div className="footer-copyright-bottom-row">
          <div className="footer-copy-text">
            © 2026 {personal.name}. {lang === 'np' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div className="footer-affirmation-text">
            <span>{lang === 'np' ? 'नेपाल सरकारको निजामती सेवामा निष्ठा र व्यावसायिकता।' : 'Dedicated to Integrity, Excellence & Public Service in Nepal.'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
