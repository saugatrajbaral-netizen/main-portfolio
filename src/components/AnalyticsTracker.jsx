import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_MEASUREMENT_ID } from '../utils/analytics';

/**
 * Automatically sends page_view events on route navigation in React Router
 */
export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  }, [location]);

  return null;
}

