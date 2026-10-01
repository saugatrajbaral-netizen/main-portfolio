import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ExternalLink } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import TaxpayerEducationProgram from '../components/TaxpayerEducationProgram';

export default function TaxpayerEducationPage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);

  return (
    <div className="taxpayer-education-page">
      {/* Institutional Hero Banner */}
      <section className="taxpayer-hero-section">
        <div className="container-wide">
          <div className="breadcrumb-trail">
            <Link to="/">{lang === 'np' ? 'गृहपृष्ठ' : 'Home'}</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              {lang === 'np' ? 'करदाता शिक्षा तथा मार्गदर्शन' : 'Taxpayer Education & Guidance'}
            </span>
          </div>

          <div className="taxpayer-header-wrap" style={{ marginBottom: '16px' }}>
            <div className="taxpayer-kicker-badge">
              <Scale size={13} className="text-gov-blue" />
              <span>{lang === 'np' ? 'नागरिक कर साक्षरता • नेपाल सरकार' : 'CIVIC TAX LITERACY • GOVERNMENT OF NEPAL'}</span>
            </div>

            <h1 className="taxpayer-main-title">
              {lang === 'np'
                ? 'करदाता शिक्षा तथा सार्वजनिक कर मार्गदर्शन'
                : 'Taxpayer Education & Public Tax Guidance'}
            </h1>

            <p className="taxpayer-lead-text">
              {lang === 'np'
                ? 'नेपाल सरकारको कर प्रशासन अन्तर्गत देशका विभिन्न जिल्ला तथा स्थानीय तहहरूमा आयोजित करदाता शिक्षा, कर सचेतना, कानुनी अभिमुखीकरण तथा अन्तरक्रिया कार्यक्रमहरूको आधिकारिक अभिलेख।'
                : 'Official archive and photographic documentation of field taxpayer education, statutory awareness, and public interaction programs conducted across districts of Nepal.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container-wide taxpayer-content-body" style={{ marginTop: '24px', marginBottom: '40px' }}>
        {/* Interactive Field Taxpayer Education Programs with Multi-District Galleries */}
        <TaxpayerEducationProgram lang={lang} />

        {/* Official Links & IRD E-Services Callout Banner */}
        <section className="official-links-banner" style={{ marginTop: '48px' }}>
          <div className="official-links-text">
            <h3>{lang === 'np' ? 'आधिकारिक सरकारी कर पोर्टलहरू' : 'Official Government Revenue Portals'}</h3>
            <p>
              {lang === 'np'
                ? 'आन्तरिक राजस्व विभागको अनलाइन प्रणाली मार्फत प्यान दर्ता, कर विवरण दाखिला, ई-पेमेन्ट तथा कर चुक्ता प्रमाणपत्र प्राप्त गर्नुहोस्।'
                : 'Access direct Inland Revenue Department online portals for PAN registration, return submission, e-payments, and tax clearance certificates.'}
            </p>
          </div>

          <div className="official-links-actions">
            <a
              href="https://taxpayerportal.ird.gov.np/taxpayer/app.html"
              target="_blank"
              rel="noopener noreferrer"
              className="official-portal-btn"
            >
              <span>{lang === 'np' ? 'करदाता पोर्टल खोल्नुहोस्' : 'IRD Taxpayer Portal'}</span>
              <ExternalLink size={14} />
            </a>

            <a
              href="https://ird.gov.np"
              target="_blank"
              rel="noopener noreferrer"
              className="official-portal-btn secondary"
            >
              <span>{lang === 'np' ? 'आन्तरिक राजस्व विभाग (IRD)' : 'IRD Official Website'}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
