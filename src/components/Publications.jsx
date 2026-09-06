import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function Publications({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { publications } = portfolio;
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCitation = (id, citation) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="publications" className="publications-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'प्रकाशन तथा शोध' : 'Scholarly Bibliography'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>नीतिगत तथा प्राज्ञिक <span className="text-accent">प्रकाशनहरू</span></>
            ) : (
              <>Academic & Policy <span className="text-accent">Publications</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'नेपालको सार्वजनिक वित्त, राजस्व कानुन, विद्युतीय कर प्रणाली र वित्तीय संघीयताबारे प्रकाशित कार्यपत्र, नीतिगत प्रतिवेदन तथा अनुसन्धानमूलक लेखहरू।'
              : 'Working papers, policy briefs, institutional reports, and symposium presentations on fiscal reform, revenue administration, and tax jurisprudence in Nepal.'}
          </p>
        </div>



        {/* Editorial Bibliography List */}
        <div className="bibliography-list">
          {publications.map((pub, idx) => (
            <article key={pub.id || idx} className="bibliography-item">
              <div className="bibliography-meta-col">
                <span className="pub-year">{pub.year}</span>
                <span className="pub-category-tag">{pub.category}</span>
                <span className="pub-type">{pub.type}</span>
              </div>

              <div className="bibliography-content-col">
                <h3 className="pub-title">{pub.title}</h3>
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
                        <Check size={13} color="#16a34a" />
                        <span style={{ color: '#16a34a' }}>{lang === 'np' ? 'कपि भयो' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>{lang === 'np' ? 'उद्धरण कपि' : 'Copy Citation'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bibliography-action-col">
                <a
                  href="#research"
                  className="button-editorial-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('research') || document.getElementById('blog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <FileText size={14} />
                  <span>{lang === 'np' ? 'पूर्ण पाठ पढ्नुहोस्' : 'Read Article'}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
