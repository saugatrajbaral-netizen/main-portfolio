import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, ExternalLink, ShieldCheck, Award, GraduationCap, Building } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function CurriculumVitae({ onOpenResume, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { curriculumVitae, personal } = portfolio;

  return (
    <section id="cv" className="cv-editorial-section section-pad">
      <div className="container-narrow">
        <div className="cv-editorial-card">
          <div className="cv-card-top-accent" />
          
          <div className="cv-card-body">
            <div className="cv-badge">
              <ShieldCheck size={16} />
              <span>{lang === 'np' ? 'आधिकारिक व्यक्तिगत विवरण' : 'Official Curriculum Vitae'}</span>
            </div>

            <h2 className="cv-title">{curriculumVitae.title}</h2>
            <p className="cv-subtitle">{curriculumVitae.subtitle}</p>

            <div className="cv-summary-box">
              <p>{curriculumVitae.summary}</p>
            </div>

            <div className="cv-key-pillars">
              <div className="pillar-item">
                <Building size={16} className="pillar-icon" />
                <span>{lang === 'np' ? 'राजस्व तथा सार्वजनिक प्रशासन' : 'Revenue & Public Administration'}</span>
              </div>
              <div className="pillar-item">
                <GraduationCap size={16} className="pillar-icon" />
                <span>{lang === 'np' ? 'वित्त तथा कानुनमा उच्च शिक्षा' : 'Finance & Legal Scholarship'}</span>
              </div>
              <div className="pillar-item">
                <Award size={16} className="pillar-icon" />
                <span>{lang === 'np' ? 'लोक सेवा आयोगबाट सिफारिस' : 'PSC Appointed Cadre'}</span>
              </div>
            </div>

            <div className="cv-actions-row">
              <button
                type="button"
                className="button button-primary cv-btn"
                onClick={onOpenResume}
              >
                <Eye size={16} />
                <span>{lang === 'np' ? 'अनलाइन CV हेर्नुहोस्' : 'View CV Online'}</span>
              </button>

              <a
                href="/saugat-raj-baral-cv.pdf"
                download="Saugat-Raj-Baral-CV.pdf"
                className="button button-secondary cv-btn"
              >
                <Download size={16} />
                <span>{lang === 'np' ? 'CV डाउनलोड गर्नुहोस् (PDF)' : 'Download CV (PDF)'}</span>
              </a>

              <Link
                to="/cv"
                className="button button-secondary cv-btn cv-fullpage-link"
              >
                <FileText size={16} />
                <span>{lang === 'np' ? 'पूर्ण CV पृष्ठ' : 'Full CV Page'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
