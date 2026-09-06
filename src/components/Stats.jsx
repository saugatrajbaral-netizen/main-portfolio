import React from 'react';
import { getPortfolioData } from '../data/portfolioData';

export default function Stats({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { stats } = portfolio;

  return (
    <section id="record" className="stats-section section-pad">
      <div className="container-wide">
        <div className="stats-grid">
          <div className="stats-heading">
            <div className="section-kicker">
              <span className="eyebrow" style={{ color: '#ec4899' }}>
                {lang === 'np' ? 'कार्य सम्पादन विवरण' : 'Track Record'}
              </span>
            </div>
            <h2 className="section-title">
              {lang === 'np' ? (
                <>प्रमुख सेवा <span style={{ color: '#90caf9' }}>सूचकहरू</span></>
              ) : (
                <>Key Service <span style={{ color: '#90caf9' }}>Indicators</span></>
              )}
            </h2>
            <p>
              {lang === 'np'
                ? 'राजस्व प्रशासन, करदाता लेखापरीक्षण, वित्तीय अनुगमन तथा कानुनी परिपालनामा हासिल गरिएका मुख्य उपलब्धिहरू।'
                : 'Quantifiable oversight across field revenue administration, taxpayer audit reviews, and statutory enforcement.'}
            </p>
          </div>

          {stats.map((item, idx) => (
            <div key={idx} className="stat">
              <div className="stat-number">
                {item.number} <em>{item.unit}</em>
              </div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-detail">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
