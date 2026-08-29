import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Record', href: '#record' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Focus Areas', href: '#focus' },
    { label: 'Commentary', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'record', 'timeline', 'expertise', 'focus', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-wide header-inner">
        <a href="#hero" className="brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <div className="brand-mark">SRB</div>
          <div className="brand-copy">
            <span className="brand-name">{portfolioData.personal.name}</span>
            <span className="brand-role">Tax Officer · Government of Nepal</span>
          </div>
        </a>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-contact"
            onClick={onOpenResume}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={13} />
            <span>Curriculum Vitae</span>
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-link"
            style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#dc143c' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
          >
            View Curriculum Vitae (CV) →
          </button>
        </div>
      )}
    </header>
  );
}
