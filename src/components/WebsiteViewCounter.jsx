import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { toNepaliDigits } from '../utils/nepaliDateConverter';

const STORAGE_KEY = 'saugat_portfolio_page_views';

export default function WebsiteViewCounter({ lang = 'en' }) {
  const location = useLocation();
  const [views, setViews] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > 0) {
          return parsed;
        }
      }
      return 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    let current = 0;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          current = parsed;
        }
      }
    } catch (e) {}

    const updated = current + 1;
    setViews(updated);
    try {
      localStorage.setItem(STORAGE_KEY, updated.toString());
    } catch (e) {}
  }, [location.pathname]);

  const formattedCountEn = views.toLocaleString('en-US');
  const formattedCountNp = toNepaliDigits(formattedCountEn);

  return (
    <div className="website-views-section" aria-label="Website Views Counter">
      <div className="website-views-card">
        <span className="views-icon-wrapper" aria-hidden="true">
          <Eye size={12} className="views-eye-icon" />
        </span>
        <span className="views-label-text">
          {lang === 'np' ? 'वेबसाइट अवलोकन' : 'Website Views'}:
        </span>
        <span className="views-count-digits">
          {lang === 'np' ? formattedCountNp : formattedCountEn}
        </span>
        <span className="views-live-pulse-dot" title="Live Visitor Counter Synchronized" />
      </div>
    </div>
  );
}
