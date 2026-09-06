import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Maximize2, X, Tag } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function VisualStory({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { visualStory } = portfolio;
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section id="visual-story" className="visual-story-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'दृश्यकथा' : 'Field & Governance'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>सार्वजनिक सेवा: <span className="text-accent">दृश्यकथा</span> र उपस्थिति</>
            ) : (
              <>Visual Story & <span className="text-accent">Field Engagements</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'राजस्व प्रशासन, करदाता परामर्श, नीतिगत गोष्ठी र हिमाली भू-भागमा सार्वजनिक सेवा प्रवाहका झलकहरू।'
              : 'Glimpses of revenue administration, taxpayer orientation, policy conferences, and institutional governance across Nepal.'}
          </p>
        </div>

        {/* Editorial Photo Grid */}
        <div className="visual-story-grid">
          {visualStory.map((item) => (
            <div
              key={item.id}
              className="story-card"
              onClick={() => setActivePhoto(item)}
            >
              <div className="story-image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="story-img"
                  loading="lazy"
                />
                <div className="story-overlay">
                  <div className="story-zoom-icon">
                    <Maximize2 size={20} />
                  </div>
                </div>
                <div className="story-category-tag">
                  <Tag size={11} />
                  <span>{item.category}</span>
                </div>
              </div>

              <div className="story-card-meta">
                <div className="story-sub-meta">
                  <span className="story-location">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </span>
                  <span className="story-date">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </span>
                </div>
                <h3 className="story-title">{item.title}</h3>
                <p className="story-caption">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            <div className="lightbox-image-wrap">
              <img src={activePhoto.image} alt={activePhoto.title} />
            </div>
            <div className="lightbox-caption">
              <div className="lightbox-badge">{activePhoto.category}</div>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.caption}</p>
              <div className="lightbox-footer-meta">
                <span>{activePhoto.location}</span> • <span>{activePhoto.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
