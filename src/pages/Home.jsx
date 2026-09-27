import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, BookOpen, Briefcase, UserCheck, Scale } from 'lucide-react';
import NepalEmblem from '../components/NepalEmblem';
import HomeParallaxEmblem from '../components/HomeParallaxEmblem';
import OfficerProfileFrame from '../components/OfficerProfileFrame';
import { getPortfolioData } from '../data/portfolioData';
import { MEDIA_ARCHIVE_ITEMS } from '../data/mediaData';

export default function Home({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  return (
    <div className="home-cover-page">
      {/* 3D Parallax Nepal Emblem Layer */}
      <HomeParallaxEmblem lang={lang} />

      <div className="container-wide home-cover-container">
        <div className="home-cover-layout">
          {/* Left Column: Minimal Typography & Editorial Gateway */}
          <div className="home-cover-text-col">
            {/* Officer Large Name */}
            <h1 className="cover-title">
              {personal.name}
              {lang === 'en' && <span className="cover-subname">{personal.nepaliName}</span>}
            </h1>

            {/* Role & Cadre */}
            <div className="cover-role">
              {lang === 'np' ? 'कर अधिकृत | नेपाल सरकार' : 'Tax Officer | Government of Nepal'}
            </div>

            {/* Core Domain Statement */}
            <div className="cover-domain-strip">
              <span>{lang === 'np' ? 'सार्वजनिक वित्त • कर प्रशासन • नीति • सुशासन' : 'Public Finance • Tax Administration • Policy • Governance'}</span>
            </div>

            {/* Short 2-3 Line Introduction */}
            <p className="cover-lead-intro">
              {lang === 'np'
                ? 'नेपाल सरकार अन्तर्गत कर प्रणाली, सार्वजनिक वित्त व्यवस्थापन र पारदर्शी सुशासनको संगममा समर्पित निजामती सेवा अधिकृत।'
                : 'Tax Officer and public servant working at the intersection of taxation, public finance and governance in Nepal.'}
            </p>

            {/* Minimal Clear Calls to Action */}
            <div className="cover-actions-grid">
              <Link to="/about" className="cover-action-btn primary">
                <span>{lang === 'np' ? 'मेरो परिचय →' : 'ABOUT ME →'}</span>
              </Link>

              <Link to="/experience" className="cover-action-btn">
                <span>{lang === 'np' ? 'कार्य अनुभव →' : 'EXPLORE MY WORK →'}</span>
              </Link>

              <Link to="/research" className="cover-action-btn">
                <span>{lang === 'np' ? 'अनुसन्धान तथा विचार →' : 'RESEARCH →'}</span>
              </Link>

              <Link to="/cv" className="cover-action-btn">
                <span>{lang === 'np' ? 'व्यक्तिगत विवरण (CV) →' : 'VIEW CV →'}</span>
              </Link>
            </div>

            {/* Quiet Philosophical Statement */}
            <div className="cover-philosophy-statement">
              <span>{lang === 'np' ? 'सेवा । सिकाइ । विचार । निर्माण ।' : 'Serving. Learning. Thinking. Building.'}</span>
            </div>
          </div>

          {/* Right Column: Sophisticated Multi-Layered Official Portrait Frame */}
          <div className="home-cover-portrait-col">
            <OfficerProfileFrame
              name={personal.name}
              nepaliName={personal.nepaliName}
              designation={personal.aside.designation}
              office={personal.aside.office}
              lang={lang}
            />
          </div>
        </div>

        {/* Media & Public Interest Highlights Preview */}
        <div className="home-media-preview-section">
          <div className="home-media-preview-header">
            <div>
              <span className="section-eyebrow">
                <Scale size={14} className="text-crimson" />
                <span>{lang === 'np' ? 'जनहित याचिका तथा मिडिया' : 'Public Interest & Media'}</span>
              </span>
              <h2 className="home-media-preview-title">
                {lang === 'np' ? 'सार्वजनिक सरोकार तथा संवैधानिक बहस' : 'Public Interest Engagements & Media Coverage'}
              </h2>
            </div>
            <Link to="/media" className="home-media-view-all-btn">
              <span>{lang === 'np' ? 'सबै मिडिया तथा रिटहरू हेर्नुहोस् →' : 'VIEW ALL MEDIA →'}</span>
            </Link>
          </div>

          <div className="home-media-preview-grid">
            {MEDIA_ARCHIVE_ITEMS.slice(0, 3).map((item) => (
              <article key={item.id} className="home-media-card">
                <div className="home-media-card-top">
                  <span className="home-media-pub">{lang === 'np' ? item.publicationNp : item.publication}</span>
                  <span className="home-media-date">{lang === 'np' ? item.dateBs : item.dateAd}</span>
                </div>
                <h3 className="home-media-title">
                  <Link to="/media">{lang === 'np' ? item.titleNp : item.titleEn}</Link>
                </h3>
                <p className="home-media-summary">{lang === 'np' ? item.summaryNp : item.summaryEn}</p>
                <Link to="/media" className="home-media-link">
                  <span>{lang === 'np' ? 'अभिलेख हेर्नुहोस् →' : 'Read in Archive →'}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
