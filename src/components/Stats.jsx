import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Stats() {
  const { stats } = portfolioData;

  return (
    <section id="record" className="stats-section section-pad">
      <div className="container-wide">
        <div className="stats-grid">
          <div className="stats-heading">
            <div className="section-kicker">
              <span className="eyebrow" style={{ color: '#ec4899' }}>Track Record</span>
            </div>
            <h2 className="section-title">
              Key Service <span style={{ color: '#90caf9' }}>Indicators</span>
            </h2>
            <p>
              Quantifiable oversight across field revenue administration, taxpayer audit reviews, and statutory enforcement.
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
