import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Calculator, 
  HelpCircle, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  Award,
  ArrowRight,
  Scale,
  Building,
  CreditCard,
  UserCheck,
  Receipt
} from 'lucide-react';
import NepalEmblem from '../components/NepalEmblem';
import { NepalFlagIcon } from '../components/Flags';
import { getPortfolioData } from '../data/portfolioData';

export default function TaxpayerEducationPage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  // Active Tab State
  const [activeTab, setActiveTab] = useState('pan'); // 'pan' | 'income-tax' | 'vat' | 'tds' | 'rights' | 'eservices'

  // FAQ Search Filter State
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Income Tax Calculator State
  const [calcIncome, setCalcIncome] = useState(900000);
  const [maritalStatus, setMaritalStatus] = useState('single'); // 'single' | 'married'
  const [calcSsf, setCalcSsf] = useState(200000); // Social Security Fund deduction
  const [calcInsurance, setCalcInsurance] = useState(40000); // Life insurance deduction

  // Tax Calculation Engine (FY 2083/84 / Income Tax Act 2058)
  const taxCalculation = useMemo(() => {
    const gross = Number(calcIncome) || 0;
    const ssfDeduction = Math.min(Number(calcSsf) || 0, 500000, gross * 0.33);
    const insDeduction = Math.min(Number(calcInsurance) || 0, 40000);
    const totalDeductions = ssfDeduction + insDeduction;
    const taxableIncome = Math.max(0, gross - totalDeductions);

    let tax = 0;
    let slabDetails = [];

    if (maritalStatus === 'single') {
      // Single Individual Slabs
      // 1st Slab: Up to 5,00,000 @ 1% (Social Security Tax)
      const slab1 = Math.min(taxableIncome, 500000);
      const tax1 = slab1 * 0.01;
      slabDetails.push({ slab: 'पहिलो रु. ५,००,००० (First Rs. 5,00,000)', rate: '1%', amount: slab1, tax: tax1 });

      // 2nd Slab: Next 2,00,000 (5L to 7L) @ 10%
      if (taxableIncome > 500000) {
        const slab2 = Math.min(taxableIncome - 500000, 200000);
        const tax2 = slab2 * 0.10;
        slabDetails.push({ slab: 'पछिल्लो रु. २,००,००० (Next Rs. 2,00,000)', rate: '10%', amount: slab2, tax: tax2 });
      }

      // 3rd Slab: Next 3,00,000 (7L to 10L) @ 20%
      if (taxableIncome > 700000) {
        const slab3 = Math.min(taxableIncome - 700000, 300000);
        const tax3 = slab3 * 0.20;
        slabDetails.push({ slab: 'पछिल्लो रु. ३,००,००० (Next Rs. 3,00,000)', rate: '20%', amount: slab3, tax: tax3 });
      }

      // 4th Slab: Next 10,00,000 (10L to 20L) @ 30%
      if (taxableIncome > 1000000) {
        const slab4 = Math.min(taxableIncome - 1000000, 1000000);
        const tax4 = slab4 * 0.30;
        slabDetails.push({ slab: 'पछिल्लो रु. १०,००,००० (Next Rs. 10,00,000)', rate: '30%', amount: slab4, tax: tax4 });
      }

      // 5th Slab: Next 30,00,000 (20L to 50L) @ 36%
      if (taxableIncome > 2000000) {
        const slab5 = Math.min(taxableIncome - 2000000, 3000000);
        const tax5 = slab5 * 0.36;
        slabDetails.push({ slab: 'पछिल्लो रु. ३०,००,००० (Next Rs. 30,00,000)', rate: '36%', amount: slab5, tax: tax5 });
      }

      // 6th Slab: Above 50,00,000 @ 39%
      if (taxableIncome > 5000000) {
        const slab6 = taxableIncome - 5000000;
        const tax6 = slab6 * 0.39;
        slabDetails.push({ slab: 'रु. ५०,००,००० भन्दा माथि (Above Rs. 50,00,000)', rate: '39%', amount: slab6, tax: tax6 });
      }
    } else {
      // Married Couple Slabs
      // 1st Slab: Up to 6,00,000 @ 1%
      const slab1 = Math.min(taxableIncome, 600000);
      const tax1 = slab1 * 0.01;
      slabDetails.push({ slab: 'पहिलो रु. ६,००,००० (First Rs. 6,00,000)', rate: '1%', amount: slab1, tax: tax1 });

      // 2nd Slab: Next 2,00,000 (6L to 8L) @ 10%
      if (taxableIncome > 600000) {
        const slab2 = Math.min(taxableIncome - 600000, 200000);
        const tax2 = slab2 * 0.10;
        slabDetails.push({ slab: 'पछिल्लो रु. २,००,००० (Next Rs. 2,00,000)', rate: '10%', amount: slab2, tax: tax2 });
      }

      // 3rd Slab: Next 3,00,000 (8L to 11L) @ 20%
      if (taxableIncome > 800000) {
        const slab3 = Math.min(taxableIncome - 800000, 300000);
        const tax3 = slab3 * 0.20;
        slabDetails.push({ slab: 'पछिल्लो रु. ३,००,००० (Next Rs. 3,00,000)', rate: '20%', amount: slab3, tax: tax3 });
      }

      // 4th Slab: Next 9,00,000 (11L to 20L) @ 30%
      if (taxableIncome > 1100000) {
        const slab4 = Math.min(taxableIncome - 1100000, 900000);
        const tax4 = slab4 * 0.30;
        slabDetails.push({ slab: 'पछिल्लो रु. ९,००,००० (Next Rs. 9,00,000)', rate: '30%', amount: slab4, tax: tax4 });
      }

      // 5th Slab: Next 30,00,000 (20L to 50L) @ 36%
      if (taxableIncome > 2000000) {
        const slab5 = Math.min(taxableIncome - 2000000, 3000000);
        const tax5 = slab5 * 0.36;
        slabDetails.push({ slab: 'पछिल्लो रु. ३०,००,००० (Next Rs. 30,00,000)', rate: '36%', amount: slab5, tax: tax5 });
      }

      // 6th Slab: Above 50,00,000 @ 39%
      if (taxableIncome > 5000000) {
        const slab6 = taxableIncome - 5000000;
        const tax6 = slab6 * 0.39;
        slabDetails.push({ slab: 'रु. ५०,००,००० भन्दा माथि (Above Rs. 50,00,000)', rate: '39%', amount: slab6, tax: tax6 });
      }
    }

    tax = slabDetails.reduce((acc, curr) => acc + curr.tax, 0);

    return {
      gross,
      totalDeductions,
      taxableIncome,
      tax,
      monthlyTax: tax / 12,
      slabDetails
    };
  }, [calcIncome, maritalStatus, calcSsf, calcInsurance]);

  // Authentic Tax FAQs
  const faqs = [
    {
      qEn: 'Who is required to obtain a Permanent Account Number (PAN) in Nepal?',
      qNp: 'नेपालमा कसले स्थायी लेखा नम्बर (PAN) लिनुपर्छ?',
      aEn: 'Any individual receiving taxable salary or income, engaging in professional consultancy, registering a business, owning a vehicle, or conducting transactions where TDS is applicable must obtain an Individual PAN (Personal PAN) or Business PAN from the Inland Revenue Department (IRD).',
      aNp: 'कुनै पनि तलब, पारिश्रमिक वा व्यवसायिक आम्दानी प्राप्त गर्ने, पेशागत परामर्श दिने, व्यवसाय वा कम्पनी दर्ता गर्ने, सवारी साधन खरिद गर्ने तथा कर कट्टी हुने कारोबार गर्ने सबै नागरिकले व्यक्तिगत वा व्यावसायिक प्यान लिन अनिवार्य छ।'
    },
    {
      qEn: 'What is the standard VAT rate in Nepal, and when is VAT registration mandatory?',
      qNp: 'नेपालमा मूल्य अभिवृद्धि कर (मू.अ.कर) को दर कति छ र कहिले दर्ता अनिवार्य हुन्छ?',
      aEn: 'The standard Value Added Tax (VAT) rate in Nepal is 13%. Registration is compulsory when a business turnover exceeds NPR 50 Lakhs (for goods) or NPR 20 Lakhs (for services or mixed goods/services) in the preceding 12 consecutive months.',
      aNp: 'नेपालमा मू.अ.करको एकल दर १३% रहेको छ। पछिल्लो १२ महिनामा वस्तुको कारोबार रु. ५० लाख वा सेवा तथा मिश्रित कारोबार रु. २० लाख नाघेमा मू.अ.करमा दर्ता हुन अनिवार्य हुन्छ।'
    },
    {
      qEn: 'What is the monthly VAT return submission deadline?',
      qNp: 'मासिक मू.अ.कर विवरण दाखिला गर्ने म्याद कहिलेसम्म हुन्छ?',
      aEn: 'VAT returns and tax payments must be submitted by the 25th day of the following Nepali calendar month via the IRD Taxpayer Portal (e.g., Baishakh VAT return must be filed by Jestha 25).',
      aNp: 'प्रत्येक महिनाको मू.अ.कर विवरण र दाखिला अर्को महिनाको २५ गतेभित्र आन्तरिक राजस्व विभागको करदाता पोर्टल मार्फत अनलाइन बुझाउनुपर्छ।'
    },
    {
      qEn: 'What allowable deductions reduce my personal taxable income?',
      qNp: 'व्यक्तिगत आयकर गणना गर्दा कस्ता कट्टीहरू दाबी गर्न पाइन्छ?',
      aEn: 'Under the Income Tax Act 2058: 1) Contribution to Social Security Fund (SSF) / Provident Fund (up to 1/3 of income or max NPR 5,00,000); 2) Life Insurance Premium (up to NPR 40,000); 3) Health Insurance (up to NPR 20,000); 4) Building Insurance (up to NPR 5,000); 5) Remote Area Allowance (Categories A through E).',
      aNp: 'आयकर ऐन २०५८ अनुसार: १) सामाजिक सुरक्षा कोष वा सञ्चय कोष योगदान (अधिकतम रु. ५,००,००० सम्म); २) जीवन बीमा प्रिमियम (रु. ४०,००० सम्म); ३) स्वास्थ्य बीमा (रु. २०,००० सम्म); ४) आवासीय घर बीमा (रु. ५,००० सम्म); ५) दुर्गम भत्ता कट्टी (क देखि ङ वर्ग)।'
    },
    {
      qEn: 'How does Electronic Tax Deduction at Source (ETDS) benefit taxpayers?',
      qNp: 'ई-टीडीएस (ETDS) प्रणालीले करदातालाई के फाइदा पुर्याउँछ?',
      aEn: 'ETDS directly credits the deducted tax into the taxpayer’s PAN ledger in real-time on the IRD system. Taxpayers can immediately verify their tax credits online and adjust them against their final tax liability without needing physical tax clearance certificates.',
      aNp: 'ई-टीडीएसले गर्दा कट्टी गरिएको कर सिधै करदाताको प्यान खातामा प्रविष्ट हुन्छ। करदाताले अनलाइनबाटै कर कट्टी प्रमाणित गरी अन्तिम कर दाखिलामा समायोजन गर्न सक्छन्।'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const term = faqSearch.toLowerCase();
    return (
      f.qEn.toLowerCase().includes(term) ||
      f.qNp.toLowerCase().includes(term) ||
      f.aEn.toLowerCase().includes(term) ||
      f.aNp.toLowerCase().includes(term)
    );
  });

  return (
    <div className="taxpayer-education-page">
      {/* =========================================================================
          HERO & INSTITUTIONAL HEADER
          ========================================================================= */}
      <section className="taxpayer-hero-section">
        <div className="container-wide">
          {/* Breadcrumb Trail */}
          <div className="breadcrumb-trail">
            <Link to="/">{lang === 'np' ? 'गृहपृष्ठ' : 'Home'}</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              {lang === 'np' ? 'करदाता शिक्षा तथा मार्गदर्शन' : 'Taxpayer Education & Guidance'}
            </span>
          </div>

          <div className="taxpayer-header-wrap">
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
                ? 'नेपाल सरकार, आन्तरिक राजस्व प्रशासन अन्तर्गत करदाताको अधिकार, स्थायी लेखा नम्बर (PAN) दर्ता, आयकर स्ल्याब, मू.अ.कर (VAT), टीडीएस र डिजिटल कर दाखिला सम्बन्धी आधिकारिक तथा व्यावहारिक मार्गदर्शन।'
                : 'Official institutional compliance guides, PAN registration workflows, income tax estimation, VAT guidelines, and digital IRD e-services curated from the desk of Gazetted Tax Officer Saugat Raj Baral.'}
            </p>
          </div>

          {/* Key Facts / Metrics Bar */}
          <div className="tax-metrics-bar">
            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'आर्थिक वर्ष' : 'Fiscal Year'}</span>
              <span className="metric-value">FY 2083/84</span>
              <span className="metric-sub">{lang === 'np' ? 'नेपाल सरकार बजेट' : 'GoN Statutory Slabs'}</span>
            </div>

            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'व्यक्तिगत छुट सीमा' : 'Basic Exemption (Single)'}</span>
              <span className="metric-value">NPR 5,00,000</span>
              <span className="metric-sub">{lang === 'np' ? 'दम्पती: रु. ६,००,०००' : 'Married: NPR 6,00,000'}</span>
            </div>

            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'मू.अ.कर (VAT) दर' : 'Standard VAT Rate'}</span>
              <span className="metric-value">13.00%</span>
              <span className="metric-sub">{lang === 'np' ? 'एकल दर प्रणाली' : 'Single Standard Rate'}</span>
            </div>

            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'दाखिला म्याद' : 'Monthly Filing Deadline'}</span>
              <span className="metric-value">{lang === 'np' ? '२५ गते' : '25th Monthly'}</span>
              <span className="metric-sub">{lang === 'np' ? 'अनलाइन ई-सेवा' : 'IRD Taxpayer Portal'}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tax-tabs-container">
            <nav className="tax-tabs-nav" aria-label="Tax Topics">
              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'pan' ? 'active' : ''}`}
                onClick={() => setActiveTab('pan')}
              >
                <UserCheck size={16} />
                <span>{lang === 'np' ? '१. प्यान (PAN) दर्ता' : '1. PAN Registration'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'income-tax' ? 'active' : ''}`}
                onClick={() => setActiveTab('income-tax')}
              >
                <Calculator size={16} />
                <span>{lang === 'np' ? '२. आयकर र क्यालकुलेटर' : '2. Income Tax & Calculator'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'vat' ? 'active' : ''}`}
                onClick={() => setActiveTab('vat')}
              >
                <Receipt size={16} />
                <span>{lang === 'np' ? '३. मू.अ.कर (VAT)' : '3. Value Added Tax (VAT)'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'tds' ? 'active' : ''}`}
                onClick={() => setActiveTab('tds')}
              >
                <CreditCard size={16} />
                <span>{lang === 'np' ? '४. टीडीएस (TDS & ETDS)' : '4. TDS & ETDS'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'rights' ? 'active' : ''}`}
                onClick={() => setActiveTab('rights')}
              >
                <ShieldCheck size={16} />
                <span>{lang === 'np' ? '५. करदाता अधिकार' : '5. Taxpayer Rights'}</span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TAB CONTENT PANELS
          ========================================================================= */}
      <main className="container-wide taxpayer-content-body">
        {/* TAB 1: PAN REGISTRATION */}
        {activeTab === 'pan' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'स्थायी लेखा नम्बर (PAN) दर्ता प्रक्रिया' : 'Permanent Account Number (PAN) Registration'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'व्यक्तिगत प्यान (Personal PAN) तथा व्यावसायिक प्यान (Business PAN) लिने आधिकारिक अनलाइन कार्यविधि।'
                  : 'Complete official procedure for obtaining Individual and Business Permanent Account Numbers.'}
              </p>
            </div>

            <div className="steps-grid-row">
              <div className="step-flow-card">
                <span className="step-number-badge">1</span>
                <h3 className="step-title">{lang === 'np' ? 'अनलाइन फाराम दर्ता' : 'Online Form Submission'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'आन्तरिक राजस्व विभागको वेबसाइट (taxpayerportal.ird.gov.np) मा गई "Registration (PAN, VAT, Excise)" चयन गरी आवश्यक व्यक्तिगत विवरण भर्नुहोस्।'
                    : 'Visit the IRD Taxpayer Portal, select Registration (PAN), enter personal/business details, and generate your Submission Number.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge">2</span>
                <h3 className="step-title">{lang === 'np' ? 'कागजात अपलोड' : 'Document Verification'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'नागरिकता प्रमाणपत्र वा राष्ट्रिय परिचयपत्र, पासपोर्ट साइज फोटो र व्यावसायिक प्यानको हकमा व्यवसाय दर्ता प्रमाणपत्र संलग्न गर्नुहोस्।'
                    : 'Upload your National ID or Citizenship certificate, passport-size photo, and business registration certificate for corporate entities.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge">3</span>
                <h3 className="step-title">{lang === 'np' ? 'बायोमेट्रिक तथा प्रमाणपत्र' : 'Biometric & Certificate'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'छनोट गरिएको आन्तरिक राजस्व कार्यालय (IRO) वा करदाता सेवा कार्यालय (TSO) मा गई बायोमेट्रिक प्रमाणीकरण गरी निःशुल्क प्यान प्रमाणपत्र लिनुहोस्।'
                    : 'Visit your designated Inland Revenue Office (IRO/TSO) for instant biometric authentication and receive your official PAN Certificate free of cost.'}
                </p>
              </div>
            </div>

            <div className="tax-table-container">
              <table className="tax-data-table">
                <thead>
                  <tr>
                    <th>{lang === 'np' ? 'प्यानको प्रकार' : 'PAN Type'}</th>
                    <th>{lang === 'np' ? 'कसका लागि' : 'Target Audience'}</th>
                    <th>{lang === 'np' ? 'आवश्यक कागजात' : 'Required Documents'}</th>
                    <th>{lang === 'np' ? 'शुल्क' : 'Government Fee'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>{lang === 'np' ? 'व्यक्तिगत प्यान (Personal PAN)' : 'Individual PAN'}</strong></td>
                    <td>{lang === 'np' ? 'तलबदार, परामर्शदाता, लगानीकर्ता, सवारी धनी' : 'Salaried staff, professionals, consultants, investors'}</td>
                    <td>{lang === 'np' ? 'नागरिकता/NID, १ प्रति फोटो' : 'Citizenship or National ID, 1 Photo'}</td>
                    <td><span className="text-crimson font-bold">{lang === 'np' ? 'निःशुल्क (Free)' : 'Free of Cost'}</span></td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'व्यावसायिक प्यान (Business PAN)' : 'Business / Corporate PAN'}</strong></td>
                    <td>{lang === 'np' ? 'फर्म, साझेदारी, कम्पनी, संस्था, सहकारी' : 'Proprietorship, Partnership, Company, NGO'}</td>
                    <td>{lang === 'np' ? 'व्यवसाय दर्ता, प्रबन्धपत्र, घरबहाल सम्झौता' : 'Business registration, MOA/AOA, Rent Agreement'}</td>
                    <td><span className="text-crimson font-bold">{lang === 'np' ? 'निःशुल्क (Free)' : 'Free of Cost'}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INCOME TAX SLABS & INTERACTIVE CALCULATOR */}
        {activeTab === 'income-tax' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'आयकर स्ल्याब तथा अन्तरक्रियात्मक कर क्यालकुलेटर' : 'Income Tax Slabs & Interactive Tax Calculator'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'आयकर ऐन, २०५८ (अनुसूची–१) अनुसार प्राकृतिक व्यक्तिको कर दर तथा तत्काल कर गणना।'
                  : 'Statutory individual income tax rates and instant real-time computation under the Income Tax Act 2058.'}
              </p>
            </div>

            {/* Income Tax Slabs Comparison Table */}
            <div className="tax-table-container">
              <table className="tax-data-table">
                <thead>
                  <tr>
                    <th>{lang === 'np' ? 'कर स्ल्याब' : 'Income Bracket'}</th>
                    <th>{lang === 'np' ? 'अविवाहित व्यक्ति (Single)' : 'Single Individual'}</th>
                    <th>{lang === 'np' ? 'दम्पती (Married Couple)' : 'Married Couple'}</th>
                    <th>{lang === 'np' ? 'कर दर (Rate)' : 'Tax Rate'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{lang === 'np' ? 'पहिलो स्ल्याब (First Slab)' : '1st Bracket'}</td>
                    <td>{lang === 'np' ? 'पहिलो रु. ५,००,००० सम्म' : 'Up to NPR 5,00,000'}</td>
                    <td>{lang === 'np' ? 'पहिलो रु. ६,००,००० सम्म' : 'Up to NPR 6,00,000'}</td>
                    <td><span className="font-bold text-gov-blue">1%</span> {lang === 'np' ? '(सामाजिक सुरक्षा कर)' : '(SST)'}</td>
                  </tr>
                  <tr>
                    <td>{lang === 'np' ? 'दोस्रो स्ल्याब (Second Slab)' : '2nd Bracket'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. २,००,००० (५ लाख देखि ७ लाख)' : 'Next NPR 2,00,000 (5L to 7L)'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. २,००,००० (६ लाख देखि ८ लाख)' : 'Next NPR 2,00,000 (6L to 8L)'}</td>
                    <td><span className="font-bold text-gov-blue">10%</span></td>
                  </tr>
                  <tr>
                    <td>{lang === 'np' ? 'तेस्रो स्ल्याब (Third Slab)' : '3rd Bracket'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. ३,००,००० (७ लाख देखि १० लाख)' : 'Next NPR 3,00,000 (7L to 10L)'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. ३,००,००० (८ लाख देखि ११ लाख)' : 'Next NPR 3,00,000 (8L to 11L)'}</td>
                    <td><span className="font-bold text-gov-blue">20%</span></td>
                  </tr>
                  <tr>
                    <td>{lang === 'np' ? 'चौथो स्ल्याब (Fourth Slab)' : '4th Bracket'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. १०,००,००० (१० लाख देखि २० लाख)' : 'Next NPR 10,00,000 (10L to 20L)'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. ९,००,००० (११ लाख देखि २० लाख)' : 'Next NPR 9,00,000 (11L to 20L)'}</td>
                    <td><span className="font-bold text-gov-blue">30%</span></td>
                  </tr>
                  <tr>
                    <td>{lang === 'np' ? 'पाँचौं स्ल्याब (Fifth Slab)' : '5th Bracket'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. ३०,००,००० (२० लाख देखि ५० लाख)' : 'Next NPR 30,00,000 (20L to 50L)'}</td>
                    <td>{lang === 'np' ? 'पछिल्लो रु. ३०,००,००० (२० लाख देखि ५० लाख)' : 'Next NPR 30,00,000 (20L to 50L)'}</td>
                    <td><span className="font-bold text-gov-blue">36%</span></td>
                  </tr>
                  <tr>
                    <td>{lang === 'np' ? 'छैटौं स्ल्याब (Super Tax)' : '6th Bracket'}</td>
                    <td>{lang === 'np' ? 'रु. ५०,००,००० भन्दा माथिको रकम' : 'Above NPR 50,00,000'}</td>
                    <td>{lang === 'np' ? 'रु. ५०,००,००० भन्दा माथिको रकम' : 'Above NPR 50,00,000'}</td>
                    <td><span className="font-bold text-crimson">39%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* INTERACTIVE TAX ESTIMATOR CALCULATOR */}
            <div className="tax-calculator-box">
              <div className="calculator-head">
                <div className="calc-icon-badge">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="calc-title">
                    {lang === 'np' ? 'अन्तरक्रियात्मक आयकर क्यालकुलेटर (FY 2083/84)' : 'Interactive Income Tax Estimator (FY 2083/84)'}
                  </h3>
                  <span className="text-xs text-muted">
                    {lang === 'np' ? 'आफ्नो आम्दानी र कट्टीहरू प्रविष्ट गरी तत्काल कर रकम हेर्नुहोस्' : 'Enter your annual gross income and allowable deductions for instant calculation'}
                  </span>
                </div>
              </div>

              <div className="calc-grid-form">
                <div className="calc-field">
                  <label htmlFor="tax-income-input">{lang === 'np' ? 'वार्षिक कुल आम्दानी (NPR)' : 'Annual Gross Income (NPR)'}</label>
                  <input
                    id="tax-income-input"
                    type="number"
                    min="0"
                    step="50000"
                    className="calc-input"
                    value={calcIncome}
                    onChange={(e) => setCalcIncome(e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label htmlFor="tax-status-select">{lang === 'np' ? 'वैवाहिक स्थिति' : 'Marital Status'}</label>
                  <select
                    id="tax-status-select"
                    className="calc-select"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                  >
                    <option value="single">{lang === 'np' ? 'अविवाहित (Single) - रु. ५ लाख छुट' : 'Single Individual (NPR 5L Limit)'}</option>
                    <option value="married">{lang === 'np' ? 'विवाहित (Couple) - रु. ६ लाख छुट' : 'Married Couple (NPR 6L Limit)'}</option>
                  </select>
                </div>

                <div className="calc-field">
                  <label htmlFor="tax-ssf-input">{lang === 'np' ? 'SSF / सञ्चय कोष योगदान (NPR)' : 'SSF / PF Contribution (NPR)'}</label>
                  <input
                    id="tax-ssf-input"
                    type="number"
                    min="0"
                    max="500000"
                    step="10000"
                    className="calc-input"
                    value={calcSsf}
                    onChange={(e) => setCalcSsf(e.target.value)}
                  />
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="calc-results-panel">
                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'करयोग्य आय' : 'Taxable Income'}</span>
                  <span className="calc-res-val">NPR {taxCalculation.taxableIncome.toLocaleString()}</span>
                </div>

                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'वार्षिक कुल कर दायित्व' : 'Annual Total Tax'}</span>
                  <span className="calc-res-val highlight-tax">NPR {Math.round(taxCalculation.tax).toLocaleString()}</span>
                </div>

                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'मासिक सरदर टीडीएस' : 'Monthly Estimated TDS'}</span>
                  <span className="calc-res-val">NPR {Math.round(taxCalculation.monthlyTax).toLocaleString()} / महिना</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VALUE ADDED TAX (VAT) */}
        {activeTab === 'vat' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'मूल्य अभिवृद्धि कर (VAT) दिग्दर्शन' : 'Value Added Tax (VAT) Guidelines'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'मू.अ.कर ऐन, २०५२ अनुसार कर बीजक जारी गर्ने, खरिद/बिक्री खाता र मासिक कर दाखिला सम्बन्धी जानकारी।'
                  : 'Statutory compliance for tax invoicing, purchase/sales ledgers, and monthly return submissions under the VAT Act 2052.'}
              </p>
            </div>

            <div className="steps-grid-row">
              <div className="step-flow-card">
                <span className="step-number-badge"><Receipt size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? '१३% एकल दर प्रणाली' : '13% Single Standard Rate'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'नेपालमा वस्तु तथा सेवाको बिक्रीमा १३% मू.अ.कर लाग्छ। निर्यात कारोबारमा ०% दर र अनुसूची–१ का वस्तुमा कर छुटको व्यवस्था छ।'
                    : 'Nepal follows a single standard VAT rate of 13%. Export transactions are zero-rated (0%), and essential goods in Schedule 1 are exempt.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><FileText size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? 'कर बीजक (Tax Invoice)' : 'Mandatory Tax Invoicing'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'प्रत्येक बिक्रीमा दर्ता नम्बर (प्यान), खरिदकर्ताको प्यान, क्रम संख्या, मिति र कर रकम स्पष्ट खुलेको कर बीजक अनिवार्य जारी गर्नुपर्छ।'
                    : 'Every transaction requires an authorized Tax Invoice displaying Buyer/Seller PAN, serial number, date, taxable value, and 13% VAT amount.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><CheckCircle2 size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? 'मासिक दाखिला (२५ गतेभित्र)' : 'Monthly Filing (By 25th)'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'बिक्री कर (Output Tax) बाट खरिद कर (Input Tax) कट्टी गरी बाँकी कर रकम अर्को महिनाको २५ गतेभित्र ई-पेमेन्ट मार्फत बुझाउनुपर्छ।'
                    : 'Offset input tax on purchases from output tax on sales, and submit returns online with payment by the 25th of every Nepali month.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TDS & ETDS */}
        {activeTab === 'tds' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'कर कट्टी (TDS) तथा ई-टीडीएस (ETDS) प्रणाली' : 'Tax Deduction at Source (TDS) & ETDS Protocol'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'भुक्तानी गर्दा अग्रिम कर कट्टी गर्ने दरहरू र अनलाइन ई-टीडीएस प्रविष्टि।'
                  : 'Statutory withholding tax rates, payment schedules, and digital ETDS verification mechanisms.'}
              </p>
            </div>

            <div className="tax-table-container">
              <table className="tax-data-table">
                <thead>
                  <tr>
                    <th>{lang === 'np' ? 'भुक्तानीको प्रकृति' : 'Nature of Payment'}</th>
                    <th>{lang === 'np' ? 'टीडीएस दर' : 'Withholding Rate'}</th>
                    <th>{lang === 'np' ? 'आयकर दफा' : 'Section (ITA 2058)'}</th>
                    <th>{lang === 'np' ? 'कर दाखिला प्रकार' : 'Tax Credit Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>{lang === 'np' ? 'घर बहाल (House Rent - Corporate)' : 'House Rent (Institutional)'}</strong></td>
                    <td><span className="font-bold text-gov-blue">10%</span></td>
                    <td>{lang === 'np' ? 'दफा ८८' : 'Section 88'}</td>
                    <td>{lang === 'np' ? 'अन्तिम कर (Final Withholding)' : 'Final Withholding'}</td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'पेशागत सेवा तथा परामर्श शुल्क' : 'Consultancy / Professional Fees'}</strong></td>
                    <td><span className="font-bold text-gov-blue">15%</span></td>
                    <td>{lang === 'np' ? 'दफा ८८' : 'Section 88'}</td>
                    <td>{lang === 'np' ? 'अग्रिम कर कट्टी (Adjustable Credit)' : 'Adjustable Tax Credit'}</td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'ठेक्का तथा आपूर्ति भुक्तानी (VAT बिल)' : 'Contract & Supply Payment (VAT bill)'}</strong></td>
                    <td><span className="font-bold text-gov-blue">1.5%</span></td>
                    <td>{lang === 'np' ? 'दफा ८९' : 'Section 89'}</td>
                    <td>{lang === 'np' ? 'अग्रिम कर कट्टी (Adjustable Credit)' : 'Adjustable Tax Credit'}</td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'लाभांश भुक्तानी (Dividend Payment)' : 'Dividend Payment'}</strong></td>
                    <td><span className="font-bold text-gov-blue">5%</span></td>
                    <td>{lang === 'np' ? 'दफा ८८' : 'Section 88'}</td>
                    <td>{lang === 'np' ? 'अन्तिम कर (Final Withholding)' : 'Final Withholding'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: TAXPAYER RIGHTS */}
        {activeTab === 'rights' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'करदाताका मौलिक अधिकार तथा कानूनी दायित्व' : 'Fundamental Taxpayer Rights & Statutory Duties'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'आयकर ऐन, २०५८ को दफा ७४ बमोजिम करदातालाई प्राप्त कानूनी प्रत्याभूतिहरू।'
                  : 'Statutory taxpayer rights and procedural protections guaranteed under Section 74 of the Income Tax Act 2058.'}
              </p>
            </div>

            <div className="steps-grid-row">
              <div className="step-flow-card">
                <span className="step-number-badge"><ShieldCheck size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? '१. सम्मानजनक तथा निष्पक्ष व्यवहार' : '1. Right to Fair Treatment'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'कर प्रशासनबाट निष्पक्ष, समान, मर्यादित र शिष्ट व्यवहार प्राप्त गर्ने प्रत्येक नागरिकको अधिकार सुरक्षित छ।'
                    : 'Right to receive courteous, professional, and non-discriminatory service from all revenue officials.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><Award size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? '२. सूचनाको गोपनीयता' : '2. Right to Confidentiality'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'करदाताले पेश गरेका वित्तीय विवरण, आम्दानी र व्यक्तिगत जानकारी कानून बमोजिम पूर्ण गोप्य राखिन्छ।'
                    : 'All financial statements, tax filings, and personal records submitted to IRD are strictly confidential under law.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><Scale size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? '३. प्रशासकीय पुनरावलोकन तथा पुनरावेदन' : '3. Right to Review & Appeal'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'कर निर्धारण चित्त नबुझेमा आन्तरिक राजस्व विभागमा प्रशासकीय पुनरावलोकन र राजस्व न्यायाधीकरणमा पुनरावेदन गर्ने अधिकार।'
                    : 'Right to challenge tax assessment through Administrative Review at IRD and judicial appeal at the Revenue Tribunal.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
            ========================================================================= */}
        <section className="tax-faq-section">
          <div className="faq-header-row">
            <div>
              <h2 className="panel-title">
                {lang === 'np' ? 'बारम्बार सोधिने कर सम्बन्धी प्रश्नोत्तरहरू (FAQs)' : 'Frequently Asked Tax Questions (FAQs)'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np' ? 'नेपालको कर कानून र व्यवहारमा आइपर्ने समस्याका स्पष्ट समाधान' : 'Practical answers to common tax compliance questions in Nepal'}
              </p>
            </div>

            <div className="faq-search-box">
              <input
                type="text"
                className="faq-search-input"
                placeholder={lang === 'np' ? 'प्रश्न खोज्नुहोस्...' : 'Search tax topics...'}
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="faq-accordion-list">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div key={idx} className="faq-item">
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                  >
                    <span>{lang === 'np' ? faq.qNp : faq.qEn}</span>
                    <ChevronDown size={18} className={`accordion-chevron ${isExpanded ? 'rotated' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="faq-answer-body">
                      <p>{lang === 'np' ? faq.aNp : faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            OFFICIAL LINKS & IRD E-SERVICES CALLOUT BANNER
            ========================================================================= */}
        <section className="official-links-banner">
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
              href="https://taxpayerportal.ird.gov.np"
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
