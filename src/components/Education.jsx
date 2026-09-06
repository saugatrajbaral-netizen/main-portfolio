import React from 'react';
import { GraduationCap, BookOpen, Scale, Award, CheckCircle2 } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Education({ lang = 'en' }) {
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
    <section id="education" className="education-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'शैक्षिक योग्यता' : 'Academic Credentials'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>शैक्षिक पृष्ठभूमि तथा <span className="text-accent">अनुसन्धान</span></>
            ) : (
              <>Academic Background & <span className="text-accent">Scholarship</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'वित्तीय अर्थशास्त्र, संस्थागत वित्त र सार्वजनिक प्रशासनको सुदृढ आधार, जसले राजस्व प्रशासनमा नीतिगत र विश्लेषणात्मक दक्षता प्रदान गर्दछ।'
              : 'A rigorous academic foundation in financial economics, corporate finance, and public administration underpinning sound fiscal governance.'}
          </p>
        </div>

        <div className="education-editorial-grid">
          {education.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={idx} className="education-card">
                <div className="education-card-header">
                  <div className="education-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="education-year-badge">{item.year}</span>
                </div>

                <div className="education-card-body">
                  <h3 className="education-degree">{item.degree}</h3>
                  <div className="education-institution">{item.institution}</div>

                  <ul className="education-highlights">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx}>
                        <CheckCircle2 size={14} className="highlight-bullet" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="education-card-accent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
