/**
 * Google Analytics 4 (GA4) Utility
 * Measurement ID: G-4MQCVK85B0
 */

export const GA_MEASUREMENT_ID = 'G-4MQCVK85B0';

/**
 * Log a custom event to Google Analytics
 * @param {string} action - Event action name (e.g. 'open_resume', 'change_language')
 * @param {Record<string, any>} [params] - Optional custom parameters
 */
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      ...params,
      send_to: GA_MEASUREMENT_ID,
    });
  }
}

