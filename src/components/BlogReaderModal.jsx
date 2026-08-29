import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Clock,
  Tag,
  Share2,
  ThumbsUp,
  Bookmark,
  Check,
  Award,
  FileText,
  ArrowUp,
  Landmark,
  ShieldCheck,
  Minus,
  Plus,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Printer,
  ListOrdered,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { blogPosts } from '../data/blogData';

export default function BlogReaderModal({ post, isOpen, onClose, isBookmarked, onToggleBookmark, onSelectArticle }) {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeAnimated, setLikeAnimated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Audio Player Simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackSpeed, setAudioPlaybackSpeed] = useState(1);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioIntervalRef = useRef(null);

  // Citation modal / drawer toggle
  const [showCitationBox, setShowCitationBox] = useState(false);

  const readerBodyRef = useRef(null);

  useEffect(() => {
    if (!post) return;

    const storedLikesKey = `blog_likes_${post.id}`;
    const storedLikedKey = `blog_has_liked_${post.id}`;
    const initialLikes = parseInt(localStorage.getItem(storedLikesKey) || post.likesCount.toString(), 10);
    const userLiked = localStorage.getItem(storedLikedKey) === 'true';

    setLikes(initialLikes);
    setHasLiked(userLiked);
    setFontSizeOffset(0);
    setCopied(false);
    setScrollProgress(0);
    setIsPlayingAudio(false);
    setAudioProgress(0);
    setShowCitationBox(false);

    if (readerBodyRef.current) {
      readerBodyRef.current.scrollTop = 0;
    }
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Audio simulator timer
  useEffect(() => {
    if (isPlayingAudio) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1 * audioPlaybackSpeed;
        });
      }, 600);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlayingAudio, audioPlaybackSpeed]);

  if (!isOpen || !post) return null;

  const handleScroll = () => {
    if (readerBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = readerBodyRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.round((scrollTop / totalScroll) * 100)));
      }
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      const newCount = likes - 1;
      setLikes(newCount);
      setHasLiked(false);
      localStorage.setItem(`blog_likes_${post.id}`, newCount.toString());
      localStorage.setItem(`blog_has_liked_${post.id}`, 'false');
    } else {
      const newCount = likes + 1;
      setLikes(newCount);
      setHasLiked(true);
      setLikeAnimated(true);
      setTimeout(() => setLikeAnimated(false), 700);
      localStorage.setItem(`blog_likes_${post.id}`, newCount.toString());
      localStorage.setItem(`blog_has_liked_${post.id}`, 'true');
    }
  };

  const handleShare = () => {
    const citationText = post.citation || `"${post.title}" by Saugat Raj Baral (Tax Officer, Government of Nepal)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${citationText} — Read at ${window.location.href.split('#')[0]}#blog`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    }
  };

  const scrollToSection = (idx) => {
    const element = document.getElementById(`section-anchor-${idx}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToModalTop = () => {
    if (readerBodyRef.current) {
      readerBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && (p.category === post.category || p.featured)).slice(0, 2);

  return (
    <div
      className="blog-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
    >
      <div
        className="blog-modal-dialog enhanced-reader-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scroll Progress Bar at the Top */}
        <div className="reading-progress-track">
          <div
            className="reading-progress-bar"
            style={{ width: `${scrollProgress}%` }}
            aria-label={`Reading progress: ${scrollProgress}%`}
          />
        </div>

        {/* Modal Top Control Bar */}
        <div className="blog-modal-header">
          <div className="blog-modal-header-meta">
            <span className="blog-category-badge">{post.category}</span>
            <span className="blog-meta-item">
              <Calendar size={12} />
              {post.publishedDate}
            </span>
            <span className="blog-meta-item">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="blog-meta-item scroll-indicator-badge">
              {scrollProgress}% Read
            </span>
          </div>

          <div className="blog-modal-controls">
            {/* Font size adjustments */}
            <div className="font-size-toolbar" title="Adjust Reader Text Size">
              <button
                type="button"
                className="font-size-btn"
                onClick={() => setFontSizeOffset(Math.max(-2, fontSizeOffset - 1))}
                aria-label="Decrease font size"
              >
                <Minus size={12} />
                <span>A</span>
              </button>
              {fontSizeOffset !== 0 && (
                <button
                  type="button"
                  className="font-size-btn font-reset"
                  onClick={() => setFontSizeOffset(0)}
                  title="Reset font size"
                >
                  <RotateCcw size={10} />
                </button>
              )}
              <button
                type="button"
                className="font-size-btn"
                onClick={() => setFontSizeOffset(Math.min(4, fontSizeOffset + 1))}
                aria-label="Increase font size"
              >
                <span>A</span>
                <Plus size={12} />
              </button>
            </div>

            {/* Print button */}
            <button
              type="button"
              className="blog-action-btn"
              onClick={handlePrint}
              title="Print Article"
            >
              <Printer size={15} />
            </button>

            {/* Bookmark button */}
            <button
              type="button"
              className={`blog-action-btn ${isBookmarked ? 'active-bookmark' : ''}`}
              onClick={() => onToggleBookmark(post.id)}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share / Copy Citation button */}
            <button
              type="button"
              className="blog-action-btn"
              onClick={handleShare}
              title="Copy official citation & link"
            >
              {copied ? <Check size={15} style={{ color: '#10b981' }} /> : <Share2 size={15} />}
            </button>

            {/* Close button */}
            <button
              type="button"
              className="blog-modal-close"
              onClick={onClose}
              aria-label="Close article reader"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {copied && (
          <div className="blog-toast-notification">
            <Check size={14} />
            <span>Official citation & web link copied to clipboard!</span>
          </div>
        )}

        {/* Modal Main Layout: TOC Sidebar + Article Prose Body */}
        <div className="reader-layout-split">
          {/* Quick Table of Contents Sidebar */}
          <aside className="reader-toc-sidebar">
            <div className="toc-header">
              <ListOrdered size={14} />
              <span>Table of Contents</span>
            </div>
            <ul className="toc-list">
              <li>
                <button
                  type="button"
                  className="toc-link"
                  onClick={scrollToModalTop}
                >
                  Overview & Takeaways
                </button>
              </li>
              {post.sections.map((sec, sIdx) => (
                <li key={sIdx}>
                  <button
                    type="button"
                    className="toc-link"
                    onClick={() => scrollToSection(sIdx)}
                  >
                    {sec.heading}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="toc-link"
                  onClick={() => setShowCitationBox(!showCitationBox)}
                >
                  Official Citation Formats
                </button>
              </li>
            </ul>

            {/* Officer Endorsement Quick Pill */}
            <div className="toc-endorsement-box">
              <button
                type="button"
                onClick={handleLike}
                className={`toc-like-btn ${hasLiked ? 'liked' : ''} ${likeAnimated ? 'pulse' : ''}`}
              >
                <ThumbsUp size={14} />
                <span>{likes} Endorsements</span>
              </button>
            </div>
          </aside>

          {/* Scrollable Reader Body */}
          <div
            className="blog-modal-body enhanced-modal-body"
            id="blog-reader-body"
            ref={readerBodyRef}
            onScroll={handleScroll}
          >
            {/* Article Hero Banner */}
            <div className="blog-reader-hero">
              <div className="blog-reader-seal">
                <Landmark size={20} />
                <span>Government of Nepal · Inland Revenue Policy Commentary</span>
              </div>

              <h1 id="blog-modal-title" className="blog-reader-title">
                {post.title}
              </h1>

              <p className="blog-reader-subtitle">{post.subtitle}</p>

              {/* Audio Listen Simulation Player */}
              <div className="audio-article-player">
                <div className="audio-player-left">
                  <button
                    type="button"
                    className="audio-play-trigger"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    aria-label={isPlayingAudio ? 'Pause Audio Brief' : 'Listen to Audio Brief'}
                  >
                    {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <div className="audio-player-info">
                    <span className="audio-label">
                      {isPlayingAudio ? 'Playing Policy Audio Brief' : 'Listen to Official Audio Brief'}
                    </span>
                    <span className="audio-time">
                      {post.audioDuration || '6:00'} · Executive Summary
                    </span>
                  </div>
                </div>

                <div className="audio-player-wave">
                  <div className="audio-progress-bar-bg">
                    <div
                      className="audio-progress-bar-fill"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                </div>

                <div className="audio-speed-controls">
                  {[1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      className={`speed-btn ${audioPlaybackSpeed === spd ? 'active' : ''}`}
                      onClick={() => setAudioPlaybackSpeed(spd)}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Statutory Reference Callout */}
              {post.statutoryRef && (
                <div className="blog-statutory-pill">
                  <ShieldCheck size={16} className="statutory-icon" />
                  <div>
                    <strong>Statutory Reference:</strong> {post.statutoryRef}
                  </div>
                </div>
              )}

              {/* Author Attribution Card */}
              <div className="blog-author-strip">
                <div className="author-avatar-badge">SRB</div>
                <div className="author-details">
                  <div className="author-name">
                    {portfolioData.personal.name}
                    <span className="author-role-pill">Tax Officer (GoN)</span>
                  </div>
                  <div className="author-dept">
                    {portfolioData.personal.department} · {portfolioData.personal.service}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Takeaways Callout Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="blog-takeaways-box">
                <div className="takeaways-header">
                  <Award size={16} />
                  <h3>Executive Summary & Key Takeaways</h3>
                </div>
                <ul className="takeaways-list">
                  {post.keyTakeaways.map((item, idx) => (
                    <li key={idx}>
                      <span className="takeaway-bullet">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Main Text Content with custom font size */}
            <div
              className="blog-prose-content"
              style={{ fontSize: `${16 + fontSizeOffset}px` }}
            >
              {post.sections.map((section, idx) => (
                <section
                  key={idx}
                  id={`section-anchor-${idx}`}
                  className="blog-section-block"
                >
                  <h2>{section.heading}</h2>
                  {section.content.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('- ')) {
                      const listItems = para.split('\n- ').map((item) => item.replace(/^- /, ''));
                      return (
                        <ul key={pIdx} className="blog-prose-list">
                          {listItems.map((li, lIdx) => (
                            <li key={lIdx}>{li}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.match(/^\d+\./)) {
                      const orderedItems = para.split(/\n(?=\d+\.)/);
                      return (
                        <ol key={pIdx} className="blog-prose-ordered-list">
                          {orderedItems.map((item, oIdx) => (
                            <li key={oIdx}>{item.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </section>
              ))}
            </div>

            {/* Citation Box Toggle */}
            <div className="citation-reference-box">
              <div className="citation-header">
                <FileText size={15} />
                <h4>Official Citation Reference</h4>
                <button
                  type="button"
                  className="copy-citation-btn"
                  onClick={handleShare}
                >
                  {copied ? 'Citation Copied!' : 'Copy Citation'}
                </button>
              </div>
              <p className="citation-text">
                {post.citation || `${portfolioData.personal.name}. (2026). "${post.title}." Inland Revenue Policy Review, Government of Nepal.`}
              </p>
            </div>

            {/* Article Tags */}
            <div className="blog-tags-container">
              <span className="blog-tags-label">
                <Tag size={13} />
                Tags & Statutory Domains:
              </span>
              <div className="blog-tags-list">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="blog-tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Engagement & Endorsement Bar */}
            <div className="blog-engagement-bar">
              <div className="engagement-left">
                <button
                  type="button"
                  onClick={handleLike}
                  className={`like-button ${hasLiked ? 'liked' : ''} ${likeAnimated ? 'pulse' : ''}`}
                  aria-label="Like or endorse this article"
                >
                  <ThumbsUp size={16} />
                  <span>{likes} {likes === 1 ? 'Endorsement' : 'Endorsements'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(post.id)}
                  className={`bookmark-toggle-btn ${isBookmarked ? 'saved' : ''}`}
                >
                  <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
                  <span>{isBookmarked ? 'Saved in Reading List' : 'Save for Reference'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={scrollToModalTop}
                className="back-to-top-btn"
                aria-label="Scroll to top of article"
              >
                <span>Top of Article</span>
                <ArrowUp size={13} />
              </button>
            </div>

            {/* Related Articles Strip */}
            {relatedPosts.length > 0 && (
              <div className="related-articles-section">
                <h4 className="related-heading">
                  <Sparkles size={14} />
                  <span>Related Commentary & Studies</span>
                </h4>
                <div className="related-cards-grid">
                  {relatedPosts.map((rel) => (
                    <div
                      key={rel.id}
                      className="related-card"
                      onClick={() => onSelectArticle(rel)}
                    >
                      <span className="related-cat">{rel.category}</span>
                      <h5 className="related-title">{rel.title}</h5>
                      <div className="related-footer">
                        <span>{rel.readTime}</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Disclaimer */}
            <div className="blog-disclaimer-box">
              <div className="disclaimer-title">
                <FileText size={14} />
                <span>Administrative & Legal Disclaimer</span>
              </div>
              <p>
                The analyses, interpretations, and opinions articulated in this commentary reflect professional research and administrative insights within public finance and tax governance in Nepal. For formal tax dispute adjudication, binding advance rulings, or statutory assessment proceedings, taxpayers must consult formal Gazetted Acts, Finance Acts, and official directives issued by the Inland Revenue Department (IRD).
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="blog-modal-footer">
          <div className="modal-footer-author">
            Authored by <strong>{portfolioData.personal.name}</strong> · Tax Officer, Ministry of Finance (GoN)
          </div>
          <button type="button" className="button button-crimson" onClick={onClose}>
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
