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
      </div>
    </div>
  );
}
