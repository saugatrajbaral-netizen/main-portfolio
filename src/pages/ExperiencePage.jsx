import React from 'react';
import PageHeader from '../components/PageHeader';
import { Building2, MapPin, CheckCircle2, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function ExperiencePage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { journey } = portfolio;

  return (
    <div className="page-chapter-view experience-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'अनुभव' : 'Experience'}
        kicker={lang === 'np' ? 'दोस्रो अध्याय' : 'Chapter 2 · Service History'}
        title={lang === 'np' ? 'व्यावसायिक यात्रा तथा प्रशासनिक अनुभव' : 'Professional Journey & Experience'}
        subtitle={lang === 'np'
          ? 'नेपाल सरकारको अर्थ मन्त्रालय तथा प्रादेशिक प्रशासनिक संरचनामा सम्पादन गरिएका जिम्मेवारीहरूको कालक्रमिक विवरण।'
          : 'Chronological timeline of institutional leadership, statutory revenue enforcement, and provincial public finance administration.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        <div className="editorial-journey-timeline">
          {journey.map((item, idx) => (
            <article key={item.id || idx} className="journey-node">
              {/* Timeline Spine */}
              <div className="journey-spine">
                <div className="journey-bullet-ring">
                  <div className="journey-bullet-dot" />
                </div>
                {idx < journey.length - 1 && <div className="journey-line" />}
              </div>

              {/* Journey Card Content */}
              <div className="journey-card">
                <div className="journey-card-header">
                  <div className="journey-header-main">
                    <span className={`journey-period-pill ${item.period === 'Current' || item.period === 'हाल कार्यरत' ? 'current' : 'previous'}`}>
                      {item.period}
                    </span>
                    <h2 className="journey-role">{item.role}</h2>
                    <div className="journey-institution">{item.institution}</div>
                  </div>

                  <div className="journey-header-meta">
                    <div className="journey-office">
                      <Building2 size={13} className="text-gov-blue" />
                      <span>{item.office}</span>
                    </div>
                    <div className="journey-jurisdiction">
                      <MapPin size={13} className="text-accent" />
                      <span>{item.jurisdiction}</span>
                    </div>
                  </div>
                </div>

                <p className="journey-overview">{item.overview}</p>

                <div className="journey-responsibilities-box">
                  <h3 className="responsibilities-title">
                    {lang === 'np' ? 'प्रमुख जिम्मेवारी तथा कार्यक्षेत्र:' : 'Key Responsibilities & Professional Areas:'}
                  </h3>
                  <div className="responsibilities-grid">
                    {item.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="responsibility-item">
                        <CheckCircle2 size={13} className="resp-icon" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
