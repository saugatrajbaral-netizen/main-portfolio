import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Expertise({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { areasOfInterest } = portfolio;

  return (
    <section id="interests" className="interests-editorial-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'प्राज्ञिक तथा नीतिगत रुचि' : 'Policy & Scholarly Focus'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>नीतिगत तथा व्यावसायिक <span className="text-accent">रुचिका क्षेत्रहरू</span></>
            ) : (
              <>Areas of <span className="text-accent">Interest</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'कर कानुन, वित्तीय नीति, डिजिटल सरकार र दिगो आर्थिक विकासलाई दिशा दिने प्रमुख क्षेत्रहरू।'
              : 'Scholarly, regulatory, and policy domains at the forefront of modern fiscal governance and public administration.'}
          </p>
        </div>

        {/* Sophisticated Editorial Grid */}
        <div className="interests-editorial-grid">
          {areasOfInterest.map((interest, idx) => (
            <div key={idx} className="interest-item-box">
              <div className="interest-item-header">
                <span className="interest-number">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="interest-name">{interest.name}</h3>
              </div>
              <p className="interest-desc">{interest.desc}</p>
              <div className="interest-item-border-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
