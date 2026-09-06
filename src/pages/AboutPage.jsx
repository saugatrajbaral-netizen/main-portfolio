import React from 'react';
import PageHeader from '../components/PageHeader';
import NepalEmblem from '../components/NepalEmblem';
import { ShieldCheck, MapPin, Landmark, Scale, BookOpen, Quote, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function AboutPage({ onOpenNationalSymbols, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal, credentials, areasOfInterest, featuredQuote } = portfolio;

  return (
    <div className="page-chapter-view about-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'परिचय' : 'About'}
        kicker={lang === 'np' ? 'पहिलो अध्याय' : 'Chapter 1 · Biography & Public Service'}
        title={lang === 'np' ? 'सार्वजनिक सेवा, वित्त तथा नीति' : 'Public Service, Finance & Policy'}
        subtitle={lang === 'np'
          ? 'नेपाल सरकारको राजस्व सेवामा समर्पित निजामती अधिकृत, शोधकर्ता र वित्तीय नीति विश्लेषकको पृष्ठभूमि।'
          : 'Professional biography, institutional responsibilities under the Ministry of Finance, and core philosophy of civic governance.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        {/* Section 1: Who I Am */}
        <section className="chapter-section-block">
          <div className="section-label-tag">
            <span>{lang === 'np' ? '१. परिचय तथा पृष्ठभूमि' : '1. Who I Am'}</span>
          </div>
          <h2 className="chapter-section-title">
            {lang === 'np' ? 'निष्ठावान सार्वजनिक सेवा र प्राज्ञिक आधार' : 'Dedication to Public Integrity & Evidence-Based Policy'}
          </h2>
          
          <div className="chapter-prose">
            <p>
              {personal.bio && personal.bio[0]}
            </p>
            <p>
              {personal.bio && personal.bio[1]}
            </p>
          </div>

          {/* Institutional Meta Badges */}
          <div className="chapter-badges-row">
            <div className="chapter-badge">
              <MapPin size={14} className="text-accent" />
              <span>{lang === 'np' ? 'नेपालमा आधारित' : 'Based in Nepal'}</span>
            </div>
            <div className="chapter-badge">
              <Landmark size={14} className="text-gov-blue" />
              <span>{lang === 'np' ? 'अर्थ मन्त्रालय' : 'Ministry of Finance'}</span>
            </div>
            <div className="chapter-badge">
              <Scale size={14} className="text-accent" />
              <span>{lang === 'np' ? 'सार्वजनिक वित्त तथा कर प्रशासन' : 'Public Finance & Tax Administration'}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Public Service Role */}
        <section className="chapter-section-block">
          <div className="section-label-tag">
            <span>{lang === 'np' ? '२. सार्वजनिक सेवा तथा संवर्ग' : '2. Public Service & Cadre'}</span>
          </div>
          <h2 className="chapter-section-title">
            {lang === 'np' ? 'राजपत्राङ्कित निजामती अधिकृतको जिम्मेवारी' : 'Permanent Gazetted Third-Class Civil Servant'}
          </h2>

          <div className="chapter-prose">
            <p>
              {lang === 'np'
                ? 'सौगात राज बराल लोक सेवा आयोग (Public Service Commission) बाट खुला प्रतिस्पर्धाद्वारा सिफारिस भई नेपाल सरकारको स्थायी राजपत्राङ्कित तृतीय श्रेणी (Gazetted Third-Class) कर अधिकृतका रूपमा कार्यरत हुनुहुन्छ।'
                : 'Saugat Raj Baral is a permanent Gazetted Third-Class civil servant of the Government of Nepal, appointed following nationwide competitive selection by the Public Service Commission (PSC). He currently serves as a Tax Officer under the Ministry of Finance.'}
            </p>
            <p>
              {lang === 'np'
                ? 'उहाँको कार्यक्षेत्रमा आयकर ऐन २०५८, मूल्य अभिवृद्धि कर ऐन २०५२, र अन्तःशुल्क ऐन २०५८ को वैधानिक कार्यान्वयन, करदाता परामर्श, व्यावसायिक लेखापरीक्षण तथा विद्युतीय राजस्व प्रशासन (CBMS) को सुदृढीकरण समावेश छ।'
                : 'His statutory mandate encompasses the direct enforcement of the Income Tax Act 2058, Value Added Tax Act 2052, and Excise Act 2058, conducting forensic corporate audits, taxpayer grievance mediation, and deploying modern digital tax surveillance frameworks across his jurisdiction.'}
            </p>
          </div>

          {/* 3 Core Credential Pillars */}
          <div className="chapter-credentials-grid">
            {credentials.map((cred, idx) => (
              <div key={idx} className="chapter-credential-card">
                <div className="cred-tag">{cred.tag}</div>
                <div className="cred-val">{cred.value}</div>
                <div className="cred-lbl">{cred.label}</div>
                <div className="cred-det">{cred.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Professional Interests */}
        <section className="chapter-section-block">
          <div className="section-label-tag">
            <span>{lang === 'np' ? '३. रुचिका क्षेत्रहरू' : '3. Professional Interests'}</span>
          </div>
          <h2 className="chapter-section-title">
            {lang === 'np' ? 'नीतिगत तथा संस्थागत रुचिका विषयहरू' : 'Core Domains of Scholarly & Policy Inquiry'}
          </h2>

          <div className="chapter-interests-editorial-grid">
            {areasOfInterest.map((item, idx) => (
              <div key={idx} className="chapter-interest-pill">
                <span className="interest-idx">{String(idx + 1).padStart(2, '0')}</span>
                <div className="interest-info">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Professional Philosophy */}
        <section className="chapter-section-block philosophy-block">
          <div className="section-label-tag">
            <span>{lang === 'np' ? '४. व्यावसायिक दर्शन' : '4. Professional Philosophy'}</span>
          </div>

          <div className="chapter-quote-box">
            <Quote size={32} className="quote-icon" />
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
            >
              <div className="civic-cta-left">
                <NepalEmblem size={24} variant="full" />
                <div>
                  <div className="civic-cta-title">
                    {lang === 'np' ? 'नेपालका राष्ट्रिय चिन्हहरू तथा संवैधानिक व्यवस्था' : 'National Symbols & Constitutional Heritage of Nepal'}
                  </div>
                  <div className="civic-cta-sub">
                    {lang === 'np' ? 'संवैधानिक पहिचान, निसान छाप तथा प्रतीकहरू' : 'Official State Insignia & Emblems'}
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="civic-cta-arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
