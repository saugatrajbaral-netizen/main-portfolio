import React from 'react';
import { getPortfolioData } from '../data/portfolioData';

export default function Focus({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { focusAreas } = portfolio;

  return (
    <section id="focus" className="focus-section section-pad">
      <div className="container-wide">
        <div className="focus-grid">
          <div>
            <div className="section-kicker">
              <span className="eyebrow" style={{ color: '#ec4899' }}>
                {lang === 'np' ? 'सुधार कार्यसूची' : 'Reform Agenda'}
              </span>
            </div>
            <h2 className="section-title">
              {lang === 'np' ? (
                <>आधुनिक कर सुशासनका <span style={{ color: '#90caf9' }}>रणनीतिक प्राथमिकताहरू</span></>
              ) : (
                <>Strategic Priorities in <span style={{ color: '#90caf9' }}>Modern Tax Governance</span></>
              )}
            </h2>
            <p className="section-lead">
              {lang === 'np'
                ? 'डिजिटलाइजेसन, तथ्यांक विश्लेषण, करदाता सहजीकरण र निष्पक्षताका माध्यमबाट राजस्व प्रणालीमा सकारात्मक रुपान्तरण।'
                : 'Transforming the revenue landscape through digitalization, data analytics, taxpayer facilitation, and unwavering institutional integrity.'}
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
