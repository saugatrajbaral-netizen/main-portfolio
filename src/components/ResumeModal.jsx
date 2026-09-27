import React, { useEffect, useState } from 'react';
import { 
  X, Printer, Download, CheckCircle2, ShieldCheck, Award, 
  GraduationCap, Building2, MapPin, Mail, Phone, FileText, 
  Eye, ExternalLink, Globe, Briefcase, Sparkles 
} from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import { getPortfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose, onOpenNationalSymbols, lang = 'en' }) {
  const [modalTab, setModalTab] = useState('document'); // 'document' | 'pdf'
  const portfolio = getPortfolioData(lang);
  const { personal, curriculumVitae } = portfolio;
  const cv = curriculumVitae;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-dialog-backdrop" onClick={onClose}>
      <div
        className="resume-dialog resume-dialog-wide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-title"
      >
        <div className="dialog-head">
          <div className="cv-head-profile-strip">
            <img
              src="/saugat-baral.jpg"
              alt={personal.name}
              className="cv-head-avatar"
            />
            <NepalEmblem size={44} variant="full" />
            <div>
              <span className="eyebrow">
                {lang === 'np' ? 'नेपाल सरकार · अर्थ मन्त्रालय' : 'Government of Nepal · Ministry of Finance'}
              </span>
              <h2 id="cv-title" className="cv-modal-heading">
                {personal.name}
              </h2>
              <div className="cv-modal-sub">
                <span>{lang === 'np' ? 'कर अधिकृत (राजपत्राङ्कित तृतीय श्रेणी)' : 'Tax Officer (Gazetted Third-Class Civil Servant)'}</span>
              </div>
            </div>
          </div>
          
          <div className="dialog-head-actions">
            {/* Tab switch between interactive doc and raw PDF */}
            <div className="cv-modal-tab-toggle">
              <button
                type="button"
                className={`cv-tab-btn ${modalTab === 'document' ? 'active' : ''}`}
                onClick={() => setModalTab('document')}
              >
                <FileText size={13} />
                <span>{lang === 'np' ? 'दस्तावेज' : 'Document'}</span>
              </button>
              <button
                type="button"
                className={`cv-tab-btn ${modalTab === 'pdf' ? 'active' : ''}`}
                onClick={() => setModalTab('pdf')}
              >
                <Eye size={13} />
                <span>{lang === 'np' ? 'मूल PDF' : 'Official PDF'}</span>
              </button>
            </div>

            <button
              type="button"
              className="dialog-close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="dialog-content">
          {modalTab === 'pdf' ? (
            <div className="cv-modal-pdf-container">
              <div className="cv-modal-pdf-bar">
                <span><strong>saugat-raj-baral-cv.pdf</strong> (Official 3-Page Document)</span>
                <a
                  href="/saugat-raj-baral-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-open-ext-link"
                >
                  <ExternalLink size={13} />
                  <span>{lang === 'np' ? 'नयाँ विन्डोमा हेर्नुहोस्' : 'Open Full Window'}</span>
                </a>
              </div>
              <iframe
                src="/saugat-raj-baral-cv.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
                title="Saugat Raj Baral Official CV PDF"
                className="cv-modal-pdf-frame"
              />
            </div>
          ) : (
            <div className="cv-modal-doc-body">
              {/* Contact Strip */}
              <div className="cv-contact-summary-strip">
                <div>
                  <Phone size={13} className="text-accent" />
                  <span>{personal.officialPhone}</span>
                </div>
                <div>
                  <Mail size={13} className="text-accent" />
                  <span>{personal.email}</span>
                </div>
                <div>
                  <MapPin size={13} className="text-gov-blue" />
                  <span>{lang === 'np' ? 'पोखरा-१७, बिराउटा, नेपाल' : 'Pokhara-17, Birauta, Nepal'}</span>
                </div>
                <div>
                  <Globe size={13} className="text-gov-blue" />
                  <span>Apolitical: Saugat Raj Baral</span>
                </div>
              </div>

              {/* Section 1: Professional Profile */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '१. व्यावसायिक पार्श्वचित्र (PROFESSIONAL PROFILE)' : 'PROFESSIONAL PROFILE'}</h3>
                {cv.professionalProfile ? (
                  cv.professionalProfile.map((para, pIdx) => (
                    <p key={pIdx} style={{ marginBottom: '8px' }}>{para}</p>
                  ))
                ) : (
                  <p>{personal.heroParagraph}</p>
                )}
              </div>

              {/* Section 2: Professional Experience */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '२. व्यावसायिक अनुभव (PROFESSIONAL EXPERIENCE)' : 'PROFESSIONAL EXPERIENCE'}</h3>
                
                {/* Tax Officer */}
                <div className="cv-section-item">
                  <div className="cv-item-title-row">
                    <strong>{lang === 'np' ? 'कर अधिकृत' : 'Tax Officer'}</strong> | {lang === 'np' ? 'अर्थ मन्त्रालय, नेपाल सरकार' : 'Ministry of Finance, Government of Nepal'}
                    <span className="cv-period-tag">2024–Present</span>
                  </div>
                  <ul className="cv-resp-list">
                    <li>{lang === 'np' ? 'करदाता सेवा, कर संकलन, कर परीक्षण तथा अनुसन्धान शाखामा रही मूल्य अभिवृद्धि कर (VAT), आयकर र अन्तःशुल्क प्रशासन सम्पादन।' : 'Serve across Taxpayer Services, Tax Collection, Audit & Investigation, with practical experience in VAT, Income Tax and Excise administration.'}</li>
                    <li>{lang === 'np' ? 'सरकारी राजस्व नीतिहरूको कार्यान्वयन, आन्तरिक राजस्व परिचालन, कर परिपालना तथा वित्तीय दिगोपनामा योगदान।' : 'Support the implementation of government revenue policies and contribute to domestic revenue mobilization, tax compliance and fiscal sustainability.'}</li>
                    <li>{lang === 'np' ? 'नेपालका विभिन्न जिल्लाहरूमा करदाता शिक्षा तथा जनचेतना कार्यक्रमहरूको सञ्चालन तथा सहजीकरण।' : 'Conduct and facilitate taxpayer education and public outreach programs across multiple districts of Nepal, engaging taxpayers, businesses and other stakeholders.'}</li>
                    <li>{lang === 'np' ? 'जटिल वित्तीय तथा कर नीतिहरूलाई सरल र प्रभावकारी सञ्चार मार्फत बुझाइ र ऐच्छिक कर परिपालनामा सहजीकरण।' : 'Translate complex fiscal and tax policies into accessible communication, strengthening understanding, voluntary compliance and constructive government–stakeholder relations.'}</li>
                    <li>{lang === 'np' ? 'करदाता तथा राजस्व तथ्याङ्क विश्लेषण गरी प्रमाणमा आधारित कर प्रशासन तथा अनुपालन पहलहरूमा सहयोग।' : 'Analyze taxpayer and revenue information and contribute to evidence-based tax administration and compliance initiatives.'}</li>
                  </ul>
                </div>

                {/* Administrative Officer */}
                <div className="cv-section-item" style={{ marginTop: '12px' }}>
                  <div className="cv-item-title-row">
                    <strong>{lang === 'np' ? 'अधिकृत सातौं तह' : 'Administrative Officer, 7th Level'}</strong> | {lang === 'np' ? 'आर्थिक मामिला तथा योजना मन्त्रालय, गण्डकी प्रदेश' : 'Ministry of Economic Affairs, Gandaki Province'}
                    <span className="cv-period-tag">{lang === 'np' ? '४ महिना' : '4 Months'}</span>
                  </div>
                  <ul className="cv-resp-list">
                    <li>{lang === 'np' ? 'बजेट तथा योजना शाखामा रही प्रादेशिक बजेट तर्जुमा, कार्यक्रम योजना र सार्वजनिक वित्तीय व्यवस्थापनमा कार्य।' : 'Worked in the Budget and Planning Section, supporting provincial budget formulation, program planning and public financial management.'}</li>
                    <li>{lang === 'np' ? 'सरकारी योजना, वित्तीय विश्लेषण र प्रादेशिक कार्यक्रमहरूको कार्यान्वयनमा योगदान।' : 'Contributed to government planning, financial analysis and implementation of provincial programs.'}</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Education */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '३. शैक्षिक योग्यता (EDUCATION)' : 'EDUCATION'}</h3>
                
                <div className="cv-section-item">
                  <div className="cv-item-title-row">
                    <strong>{lang === 'np' ? 'व्यापार प्रशासनमा स्नातक (BBA) — फाइनान्स' : 'Bachelor of Business Administration — Finance'}</strong>
                    <span className="cv-period-tag">2021</span>
                  </div>
                  <div className="cv-item-subtitle">{lang === 'np' ? 'पोखरा विश्वविद्यालय | ला ग्रान्डे इन्टरनेसनल कलेज' : 'Pokhara University | La Grande International College'}</div>
                  <div style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: '600', marginTop: '4px' }}>
                    GPA: 3.95/4.00 — {lang === 'np' ? "डीन्स लिस्ट विशिष्टता, कलेज टपर तथा शीर्ष १% उत्कृष्ट नतिजा" : "Dean's List distinction, college-topper and among the top 1% of graduates"}
                  </div>
                </div>

                <div className="cv-section-item" style={{ marginTop: '10px' }}>
                  <div className="cv-item-title-row">
                    <strong>{lang === 'np' ? 'उच्च माध्यमिक शिक्षा (+२), विज्ञान' : 'Higher Secondary Education (+2), Science'}</strong>
                    <span className="cv-period-tag">HSEB, Nepal</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{lang === 'np' ? 'प्रथम श्रेणी' : 'First Division'}</div>
                </div>

                <div className="cv-section-item" style={{ marginTop: '10px' }}>
                  <div className="cv-item-title-row">
                    <strong>{lang === 'np' ? 'प्रवेशिका परीक्षा (SLC)' : 'School Leaving Certificate (SLC)'}</strong>
                    <span className="cv-period-tag">{lang === 'np' ? 'नेपाल सरकार' : 'Government of Nepal'}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{lang === 'np' ? 'विशिष्ट श्रेणी (Distinction Division)' : 'Distinction Division'}</div>
                </div>
              </div>

              {/* Section 4: Professional Training & Development */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '४. व्यावसायिक तालिम तथा विकास (PROFESSIONAL TRAINING & DEVELOPMENT)' : 'PROFESSIONAL TRAINING & DEVELOPMENT'}</h3>
                <ul className="cv-resp-list">
                  <li><strong>{lang === 'np' ? 'युनुस सेन्टर इमर्सन प्रोग्राम' : 'Yunus Center Immersion Program'}</strong> — {lang === 'np' ? '१ महिना ढाका, बंगलादेश' : '1 Month Dhaka, Bangladesh'} ({lang === 'np' ? 'सामाजिक व्यवसाय, उद्यमशीलता र दिगो विकास प्रारूप सम्बन्धी विशेष अध्ययन' : 'Specialized exposure to social business, entrepreneurship and sustainable development frameworks'})</li>
                  <li><strong>{lang === 'np' ? 'आधारभूत प्रशासनिक तालिम' : 'Basic Administrative Training'}</strong> — {lang === 'np' ? '४ महिना, नेपाल प्रशासनिक प्रशिक्षण प्रतिष्ठान (NASC), काठमाडौं, नेपाल' : '4 Months, Nepal Administrative Staff College (NASC), Kathmandu, Nepal'}</li>
                  <li><strong>{lang === 'np' ? 'नवनियुक्त प्रादेशिक अधिकृतहरूका लागि अभिमुखीकरण तालिम' : 'Induction Training for Newly Appointed Provincial Officers'}</strong> — {lang === 'np' ? 'गण्डकी प्रदेश प्रशिक्षण प्रतिष्ठान (GPTA), पोखरा, नेपाल' : 'Gandaki Province Training Academy (GPTA), Pokhara, Nepal'}</li>
                  <li><strong>{lang === 'np' ? 'सार्वजनिक वित्तीय व्यवस्थापन तालिम' : 'Public Financial Management Training'}</strong> — PFMTC, Kathmandu</li>
                  <li><strong>{lang === 'np' ? 'पर्वतारोहण सम्पर्क अधिकृत तालिम' : 'Mountain Liaison Officer Training'}</strong> — NATHM</li>
                  <li>{lang === 'np' ? 'कर प्रशासन, राजस्व नीति, वित्तीय नीति, सार्वजनिक वित्त र समसामयिक आर्थिक विषयमा विभिन्न राष्ट्रिय/अन्तर्राष्ट्रिय गोष्ठी, सम्मेलन र कार्यशालाहरूमा सहभागिता।' : 'Participated in seminars, conferences, workshops and professional forums on tax administration, revenue policy, fiscal policy, public finance and contemporary economic issues.'}</li>
                </ul>
              </div>

              {/* Section 5: International & Professional Exposure */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '५. अन्तर्राष्ट्रिय तथा व्यावसायिक अनुभव (INTERNATIONAL & PROFESSIONAL EXPOSURE)' : 'INTERNATIONAL & PROFESSIONAL EXPOSURE'}</h3>
                <ul className="cv-resp-list">
                  <li>{lang === 'np' ? 'युरोप र एसियाका १५ भन्दा बढी देशहरूमा अन्तर्राष्ट्रिय भ्रमण तथा अध्ययन अनुभव।' : 'International exposure across 15 countries in Europe and Asia, providing first-hand exposure to diverse economic, social and institutional environments.'}</li>
                  <li>{lang === 'np' ? 'करदाता, व्यवसायी, व्यावसायिक सरोकारवाला र सरकारी निकायहरूसँग निरन्तर नीतिगत संवाद र सहकार्य।' : 'Regular engagement with taxpayers, businesses, professional stakeholders and government institutions through public outreach, policy communication and government programs.'}</li>
                </ul>
              </div>

              {/* Section 6: Core Competencies */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '६. मुख्य कार्यकुशलता तथा विशेषज्ञता (CORE COMPETENCIES)' : 'CORE COMPETENCIES'}</h3>
                <div className="cv-competencies-grid">
                  {(cv.coreCompetencies || [
                    "Public Finance & Revenue Policy", "Economic Policy", "Tax Administration", 
                    "Budget & Planning", "Economic Diplomacy", "Trade & Investment", 
                    "Stakeholder Engagement", "Government Relations", "Policy Implementation", 
                    "Financial Analysis", "Public Communication"
                  ]).map((c, i) => (
                    <span key={i} className="cv-competency-pill">{c}</span>
                  ))}
                </div>
              </div>

              {/* Section 7: Languages & Digital Skills */}
              <div className="cv-modal-section">
                <h3>{lang === 'np' ? '७. भाषा तथा डिजिटल सीप (LANGUAGES & DIGITAL SKILLS)' : 'LANGUAGES & DIGITAL SKILLS'}</h3>
                <p><strong>{lang === 'np' ? 'भाषाहरू:' : 'Languages:'}</strong> {lang === 'np' ? 'नेपाली: मातृभाषा | अंग्रेजी: व्यावसायिक कार्य कुशलता' : 'Nepali: Native | English: Professional Working Proficiency'}</p>
                <p><strong>{lang === 'np' ? 'डिजिटल सीप:' : 'Digital:'}</strong> {lang === 'np' ? 'MS Office | Excel | सरकारी डिजिटल प्रणालीहरू | तथ्याङ्क तथा वित्तीय विश्लेषण' : 'MS Office | Excel | Government Digital Systems | Data & Financial Analysis'}</p>
              </div>

              {/* Section 8: Career Highlight & Philosophy */}
              <div className="cv-modal-section cv-modal-philosophy">
                <h3>{lang === 'np' ? '८. सेवा वृत्ति विशिष्टता तथा दर्शन (CAREER HIGHLIGHT & PHILOSOPHY)' : 'CAREER HIGHLIGHT & PHILOSOPHY'}</h3>
                <p style={{ marginBottom: '8px' }}>
                  <strong>{lang === 'np' ? 'सेवा वृत्ति विशिष्टता:' : 'Career Highlight:'}</strong> {lang === 'np'
                    ? 'अत्यन्त प्रतिस्पर्धात्मक लोक सेवा आयोग परीक्षा उत्तीर्ण गरी नेपाल सरकारको स्थायी राजपत्राङ्कित निजामती कर्मचारी, संघीय राजस्व प्रशासन तथा प्रादेशिक बजेट योजनामा कार्य अनुभव।'
                    : 'Permanent civil servant of the Government of Nepal, selected through the highly competitive Public Service Commission examination, with professional experience spanning federal revenue administration and provincial budget and planning.'}
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--navy)' }}>
                  <strong>{lang === 'np' ? 'व्यावसायिक दर्शन:' : 'Professional philosophy:'}</strong> {lang === 'np'
                    ? '“प्रभावकारी सार्वजनिक सेवा भनेको केवल अंक र राजस्वको हिसाब होइन; यो त संस्थाहरूको सुदृढीकरण, अवसरहरूको सिर्जना र सार्वजनिक नीतिलाई जनताको जीवनमा सार्थक नतिजामा बदल्ने निष्ठा हो।”'
                    : '“To serve effectively is to understand that public finance is not merely about numbers and revenue; it is ultimately about building institutions, creating opportunity and converting public policy into meaningful outcomes for people.”'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="dialog-actions">
          <a
            href="/saugat-raj-baral-cv.pdf"
            download="Saugat-Raj-Baral-CV.pdf"
            className="button button-primary"
          >
            <Download size={14} />
            <span>{lang === 'np' ? 'आधिकारिक CV डाउनलोड (PDF)' : 'Download Official CV (PDF)'}</span>
          </a>
          <button type="button" className="button button-secondary" onClick={handlePrint}>
            <Printer size={14} />
            <span>{lang === 'np' ? 'प्रिन्ट गर्नुहोस्' : 'Print'}</span>
          </button>
          <button type="button" className="button button-secondary" onClick={onClose}>
            <span>{lang === 'np' ? 'बन्द गर्नुहोस्' : 'Close'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
