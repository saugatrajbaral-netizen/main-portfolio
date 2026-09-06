import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Bookmark,
  Check,
  Award,
  FileText,
  Landmark,
  Scale,
  Sparkles,
  BookOpen,
  Volume2,
  Printer
} from 'lucide-react';
import { blogPosts } from '../data/blogData';

export default function ArticleDetailPage({ lang = 'en' }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Find post by slug or ID
  const post = blogPosts.find((p) => p.slug === slug || p.id === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Saugat Raj Baral`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container-narrow page-chapter-view" style={{ textAlign: 'center', paddingBlock: '80px' }}>
        <h2>{lang === 'np' ? 'लेख फेला परेन' : 'Article Not Found'}</h2>
        <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>
          {lang === 'np' ? 'तपाईंले खोज्नुभएको लेख फेला परेन वा सारिएको हुनसक्छ।' : 'The article you are looking for does not exist or has been relocated.'}
        </p>
        <Link to="/research" className="button button-primary" style={{ marginTop: '24px' }}>
          <ArrowLeft size={14} />
          <span>{lang === 'np' ? 'अनुसन्धान खण्डमा फर्कनुहोस्' : 'Return to Research'}</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="article-detail-page page-chapter-view">
      {/* Editorial Article Header */}
      <header className="article-detail-header">
        <div className="container-narrow">
          <nav className="chapter-breadcrumb">
            <Link to="/" className="breadcrumb-home">
              {lang === 'np' ? 'सौगात राज बराल' : 'Saugat Raj Baral'}
            </Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/research" className="breadcrumb-home">
              {lang === 'np' ? 'अनुसन्धान' : 'Research'}
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{post.category}</span>
          </nav>

          <div className="article-badge-row">
            <span className="article-category-badge">{post.category}</span>
            <span className="article-read-time">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </span>
            <span className="article-date">
              <Calendar size={12} />
              <span>{post.publishedDate}</span>
            </span>
          </div>

          <h1 className="article-main-title">{post.title}</h1>

          {post.subtitle && (
            <p className="article-main-subtitle">
              “{post.subtitle}”
            </p>
          )}

          {/* Action Toolbar */}
          <div className="article-meta-toolbar">
            <div className="author-tag">
              <span>{lang === 'np' ? 'लेखक:' : 'By:'}</span>
              <strong>{lang === 'np' ? 'सौगात राज बराल, कर अधिकृत' : 'Saugat Raj Baral, Tax Officer'}</strong>
            </div>

            <div className="toolbar-buttons">
              <button
                type="button"
                className="article-tool-btn"
                onClick={handleShare}
                title="Copy Article Link"
              >
                {copied ? <Check size={14} color="#16a34a" /> : <Share2 size={14} />}
                <span>{copied ? (lang === 'np' ? 'लिङ्क कपि भयो' : 'Link Copied') : (lang === 'np' ? 'साझा गर्नुहोस्' : 'Share')}</span>
              </button>

              <button
                type="button"
                className="article-tool-btn"
                onClick={handlePrint}
                title="Print Article"
              >
                <Printer size={14} />
                <span>{lang === 'np' ? 'प्रिन्ट' : 'Print'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="container-narrow article-detail-body">
        {/* Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <aside className="article-takeaways-box">
            <div className="takeaways-header">
              <Sparkles size={16} className="text-accent" />
              <h3>{lang === 'np' ? 'मुख्य निष्कर्ष तथा नीतिगत सार:' : 'Key Policy Takeaways & Findings:'}</h3>
            </div>
            <ul className="takeaways-list">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </aside>
        )}

        {/* Statutory References Strip */}
        {post.statutoryRef && (
          <div className="article-statutory-box">
            <Scale size={15} className="text-gov-blue" />
            <div>
              <span className="statutory-label">{lang === 'np' ? 'कानुनी तथा वैधानिक आधार:' : 'Statutory & Constitutional Reference:'}</span>
              <span className="statutory-text">{post.statutoryRef}</span>
            </div>
          </div>
        )}

        {/* Detailed Sections */}
        <div className="article-prose-content">
          {post.sections && post.sections.map((section, sIdx) => (
            <section key={sIdx} className="article-section-block">
              <h2 className="article-section-heading">{section.heading}</h2>
              <div className="article-section-text">
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Academic Citation Box */}
        {post.citation && (
          <footer className="article-citation-footer">
            <div className="citation-head">
              <BookOpen size={14} />
              <span>{lang === 'np' ? 'प्राज्ञिक सन्दर्भ तथा उद्धरण (APA Format):' : 'Suggested Academic Citation (APA Format):'}</span>
            </div>
            <code>{post.citation}</code>
          </footer>
        )}

        {/* Back to Research Navigation */}
        <div className="article-nav-footer">
          <Link to="/research" className="button button-secondary">
            <ArrowLeft size={14} />
            <span>{lang === 'np' ? '← सबै अनुसन्धान लेखहरू हेर्नुहोस्' : '← Back to All Research Articles'}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
