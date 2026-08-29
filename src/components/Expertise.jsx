import React from 'react';
import { Scale, FileSpreadsheet, SearchCheck, Laptop, ShieldAlert, Landmark, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Expertise() {
  const { expertise } = portfolioData;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Scale':
        return <Scale size={24} className="expertise-icon" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet size={24} className="expertise-icon" />;
      case 'SearchCheck':
        return <SearchCheck size={24} className="expertise-icon" />;
      case 'Laptop':
        return <Laptop size={24} className="expertise-icon" />;
      case 'ShieldAlert':
        return <ShieldAlert size={24} className="expertise-icon" />;
      case 'Landmark':
        return <Landmark size={24} className="expertise-icon" />;
      default:
        return <Layers size={24} className="expertise-icon" />;
    }
  };

  return (
    <section id="expertise" className="expertise-section section-pad">
      <div className="container-wide">
        <div className="expertise-grid">
          <div>
            <div className="section-kicker">
              <span className="eyebrow">Professional Competencies</span>
            </div>
            <h2 className="section-title">
              Areas of <span style={{ color: 'var(--gov-blue)' }}>Fiscal & Regulatory</span> Expertise
            </h2>
            <p className="section-lead">
              Extensive technical knowledge encompassing statutory tax interpretation, risk-based auditing, digital revenue administration, and public expenditure monitoring.
            </p>
          </div>

          <div className="expertise-list">
            {expertise.map((item, idx) => (
              <div key={idx} className="expertise-card">
                {renderIcon(item.icon)}
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
