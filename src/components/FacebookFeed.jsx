import React, { useState } from 'react';
import { FacebookIcon } from './SocialIcons';
import { ExternalLink, RefreshCw, Radio } from 'lucide-react';

export default function FacebookFeed({ lang = 'en' }) {
  const profileUrl = 'https://www.facebook.com/saugatraj.baral';
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Official Facebook Page / Timeline Plugin URL
  const fbPluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    profileUrl
  )}&tabs=timeline&width=500&height=460&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=`;

  return (
    <div className="fb-feed-container">
      {/* Feed Header */}
      <div className="fb-feed-header">
        <div className="fb-feed-header-left">
          <div className="fb-brand-icon-wrap">
            <FacebookIcon size={18} color="#ffffff" />
          </div>
          <div>
            <h4 className="fb-feed-title">
              {lang === 'np' ? 'फेसबुक सार्वजनिक गतिविधि' : 'Facebook Public Feed'}
            </h4>
            <div className="fb-live-indicator">
              <span className="live-pulse-dot" />
              <span>{lang === 'np' ? 'प्रत्यक्ष सार्वजनिक अपडेट' : 'Live Public Stream'}</span>
            </div>
          </div>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fb-visit-profile-btn"
          title={lang === 'np' ? 'फेसबुक प्रोफाइल हेर्नुहोस्' : 'Visit Facebook Profile'}
        >
          <FacebookIcon size={14} />
          <span>{lang === 'np' ? 'फेसबुक' : 'Facebook'}</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Official Facebook Embed Stage */}
      <div className="fb-embed-wrapper">
        <iframe
          title="Official Facebook Public Feed"
          src={fbPluginUrl}
          width="100%"
          height="460"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          onLoad={() => setIframeLoaded(true)}
          className="fb-iframe"
        />

        {/* Dynamic / Fallback Direct Stream Notice */}
        <div className="fb-feed-direct-card">
          <div className="fb-direct-content">
            <div className="fb-direct-meta">
              <span className="fb-handle">@saugatraj.baral</span>
              <span className="fb-dot">•</span>
              <span className="fb-official-badge">
                {lang === 'np' ? 'आधिकारिक प्रोफाइल' : 'Official Profile'}
              </span>
            </div>
            <p className="fb-direct-desc">
              {lang === 'np'
                ? 'नवीनतम सार्वजनिक सूचना, कर साक्षरता तथा प्रशासनिक गतिविधिहरू सिधै फेसबुकबाट प्राप्त गर्नुहोस्।'
                : 'Follow live public notices, tax literacy campaigns, and administrative updates directly on Facebook.'}
            </p>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fb-view-posts-btn"
          >
            <FacebookIcon size={15} />
            <span>
              {lang === 'np'
                ? 'फेसबुकमा पछिल्ला पोस्टहरू हेर्नुहोस्'
                : 'View Latest Posts on Facebook'}
            </span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
