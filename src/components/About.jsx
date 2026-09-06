import React from 'react';
import NepalEmblem from './NepalEmblem';
import { ShieldCheck, MapPin, Landmark, Scale, ArrowRight, Award, CheckCircle } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function About({ onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal, credentials } = portfolio;

  const credentialIcons = [Award, Scale, Landmark];
  const credentialColors = ['var(--crimson)', 'var(--gov-blue)', '#b8860b'];

  return (
    <section id="about" className="about-editorial-section section-pad">
      <div className="container-narrow">
        {/* Section Kicker */}
        <div className="editorial-kicker-row">
          <span className="editorial-kicker-line" />
          <span className="editorial-kicker-label">
            {lang === 'np' ? 'संक्षिप्त प्राज्ञिक परिचय' : 'Academic & Institutional Biography'}
          </span>
          <span className="editorial-kicker-line" />
        </div>

        {/* Heading */}
        <h2 className="editorial-bio-heading">
          {personal.introHeading}
        </h2>

        {/* Academic Bio Lead Text */}
        <div className="editorial-bio-content">
          <p className="editorial-bio-text">
            {personal.introText}
          </p>
        </div>

        {/* Meta Badge Markers */}
        <div className="editorial-meta-badges">
          <div className="meta-badge-item">
            <MapPin size={15} className="meta-icon text-accent" />
            <span>{lang === 'np' ? 'नेपालमा आधारित' : 'Based in Nepal'}</span>
          </div>

          <div className="meta-badge-divider">•</div>

          <div className="meta-badge-item">
            <Landmark size={15} className="meta-icon text-gov-blue" />
            <span>{lang === 'np' ? 'अर्थ मन्त्रालय' : 'Ministry of Finance'}</span>
          </div>

          <div className="meta-badge-divider">•</div>

          <div className="meta-badge-item">
            <Scale size={15} className="meta-icon text-accent" />
            <span>{lang === 'np' ? 'सार्वजनिक वित्त तथा कर प्रशासन' : 'Public Finance & Tax Administration'}</span>
          </div>
        </div>

        {/* 3 Core Credential Pillars */}
        <div className="editorial-credential-grid">
          {credentials.map((cred, idx) => {
            const Icon = credentialIcons[idx] || Award;
            return (
              <div key={idx} className="credential-box">
                <div className="credential-box-icon">
                  <Icon size={18} />
                </div>
                <div className="credential-box-info">
                  <div className="credential-box-val">{cred.value}</div>
                  <div className="credential-box-lbl">{cred.label}</div>
                  <div className="credential-box-det">{cred.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Civic Link */}
        {onOpenNationalSymbols && (
          <div className="editorial-civic-bar">
            <button
              type="button"
              className="civic-link-btn"
              onClick={onOpenNationalSymbols}
            >
              <div className="civic-btn-left">
                <NepalEmblem size={20} variant="full" />
                <span>{lang === 'np' ? 'नेपालका राष्ट्रिय चिन्हहरू तथा वैधानिक व्यवस्था' : 'National Symbols & Civic Heritage of Nepal'}</span>
              </div>
              <ArrowRight size={14} className="civic-arrow" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
