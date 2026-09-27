import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, BookOpen } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function About({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const paragraphs = personal.bioParagraphs || [personal.introText];
  const focusAreas = personal.focusAreas || [
    "Public Finance & Taxation",
    "Public Policy & Governance",
    "Institutional Integrity & Law",
    "Applied Economic Research"
  ];

  return (
    <section id="about" className="premium-about-section">
      <div className="container-wide premium-about-container">
        <div className="about-editorial-hero-grid">
          
          {/* Visual Column: Dominant Professional Portrait */}
          <div className="about-portrait-col">
            <div className="about-portrait-showcase">
              <div className="portrait-image-frame">
                <img
                  src="/saugat-baral.jpg"
                  alt={personal.name}
                  className="portrait-main-img"
                  loading="eager"
                />
                <div className="portrait-subtle-glow" />
              </div>

              {/* Minimalist Officer Identity Tag */}
              <div className="portrait-caption-strip">
                <div className="caption-officer-name">{personal.name}</div>
                <div className="caption-officer-role">
                  {lang === 'np' 
                    ? 'कर अधिकृत · नेपाल सरकार' 
                    : 'Tax Officer · Government of Nepal'}
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="about-content-col">
            {/* Header Kicker */}
            <div className="about-kicker-tag">
              <span className="about-kicker-line" />
              <span className="about-kicker-text">
                {lang === 'np' ? 'मेरो परिचय' : 'ABOUT ME'}
              </span>
            </div>

            {/* Officer Name Heading */}
            <h2 className="about-name-headline">
              {personal.name}
            </h2>

            {/* Sub-headline Role */}
            <div className="about-role-subline">
              <span>
                {lang === 'np' 
                  ? 'कर अधिकृत · सार्वजनिक वित्त तथा नीति अनुसन्धाता' 
                  : 'Tax Officer · Civil Servant · Public Policy Professional & Researcher'}
              </span>
            </div>

            {/* Professional Prose Paragraphs */}
            <div className="about-prose-body">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="about-prose-lead">
                  {p}
                </p>
              ))}
            </div>

            {/* Subtle Core Focus Tags */}
            <div className="about-focus-pills-row">
              {focusAreas.map((area, idx) => (
                <span key={idx} className="about-focus-pill">
                  {area}
                </span>
              ))}
            </div>

            {/* Minimal High-End Action Links */}
            <div className="about-actions-row">
              <Link to="/research" className="about-primary-link">
                <span>{lang === 'np' ? 'अनुसन्धान तथा विचार →' : 'Research & Publications →'}</span>
              </Link>

              <Link to="/contact" className="about-secondary-link">
                <span>{lang === 'np' ? 'सम्पर्क गर्नुहोस् →' : 'Get in Touch →'}</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
