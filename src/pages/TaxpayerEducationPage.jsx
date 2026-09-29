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
  Receipt,
  TrendingUp,
  Landmark,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import NepalEmblem from '../components/NepalEmblem';
import { NepalFlagIcon } from '../components/Flags';
import { getPortfolioData } from '../data/portfolioData';

export default function TaxpayerEducationPage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  // Active Tab State
  const [activeTab, setActiveTab] = useState('cgt'); // 'cgt' | 'pan' | 'income-tax' | 'vat' | 'tds' | 'rights'

  // FAQ Search Filter State
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Income Tax Calculator State
  const [calcIncome, setCalcIncome] = useState(1200000);
  const [maritalStatus, setMaritalStatus] = useState('single'); // 'single' | 'married'
  const [calcSsf, setCalcSsf] = useState(300000); // Social Security Fund deduction (up to 5L)
  const [calcInsurance, setCalcInsurance] = useState(40000); // Life insurance deduction (up to 40k)
  const [calcHealthIns, setCalcHealthIns] = useState(20000); // Health insurance deduction (up to 20k)

  // Capital Gains Tax (CGT) Calculator State
  const [cgtAssetType, setCgtAssetType] = useState('listed-shares'); // 'listed-shares' | 'unlisted-shares' | 'real-estate'
  const [cgtHoldingPeriod, setCgtHoldingPeriod] = useState('short-term'); // 'short-term' | 'long-term' (shares: <=365d vs >365d; land: <=5y vs >5y)
  const [cgtBuyPrice, setCgtBuyPrice] = useState(400000);
  const [cgtSellPrice, setCgtSellPrice] = useState(750000);
  const [cgtExpenses, setCgtExpenses] = useState(15000); // Broker/transfer fees

  // 1. Income Tax Calculation Engine (FY 2083/84 / Income Tax Act 2058)
  const taxCalculation = useMemo(() => {
    const gross = Number(calcIncome) || 0;
    const ssfDeduction = Math.min(Number(calcSsf) || 0, 500000, gross * 0.33);
    const insDeduction = Math.min(Number(calcInsurance) || 0, 40000);
    const healthDeduction = Math.min(Number(calcHealthIns) || 0, 20000);
    const totalDeductions = ssfDeduction + insDeduction + healthDeduction;
    const taxableIncome = Math.max(0, gross - totalDeductions);

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

    const totalTax = slabDetails.reduce((acc, curr) => acc + curr.tax, 0);

    return {
      gross,
      totalDeductions,
      taxableIncome,
      tax: totalTax,
      monthlyTax: totalTax / 12,
      slabDetails
    };
  }, [calcIncome, maritalStatus, calcSsf, calcInsurance, calcHealthIns]);

  // 2. Capital Gains Tax (CGT) Engine (Latest Finance Act 2083 / September 2026 amendments)
  const cgtCalculation = useMemo(() => {
    const buy = Number(cgtBuyPrice) || 0;
    const sell = Number(cgtSellPrice) || 0;
    const exp = Number(cgtExpenses) || 0;
    const totalCost = buy + exp;
    const netGain = Math.max(0, sell - totalCost);

    let rate = 0;
    let rateLabel = '';
    let finalTaxStatus = '';

    if (cgtAssetType === 'listed-shares') {
      if (cgtHoldingPeriod === 'short-term') {
        rate = 0.05; // 5% for <= 365 days
        rateLabel = '5.00% (अल्पकालीन / Short-term ≤ 365 Days)';
        finalTaxStatus = 'अन्तिम कर (Final Withholding Tax under Section 95Ka)';
      } else {
        rate = 0.0375; // 3.75% for > 365 days (latest amendment)
        rateLabel = '3.75% (दीर्घकालीन / Long-term > 365 Days)';
        finalTaxStatus = 'अन्तिम कर (Final Withholding Tax under Section 95Ka)';
      }
    } else if (cgtAssetType === 'unlisted-shares') {
      rate = 0.10; // 10% for individual resident
      rateLabel = '10.00% (गैर-सूचीकृत सेयर / Unlisted Shares)';
      finalTaxStatus = 'अन्तिम कर कट्टी (Final Tax for natural persons)';
    } else if (cgtAssetType === 'real-estate') {
      if (cgtHoldingPeriod === 'short-term') {
        rate = 0.10; // 10% for <= 5 years
        rateLabel = '10.00% (५ वर्ष वा सो भन्दा कम स्वामित्व / ≤ 5 Years)';
        finalTaxStatus = 'मालपोत कार्यालयमा दाखिला हुने अन्तिम कर (Final Tax at Land Revenue)';
      } else {
        rate = 0.075; // 7.5% for > 5 years
        rateLabel = '7.50% (५ वर्ष भन्दा बढी स्वामित्व / > 5 Years)';
        finalTaxStatus = 'मालपोत कार्यालयमा दाखिला हुने अन्तिम कर (Final Tax at Land Revenue)';
      }
    }

    const cgtAmount = netGain * rate;

    return {
      buy,
      sell,
      exp,
      totalCost,
      netGain,
      rate,
      rateLabel,
      finalTaxStatus,
      cgtAmount
    };
  }, [cgtAssetType, cgtHoldingPeriod, cgtBuyPrice, cgtSellPrice, cgtExpenses]);

  // Authentic Tax FAQs (Updated with Latest Finance Act 2083 Provisions)
  const faqs = [
    {
      qEn: 'What are the updated Capital Gains Tax (CGT) rates on NEPSE share transactions?',
      qNp: 'नेप्से (NEPSE) सेयर कारोबारमा नयाँ पूँजीगत लाभकर (CGT) दर कति छ?',
      aEn: 'Under the latest Finance Act 2083 amendments, the CGT rate on listed securities for individual resident investors is 5% for short-term holdings (365 days or less) and 3.75% for long-term holdings (more than 365 days). This is treated as a Final Tax and does not need to be added to personal income.',
      aNp: 'आर्थिक ऐन २०८३ को पछिल्लो संशोधन अनुसार प्राकृतिक व्यक्तिको हकमा ३६५ दिन वा सो भन्दा कम स्वामित्व भएको सूचीकृत सेयर बिक्रीमा ५% र ३६५ दिनभन्दा बढी स्वामित्व भएको सेयर बिक्रीमा ३.७५% पूँजीगत लाभकर लाग्छ। यो अन्तिम कर भएकाले व्यक्तिगत आयमा समावेश गरिरहनु पर्दैन।'
    },
    {
      qEn: 'What is the Capital Gains Tax on real estate and land transactions in Nepal?',
      qNp: 'नेपालमा घरजग्गा तथा अचल सम्पत्ति बिक्री गर्दा पूँजीगत लाभकर कति लाग्छ?',
      aEn: 'As per the Finance Act 2083 (effective from Shrawan 1, 2083), real estate held for 5 years or less attracts a 10% Capital Gains Tax, whereas property held for more than 5 years attracts a 7.5% Capital Gains Tax at the time of deed registration at the Land Revenue Office.',
      aNp: 'आर्थिक ऐन २०८३ (२०८३ साउन १ देखि लागू) अनुसार ५ वर्ष वा सो भन्दा कम स्वामित्व रहेको घरजग्गा बिक्रीमा १०% र ५ वर्षभन्दा बढी स्वामित्व रहेको घरजग्गा बिक्रीमा ७.५% पूँजीगत लाभकर लाग्दछ।'
    },
    {
      qEn: 'What is the revised compulsory VAT registration threshold under the Finance Act?',
      qNp: 'आर्थिक ऐन अनुसार अनिवार्य मू.अ.कर (VAT) दर्ताको नयाँ सीमा कति हो?',
      aEn: 'The compulsory VAT registration threshold is NPR 50 Lakhs for goods trading, and NPR 30 Lakhs for services or mixed transactions (increased from the previous NPR 20 Lakhs threshold).',
      aNp: 'वस्तुको व्यापारमा वार्षिक कारोबार रु. ५० लाख र सेवा वा मिश्रित कारोबारमा वार्षिक रु. ३० लाख (पहिलेको २० लाखबाट वृद्धि गरिएको) नाघेमा अनिवार्य रूपमा मू.अ.करमा दर्ता हुनुपर्छ।'
    },
    {
      qEn: 'What is the maximum allowable deduction for Retirement Funds (SSF/CIT/EPF)?',
      qNp: 'सामाजिक सुरक्षा कोष (SSF) वा स्वीकृत अवकाश कोषमा अधिकतम कति रकम कट्टी दाबी गर्न पाइन्छ?',
      aEn: 'Under the amended Income Tax Act, the deduction limit for contributions to approved retirement funds (SSF, EPF, CIT) is 1/3rd of assessable income or up to NPR 500,000 per fiscal year (increased from the previous NPR 300,000 ceiling).',
      aNp: 'संशोधित आयकर ऐन अनुसार सामाजिक सुरक्षा कोष (SSF), सञ्चय कोष वा नागरिक लगानी कोषमा जम्मा गरिएको रकममध्ये कुल आम्दानीको १/३ भाग वा अधिकतम रु. ५,००,००० (पहिलेको ३ लाखबाट वृद्धि) सम्म करयोग्य आयबाट कट्टी गर्न पाइन्छ।'
    },
    {
      qEn: 'What is the Safe Harbour Rule introduced in the Finance Act 2083?',
      qNp: 'आर्थिक ऐन २०८३ मा व्यवस्था गरिएको सेफ हार्बर रुल (Safe Harbour Rule) के हो?',
      aEn: 'Under Section 33ka of the Income Tax Act, taxpayers with controlled annual group transactions up to NPR 1 Billion can adopt predefined government transfer pricing benchmarks/margins to achieve automatic transfer pricing compliance without exhaustive audits.',
      aNp: 'आयकर ऐनको दफा ३३क अनुसार वार्षिक रु. १ अर्ब सम्मको नियन्त्रित कारोबार भएका करदाताले सरकारले तोकेको निश्चित नाफा मार्जिन वा दर अपनाई सहज रूपमा ट्रान्सफर प्राइसिङ अनुपालन गर्न सक्ने व्यवस्था हो।'
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
                ? 'नेपाल सरकारको पछिल्लो आर्थिक ऐन २०८३ र बजेट वक्तव्य अनुसार पूँजीगत लाभकर (CGT), आयकर स्ल्याब, स्थायी लेखा नम्बर (PAN), मू.अ.कर (VAT) र टीडीएस सम्बन्धी आधिकारिक, अद्यावधिक तथा अन्तरक्रियात्मक मार्गदर्शन।'
                : 'Authoritative tax literacy, latest Capital Gains Tax (CGT) amendments, income tax estimation, PAN workflows, and VAT guidelines under the Finance Act 2083 of the Government of Nepal.'}
            </p>
          </div>

          {/* LATEST BUDGET FY 2083/84 REFORM HIGHLIGHTS RIBBON */}
          <div className="budget-reform-ribbon">
            <div className="reform-ribbon-left">
              <span className="reform-pill-badge">{lang === 'np' ? 'नयाँ संशोधन' : 'NEW AMENDMENT'}</span>
              <div className="reform-text-wrap">
                <span className="reform-title">
                  {lang === 'np' ? 'आर्थिक ऐन २०८३ बजेट संशोधन तथा पूँजीगत लाभकर राहत' : 'Finance Act 2083: Capital Gains Tax Relief & Threshold Revisions'}
                </span>
                <span className="reform-desc">
                  {lang === 'np'
                    ? 'दीर्घकालीन सेयर लाभकर ३.७५% मा झारिएको, घरजग्गा लाभकर १०% / ७.५% कायम, र सेवा कारोबारको भ्याट सीमा रु. ३० लाख।'
                    : 'Long-term share CGT reduced to 3.75%, real estate CGT set at 10% / 7.5%, and services VAT threshold raised to NPR 30 Lakhs.'}
                </span>
              </div>
            </div>
            <span className="cgt-final-pill">{lang === 'np' ? 'लागू: २०८३ साउन १ देखि' : 'Effective: Shrawan 1, 2083'}</span>
          </div>

          {/* Key Facts / Metrics Bar */}
          <div className="tax-metrics-bar">
            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'सेयर लाभकर (दीर्घकालीन)' : 'Share CGT (Long-Term)'}</span>
              <span className="metric-value">3.75%</span>
              <span className="metric-sub">{lang === 'np' ? 'अल्पकालीन: ५.००% (अन्तिम कर)' : 'Short-Term: 5.00% (Final)'}</span>
            </div>

            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'घरजग्गा लाभकर' : 'Real Estate CGT'}</span>
              <span className="metric-value">10% / 7.5%</span>
              <span className="metric-sub">{lang === 'np' ? '५ वर्ष मुनि १०% / माथि ७.५%' : '≤5 yrs: 10% | >5 yrs: 7.5%'}</span>
            </div>

            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'व्यक्तिगत छुट सीमा' : 'Basic Exemption (Single)'}</span>
              <span className="metric-value">NPR 5,00,000</span>
              <span className="metric-sub">{lang === 'np' ? 'दम्पती: रु. ६,००,०००' : 'Married: NPR 6,00,000'}</span>
            </div>

            <div className="tax-metric-card">
              <span className="metric-label">{lang === 'np' ? 'मू.अ.कर (VAT) दर्ता सीमा' : 'VAT Registration Threshold'}</span>
              <span className="metric-value">{lang === 'np' ? 'रु. ३० लाख' : 'NPR 30 Lakhs'}</span>
              <span className="metric-sub">{lang === 'np' ? 'वस्तु व्यापार: रु. ५० लाख' : 'Goods: NPR 50 Lakhs'}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tax-tabs-container">
            <nav className="tax-tabs-nav" aria-label="Tax Topics">
              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'cgt' ? 'active' : ''}`}
                onClick={() => setActiveTab('cgt')}
              >
                <TrendingUp size={16} />
                <span>{lang === 'np' ? '१. पूँजीगत लाभकर (CGT & सेयर)' : '1. Capital Gains Tax (CGT)'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'pan' ? 'active' : ''}`}
                onClick={() => setActiveTab('pan')}
              >
                <UserCheck size={16} />
                <span>{lang === 'np' ? '२. प्यान (PAN) दर्ता' : '2. PAN Registration'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'income-tax' ? 'active' : ''}`}
                onClick={() => setActiveTab('income-tax')}
              >
                <Calculator size={16} />
                <span>{lang === 'np' ? '३. आयकर र क्यालकुलेटर' : '3. Income Tax & Calculator'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'vat' ? 'active' : ''}`}
                onClick={() => setActiveTab('vat')}
              >
                <Receipt size={16} />
                <span>{lang === 'np' ? '४. मू.अ.कर (VAT)' : '4. Value Added Tax (VAT)'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'tds' ? 'active' : ''}`}
                onClick={() => setActiveTab('tds')}
              >
                <CreditCard size={16} />
                <span>{lang === 'np' ? '५. टीडीएस (TDS & ETDS)' : '5. TDS & ETDS'}</span>
              </button>

              <button
                type="button"
                className={`tax-tab-btn ${activeTab === 'rights' ? 'active' : ''}`}
                onClick={() => setActiveTab('rights')}
              >
                <ShieldCheck size={16} />
                <span>{lang === 'np' ? '६. करदाता अधिकार' : '6. Taxpayer Rights'}</span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TAB CONTENT PANELS
          ========================================================================= */}
      <main className="container-wide taxpayer-content-body">

        {/* TAB 1: CAPITAL GAINS TAX (CGT) & INTERACTIVE CGT CALCULATOR */}
        {activeTab === 'cgt' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'पूँजीगत लाभकर (Capital Gains Tax - CGT) दिग्दर्शन' : 'Capital Gains Tax (CGT) Framework & Calculator'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'आर्थिक ऐन २०८३ को संशोधन अनुसार नेप्से (NEPSE) सेयर, गैर-सूचीकृत सेयर तथा घरजग्गा बिक्रीमा लाग्ने पूँजीगत लाभकरका आधिकारिक दरहरू।'
                  : 'Latest statutory provisions for capital gains taxation on securities and real estate under the Finance Act 2083.'}
              </p>
            </div>

            {/* CGT Slabs Comparison Table */}
            <div className="tax-table-container">
              <table className="tax-data-table">
                <thead>
                  <tr>
                    <th>{lang === 'np' ? 'सम्पत्तिको प्रकृति' : 'Asset Category'}</th>
                    <th>{lang === 'np' ? 'स्वामित्व अवधि (Holding Period)' : 'Holding Period'}</th>
                    <th>{lang === 'np' ? 'पूँजीगत लाभकर दर (CGT Rate)' : 'CGT Rate'}</th>
                    <th>{lang === 'np' ? 'करको वैधानिक हैसियत' : 'Tax Treatment'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>{lang === 'np' ? 'सूचीकृत सेयर (NEPSE Listed Shares)' : 'Listed Securities (NEPSE)'}</strong></td>
                    <td>{lang === 'np' ? '३६५ दिन वा सो भन्दा कम (अल्पकालीन)' : '≤ 365 Days (Short-Term)'}</td>
                    <td>
                      <span className="cgt-rate-badge short-term">5.00%</span>
                    </td>
                    <td><span className="cgt-final-pill">{lang === 'np' ? 'अन्तिम कर कट्टी (Final Tax)' : 'Final Withholding Tax (ITA Sec 95Ka)'}</span></td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'सूचीकृत सेयर (NEPSE Listed Shares)' : 'Listed Securities (NEPSE)'}</strong></td>
                    <td>{lang === 'np' ? '३६५ दिन भन्दा बढी (दीर्घकालीन)' : '> 365 Days (Long-Term)'}</td>
                    <td>
                      <span className="cgt-rate-badge long-term">3.75%</span>
                    </td>
                    <td><span className="cgt-final-pill">{lang === 'np' ? 'अन्तिम कर कट्टी (Final Tax)' : 'Final Withholding Tax (ITA Sec 95Ka)'}</span></td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'गैर-सूचीकृत सेयर (Unlisted Shares)' : 'Unlisted Company Shares'}</strong></td>
                    <td>{lang === 'np' ? 'प्राकृतिक व्यक्तिको हकमा' : 'Resident Individuals'}</td>
                    <td><span className="font-bold text-gov-blue">10.00%</span></td>
                    <td>{lang === 'np' ? 'अन्तिम कर (कम्पनीको हकमा १५%)' : 'Final Tax (15% for Entities)'}</td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'घरजग्गा तथा अचल सम्पत्ति (Real Estate)' : 'Land & Buildings (Real Estate)'}</strong></td>
                    <td>{lang === 'np' ? '५ वर्ष वा सो भन्दा कम स्वामित्व' : '≤ 5 Years Ownership'}</td>
                    <td><span className="font-bold text-crimson">10.00%</span></td>
                    <td>{lang === 'np' ? 'मालपोत कार्यालयमा बुझाउने अन्तिम कर' : 'Final Tax at Land Revenue Office'}</td>
                  </tr>
                  <tr>
                    <td><strong>{lang === 'np' ? 'घरजग्गा तथा अचल सम्पत्ति (Real Estate)' : 'Land & Buildings (Real Estate)'}</strong></td>
                    <td>{lang === 'np' ? '५ वर्ष भन्दा बढी स्वामित्व' : '> 5 Years Ownership'}</td>
                    <td><span className="font-bold text-gov-blue">7.50%</span></td>
                    <td>{lang === 'np' ? 'मालपोत कार्यालयमा बुझाउने अन्तिम कर' : 'Final Tax at Land Revenue Office'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* INTERACTIVE CAPITAL GAINS TAX CALCULATOR */}
            <div className="tax-calculator-box">
              <div className="calculator-head">
                <div className="calc-icon-badge">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="calc-title">
                    {lang === 'np' ? 'अन्तरक्रियात्मक पूँजीगत लाभकर क्यालकुलेटर (FY 2083/84)' : 'Interactive Capital Gains Tax (CGT) Calculator'}
                  </h3>
                  <span className="text-xs text-muted">
                    {lang === 'np' ? 'सेयर वा घरजग्गाको खरिद-बिक्री मूल्य प्रविष्ट गरी तत्काल लाभकर हिसाब गर्नुहोस्' : 'Select asset type, holding period and enter prices to compute real-time capital gains tax'}
                  </span>
                </div>
              </div>

              <div className="calc-grid-form">
                <div className="calc-field">
                  <label htmlFor="cgt-asset-select">{lang === 'np' ? 'सम्पत्तिको प्रकार' : 'Asset Type'}</label>
                  <select
                    id="cgt-asset-select"
                    className="calc-select"
                    value={cgtAssetType}
                    onChange={(e) => setCgtAssetType(e.target.value)}
                  >
                    <option value="listed-shares">{lang === 'np' ? 'सूचीकृत सेयर (NEPSE Shares)' : 'Listed Securities (NEPSE)'}</option>
                    <option value="unlisted-shares">{lang === 'np' ? 'गैर-सूचीकृत सेयर (Unlisted Shares)' : 'Unlisted Company Shares'}</option>
                    <option value="real-estate">{lang === 'np' ? 'घरजग्गा तथा जग्गा (Real Estate)' : 'Land & Building (Real Estate)'}</option>
                  </select>
                </div>

                <div className="calc-field">
                  <label htmlFor="cgt-holding-select">
                    {cgtAssetType === 'real-estate'
                      ? (lang === 'np' ? 'स्वामित्व अवधि (वर्ष)' : 'Ownership Period (Years)')
                      : (lang === 'np' ? 'स्वामित्व अवधि (दिन)' : 'Holding Period (Days)')}
                  </label>
                  <select
                    id="cgt-holding-select"
                    className="calc-select"
                    value={cgtHoldingPeriod}
                    onChange={(e) => setCgtHoldingPeriod(e.target.value)}
                  >
                    {cgtAssetType === 'real-estate' ? (
                      <>
                        <option value="short-term">{lang === 'np' ? '५ वर्ष वा सो भन्दा कम (१०%)' : '≤ 5 Years Ownership (10%)'}</option>
                        <option value="long-term">{lang === 'np' ? '५ वर्ष भन्दा बढी (७.५%)' : '> 5 Years Ownership (7.5%)'}</option>
                      </>
                    ) : (
                      <>
                        <option value="short-term">{lang === 'np' ? '३६५ दिन वा कम (५.००%)' : '≤ 365 Days Short-Term (5.00%)'}</option>
                        <option value="long-term">{lang === 'np' ? '३६५ दिन भन्दा बढी (३.७५%)' : '> 365 Days Long-Term (3.75%)'}</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="calc-field">
                  <label htmlFor="cgt-buy-input">{lang === 'np' ? 'खरिद / लागत मूल्य (NPR)' : 'Purchase / Cost Price (NPR)'}</label>
                  <input
                    id="cgt-buy-input"
                    type="number"
                    min="0"
                    step="10000"
                    className="calc-input"
                    value={cgtBuyPrice}
                    onChange={(e) => setCgtBuyPrice(e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label htmlFor="cgt-sell-input">{lang === 'np' ? 'बिक्री मूल्य (NPR)' : 'Selling / Disposal Price (NPR)'}</label>
                  <input
                    id="cgt-sell-input"
                    type="number"
                    min="0"
                    step="10000"
                    className="calc-input"
                    value={cgtSellPrice}
                    onChange={(e) => setCgtSellPrice(e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label htmlFor="cgt-exp-input">{lang === 'np' ? 'ब्रोकर / हस्तान्तरण खर्च (NPR)' : 'Broker / Transfer Expenses (NPR)'}</label>
                  <input
                    id="cgt-exp-input"
                    type="number"
                    min="0"
                    step="1000"
                    className="calc-input"
                    value={cgtExpenses}
                    onChange={(e) => setCgtExpenses(e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label>{lang === 'np' ? 'लागू हुने लाभकर दर' : 'Applicable Tax Rate'}</label>
                  <div className="calc-input font-bold text-gov-blue" style={{ background: 'rgba(0, 56, 147, 0.05)' }}>
                    {cgtCalculation.rateLabel}
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="calc-results-panel">
                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'खुद पूँजीगत नाफा / लाभ' : 'Net Capital Gain'}</span>
                  <span className="calc-res-val">NPR {cgtCalculation.netGain.toLocaleString()}</span>
                </div>

                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'बुझाउनुपर्ने पूँजीगत लाभकर (CGT)' : 'Total Capital Gains Tax'}</span>
                  <span className="calc-res-val highlight-tax">NPR {Math.round(cgtCalculation.cgtAmount).toLocaleString()}</span>
                </div>

                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'करको वैधानिक हैसियत' : 'Statutory Status'}</span>
                  <span className="text-xs font-bold text-gov-blue">{cgtCalculation.finalTaxStatus}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAN REGISTRATION */}
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
                    <th>{lang === 'np' ? 'सरकारी शुल्क' : 'Government Fee'}</th>
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

        {/* TAB 3: INCOME TAX SLABS & INTERACTIVE CALCULATOR */}
        {activeTab === 'income-tax' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'आयकर स्ल्याब तथा अन्तरक्रियात्मक कर क्यालकुलेटर (FY 2083/84)' : 'Income Tax Slabs & Interactive Tax Calculator (FY 2083/84)'}
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

            {/* Statutory Allowable Deductions Summary */}
            <div className="steps-grid-row" style={{ marginTop: '24px' }}>
              <div className="step-flow-card">
                <span className="step-number-badge"><ShieldCheck size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? 'SSF / अवकाश कोष कट्टी' : 'Retirement / SSF Deduction'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'कुल आम्दानीको १/३ भाग वा अधिकतम रु. ५,००,००० सम्म सामाजिक सुरक्षा कोष वा सञ्चय कोषमा गरिएको योगदान पूर्ण कट्टी हुन्छ।'
                    : 'Up to 1/3rd of assessable income or maximum NPR 500,000 contributed to approved funds is fully tax-deductible.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><Award size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? 'बीमा प्रिमियम कट्टी' : 'Insurance Deductions'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'जीवन बीमा: रु. ४०,००० सम्म; स्वास्थ्य बीमा: रु. २०,००० सम्म; आवासीय घर बीमा: रु. ५,००० सम्म कट्टी पाइन्छ।'
                    : 'Life insurance up to NPR 40,000, health insurance up to NPR 20,000, and residential property insurance up to NPR 5,000.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><Scale size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? 'उपचार खर्च कर क्रेडिट' : 'Medical Tax Credit'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'स्वीकृत उपचार खर्चको १५% वा अधिकतम रु. १,५०० सम्म कर दायित्वबाट सिधै घटाउन पाइन्छ।'
                    : '15% of approved medical expenses up to NPR 1,500 can be directly credited against total computed tax liability.'}
                </p>
              </div>
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
                  <label htmlFor="tax-ssf-input">{lang === 'np' ? 'SSF / सञ्चय कोष योगदान (Max 5L)' : 'SSF / PF Contribution (Max 5L)'}</label>
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

                <div className="calc-field">
                  <label htmlFor="tax-ins-input">{lang === 'np' ? 'जीवन बीमा प्रिमियम (Max 40k)' : 'Life Insurance (Max 40k)'}</label>
                  <input
                    id="tax-ins-input"
                    type="number"
                    min="0"
                    max="40000"
                    step="5000"
                    className="calc-input"
                    value={calcInsurance}
                    onChange={(e) => setCalcInsurance(e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label htmlFor="tax-health-input">{lang === 'np' ? 'स्वास्थ्य बीमा प्रिमियम (Max 20k)' : 'Health Insurance (Max 20k)'}</label>
                  <input
                    id="tax-health-input"
                    type="number"
                    min="0"
                    max="20000"
                    step="2000"
                    className="calc-input"
                    value={calcHealthIns}
                    onChange={(e) => setCalcHealthIns(e.target.value)}
                  />
                </div>

                <div className="calc-field">
                  <label>{lang === 'np' ? 'कुल कर छुट कट्टीहरू' : 'Total Allowable Deductions'}</label>
                  <div className="calc-input font-bold text-gov-blue" style={{ background: 'rgba(0, 56, 147, 0.05)' }}>
                    NPR {taxCalculation.totalDeductions.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="calc-results-panel">
                <div className="calc-res-item">
                  <span className="calc-res-label">{lang === 'np' ? 'करयोग्य आय (Taxable Income)' : 'Taxable Income'}</span>
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

        {/* TAB 4: VALUE ADDED TAX (VAT) */}
        {activeTab === 'vat' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'मूल्य अभिवृद्धि कर (VAT) दिग्दर्शन तथा संशोधन' : 'Value Added Tax (VAT) Guidelines & Amendments'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'मू.अ.कर ऐन, २०५२ अनुसार कर बीजक जारी गर्ने, अनिवार्य दर्ता सीमा (रु. ३० लाख सेवा / रु. ५० लाख वस्तु) र मासिक कर दाखिला।'
                  : 'Statutory compliance for revised VAT registration thresholds, tax invoicing, input credit adjustments, and return filings.'}
              </p>
            </div>

            <div className="steps-grid-row">
              <div className="step-flow-card">
                <span className="step-number-badge"><Receipt size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? '१३% एकल दर प्रणाली' : '13% Single Standard Rate'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'नेपालमा वस्तु तथा सेवाको बिक्रीमा १३% मू.अ.कर लाग्छ। निर्यात कारोबारमा ०% दर र अनुसूची–१ का आधारभूत वस्तुहरूमा कर छुटको व्यवस्था छ।'
                    : 'Nepal enforces a single standard VAT rate of 13%. Export transactions are zero-rated (0%), and essential goods in Schedule 1 are exempt.'}
                </p>
              </div>

              <div className="step-flow-card">
                <span className="step-number-badge"><FileText size={14} /></span>
                <h3 className="step-title">{lang === 'np' ? 'अनिवार्य दर्ता सीमा (संशोधित)' : 'Revised Registration Threshold'}</h3>
                <p className="step-desc">
                  {lang === 'np'
                    ? 'पछिल्लो १२ महिनामा वस्तुको कारोबार रु. ५० लाख वा सेवा तथा मिश्रित कारोबार रु. ३० लाख (पहिले २० लाख) नाघेमा अनिवार्य दर्ता हुनुपर्छ।'
                    : 'Mandatory VAT registration applies when annual turnover exceeds NPR 50 Lakhs (goods) or NPR 30 Lakhs (services/mixed transactions).'}
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

        {/* TAB 5: TDS & ETDS */}
        {activeTab === 'tds' && (
          <div className="tax-guide-panel">
            <div className="panel-header-block">
              <h2 className="panel-title">
                {lang === 'np' ? 'कर कट्टी (TDS) तथा ई-टीडीएस (ETDS) प्रणाली' : 'Tax Deduction at Source (TDS) & ETDS Protocol'}
              </h2>
              <p className="panel-subtitle">
                {lang === 'np'
                  ? 'भुक्तानी गर्दा अग्रिम कर कट्टी गर्ने वैधानिक दरहरू र अनलाइन ई-टीडीएस प्रविष्टि।'
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

        {/* TAB 6: TAXPAYER RIGHTS */}
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
