import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { FileText, Copy, Check, Download, ExternalLink, BookMarked } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function PublicationsPage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { publications } = portfolio;
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCitation = (id, citation) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="page-chapter-view publications-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'प्रकाशनहरू' : 'Publications'}
        kicker={lang === 'np' ? 'पाँचौं अध्याय' : 'Chapter 5 · Scholarly Bibliography'}
        title={lang === 'np' ? 'नीतिगत तथा प्राज्ञिक प्रकाशनहरू' : 'Publications & Working Papers'}
        subtitle={lang === 'np'
          ? 'नेपालको सार्वजनिक वित्त, राजस्व कानुन, विद्युतीय कर प्रणाली र वित्तीय संघीयताबारे प्रकाशित कार्यपत्र, प्रतिवेदन तथा अनुसन्धानमूलक लेखहरू।'
          : 'Scholarly working papers, policy briefs, institutional reports, and symposium presentations on fiscal reform and tax administration.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        {publications && publications.length > 0 ? (
          <div className="bibliography-list">
            {publications.map((pub, idx) => (
              <article key={pub.id || idx} className="bibliography-item">
                <div className="bibliography-meta-col">
                  <span className="pub-year">{pub.year}</span>
                  <span className="pub-category-tag">{pub.category}</span>
                  <span className="pub-type">{pub.type}</span>
                </div>

                <div className="bibliography-content-col">
                  <h2 className="pub-title">{pub.title}</h2>
                  <div className="pub-publisher">{pub.publisher}</div>
                  <p className="pub-desc">{pub.description}</p>
                  
                  <div className="pub-citation-box">
                    <code>{pub.citation}</code>
                    <button
                      type="button"
                      className="copy-citation-btn"
                      onClick={() => handleCopyCitation(pub.id, pub.citation)}
                      title="Copy APA Citation"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check size={12} color="#16a34a" />
                          <span style={{ color: '#16a34a' }}>{lang === 'np' ? 'कपि भयो' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>{lang === 'np' ? 'उद्धरण कपि' : 'Copy Citation'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bibliography-action-col">
                  <Link
                    to="/research"
                    className="button-editorial-link"
                  >
                    <FileText size={13} />
                    <span>{lang === 'np' ? 'पूर्ण पाठ पढ्नुहोस्' : 'Read Article'}</span>
                  </Link>
                </div>
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
            <BookMarked size={40} className="text-gov-blue" style={{ margin: '0 auto 16px', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary, #0c2340)' }}>
              {lang === 'np' ? 'कुनै प्रकाशनहरू उपलब्ध छैनन्' : 'No Publications Currently Available'}
            </h3>
            <p style={{ color: 'var(--text-secondary, #475569)', maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem' }}>
              {lang === 'np' 
                ? 'नीतिगत कार्यपत्र, प्रतिवेदन तथा प्रकाशनहरू छिट्टै अद्यावधिक गरिनेछ।' 
                : 'Scholarly working papers, policy briefs, and publications will be updated soon.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

