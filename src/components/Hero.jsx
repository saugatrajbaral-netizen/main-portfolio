import React from 'react';
import { ArrowDown, FileText, Mail, ChevronRight, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const { personal } = portfolioData;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" aria-hidden="true"></div>

      <div className="container-wide hero-content">
        <div className="hero-kicker">
          <span>Government of Nepal · Ministry of Finance</span>
        </div>

        <h1 className="hero-title">
          {personal.name}
          <span>Tax Officer & Public Finance Practitioner</span>
        </h1>

        <div className="hero-rule" aria-hidden="true"></div>

        <p className="hero-intro">{personal.intro}</p>

        <div className="hero-actions">
          <a
            href="#about"
            className="button button-primary"
            onClick={(e) => scrollToSection(e, '#about')}
          >
            <span>Official Profile</span>
            <ChevronRight size={14} />
          </a>

          <button
            type="button"
            className="button button-secondary"
            onClick={onOpenResume}
          >
            <FileText size={14} />
            <span>Curriculum Vitae</span>
          </button>

          <a
            href="#contact"
            className="button button-secondary"
            onClick={(e) => scrollToSection(e, '#contact')}
          >
            <Mail size={14} />
            <span>Contact Office</span>
          </a>
        </div>

        <aside className="hero-aside">
          <strong>{personal.aside.designation}</strong>
          <div>{personal.aside.office}</div>
          <div>{personal.aside.jurisdiction}</div>
          <div style={{ color: '#ffffff', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} color="#dc143c" />
            <span>{personal.aside.region}</span>
          </div>
        </aside>

        <div className="scroll-cue">
          <span>Scroll to explore</span>
          <ArrowDown size={12} />
        </div>
      </div>
    </section>
  );
}
