import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Focus() {
  const { focusAreas } = portfolioData;

  return (
    <section id="focus" className="focus-section section-pad">
      <div className="container-wide">
        <div className="focus-grid">
          <div>
            <div className="section-kicker">
              <span className="eyebrow" style={{ color: '#ec4899' }}>Reform Agenda</span>
            </div>
            <h2 className="section-title">
              Strategic Priorities in <span style={{ color: '#90caf9' }}>Modern Tax Governance</span>
            </h2>
            <p className="section-lead">
              Transforming the revenue landscape through digitalization, data analytics, taxpayer facilitation, and unwavering institutional integrity.
            </p>
            <div className="gold-line" aria-hidden="true"></div>
          </div>

          <div className="focus-list">
            {focusAreas.map((item, idx) => (
              <div key={idx} className="focus-item">
                <span className="focus-index">{item.index}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
