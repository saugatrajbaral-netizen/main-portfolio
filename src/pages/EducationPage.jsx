import React from 'react';
import PageHeader from '../components/PageHeader';
import { GraduationCap, BookOpen, Scale, Award, CheckCircle2, Star, BookMarked } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function EducationPage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { education } = portfolio;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'BookOpen':
        return BookOpen;
      case 'Scale':
        return Scale;
      default:
        return Award;
    }
  };

  return (
    <div className="page-chapter-view education-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'शिक्षा' : 'Education'}
        kicker={lang === 'np' ? 'तेस्रो अध्याय' : 'Chapter 3 · Academic Scholarship'}
        title={lang === 'np' ? 'शैक्षिक पृष्ठभूमि तथा प्राज्ञिक अनुसन्धान' : 'Academic Profile & Education'}
        subtitle={lang === 'np'
          ? 'वित्तीय अर्थशास्त्र, सार्वजनिक प्रशासन र कानुनी शिक्षाको सुदृढ आधार, जसले सार्वजनिक सेवामा विश्लेषणात्मक दक्षता प्रदान गर्दछ।'
          : 'Detailed academic background spanning corporate finance, public administration governance, and fiscal jurisprudence.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        <div className="education-cards-column">
          {education.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <article key={idx} className="education-detail-card">
                <div className="education-card-top-bar">
                  <div className="edu-icon-circle">
                    <Icon size={22} />
                  </div>
                  <div className="edu-meta-head">
                    <span className="edu-year-badge">{item.year}</span>
                    <h2 className="edu-degree-title">{item.degree}</h2>
                    <div className="edu-inst-name">{item.institution}</div>
                  </div>
                </div>

                <div className="edu-card-body-content">
                  <h3 className="edu-highlights-heading">
                    {lang === 'np' ? 'प्रमुख उपलब्धि तथा केन्द्रित क्षेत्रहरू:' : 'Academic Distinctions & Focus Areas:'}
                  </h3>
                  <ul className="edu-highlights-list">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx}>
                        <CheckCircle2 size={15} className="edu-bullet" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="edu-card-accent-line" />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
