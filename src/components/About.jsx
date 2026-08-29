import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal, credentials } = portfolioData;

  return (
    <section id="about" className="about-section section-pad">
      <div className="container-wide">
        <div className="about-grid">
          <div>
            <div className="section-kicker">
              <span className="eyebrow">Institutional Profile</span>
            </div>
            <h2 className="section-title">
              Public Service Grounded in <span style={{ color: 'var(--gov-blue)' }}>Transparency</span> & Fiscal Law
            </h2>

            <div className="profile-note">
              <span>Gazetted Civil Service Rank</span>
              Appointed under the Nepal Civil Service Commission, dedicated to statutory enforcement of tax legislation, taxpayer facilitation, and public financial accountability.
            </div>
          </div>

          <div className="about-copy">
            {personal.bio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="credential-strip">
              {credentials.map((cred, idx) => (
                <div key={idx} className="credential">
                  <strong>{cred.value}</strong>
                  <small>{cred.label}</small>
                  <div style={{ color: 'var(--slate)', fontSize: '11px', marginTop: '4px' }}>
                    {cred.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
