import React from 'react';
import PageHeader from '../components/PageHeader';
import { FileText, Download, Eye, ShieldCheck, Award, GraduationCap, Building2, MapPin, Mail, Phone, Printer } from 'lucide-react';
import NepalEmblem from '../components/NepalEmblem';
import { getPortfolioData } from '../data/portfolioData';

export default function CvPage({ onOpenResume, lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { curriculumVitae, personal, education, journey, publications } = portfolio;

  const handleDownload = () => {
    onOpenResume();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-chapter-view cv-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'विवरण (CV)' : 'Curriculum Vitae'}
        kicker={lang === 'np' ? 'व्यावसायिक अभिलेख' : 'Professional Archive · Official Record'}
        title={lang === 'np' ? 'व्यक्तिगत तथा सेवा विवरण (CV)' : 'Curriculum Vitae'}
        subtitle={lang === 'np'
          ? 'व्यावसायिक अनुभव, शैक्षिक पृष्ठभूमि, अनुसन्धानका रुचिहरू र सार्वजनिक सेवा यात्राको आधिकारिक विवरण।'
          : 'Professional experience, academic background, research interests and public-service journey.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        {/* CV Actions Bar */}
        <div className="cv-top-action-card">
          <div className="cv-action-info">
            <ShieldCheck size={20} className="text-gov-blue" />
            <div>
              <h3>{lang === 'np' ? 'आधिकारिक व्यक्तिगत विवरण' : 'Official Civil Service CV'}</h3>
              <p>{lang === 'np' ? 'प्रमाणित शैक्षिक योग्यता, तालिम तथा सेवा इतिहास' : 'Verified academic qualifications, training, and service trajectory'}</p>
            </div>
          </div>

          <div className="cv-action-buttons">
            <button
              type="button"
              className="button button-primary"
              onClick={onOpenResume}
            >
              <Eye size={14} />
              <span>{lang === 'np' ? 'अनलाइन CV हेर्नुहोस्' : 'VIEW CV ONLINE'}</span>
            </button>

            <button
              type="button"
              className="button button-secondary"
              onClick={handleDownload}
            >
              <Download size={14} />
              <span>{lang === 'np' ? 'CV डाउनलोड गर्नुहोस्' : 'DOWNLOAD CV'}</span>
            </button>
          </div>
        </div>

        {/* Formatted Full On-Page Curriculum Vitae Document */}
        <div className="cv-document-sheet">
          {/* Header */}
          <div className="cv-sheet-header">
            <div className="cv-sheet-left">
              <h2 className="cv-sheet-name">{personal.name}</h2>
              <div className="cv-sheet-rank">
                {lang === 'np' ? 'कर अधिकृत (राजपत्राङ्कित तृतीय श्रेणी)' : 'Tax Officer · Gazetted Third-Class Civil Servant'}
              </div>
              <div className="cv-sheet-dept">
                {lang === 'np' ? 'अर्थ मन्त्रालय, नेपाल सरकार' : 'Ministry of Finance · Government of Nepal'}
              </div>
            </div>
            <div className="cv-sheet-right">
              <NepalEmblem size={52} variant="full" />
            </div>
          </div>

          {/* Contact Strip */}
          <div className="cv-sheet-contact-strip">
            <span>{personal.email}</span>
            <span>•</span>
            <span>{personal.officialPhone} / {personal.personalPhone}</span>
            <span>•</span>
            <span>{personal.aside.office}</span>
          </div>

          {/* Executive Summary */}
          <section className="cv-sheet-section">
            <h3 className="cv-sheet-section-title">
              {lang === 'np' ? '१. कार्यकारी सारांश' : '1. Executive Profile'}
            </h3>
            <p className="cv-sheet-prose">{personal.heroParagraph}</p>
          </section>

          {/* Service History */}
          <section className="cv-sheet-section">
            <h3 className="cv-sheet-section-title">
              {lang === 'np' ? '२. सेवा वृत्ति तथा प्रशासनिक अनुभव' : '2. Professional Journey'}
            </h3>
            {journey.map((j, idx) => (
              <div key={idx} className="cv-sheet-item">
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role"><strong>{j.role}</strong> — {j.institution}</span>
                  <span className="cv-item-year">{j.period}</span>
                </div>
                <div className="cv-item-sub">{j.office} ({j.jurisdiction})</div>
                <p className="cv-item-summary">{j.overview}</p>
                <ul className="cv-resp-bullet-list">
                  {j.responsibilities.slice(0, 5).map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="cv-sheet-section">
            <h3 className="cv-sheet-section-title">
              {lang === 'np' ? '३. शैक्षिक योग्यता' : '3. Educational Background'}
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="cv-sheet-item">
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role"><strong>{edu.degree}</strong></span>
                  <span className="cv-item-year">{edu.year}</span>
                </div>
                <div className="cv-item-sub">{edu.institution}</div>
                <ul className="cv-resp-bullet-list">
                  {edu.highlights.map((hl, hIdx) => (
                    <li key={hIdx}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Publications */}
          <section className="cv-sheet-section">
            <h3 className="cv-sheet-section-title">
              {lang === 'np' ? '४. नीतिगत तथा प्राज्ञिक प्रकाशनहरू' : '4. Selected Publications'}
            </h3>
            {publications.slice(0, 4).map((pub, idx) => (
              <div key={idx} className="cv-pub-item">
                <span className="cv-pub-num">{idx + 1}.</span>
                <span className="cv-pub-cite">{pub.citation}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
