import React, { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import { 
  Scale, 
  ExternalLink, 
  Search, 
  Filter, 
  Calendar, 
  Award, 
  FileText, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  BookOpen, 
  ArrowUpRight, 
  Sparkles, 
  Layers,
  History,
  Building2,
  Share2,
  X,
  Copy,
  Check
} from 'lucide-react';
import NepalEmblem from '../components/NepalEmblem';
import { 
  MEDIA_CATEGORIES, 
  FEATURED_STORY, 
  PIL_CASES, 
  MEDIA_ARCHIVE_ITEMS, 
  CHRONOLOGICAL_TIMELINE 
} from '../data/mediaData';

export default function MediaPage({ lang = 'en' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Filtered Archive Items
  const filteredMedia = useMemo(() => {
    return MEDIA_ARCHIVE_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const title = (lang === 'np' ? item.titleNp : item.titleEn).toLowerCase();
      const pub = (lang === 'np' ? item.publicationNp : item.publication).toLowerCase();
      const summary = (lang === 'np' ? item.summaryNp : item.summaryEn).toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();

      return matchesCategory && (title.includes(query) || pub.includes(query) || summary.includes(query) || tags.includes(query));
    });
  }, [selectedCategory, searchQuery, lang]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenArticleModal = (article) => {
    setActiveArticleModal(article);
  };

  const handleCloseModal = () => {
    setActiveArticleModal(null);
    setCopiedCitation(false);
  };

  const handleCopyCitation = (article) => {
    if (!article) return;
    const title = lang === 'np' ? article.titleNp : article.titleEn;
    const pub = lang === 'np' ? article.publicationNp : article.publication;
    const date = lang === 'np' ? article.dateBs : article.dateAd;
    const text = `"${title}" — ${pub} (${date}). Verified Reference: Saugat Raj Baral Public Interest Archive.`;
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="page-chapter-view media-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'मिडिया तथा जनहित बहसहरू' : 'Media & Public Interest Archive'}
        kicker={lang === 'np' ? 'छैटौं अध्याय' : 'Chapter 6 · Public Engagements & Discourse'}
        title={lang === 'np' ? 'मिडिया कभरेज तथा जनहित याचिका' : 'Media Coverage, PIL & Public Discourse'}
        subtitle={lang === 'np'
          ? 'संवैधानिक सुशासन, बजेटरी जवाफदेहिता, डिजिटल अर्थतन्त्र तथा सार्वजनिक वित्त सम्बन्धी प्रमाणित मिडिया कभरेज तथा जनहित याचिका (PIL) अभिलेख।'
          : 'Verified news reports, Supreme Court public interest litigations (PIL), constitutional dialogues, and policy reflections.'}
        lang={lang}
      />

      <div className="container-wide chapter-content-body">
        
        {/* =========================================================================
            1. PROMINENT FEATURED STORY BANNER
            ========================================================================= */}
        <section className="featured-media-section" aria-label="Featured Story">
          <div className="featured-editorial-card">
            <div className="featured-card-watermark" aria-hidden="true">
              <NepalEmblem size={220} variant="full" />
            </div>

            <div className="featured-card-topbar">
              <span className="featured-pil-badge">
                <Scale size={13} />
                <span>{lang === 'np' ? FEATURED_STORY.badgeNp : FEATURED_STORY.badgeEn}</span>
              </span>
              <span className="featured-year-tag">
                <Calendar size={13} />
                <span>{lang === 'np' ? FEATURED_STORY.yearBs : FEATURED_STORY.yearAd}</span>
              </span>
            </div>

            <div className="featured-card-body">
              <h2 className="featured-main-title">
                {lang === 'np' ? FEATURED_STORY.titleNp : FEATURED_STORY.titleEn}
              </h2>

              <p className="featured-main-summary">
                {lang === 'np' ? FEATURED_STORY.summaryNp : FEATURED_STORY.summaryEn}
              </p>

              <div className="featured-action-row">
                <button
                  type="button"
                  className="btn btn-primary featured-scroll-btn"
                  onClick={() => scrollToSection('pil-cases-section')}
                >
                  <Scale size={15} />
                  <span>{lang === 'np' ? 'मुद्दा विवरण तथा कभरेज हेर्नुहोस् ↓' : 'View PIL Case Records ↓'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary featured-scroll-btn"
                  onClick={() => scrollToSection('media-archive-section')}
                >
                  <FileText size={15} />
                  <span>{lang === 'np' ? 'समाचार अभिलेख हेर्नुहोस् ↓' : 'Explore Media Archive ↓'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PUBLIC INTEREST LITIGATION (PIL) SUBSECTION
            ========================================================================= */}
        <section id="pil-cases-section" className="pil-cases-section" aria-label="Public Interest Litigation Cases">
          <div className="pil-section-header">
            <div className="pil-title-wrap">
              <span className="section-eyebrow">
                <Scale size={14} className="text-crimson" />
                <span>{lang === 'np' ? 'न्यायिक तथा संवैधानिक बहस' : 'Constitutional & Legal Engagements'}</span>
              </span>
              <h2 className="section-heading">
                {lang === 'np' ? 'जनहित याचिका (Public Interest Litigation)' : 'Public Interest Litigation (PIL)'}
              </h2>
              <p className="section-subheading">
                {lang === 'np'
                  ? 'संवैधानिक, आर्थिक तथा सार्वजनिक नीतिगत प्रश्नहरूमा सर्वोच्च अदालतमा दायर गरिएका प्रमुख जनहित याचिकाहरू।'
                  : 'Selected engagements with constitutional, economic and public-policy questions before the Supreme Court of Nepal.'}
              </p>
            </div>
          </div>

          <div className="pil-cases-grid">
            {/* CASE 01: Parliamentary Infrastructure Development Programme */}
            <article id="case-parliamentary-fund" className="pil-case-card featured-case">
              <div className="case-card-header">
                <div className="case-meta-top">
                  <span className="case-number-badge primary">
                    {lang === 'np' ? 'संवैधानिक रिट • २०८० वि.सं.' : 'Supreme Court Constitutional Writ • 2080 BS'}
                  </span>
                  <span className="case-forum-tag">
                    <Building2 size={13} />
                    <span>{lang === 'np' ? PIL_CASES[0].forumNp : PIL_CASES[0].forumEn}</span>
                  </span>
                </div>

                <h3 className="case-title">
                  {lang === 'np' ? PIL_CASES[0].titleNp : PIL_CASES[0].titleEn}
                </h3>

                <div className="case-petitioner-strip">
                  <strong>{lang === 'np' ? 'निवेदक पक्ष:' : 'Petitioners:'}</strong>{' '}
                  <span>{lang === 'np' ? PIL_CASES[0].petitionerRoleNp : PIL_CASES[0].petitionerRoleEn}</span>
                </div>
              </div>

              <div className="case-card-body">
                <p className="case-description">
                  {lang === 'np' ? PIL_CASES[0].descriptionNp : PIL_CASES[0].descriptionEn}
                </p>

                {/* Core Policy Questions Raised */}
                <div className="case-questions-box">
                  <h4 className="questions-title">
                    {lang === 'np' ? 'उठाइएका मुख्य नीतिगत तथा संवैधानिक प्रश्नहरू:' : 'Core Policy & Constitutional Questions Raised:'}
                  </h4>
                  <div className="questions-tags-grid">
                    {PIL_CASES[0].coreQuestions.map((q, idx) => (
                      <span key={idx} className="question-tag">
                        • {lang === 'np' ? q.np : q.en}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Judicial Status Note */}
                <div className="case-order-callout neutral">
                  <div className="order-callout-icon">
                    <CheckCircle2 size={16} color="var(--navy)" />
                  </div>
                  <div className="order-callout-text">
                    <strong>{lang === 'np' ? 'अदालती कारबाही तथा अन्तरिम आदेश:' : 'Judicial Order & Constitutional Bench Action:'}</strong>{' '}
                    <span>{lang === 'np' ? PIL_CASES[0].benchOrderNp : PIL_CASES[0].benchOrderEn}</span>
                  </div>
                </div>

                {/* Media Coverage Grid */}
                <div className="case-media-coverage-container">
                  <h4 className="coverage-subheading">
                    <FileText size={14} />
                    <span>{lang === 'np' ? 'प्रमाणित मिडिया कभरेज (Media Coverage)' : 'Verified Media Coverage'}</span>
                  </h4>

                  <div className="coverage-links-grid">
                    {PIL_CASES[0].mediaCoverage.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coverage-link-pill"
                        title={`${item.publication} — ${item.headline} (Opens verified article)`}
                      >
                        <div className="coverage-pill-left">
                          <span className="coverage-pub-name">{lang === 'np' ? item.publicationNp : item.publication}</span>
                          <span className="coverage-headline-text">{item.headline}</span>
                        </div>
                        <div className="coverage-pill-right">
                          <span className="coverage-date">{lang === 'np' ? item.dateBs : item.dateAd}</span>
                          <ArrowUpRight size={13} className="coverage-ext-icon" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* CASE 02: Cryptocurrency Regulation & Digital Economic Freedom */}
            <article id="case-crypto-regulation" className="pil-case-card">
              <div className="case-card-header">
                <div className="case-meta-top">
                  <span className="case-number-badge">
                    {lang === 'np' ? PIL_CASES[1].caseNumber : PIL_CASES[1].caseNumber}
                  </span>
                  <span className="case-forum-tag">
                    <Building2 size={13} />
                    <span>{lang === 'np' ? PIL_CASES[1].forumNp : PIL_CASES[1].forumEn}</span>
                  </span>
                </div>

                <h3 className="case-title">
                  {lang === 'np' ? PIL_CASES[1].titleNp : PIL_CASES[1].titleEn}
                </h3>

                <div className="case-petitioner-strip">
                  <strong>{lang === 'np' ? 'निवेदक पक्ष:' : 'Petitioners:'}</strong>{' '}
                  <span>{lang === 'np' ? PIL_CASES[1].petitionerRoleNp : PIL_CASES[1].petitionerRoleEn}</span>
                </div>
              </div>

              <div className="case-card-body">
                <p className="case-description">
                  {lang === 'np' ? PIL_CASES[1].descriptionNp : PIL_CASES[1].descriptionEn}
                </p>

                {/* Core Policy Questions Raised */}
                <div className="case-questions-box">
                  <h4 className="questions-title">
                    {lang === 'np' ? 'उठाइएका मुख्य नीतिगत तथा आर्थिक विषयहरू:' : 'Key Policy, Technology & Economic Themes:'}
                  </h4>
                  <div className="questions-tags-grid">
                    {PIL_CASES[1].coreQuestions.map((q, idx) => (
                      <span key={idx} className="question-tag">
                        • {lang === 'np' ? q.np : q.en}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clearly Stated Judicial Outcome (Petition Dismissed) */}
                <div className="case-order-callout dismissed">
                  <div className="order-callout-icon">
                    <ShieldAlert size={16} color="#991b1b" />
                  </div>
                  <div className="order-callout-text">
                    <strong>{lang === 'np' ? 'अदालती फैसला (Judicial Outcome):' : 'Judicial Outcome:'}</strong>{' '}
                    <span>{lang === 'np' ? PIL_CASES[1].outcomeNp : PIL_CASES[1].outcomeEn}</span>
                  </div>
                </div>

                {/* Verified Media Coverage (Kantipur, OnlineKhabar, ICT Samachar, Artha Sarokar) */}
                <div className="case-media-coverage-container">
                  <h4 className="coverage-subheading">
                    <FileText size={14} />
                    <span>{lang === 'np' ? 'प्रमुख समाचार कभरेज (Verified Media Reports)' : 'Verified Media Reports'}</span>
                  </h4>

                  <div className="coverage-links-grid">
                    {PIL_CASES[1].mediaCoverage.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coverage-link-pill"
                        title={`${item.publication} — ${item.headline} (Opens verified article)`}
                      >
                        <div className="coverage-pill-left">
                          <span className="coverage-pub-name">{lang === 'np' ? item.publicationNp : item.publication}</span>
                          <span className="coverage-headline-text">{item.headline}</span>
                        </div>
                        <div className="coverage-pill-right">
                          <span className="coverage-date">{lang === 'np' ? item.dateBs : item.dateAd}</span>
                          <ArrowUpRight size={13} className="coverage-ext-icon" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =========================================================================
            3. CHRONOLOGICAL TIMELINE OF ENGAGEMENTS
            ========================================================================= */}
        <section className="media-timeline-section" aria-label="Chronological Timeline">
          <div className="timeline-header-wrap">
            <span className="section-eyebrow">
              <History size={14} className="text-crimson" />
              <span>{lang === 'np' ? 'समयरेखा' : 'Chronology'}</span>
            </span>
            <h2 className="section-heading">
              {lang === 'np' ? 'सार्वजनिक सहभागिता तथा नीतिगत समयरेखा' : 'Public Engagement & Policy Timeline'}
            </h2>
          </div>

          <div className="chronological-media-timeline">
            {CHRONOLOGICAL_TIMELINE.map((item, idx) => (
              <div key={idx} className="timeline-event-card">
                <div className="timeline-badge-col">
                  <span className="timeline-year-pill">{lang === 'np' ? item.yearBs : item.yearAd}</span>
                  <span className="timeline-category-tag">{item.tag}</span>
                </div>
                <div className="timeline-content-col">
                  <h3 className="timeline-title">{lang === 'np' ? item.titleNp : item.titleEn}</h3>
                  <div className="timeline-court-badge">{item.badge}</div>
                  <p className="timeline-desc">{lang === 'np' ? item.descNp : item.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. SEARCHABLE & FILTERABLE MEDIA ARCHIVE
            ========================================================================= */}
        <section id="media-archive-section" className="media-archive-section" aria-label="Searchable Media Archive">
          <div className="archive-header-wrap">
            <div className="archive-title-box">
              <span className="section-eyebrow">
                <BookOpen size={14} className="text-crimson" />
                <span>{lang === 'np' ? 'अभिलेख' : 'Repository'}</span>
              </span>
              <h2 className="section-heading">
                {lang === 'np' ? 'मिडिया तथा सार्वजनिक संवाद अभिलेख' : 'Media & Public Discourse Archive'}
              </h2>
            </div>

            {/* Filter & Search Bar */}
            <div className="archive-control-bar">
              {/* Category Filter Pills */}
              <div className="archive-category-tabs" role="tablist" aria-label="Media Categories">
                {MEDIA_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`archive-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{lang === 'np' ? cat.labelNp : cat.labelEn}</span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="archive-search-box">
                <Search size={15} className="search-box-icon" />
                <input
                  type="text"
                  placeholder={lang === 'np' ? 'शीर्षक वा पत्रिका खोज्नुहोस्...' : 'Search by title, outlet or keyword...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="archive-search-input"
                  aria-label="Search Media Archive"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Media Cards Grid */}
          {filteredMedia.length > 0 ? (
            <div className="media-articles-grid">
              {filteredMedia.map((article) => (
                <article key={article.id} className="media-editorial-card">
                  <div className="editorial-card-top">
                    <span className="editorial-pub-badge">
                      {lang === 'np' ? article.publicationNp : article.publication}
                    </span>
                    <span className="editorial-category-badge">
                      {lang === 'np' ? article.categoryLabelNp : article.categoryLabelEn}
                    </span>
                  </div>

                  <div className="editorial-date-row">
                    <Calendar size={12} />
                    <span>{lang === 'np' ? article.dateBs : article.dateAd}</span>
                    {article.caseNumber && (
                      <span className="editorial-case-number">• {article.caseNumber}</span>
                    )}
                  </div>

                  <h3 className="editorial-card-title">
                    <button 
                      type="button" 
                      className="editorial-title-btn"
                      onClick={() => handleOpenArticleModal(article)}
                      title="Click to view detailed reference and summary"
                    >
                      {lang === 'np' ? article.titleNp : article.titleEn}
                    </button>
                  </h3>

                  <p className="editorial-card-summary">
                    {lang === 'np' ? article.summaryNp : article.summaryEn}
                  </p>

                  <div className="editorial-card-footer">
                    <div className="editorial-card-actions">
                      <button
                        type="button"
                        className="btn-read-brief"
                        onClick={() => handleOpenArticleModal(article)}
                      >
                        <FileText size={13} />
                        <span>{lang === 'np' ? 'विवरण' : 'Brief'}</span>
                      </button>

                      <a
                        href={article.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-original-link"
                        title="Open article in original publication / search verification"
                      >
                        <span>{lang === 'np' ? 'मूल समाचार →' : 'Read Article →'}</span>
                        <ArrowUpRight size={13} className="ext-arrow-icon" />
                      </a>
                    </div>
                  </div>

                  <div className="editorial-card-accent-bar" aria-hidden="true" />
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-archive-state">
              <BookOpen size={36} className="empty-icon" />
              <p>
                {lang === 'np'
                  ? 'चयन गरिएको वर्ग वा खोजमा कुनै सामग्री फेला परेन।'
                  : 'No media articles found matching the selected filter criteria.'}
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                {lang === 'np' ? 'सबै अभिलेख देखाउनुहोस्' : 'Reset All Filters'}
              </button>
            </div>
          )}
        </section>

      </div>

      {/* =========================================================================
          5. ARTICLE DETAILS & CASE BRIEF MODAL DIALOG
          ========================================================================= */}
      {activeArticleModal && (
        <div className="article-brief-modal-backdrop" onClick={handleCloseModal}>
          <div className="article-brief-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-strip">
              <div className="modal-pub-tag">
                <span className="pub-name">
                  {lang === 'np' ? activeArticleModal.publicationNp : activeArticleModal.publication}
                </span>
                <span className="pub-cat">
                  {lang === 'np' ? activeArticleModal.categoryLabelNp : activeArticleModal.categoryLabelEn}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-button"
                onClick={handleCloseModal}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-dialog-content">
              <div className="modal-date-strip">
                <Calendar size={13} />
                <span>{lang === 'np' ? activeArticleModal.dateBs : activeArticleModal.dateAd}</span>
                {activeArticleModal.caseNumber && (
                  <span className="modal-case-tag">• Reference: {activeArticleModal.caseNumber}</span>
                )}
              </div>

              <h3 className="modal-article-title">
                {lang === 'np' ? activeArticleModal.titleNp : activeArticleModal.titleEn}
              </h3>

              <div className="modal-summary-prose">
                <h4>{lang === 'np' ? 'संक्षिप्त विश्लेषण तथा सन्दर्भ:' : 'Analytical Summary & Context:'}</h4>
                <p>{lang === 'np' ? activeArticleModal.summaryNp : activeArticleModal.summaryEn}</p>
              </div>

              {activeArticleModal.tags && (
                <div className="modal-tags-row">
                  {activeArticleModal.tags.map((t, idx) => (
                    <span key={idx} className="modal-tag-pill">#{t}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-dialog-footer">
              <button
                type="button"
                className="modal-copy-btn"
                onClick={() => handleCopyCitation(activeArticleModal)}
              >
                {copiedCitation ? (
                  <>
                    <Check size={14} color="#16a34a" />
                    <span style={{ color: '#16a34a' }}>{lang === 'np' ? 'सन्दर्भ कपि भयो!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>{lang === 'np' ? 'सन्दर्भ कपि' : 'Copy Citation'}</span>
                  </>
                )}
              </button>

              <a
                href={activeArticleModal.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary modal-open-link"
              >
                <span>{lang === 'np' ? 'मूल समाचार हेर्नुहोस् ↗' : 'Open Original Publication ↗'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
