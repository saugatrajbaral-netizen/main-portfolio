import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  Layers,
  Sparkles,
  TrendingUp,
  Tag,
  Share2,
  FileText
} from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogData';
import BlogReaderModal from './BlogReaderModal';

export default function Blog({ lang = 'en' }) {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const handleOpenReader = (post) => {
    setSelectedPost(post);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
  };

  // Filtered posts logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All Articles' && post.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inSummary = post.summary.toLowerCase().includes(q);
        const inTags = post.tags && post.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="research" className="research-editorial-section section-pad">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'अनुसन्धान तथा विचार' : 'Policy Thought & Analysis'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>अनुसन्धान, विचार तथा <span className="text-accent">लेखन</span></>
            ) : (
              <>Research, Ideas & <span className="text-accent">Writing</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'नेपालको सार्वजनिक वित्त, राजस्व प्रशासन र विकासलाई प्रभाव पार्ने संस्थाहरू, नीतिहरू र विचारहरूको अन्वेषण।'
              : 'Exploring the institutions, policies and ideas that shape Nepal\'s public finances and development.'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="research-control-bar">
          <div className="research-categories">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="research-search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder={lang === 'np' ? 'लेखहरू खोज्नुहोस्...' : 'Search articles, topics, keywords...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="research-search-input"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="research-cards-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="research-article-card">
              <div className="article-card-top">
                <span className="article-category-badge">{post.category}</span>
                <span className="article-read-time">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h3 className="article-card-title" onClick={() => handleOpenReader(post)}>
                {post.title}
              </h3>

              <div className="article-card-meta">
                <span className="article-date">
                  <Calendar size={12} />
                  <span>{post.publishedDate}</span>
                </span>
              </div>

              <p className="article-card-summary">{post.summary}</p>

              <div className="article-card-footer">
                <button
                  type="button"
                  className="read-more-btn"
                  onClick={() => handleOpenReader(post)}
                >
                  <span>{lang === 'np' ? 'पूरा लेख पढ्नुहोस्' : 'Read More'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="article-card-accent-bar" />
            </article>
          ))}
        </div>
      </div>

      {/* Full-Screen Reading Modal */}
      {selectedPost && (
        <BlogReaderModal
          post={selectedPost}
          isOpen={isReaderOpen}
          onClose={handleCloseReader}
        />
      )}
    </section>
  );
}
