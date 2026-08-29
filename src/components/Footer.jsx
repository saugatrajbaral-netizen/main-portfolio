import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container-wide footer-inner">
        <div>
          <p>
            © {new Date().getFullYear()} {personal.name} · Tax Officer, Government of Nepal.
          </p>
          <p style={{ color: '#8aa6c4', fontSize: '9px', marginTop: '4px' }}>
            Inland Revenue Department · Ministry of Finance · Official Profile
          </p>
        </div>

        <button type="button" onClick={scrollToTop} className="back-top" aria-label="Return to top of page">
          <span>Back to Top</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
