import React from 'react';
import { Quote } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function FeaturedQuote({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { featuredQuote } = portfolio;

  return (
    <section className="featured-quote-section">
      <div className="container-narrow">
        <div className="quote-wrapper">
          <div className="quote-mark-icon" aria-hidden="true">
            <Quote size={40} />
          </div>
          
          <blockquote className="editorial-quote-text">
            “{featuredQuote.quote}”
          </blockquote>

          <div className="quote-accent-rule" />

          <div className="quote-tagline">
            <span>{featuredQuote.tagline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
