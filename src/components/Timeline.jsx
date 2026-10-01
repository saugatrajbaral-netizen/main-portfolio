import React from 'react';
import { Building2, MapPin, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Timeline({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { journey } = portfolio;

  return (
    <section id="experience" className="journey-editorial-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'प्रशासनिक अनुभव' : 'Career Progression'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>व्यावसायिक यात्रा तथा <span className="text-accent">जिम्मेवारी</span></>
            ) : (
              <>Professional <span className="text-accent">Journey</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'नेपाल सरकारको राजस्व सेवा र प्रादेशिक प्रशासनिक संयन्त्रमा सम्पादन गरिएका प्रमुख दायित्वहरू।'
              : 'Chronological timeline of institutional leadership, statutory revenue enforcement, and public administration under the Government of Nepal.'}
          </p>
        </div>

        <div className="editorial-journey-timeline">
          {journey.map((item, idx) => (
            <div key={item.id || idx} className="journey-node">
              {/* Timeline Spine Marker */}
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
                    <h3 className="journey-role">{item.role}</h3>
                    <div className="journey-institution">{item.institution}</div>
                    {item.area && (
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '3px', fontWeight: 500 }}>
                        {item.area}
                      </div>
                    )}
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
                  <h4 className="responsibilities-title">
                    {lang === 'np' ? 'प्रमुख जिम्मेवारी तथा कार्यक्षेत्र:' : 'Key Responsibilities & Professional Areas:'}
                  </h4>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
