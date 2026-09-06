import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Video, ArrowRight, ExternalLink, X, Tag } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function TalksMedia({ lang = 'en', onOpenMedia }) {
  const portfolio = getPortfolioData(lang);
  const { talksMedia } = portfolio;
  const [activeVideo, setActiveVideo] = useState(null);

  const handlePlayVideo = (talk) => {
    setActiveVideo(talk);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section id="talks" className="talks-media-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'संवाद तथा प्रस्तुति' : 'Discourse & Engagements'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>वार्ता, कार्यशाला तथा <span className="text-accent">प्रस्तुतिहरू</span></>
            ) : (
              <>Talks, Presentations & <span className="text-accent">Media</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'करदाता सचेतना, सार्वजनिक वित्त, डिजिटल राजस्व प्रशासन तथा सुशासन सम्बन्धी सार्वजनिक संवाद र तालिम सत्रहरू।'
              : 'Recorded keynotes, taxpayer education workshops, policy symposiums, and professional reflections on fiscal administration.'}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="talks-media-grid">
          {talksMedia.map((talk) => (
            <div key={talk.id} className="talk-card">
              <div className="talk-thumb-container" onClick={() => handlePlayVideo(talk)}>
                {/* Thumbnail Canvas / Visual */}
                <div className="talk-thumb-bg">
                  <div className="talk-thumb-overlay" />
                  <div className="talk-play-btn" role="button" aria-label={`Play ${talk.title}`}>
                    <Play size={24} fill="#ffffff" color="#ffffff" />
                  </div>
                  <span className="talk-duration-badge">{talk.duration}</span>
                </div>
                <div className="talk-category-pill">
                  <Tag size={11} />
                  <span>{talk.category}</span>
                </div>
              </div>

              <div className="talk-card-content">
                <div className="talk-meta-row">
                  <span className="talk-platform">{talk.platform}</span>
                  <span className="talk-date">
                    <Calendar size={12} />
                    <span>{talk.date}</span>
                  </span>
                </div>

                <h3 className="talk-title" onClick={() => handlePlayVideo(talk)}>
                  {talk.title}
                </h3>

                <p className="talk-description">{talk.description}</p>

                <div className="talk-card-footer">
                  <button
                    type="button"
                    className="watch-now-btn"
                    onClick={() => handlePlayVideo(talk)}
                  >
                    <span>{lang === 'np' ? 'भिडियो हेर्नुहोस्' : 'Watch Presentation'}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Talks Action Bar */}
        <div className="talks-action-bar">
          <Link
            to="/media"
            className="button-editorial-outline"
          >
            <span>{lang === 'np' ? 'सबै मिडिया तथा अभिलेख हेर्नुहोस् →' : 'View All Media & Public Archive →'}</span>
          </Link>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="video-modal-backdrop" onClick={handleCloseVideo}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div className="video-modal-title-box">
                <span className="video-modal-platform">{activeVideo.platform}</span>
                <h3 className="video-modal-title">{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                className="video-modal-close"
                onClick={handleCloseVideo}
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>

            <div className="video-modal-player-wrapper">
              {/* Clean placeholder / educational player preview */}
              <div className="video-player-frame">
                <div className="video-player-placeholder">
                  <div className="player-inner-badge">
                    <Video size={48} color="var(--crimson)" />
                    <h4>{activeVideo.title}</h4>
                    <p>{activeVideo.description}</p>
                    <div className="player-meta-strip">
                      <span>{activeVideo.category}</span>
                      <span>•</span>
                      <span>{activeVideo.date}</span>
                      <span>•</span>
                      <span>{activeVideo.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="video-modal-footer">
              <p className="video-modal-desc">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
