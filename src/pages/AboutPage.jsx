import React from 'react';
import PageHeader from '../components/PageHeader';
import NepalEmblem from '../components/NepalEmblem';
import InternationalEngagements from '../components/InternationalEngagements';
import ElectionObservation from '../components/ElectionObservation';
import PollingDuty from '../components/PollingDuty';
import { ShieldCheck, MapPin, Landmark, Scale, BookOpen, Quote, Award, CheckCircle2, ArrowRight, Globe, Vote } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function AboutPage({ onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal, credentials, areasOfInterest, featuredQuote } = portfolio;

  return (
    <div className="page-chapter-view about-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'परिचय' : 'About'}
        kicker={lang === 'np' ? 'व्यक्तिगत तथा संस्थागत पृष्ठभूमि' : 'Biography & Public Service'}
        title={lang === 'np' ? 'सार्वजनिक सेवा, वित्त तथा नीति' : 'Public Service, Finance & Policy'}
        subtitle={lang === 'np'
          ? 'नेपाल सरकारको राजस्व सेवामा समर्पित निजामती अधिकृत, शोधकर्ता र वित्तीय नीति विश्लेषक।'
          : 'Tax Officer under the Ministry of Finance, public policy researcher, and civil servant.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        {/* ABOUT ME: Creative Two-Column Showcase */}
        <section className="chapter-section-block about-page-hero-block">
          <div className="about-editorial-hero-grid">
            {/* Visual Column: Dominant Portrait */}
            <div className="about-portrait-col">
              <div className="about-portrait-showcase">
                <div className="portrait-image-frame">
                  <picture className="portrait-picture-wrap">
                    <source type="image/webp" srcSet="/saugat-baral-portrait.webp 640w, /saugat-baral.webp 1024w" />
                    <source type="image/jpeg" srcSet="/saugat-baral.jpg" />
                    <img
                      src="/saugat-baral.jpg"
                      alt={personal.name}
                      className="portrait-main-img"
                      width={640}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </picture>
                </div>
                <div className="portrait-caption-strip">
                  <div className="caption-officer-name">{personal.name}</div>
                  <div className="caption-officer-role">
                    {lang === 'np' ? 'कर अधिकृत · नेपाल सरकार' : 'Tax Officer · Government of Nepal'}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="about-content-col">
              <div className="about-kicker-tag">
                <span className="about-kicker-line" />
                <span className="about-kicker-text">
                  {lang === 'np' ? 'मेरो परिचय' : 'ABOUT ME'}
                </span>
              </div>

              <h2 className="about-name-headline">
                {personal.name}
              </h2>

              <div className="about-role-subline">
                <span>
                  {lang === 'np' 
                    ? 'कर अधिकृत · सार्वजनिक वित्त तथा नीति अनुसन्धाता' 
                    : 'Tax Officer · Civil Servant · Public Policy Professional & Researcher'}
                </span>
              </div>

              <div className="about-prose-body">
                {(personal.bioParagraphs || [personal.introText]).map((p, idx) => (
                  <p key={idx} className="about-prose-lead">
                    {p}
                  </p>
                ))}
              </div>

              {/* 3 Core Credential Badges */}
              <div className="about-compact-credentials-row">
                {credentials.map((cred, idx) => (
                  <div key={idx} className="about-compact-cred-pill">
                    <span className="cred-pill-val">{cred.value}</span>
                    <span className="cred-pill-sep">•</span>
                    <span className="cred-pill-lbl">{cred.label}</span>
                  </div>
                ))}
              </div>

              {/* Subtle Core Focus Tags */}
              <div className="about-focus-pills-row">
                {(personal.focusAreas || [
                  "Public Finance & Taxation",
                  "Public Policy & Governance",
                  "Institutional Integrity & Law",
                  "Applied Economic Research"
                ]).map((area, idx) => (
                  <span key={idx} className="about-focus-pill">
                    {area}
                  </span>
                ))}
              </div>

              {/* Section Jump Badges */}
              <div className="chapter-badges-row">
                <div className="chapter-badge">
                  <MapPin size={14} className="text-accent" />
                  <span>{lang === 'np' ? 'नेपालमा आधारित' : 'Based in Nepal'}</span>
                </div>
                <div className="chapter-badge">
                  <Landmark size={14} className="text-gov-blue" />
                  <span>{lang === 'np' ? 'अर्थ मन्त्रालय' : 'Ministry of Finance'}</span>
                </div>
                <a href="#international-engagements" className="chapter-badge intl-jump-badge">
                  <Globe size={14} className="text-gov-blue" />
                  <span>{lang === 'np' ? 'युनुस सेन्टर ↓' : 'Yunus Centre ↓'}</span>
                </a>
                <a href="#civic-electoral-engagement" className="chapter-badge intl-jump-badge civic-jump-badge">
                  <ShieldCheck size={14} className="text-accent" />
                  <span>{lang === 'np' ? 'निर्वाचन पर्यवेक्षण ↓' : 'Election Observer ↓'}</span>
                </a>
                <a href="#election-administration-polling-duty" className="chapter-badge intl-jump-badge duty-jump-badge">
                  <Vote size={14} className="text-gov-blue" />
                  <span>{lang === 'np' ? 'मतदान अधिकृत ↓' : 'Polling Officer ↓'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* International & Development Engagements (Featured: Yunus Centre, Bangladesh) */}
        <div className="chapter-section-block">
          <InternationalEngagements lang={lang} />
        </div>

        {/* Civic & Electoral Engagement */}
        <div className="chapter-section-block civic-electoral-master-block">
          {/* Subsection: Election Observation & Democratic Engagement */}
          <ElectionObservation lang={lang} />

          {/* Subsection: Election Administration & Polling Duty */}
          <PollingDuty lang={lang} />
        </div>

        {/* Core Domains of Scholarly & Policy Inquiry */}
        <section className="chapter-section-block">
          <div className="section-label-tag">
            <span>{lang === 'np' ? 'रुचिका क्षेत्रहरू' : 'Core Domains of Inquiry'}</span>
          </div>
          <h2 className="chapter-section-title">
            {lang === 'np' ? 'नीतिगत तथा संस्थागत रुचिका विषयहरू' : 'Scholarly & Policy Focus Areas'}
          </h2>

          <div className="chapter-interests-editorial-grid">
            {areasOfInterest.map((item, idx) => (
              <div key={idx} className="chapter-interest-pill unnumbered-pill">
                <div className="interest-info">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Philosophy */}
        <section className="chapter-section-block philosophy-block">
          <div className="section-label-tag">
            <span>{lang === 'np' ? 'व्यावसायिक दर्शन' : 'Professional Philosophy'}</span>
          </div>

          <div className="chapter-quote-box">
            <Quote size={30} className="quote-icon" />
            <blockquote className="chapter-quote-text">
              “{featuredQuote.quote}”
            </blockquote>
            <div className="quote-line" />
            <div className="quote-tag">{featuredQuote.tagline}</div>
          </div>
        </section>

        {/* National Symbols Civic Link */}
        {onOpenNationalSymbols && (
          <div className="chapter-civic-cta">
            <button
              type="button"
              className="civic-cta-button"
              onClick={onOpenNationalSymbols}
              aria-label="National Symbols & Constitutional Heritage of Nepal"
            >
              <div className="civic-cta-left">
                <div className="civic-emblem-badge">
                  <NepalEmblem size={22} variant="full" />
                </div>
                <div className="civic-cta-text-wrap">
                  <div className="civic-cta-title">
                    {lang === 'np' ? 'नेपालका राष्ट्रिय चिन्हहरू तथा संवैधानिक व्यवस्था' : 'National Symbols & Constitutional Heritage of Nepal'}
                  </div>
                  <div className="civic-cta-sub">
                    {lang === 'np' ? 'संवैधानिक पहिचान, निसान छाप तथा प्रतीकहरू' : 'Official State Insignia & Emblems of Nepal'}
                  </div>
                </div>
              </div>
              <div className="civic-cta-action">
                <span className="civic-cta-action-text">
                  {lang === 'np' ? 'हेर्नुहोस्' : 'Explore'}
                </span>
                <ArrowRight size={14} className="civic-cta-arrow" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

