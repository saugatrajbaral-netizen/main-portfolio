import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Timeline() {
  const { timeline } = portfolioData;

  return (
    <section id="timeline" className="timeline-section section-pad">
      <div className="container-wide">
        <div className="timeline-head">
          <div>
            <div className="section-kicker">
              <span className="eyebrow">Career Milestones</span>
            </div>
            <h2 className="section-title">
              Service History & <span style={{ color: 'var(--gov-blue)' }}>Postings</span>
            </h2>
          </div>
          <p className="section-lead">
            A chronological timeline of public appointments, administrative responsibilities, and tax governance initiatives under the Government of Nepal.
          </p>
        </div>

        <div className="timeline">
          {timeline.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-place">{item.place}</div>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
