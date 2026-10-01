import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, Layers } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogData';

export default function ResearchPage({ lang = 'en' }) {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (selectedCategory !== 'All Articles' && post.category !== selectedCategory) {
        return false;
      }
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
    <div className="page-chapter-view research-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'अनुसन्धान' : 'Research & Writing'}
        kicker={lang === 'np' ? 'चौथो अध्याय' : 'Chapter 4 · Policy Thought & Analysis'}
        title={lang === 'np' ? 'अनुसन्धान, विचार तथा नीतिगत लेखन' : 'Research, Ideas & Writing'}
        subtitle={lang === 'np'
          ? 'नेपालको सार्वजनिक वित्त, राजस्व प्रशासन र विकासलाई प्रभाव पार्ने संस्थाहरू, नीतिहरू र विचारहरूको अन्वेषण।'
          : 'Exploring the institutions, policies and ideas that shape Nepal’s public finances and development.'}
        lang={lang}
      />

      <div className="container-wide chapter-content-body">
        {/* Research Control Bar */}
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
              placeholder={lang === 'np' ? 'लेखहरू खोज्नुहोस्...' : 'Search articles, keywords...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="research-search-input"
            />
          </div>
        </div>

        {/* Research Articles Grid */}
        {filteredPosts.length > 0 ? (
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

                <h2 className="article-card-title">
                  <Link to={`/research/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <div className="article-card-meta">
                  <span className="article-date">
                    <Calendar size={12} />
                    <span>{post.publishedDate}</span>
                  </span>
                </div>

                <p className="article-card-summary">{post.summary}</p>

                <div className="article-card-footer">
                  <Link to={`/research/${post.slug}`} className="read-more-btn">
                    <span>{lang === 'np' ? 'पूरा लेख पढ्नुहोस्' : 'Read Article'}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="article-card-accent-bar" />
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-content-state" style={{
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid rgba(12, 35, 64, 0.12)',
            borderRadius: '12px',
            padding: '54px 24px',
            textAlign: 'center',
            margin: '24px 0 40px',
            boxShadow: '0 4px 16px rgba(0, 35, 80, 0.04)'
          }}>
            <BookOpen size={40} className="text-gov-blue" style={{ margin: '0 auto 16px', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary, #0c2340)' }}>
              {lang === 'np' ? 'कुनै अनुसन्धान वा लेख सामग्री उपलब्ध छैन' : 'No Research Articles Currently Available'}
            </h3>
            <p style={{ color: 'var(--text-secondary, #475569)', maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem' }}>
              {lang === 'np' 
                ? 'अनुसन्धान, विचार तथा नीतिगत लेखन सामग्रीहरू छिट्टै अद्यावधिक गरिनेछ।' 
                : 'Research papers, commentary, and policy analyses will be updated soon.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

