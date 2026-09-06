import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ chapter, title, subtitle, kicker, lang = 'en' }) {
  return (
    <header className="page-chapter-header">
      <div className="container-wide">
        {/* Breadcrumb Navigation */}
        <nav className="chapter-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-home">
            {lang === 'np' ? 'सौगात राज बराल' : 'Saugat Raj Baral'}
          </Link>
          <ChevronRight size={13} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{chapter}</span>
        </nav>

        {/* Optional Eyebrow / Kicker */}
        {kicker && (
          <div className="chapter-kicker">
            <span className="eyebrow">{kicker}</span>
          </div>
        )}

        {/* Large Editorial Heading */}
        <h1 className="chapter-heading">{title}</h1>

        {/* Chapter Subtitle / Lead */}
        {subtitle && <p className="chapter-subtitle">{subtitle}</p>}

        <div className="chapter-divider" />
      </div>
    </header>
  );
}
