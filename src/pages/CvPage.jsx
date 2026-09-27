import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { 
  FileText, Download, Eye, ShieldCheck, Award, GraduationCap, 
  Building2, MapPin, Mail, Phone, Printer, Globe, Briefcase, 
  BookOpen, Sparkles, CheckCircle2, Compass, Layers, ExternalLink
} from 'lucide-react';
import NepalEmblem from '../components/NepalEmblem';
import { getPortfolioData } from '../data/portfolioData';

export default function CvPage({ onOpenResume, lang = 'en' }) {
  const [viewMode, setViewMode] = useState('document'); // 'document' | 'pdf'
  const portfolio = getPortfolioData(lang);
  const { curriculumVitae, personal } = portfolio;
  const cv = curriculumVitae;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-chapter-view cv-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'व्यक्तिगत विवरण (CV)' : 'Curriculum Vitae'}
        kicker={lang === 'np' ? 'व्यावसायिक अभिलेख' : 'Professional Archive · Official Record'}
        title={lang === 'np' ? 'व्यक्तिगत तथा सेवा विवरण (CV)' : 'Curriculum Vitae'}
        subtitle={lang === 'np'
          ? 'नेपाल सरकारको कर अधिकृत तथा सार्वजनिक वित्त विश्लेषक सौगात राज बरालको आधिकारिक व्यक्तिगत तथा सेवा विवरण।'
          : 'Official curriculum vitae of Saugat Raj Baral, Tax Officer & Public Finance Professional, Government of Nepal.'}
        lang={lang}
      />

      <div className="container-narrow chapter-content-body">
        {/* CV Actions Bar */}
        <div className="cv-top-action-card">
          <div className="cv-action-info">
            <ShieldCheck size={24} className="text-gov-blue" />
            <div>
              <h3>{lang === 'np' ? 'आधिकारिक व्यक्तिगत तथा सेवा विवरण' : 'Official Civil Service Curriculum Vitae'}</h3>
              <p>{lang === 'np' ? 'प्रमाणित शैक्षिक योग्यता, तालिम, सेवा इतिहास र व्यावसायिक अनुभव' : 'Verified credentials, service trajectory, professional trainings and international exposure'}</p>
            </div>
          </div>

          <div className="cv-action-buttons">
            {/* View Mode Toggle */}
            <div className="cv-view-toggle">
              <button
                type="button"
                className={`button ${viewMode === 'document' ? 'button-primary' : 'button-secondary'}`}
                onClick={() => setViewMode('document')}
              >
                <FileText size={14} />
                <span>{lang === 'np' ? 'दस्तावेज ढाँचा' : 'Document View'}</span>
              </button>
              <button
                type="button"
                className={`button ${viewMode === 'pdf' ? 'button-primary' : 'button-secondary'}`}
                onClick={() => setViewMode('pdf')}
              >
                <Eye size={14} />
                <span>{lang === 'np' ? 'मूल PDF हेर्नुहोस्' : 'Official PDF View'}</span>
              </button>
            </div>

            {/* Direct Download Link */}
            <a
              href="/saugat-raj-baral-cv.pdf"
              download="Saugat-Raj-Baral-CV.pdf"
              className="button button-primary cv-download-action-btn"
            >
              <Download size={14} />
              <span>{lang === 'np' ? 'CV डाउनलोड (PDF)' : 'DOWNLOAD CV (PDF)'}</span>
            </a>

            {/* Print Button */}
            <button
              type="button"
              className="button button-secondary"
              onClick={handlePrint}
              title={lang === 'np' ? 'प्रिन्ट गर्नुहोस्' : 'Print CV'}
            >
              <Printer size={14} />
              <span>{lang === 'np' ? 'प्रिन्ट' : 'Print'}</span>
            </button>
          </div>
        </div>

        {/* View Mode: Live PDF Reader */}
        {viewMode === 'pdf' ? (
          <div className="cv-pdf-viewer-card">
            <div className="cv-pdf-viewer-bar">
              <div className="pdf-bar-left">
                <FileText size={16} className="text-accent" />
                <span><strong>saugat-raj-baral-cv.pdf</strong> (Official 3-Page Document)</span>
              </div>
              <div className="pdf-bar-right">
                <a
                  href="/saugat-raj-baral-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-open-ext-link"
                >
                  <ExternalLink size={13} />
                  <span>{lang === 'np' ? 'नयाँ ट्याबमा खोल्नुहोस्' : 'Open in New Tab'}</span>
                </a>
              </div>
            </div>
            <iframe
              src="/saugat-raj-baral-cv.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
              title="Saugat Raj Baral Official CV PDF"
              className="cv-pdf-frame"
            />
          </div>
        ) : (
          /* View Mode: Formatted Full On-Page Curriculum Vitae Document */
          <div className="cv-document-sheet">
            {/* Header */}
            <div className="cv-sheet-header">
              <div className="cv-sheet-left">
                <h1 className="cv-sheet-name">{personal.name}</h1>
                <div className="cv-sheet-rank">
                  {lang === 'np' ? 'कर अधिकृत | नेपाल सरकार | सार्वजनिक वित्त तथा आर्थिक नीति' : 'Tax Officer | Government of Nepal | Public Finance & Economic Policy'}
                </div>
                <div className="cv-sheet-dept">
                  {lang === 'np' ? 'पोखरा-१७, बिराउटा, नेपाल' : 'Pokhara-17, Birauta, Nepal'}
                </div>
              </div>
              <div className="cv-sheet-right">
                <NepalEmblem size={56} variant="full" />
              </div>
            </div>

            {/* Contact Strip */}
            <div className="cv-sheet-contact-strip">
              <span><strong>Phone:</strong> {personal.officialPhone}</span>
              <span>•</span>
              <span><strong>Email:</strong> <a href={`mailto:${personal.email}`}>{personal.email}</a></span>
              <span>•</span>
              <span><strong>Apolitical:</strong> Saugat Raj Baral</span>
            </div>

            {/* Section 1: Professional Profile */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '१. व्यावसायिक पार्श्वचित्र (PROFESSIONAL PROFILE)' : 'PROFESSIONAL PROFILE'}
              </h2>
              <div className="cv-sheet-prose-block">
                {cv.professionalProfile ? (
                  cv.professionalProfile.map((p, idx) => (
                    <p key={idx} className="cv-sheet-prose" style={{ marginBottom: '10px' }}>{p}</p>
                  ))
                ) : (
                  <p className="cv-sheet-prose">{personal.heroParagraph}</p>
                )}
              </div>
            </section>

            {/* Section 2: Professional Experience */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '२. व्यावसायिक अनुभव (PROFESSIONAL EXPERIENCE)' : 'PROFESSIONAL EXPERIENCE'}
              </h2>
              
              {/* Role 1: Tax Officer */}
              <div className="cv-sheet-item">
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role">
                    <strong>{lang === 'np' ? 'कर अधिकृत' : 'Tax Officer'}</strong> | {lang === 'np' ? 'अर्थ मन्त्रालय, नेपाल सरकार' : 'Ministry of Finance, Government of Nepal'}
                  </span>
                  <span className="cv-item-year">2024–Present</span>
                </div>
                <ul className="cv-resp-bullet-list">
                  <li>{lang === 'np' ? 'करदाता सेवा, कर संकलन, कर परीक्षण तथा अनुसन्धान शाखामा रही मूल्य अभिवृद्धि कर (VAT), आयकर र अन्तःशुल्क प्रशासन सम्पादन।' : 'Serve across Taxpayer Services, Tax Collection, Audit & Investigation, with practical experience in VAT, Income Tax and Excise administration.'}</li>
                  <li>{lang === 'np' ? 'सरकारी राजस्व नीतिहरूको कार्यान्वयन, आन्तरिक राजस्व परिचालन, कर परिपालना तथा वित्तीय दिगोपनामा योगदान।' : 'Support the implementation of government revenue policies and contribute to domestic revenue mobilization, tax compliance and fiscal sustainability.'}</li>
                  <li>{lang === 'np' ? 'नेपालका विभिन्न जिल्लाहरूमा करदाता शिक्षा तथा जनचेतना कार्यक्रमहरूको सञ्चालन तथा सहजीकरण।' : 'Conduct and facilitate taxpayer education and public outreach programs across multiple districts of Nepal, engaging taxpayers, businesses and other stakeholders.'}</li>
                  <li>{lang === 'np' ? 'जटिल वित्तीय तथा कर नीतिहरूलाई सरल र प्रभावकारी सञ्चार मार्फत बुझाइ र ऐच्छिक कर परिपालनामा सहजीकरण।' : 'Translate complex fiscal and tax policies into accessible communication, strengthening understanding, voluntary compliance and constructive government–stakeholder relations.'}</li>
                  <li>{lang === 'np' ? 'करदाता तथा राजस्व तथ्याङ्क विश्लेषण गरी प्रमाणमा आधारित कर प्रशासन तथा अनुपालन पहलहरूमा सहयोग।' : 'Analyze taxpayer and revenue information and contribute to evidence-based tax administration and compliance initiatives.'}</li>
                </ul>
              </div>

              {/* Role 2: Administrative Officer */}
              <div className="cv-sheet-item" style={{ marginTop: '16px' }}>
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role">
                    <strong>{lang === 'np' ? 'अधिकृत सातौं तह' : 'Administrative Officer, 7th Level'}</strong> | {lang === 'np' ? 'आर्थिक मामिला तथा योजना मन्त्रालय, गण्डकी प्रदेश' : 'Ministry of Economic Affairs, Gandaki Province'}
                  </span>
                  <span className="cv-item-year">{lang === 'np' ? '४ महिना' : '4 Months'}</span>
                </div>
                <ul className="cv-resp-bullet-list">
                  <li>{lang === 'np' ? 'बजेट तथा योजना शाखामा रही प्रादेशिक बजेट तर्जुमा, कार्यक्रम योजना र सार्वजनिक वित्तीय व्यवस्थापनमा कार्य।' : 'Worked in the Budget and Planning Section, supporting provincial budget formulation, program planning and public financial management.'}</li>
                  <li>{lang === 'np' ? 'सरकारी योजना, वित्तीय विश्लेषण र प्रादेशिक कार्यक्रमहरूको कार्यान्वयनमा योगदान।' : 'Contributed to government planning, financial analysis and implementation of provincial programs.'}</li>
                </ul>
              </div>
            </section>

            {/* Section 3: Education */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '३. शैक्षिक योग्यता (EDUCATION)' : 'EDUCATION'}
              </h2>
              
              <div className="cv-sheet-item">
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role">
                    <strong>{lang === 'np' ? 'व्यापार प्रशासनमा स्नातक (BBA) — फाइनान्स' : 'Bachelor of Business Administration — Finance'}</strong>
                  </span>
                  <span className="cv-item-year">2021</span>
                </div>
                <div className="cv-item-sub">
                  {lang === 'np' ? 'पोखरा विश्वविद्यालय | ला ग्रान्डे इन्टरनेसनल कलेज' : 'Pokhara University | La Grande International College'}
                </div>
                <div className="cv-item-grade">
                  <strong>GPA: 3.95/4.00</strong> — {lang === 'np' ? 'डीन्स लिस्ट विशिष्टता, कलेज टपर तथा शीर्ष १% उत्कृष्ट नतिजा' : "Dean's List distinction, college-topper and among the top 1% of graduates"}
                </div>
              </div>

              <div className="cv-sheet-item" style={{ marginTop: '14px' }}>
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role">
                    <strong>{lang === 'np' ? 'उच्च माध्यमिक शिक्षा (+२), विज्ञान' : 'Higher Secondary Education (+2), Science'}</strong>
                  </span>
                  <span className="cv-item-year">HSEB, Nepal</span>
                </div>
                <div className="cv-item-grade">
                  <strong>{lang === 'np' ? 'प्रथम श्रेणी' : 'First Division'}</strong>
                </div>
              </div>

              <div className="cv-sheet-item" style={{ marginTop: '14px' }}>
                <div className="cv-sheet-item-row">
                  <span className="cv-item-role">
                    <strong>{lang === 'np' ? 'प्रवेशिका परीक्षा (SLC)' : 'School Leaving Certificate (SLC)'}</strong>
                  </span>
                  <span className="cv-item-year">{lang === 'np' ? 'नेपाल सरकार' : 'Government of Nepal'}</span>
                </div>
                <div className="cv-item-grade">
                  <strong>{lang === 'np' ? 'विशिष्ट श्रेणी (Distinction Division)' : 'Distinction Division'}</strong>
                </div>
              </div>
            </section>

            {/* Section 4: Professional Training & Development */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '४. व्यावसायिक तालिम तथा विकास (PROFESSIONAL TRAINING & DEVELOPMENT)' : 'PROFESSIONAL TRAINING & DEVELOPMENT'}
              </h2>
              <ul className="cv-resp-bullet-list">
                <li>
                  <strong>{lang === 'np' ? 'युनुस सेन्टर इमर्सन प्रोग्राम' : 'Yunus Center Immersion Program'}</strong> — {lang === 'np' ? '१ महिना ढाका, बंगलादेश' : '1 Month Dhaka, Bangladesh'}
                  <div className="cv-sub-desc" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {lang === 'np' ? 'सामाजिक व्यवसाय, उद्यमशीलता र दिगो विकास प्रारूप सम्बन्धी विशेष अध्ययन।' : 'Specialized exposure to social business, entrepreneurship and sustainable development frameworks.'}
                  </div>
                </li>
                <li>
                  <strong>{lang === 'np' ? 'आधारभूत प्रशासनिक तालिम' : 'Basic Administrative Training'}</strong> — {lang === 'np' ? '४ महिना, नेपाल प्रशासनिक प्रशिक्षण प्रतिष्ठान (NASC), काठमाडौं, नेपाल।' : '4 Months, Nepal Administrative Staff College (NASC), Kathmandu, Nepal.'}
                </li>
                <li>
                  <strong>{lang === 'np' ? 'नवनियुक्त प्रादेशिक अधिकृतहरूका लागि अभिमुखीकरण तालिम' : 'Induction Training for Newly Appointed Provincial Officers'}</strong> — {lang === 'np' ? 'गण्डकी प्रदेश प्रशिक्षण प्रतिष्ठान (GPTA), पोखरा, नेपाल।' : 'Gandaki Province Training Academy (GPTA), Pokhara, Nepal.'}
                </li>
                <li>
                  <strong>{lang === 'np' ? 'सार्वजनिक वित्तीय व्यवस्थापन तालिम' : 'Public Financial Management Training'}</strong> — {lang === 'np' ? 'PFMTC, काठमाडौं।' : 'PFMTC, Kathmandu'}
                </li>
                <li>
                  <strong>{lang === 'np' ? 'पर्वतारोहण सम्पर्क अधिकृत तालिम' : 'Mountain Liaison Officer Training'}</strong> — {lang === 'np' ? 'नेपाल पर्यटन तथा होटल व्यवस्थापन प्रतिष्ठान (NATHM)।' : 'Nepal Academy of Tourism and Hotel Management (NATHM)'}
                </li>
                <li>
                  {lang === 'np'
                    ? 'कर प्रशासन, राजस्व नीति, वित्तीय नीति, सार्वजनिक वित्त र समसामयिक आर्थिक विषयमा विभिन्न राष्ट्रिय/अन्तर्राष्ट्रिय गोष्ठी, सम्मेलन र कार्यशालाहरूमा सहभागिता।'
                    : 'Participated in seminars, conferences, workshops and professional forums on tax administration, revenue policy, fiscal policy, public finance and contemporary economic issues.'}
                </li>
              </ul>
            </section>

            {/* Section 5: International & Professional Exposure */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '५. अन्तर्राष्ट्रिय तथा व्यावसायिक अनुभव (INTERNATIONAL & PROFESSIONAL EXPOSURE)' : 'INTERNATIONAL & PROFESSIONAL EXPOSURE'}
              </h2>
              <ul className="cv-resp-bullet-list">
                <li>
                  {lang === 'np'
                    ? 'युरोप र एसियाका १५ भन्दा बढी देशहरूमा अन्तर्राष्ट्रिय भ्रमण तथा अध्ययन अनुभव, जसले विविध आर्थिक, सामाजिक र संस्थागत वातावरण बुझ्न सघाएको छ।'
                    : 'International exposure across 15 countries in Europe and Asia, providing first-hand exposure to diverse economic, social and institutional environments.'}
                </li>
                <li>
                  {lang === 'np'
                    ? 'करदाता, व्यवसायी, व्यावसायिक सरोकारवाला र सरकारी निकायहरूसँग निरन्तर नीतिगत संवाद, सार्वजनिक आउटरिच र सरकारी कार्यक्रम सहजीकरण।'
                    : 'Regular engagement with taxpayers, businesses, professional stakeholders and government institutions through public outreach, policy communication and government programs.'}
                </li>
              </ul>
            </section>

            {/* Section 6: Core Competencies */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '६. मुख्य कार्यकुशलता तथा विशेषज्ञता (CORE COMPETENCIES)' : 'CORE COMPETENCIES'}
              </h2>
              <div className="cv-competencies-grid">
                {(cv.coreCompetencies || [
                  "Public Finance & Revenue Policy", "Economic Policy", "Tax Administration", 
                  "Budget & Planning", "Economic Diplomacy", "Trade & Investment", 
                  "Stakeholder Engagement", "Government Relations", "Policy Implementation", 
                  "Financial Analysis", "Public Communication"
                ]).map((comp, idx) => (
                  <span key={idx} className="cv-competency-pill">
                    {comp}
                  </span>
                ))}
              </div>
            </section>

            {/* Section 7: Languages & Digital Skills */}
            <section className="cv-sheet-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '७. भाषा तथा डिजिटल सीप (LANGUAGES & DIGITAL SKILLS)' : 'LANGUAGES & DIGITAL SKILLS'}
              </h2>
              <div className="cv-skills-block">
                <div style={{ marginBottom: '8px' }}>
                  <strong>{lang === 'np' ? 'भाषाहरू:' : 'Languages:'}</strong> {lang === 'np' ? 'नेपाली: मातृभाषा | अंग्रेजी: व्यावसायिक कार्य कुशलता' : 'Nepali: Native | English: Professional Working Proficiency'}
                </div>
                <div>
                  <strong>{lang === 'np' ? 'डिजिटल सीप:' : 'Digital:'}</strong> {lang === 'np' ? 'MS Office | Excel | सरकारी डिजिटल प्रणालीहरू | तथ्याङ्क तथा वित्तीय विश्लेषण' : 'MS Office | Excel | Government Digital Systems | Data & Financial Analysis'}
                </div>
              </div>
            </section>

            {/* Section 8: Career Highlight & Philosophy */}
            <section className="cv-sheet-section cv-highlight-section">
              <h2 className="cv-sheet-section-title">
                {lang === 'np' ? '८. सेवा वृत्ति विशिष्टता तथा दर्शन (CAREER HIGHLIGHT & PHILOSOPHY)' : 'CAREER HIGHLIGHT & PROFESSIONAL PHILOSOPHY'}
              </h2>
              <p className="cv-sheet-prose" style={{ marginBottom: '12px' }}>
                <strong>{lang === 'np' ? 'सेवा वृत्ति विशिष्टता:' : 'Career Highlight:'}</strong> {lang === 'np'
                  ? 'अत्यन्त प्रतिस्पर्धात्मक लोक सेवा आयोग परीक्षा उत्तीर्ण गरी नेपाल सरकारको स्थायी राजपत्राङ्कित निजामती कर्मचारी, संघीय राजस्व प्रशासन तथा प्रादेशिक बजेट योजनामा कार्य अनुभव।'
                  : 'Permanent civil servant of the Government of Nepal, selected through the highly competitive Public Service Commission examination, with professional experience spanning federal revenue administration and provincial budget and planning.'}
              </p>
              <div className="cv-philosophy-quote-box">
                <div className="quote-label">{lang === 'np' ? 'व्यावसायिक दर्शन:' : 'Professional philosophy:'}</div>
                <blockquote className="cv-philosophy-quote">
                  {lang === 'np'
                    ? '“प्रभावकारी सार्वजनिक सेवा भनेको केवल अंक र राजस्वको हिसाब होइन; यो त संस्थाहरूको सुदृढीकरण, अवसरहरूको सिर्जना र सार्वजनिक नीतिलाई जनताको जीवनमा सार्थक नतिजामा बदल्ने निष्ठा हो।”'
                    : '“To serve effectively is to understand that public finance is not merely about numbers and revenue; it is ultimately about building institutions, creating opportunity and converting public policy into meaningful outcomes for people.”'}
                </blockquote>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
