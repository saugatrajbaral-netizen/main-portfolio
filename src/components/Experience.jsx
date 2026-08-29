import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career Path</span>
          </div>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            A chronological timeline of my professional roles and engineering contributions.
          </p>
        </div>

        <div className="timeline-container">
          {experience.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-card glass-panel">
                <div className="timeline-header">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-period">
                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {item.period}
                  </span>
                </div>
                <div className="timeline-company">{item.company}</div>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
