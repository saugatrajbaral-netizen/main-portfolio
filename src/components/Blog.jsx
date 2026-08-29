import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Bookmark,
  Sparkles,
  ShieldCheck,
  Tag,
  Mail,
  CheckCircle2,
  Filter,
  X,
  FileSpreadsheet,
  Award,
  Layers,
  LayoutGrid,
  List,
  Scale,
  Calculator,
  Eye,
  ThumbsUp,
  Volume2,
  ChevronRight,
  TrendingUp,
  Landmark,
  FileText
} from 'lucide-react';
import { blogPosts, blogCategories, quickTaxRates } from '../data/blogData';
import BlogReaderModal from './BlogReaderModal';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Commentary');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'popular', 'quick'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // Quick Statutory Rates Tool Tab
  const [showRatesLookup, setShowRatesLookup] = useState(false);
  const [rateSearchQuery, setRateSearchQuery] = useState('');

  // Dispatch Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('srb_bookmarked_posts');
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  }, []);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem('srb_bookmarked_posts', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save bookmark', e);
      }
      return updated;
    });
  };

  const handleOpenReader = (post) => {
    setSelectedPost(post);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
  };

  // Filtered & Sorted posts logic
  const filteredPosts = useMemo(() => {
    let result = blogPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All Commentary' && post.category !== selectedCategory) {
        return false;
      }

      // Bookmarks filter
      if (showBookmarksOnly && !bookmarkedIds.includes(post.id)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesSubtitle = post.subtitle.toLowerCase().includes(query);
        const matchesSummary = post.summary.toLowerCase().includes(query);
        const matchesStatutory = (post.statutoryRef || '').toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const matchesTags = post.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSubtitle && !matchesSummary && !matchesStatutory && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortBy === 'quick') {
      result = [...result].sort((a, b) => parseInt(a.readTime, 10) - parseInt(b.readTime, 10));
    }

    return result;
  }, [selectedCategory, showBookmarksOnly, bookmarkedIds, searchQuery, sortBy]);

  // Filtered Tax Rates
  const filteredRates = useMemo(() => {
    if (!rateSearchQuery.trim()) return quickTaxRates;
    const query = rateSearchQuery.toLowerCase();
    return quickTaxRates.filter(
      (r) =>
        r.section.toLowerCase().includes(query) ||
        r.type.toLowerCase().includes(query) ||
        r.rate.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.note.toLowerCase().includes(query)
    );
  }, [rateSearchQuery]);

  const isDefaultView = selectedCategory === 'All Commentary' && !showBookmarksOnly && !searchQuery.trim() && sortBy === 'latest';
  const featuredPost = isDefaultView ? blogPosts.find((p) => p.featured) || blogPosts[0] : null;
  const regularPosts = isDefaultView ? filteredPosts.filter((p) => p.id !== featuredPost?.id) : filteredPosts;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterError('');
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <section id="blog" className="blog-section section-pad">
      {/* Decorative Top Accent Bar */}
      <div className="section-gov-accent-bar" aria-hidden="true"></div>

      <div className="container-wide">
        {/* Section Header & Subtitle */}
        <div className="blog-header-wrapper">
          <div className="blog-header-left">
            <div className="section-kicker">
              <span className="eyebrow">Publications & Legal Commentary</span>
            </div>
            <h2 className="section-title">
              Tax Governance, Fiscal Policy & <span style={{ color: 'var(--gov-blue)' }}>Legal Notes</span>
            </h2>
            <p className="section-lead">
              Official publications, statutory interpretations under the Income Tax & VAT Acts, digital revenue modernization case studies, and compliance advisories by Tax Officer Saugat Raj Baral.
            </p>
          </div>

          <div className="blog-header-right-action">
            <button
              type="button"
              className={`statutory-tool-toggle-btn ${showRatesLookup ? 'active' : ''}`}
              onClick={() => setShowRatesLookup(!showRatesLookup)}
            >
              <Calculator size={15} />
              <span>{showRatesLookup ? 'Close Statutory Lookup' : 'Quick Statutory TDS Lookup'}</span>
            </button>
          </div>
        </div>

        {/* Quick Statutory Rates Interactive Lookup Drawer */}
        {showRatesLookup && (
          <div className="statutory-rates-drawer">
            <div className="rates-drawer-header">
              <div className="rates-drawer-title">
                <Scale size={18} />
                <h3>Official Withholding (TDS) & Fiscal Rates Reference (Finance Act 2081/82)</h3>
              </div>
              <div className="rates-search-box">
                <Search size={14} />
                <input
                  type="text"
                  placeholder="Filter by section or payment type (e.g., Sec 88, Rent, VAT, Dividend)..."
                  value={rateSearchQuery}
                  onChange={(e) => setRateSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rates-table-wrapper">
              <table className="rates-table">
                <thead>
                  <tr>
                    <th>Statutory Clause</th>
                    <th>Payment / Transaction Description</th>
                    <th>Statutory Rate</th>
                    <th>Category</th>
                    <th>Administrative Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRates.map((rate, idx) => (
                    <tr key={idx}>
                      <td className="rate-section-cell">
                        <strong>{rate.section}</strong>
                      </td>
                      <td className="rate-type-cell">{rate.type}</td>
                      <td className="rate-badge-cell">
                        <span className="rate-badge">{rate.rate}</span>
                      </td>
                      <td className="rate-cat-cell">
                        <span className="rate-cat-tag">{rate.category}</span>
                      </td>
                      <td className="rate-note-cell">{rate.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Search, Sort, View Mode Toolbar */}
        <div className="blog-toolbar-container">
          <div className="blog-toolbar-top">
            {/* Live Search Input */}
            <div className="blog-search-box">
              <Search size={16} className="blog-search-icon" />
              <input
                type="text"
                className="blog-search-input"
                placeholder="Search commentary, statutory sections, tags (e.g. TDS, Section 88, VAT, CBMS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="blog-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="blog-sort-group">
              <label htmlFor="blog-sort-select">Sort:</label>
              <select
                id="blog-sort-select"
                className="blog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest Publications</option>
                <option value="popular">Most Endorsed</option>
                <option value="quick">Quick Reads</option>
              </select>
            </div>

            {/* View Mode (Grid vs List) */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
                aria-label="List View"
              >
                <List size={15} />
              </button>
            </div>

            {/* Bookmarks Toggle Filter */}
            <button
              type="button"
              className={`bookmark-filter-btn ${showBookmarksOnly ? 'active' : ''}`}
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              title="Filter by saved articles"
            >
              <Bookmark size={14} fill={showBookmarksOnly ? 'currentColor' : 'none'} />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="blog-categories-pills">
            {blogCategories.map((cat) => {
              const count = cat === 'All Commentary'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCategory === cat && !showBookmarksOnly ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowBookmarksOnly(false);
                  }}
                >
                  <span>{cat}</span>
                  <span className="category-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {(searchQuery || selectedCategory !== 'All Commentary' || showBookmarksOnly || sortBy !== 'latest') && (
          <div className="active-filter-banner">
            <span>
              Displaying <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'publication' : 'publications'}
              {selectedCategory !== 'All Commentary' && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
              {showBookmarksOnly && ' from your saved list'}
              {sortBy !== 'latest' && ` (Sorted by ${sortBy === 'popular' ? 'endorsements' : 'reading time'})`}
            </span>
            <button
              type="button"
              className="clear-all-filters-btn"
              onClick={() => {
                setSelectedCategory('All Commentary');
                setSearchQuery('');
                setShowBookmarksOnly(false);
                setSortBy('latest');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Featured Lead Editorial Card (Displayed when on All Commentary default view) */}
        {featuredPost && (
          <div className="featured-blog-card">
            <div className="featured-card-badge-row">
              <span className="featured-pill">
                <Sparkles size={12} />
                Lead Officer Editorial
              </span>
              <span className="featured-category">{featuredPost.category}</span>
              <span className="featured-stats-pill">
                <ThumbsUp size={11} /> {featuredPost.likesCount} Endorsements
              </span>
            </div>

            <div className="featured-content-grid">
              <div className="featured-text-col">
                <h3
                  className="featured-title"
                  onClick={() => handleOpenReader(featuredPost)}
                >
                  {featuredPost.title}
                </h3>
                <p className="featured-subtitle">{featuredPost.subtitle}</p>

                {featuredPost.statutoryRef && (
                  <div className="featured-statutory">
                    <ShieldCheck size={14} />
                    <span>{featuredPost.statutoryRef}</span>
                  </div>
                )}

                <div className="featured-meta">
                  <span>
                    <Calendar size={13} />
                    {featuredPost.publishedDate}
                  </span>
                  <span>
                    <Clock size={13} />
                    {featuredPost.readTime}
                  </span>
                  <span>
                    <Volume2 size={13} />
                    Audio Brief Available
                  </span>
                </div>
              </div>

              <div className="featured-action-box">
                <div className="featured-summary-preview">
                  <strong>Key Takeaways:</strong> {featuredPost.summary}
                </div>

                <div className="featured-button-row">
                  <button
                    type="button"
                    className="button button-primary featured-read-btn"
                    onClick={() => handleOpenReader(featuredPost)}
                  >
                    <span>Read Full Analysis</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    className={`card-bookmark-btn ${bookmarkedIds.includes(featuredPost.id) ? 'bookmarked' : ''}`}
                    onClick={() => handleToggleBookmark(featuredPost.id)}
                    title={bookmarkedIds.includes(featuredPost.id) ? 'Remove bookmark' : 'Save article'}
                    aria-label="Bookmark article"
                  >
                    <Bookmark size={16} fill={bookmarkedIds.includes(featuredPost.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid / List View */}
        {filteredPosts.length === 0 ? (
          <div className="blog-empty-state">
            <BookOpen size={44} className="empty-icon" />
            <h3>No Commentary Found</h3>
            <p>No tax policy articles matched your specific search criteria or active filters.</p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setSelectedCategory('All Commentary');
                setSearchQuery('');
                setShowBookmarksOnly(false);
                setSortBy('latest');
              }}
            >
              View All Commentary
            </button>
          </div>
        ) : (
          <div className={`blog-items-container ${viewMode === 'list' ? 'blog-list-layout' : 'blog-grid-layout'}`}>
            {regularPosts.map((post) => {
              const isSaved = bookmarkedIds.includes(post.id);

              return (
                <article
                  key={post.id}
                  className={`blog-card ${viewMode === 'list' ? 'blog-card-horizontal' : ''}`}
                >
                  <div className="blog-card-top">
                    <span className="blog-card-category">{post.category}</span>
                    <button
                      type="button"
                      className={`card-bookmark-btn ${isSaved ? 'bookmarked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(post.id);
                      }}
                      title={isSaved ? 'Remove bookmark' : 'Bookmark this article'}
                      aria-label="Bookmark article"
                    >
                      <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <h3
                    className="blog-card-title"
                    onClick={() => handleOpenReader(post)}
                  >
                    {post.title}
                  </h3>

                  <p className="blog-card-summary">{post.summary}</p>

                  {post.statutoryRef && (
                    <div className="blog-card-statutory">
                      <ShieldCheck size={12} />
                      <span className="statutory-text" title={post.statutoryRef}>
                        {post.statutoryRef}
                      </span>
                    </div>
                  )}

                  <div className="blog-card-tags">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="card-tag">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="card-tag-more">+{post.tags.length - 3}</span>
                    )}
                  </div>

                  <div className="blog-card-footer">
                    <div className="card-footer-meta">
                      <span>{post.publishedDate}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span className="card-likes-count">
                        <ThumbsUp size={10} /> {post.likesCount}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="read-article-link"
                      onClick={() => handleOpenReader(post)}
                    >
                      <span>Read Note</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Policy Dispatch / Subscription Box */}
        <div className="policy-dispatch-box">
          <div className="dispatch-inner">
            <div className="dispatch-info">
              <div className="dispatch-badge">
                <Mail size={13} />
                <span>Inland Revenue Policy Dispatch</span>
              </div>
              <h3 className="dispatch-title">
                Receive Tax Governance & Fiscal Policy Briefings
              </h3>
              <p className="dispatch-desc">
                Periodic digests covering Gazetted tax notifications, annual Finance Act changes, e-TDS directives, and administrative review guidelines published by the Inland Revenue framework.
              </p>
            </div>

            <div className="dispatch-form-container">
              {newsletterSubscribed ? (
                <div className="dispatch-success">
                  <CheckCircle2 size={24} style={{ color: '#10b981' }} />
                  <div>
                    <strong>Subscription Confirmed</strong>
                    <p>You have been enrolled in official tax policy commentary updates.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="dispatch-form">
                  <div className="dispatch-input-group">
                    <input
                      type="email"
                      placeholder="Enter official / corporate email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="dispatch-input"
                      required
                    />
                    <button type="submit" className="button button-crimson dispatch-btn">
                      Subscribe to Briefings
                    </button>
                  </div>
                  {newsletterError && <p className="dispatch-error">{newsletterError}</p>}
                  <span className="dispatch-privacy">
                    Official public service briefings. Strict confidentiality; no commercial solicitations.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Reader Modal */}
      <BlogReaderModal
        post={selectedPost}
        isOpen={isReaderOpen}
        onClose={handleCloseReader}
        isBookmarked={selectedPost ? bookmarkedIds.includes(selectedPost.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSelectArticle={(newPost) => setSelectedPost(newPost)}
      />
    </section>
  );
}
