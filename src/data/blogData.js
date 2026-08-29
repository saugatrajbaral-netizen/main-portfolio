export const blogCategories = [
  'All Commentary',
  'Direct Taxation & TDS',
  'VAT & Billing Audits',
  'Digital IRD & E-Governance',
  'Fiscal Policy & Reforms',
  'Taxpayer Rights & Advisory'
];

export const quickTaxRates = [
  { section: 'Sec. 88 (1)', type: 'Professional & Consultancy Fees', rate: '15%', note: 'Deductible at source by withholding entity upon payment/credit', category: 'Direct Tax' },
  { section: 'Sec. 88 (1) (2)', type: 'House Rent (Corporate/Institutional)', rate: '10%', note: 'Applicable when rented to corporate bodies or business entities', category: 'Direct Tax' },
  { section: 'Sec. 89 (1)', type: 'Contract & Procurement (> Rs. 50,000)', rate: '1.5%', note: 'Procurement contracts executed under Public Procurement Act or corporate tenders', category: 'Direct Tax' },
  { section: 'Sec. 92', type: 'Dividend Payment by Domestic Entity', rate: '5%', note: 'Final withholding tax for resident natural persons', category: 'Final Withholding' },
  { section: 'Sec. 95Ka', type: 'Real Estate Gain (< 5 Yrs Holding)', rate: '7.5%', note: 'Withheld at Land Revenue Office upon registration deed transfer', category: 'Capital Gains' },
  { section: 'Sec. 95Ka', type: 'Real Estate Gain (≥ 5 Yrs Holding)', rate: '5.0%', note: 'Concessional rate for long-term residential holdings', category: 'Capital Gains' },
  { section: 'Sec. 95Ka (2)', type: 'NEPSE Listed Securities Gain (Resident)', rate: '5.0% / 7.5%', note: '5% for holding >365 days; 7.5% for short-term trading under 365 days', category: 'Capital Gains' },
  { section: 'VAT Act 2052', type: 'Standard Value Added Tax (VAT)', rate: '13%', note: 'Applicable to taxable supplies of goods and services nationwide', category: 'Indirect Tax' }
];

export const blogPosts = [
  {
    id: 'post-1',
    slug: 'demystifying-tds-corporate-tax-withholding-nepal',
    title: 'Demystifying TDS & Corporate Withholding Under the Income Tax Act 2058',
    subtitle: 'A practical enforcement perspective on withholding liabilities, Section 87-89 compliance, and common audit pitfalls.',
    category: 'Direct Taxation & TDS',
    publishedDate: 'August 14, 2026',
    readTime: '6 min read',
    audioDuration: '5:40',
    featured: true,
    views: '2,840',
    likesCount: 148,
    statutoryRef: 'Nepal Income Tax Act, 2058 (Sec. 87, 88, 89, 90) & Finance Act 2081/82',
    colorTheme: 'blue',
    iconName: 'Scale',
    tags: ['TDS', 'Income Tax Act 2058', 'Withholding Tax', 'Corporate Compliance', 'IRD Directives'],
    summary: 'An administrative analysis of Tax Deducted at Source (TDS) obligations in Nepal, dissecting common compliance lapses among withholding agents, final vs. non-final withholding distinctions, and audit verification techniques.',
    citation: 'Baral, S. R. (2026). "Demystifying TDS & Corporate Withholding Under the Income Tax Act 2058." Nepal Inland Revenue Governance Journal, Vol. 4(2), pp. 12-24.',
    keyTakeaways: [
      'Withholding agents bear primary legal liability for un-deducted or un-deposited TDS under Section 90 of the Income Tax Act 2058.',
      'Distinguishing between final withholding payments (e.g., specific interest, dividends) and advance tax credits is critical during year-end assessments.',
      'E-TDS portal reconciliations and monthly PAN-linked deposit schedules prevent severe interest and late-filing penalties under Sections 117-120.'
    ],
    sections: [
      {
        heading: '1. The Jurisprudential Basis of Withholding Taxation in Nepal',
        content: `Tax Deducted at Source (TDS) serves as the primary liquidity engine of Nepal's revenue administration. By placing the duty of deduction on the payer at the moment of payment realization or booking, the Income Tax Act ensures continuous revenue inflow to the state treasury while mitigating year-end tax avoidance.

However, during field inspections and statutory corporate assessments, we frequently observe systemic misinterpretations regarding the scope of taxable payments under Section 88 (Service Fees, Contractual Payments) and Section 89 (Contractual & Construction Procurements).`
      },
      {
        heading: '2. Critical Compliance Pitfalls: Section 88 vs. Section 89',
        content: `A frequent area of contention arises when classifying specialized consultancy vs. general supply-and-installation contracts:
- Professional & Technical Service Fees: Attract 15% TDS for non-registered or standard consultancy, subject to specific treaty or threshold concessions.
- Goods Supply vs. Service Contracts: Section 89 mandates a 1.5% deduction on contracts exceeding Rs. 50,000 for government and corporate entities, yet many entities overlook composite contracts where service and material components are improperly bundled.

Withholding agents must maintain transparent audit trails, formal tax invoices, and timely e-TDS entry into the IRD Integrated Tax System (ITS).`
      },
      {
        heading: '3. Legal Ramifications for Defaulting Withholding Agents',
        content: `Under Section 90, if an agent fails to deduct tax or fails to remit deducted tax within the 25th day of the following month, the tax becomes recoverable directly from the withholding agent as if it were their own liability, accompanied by compounding interest under Section 118 and statutory penalties.

Ensuring compliance not only shields businesses from compounding liabilities but also fosters a transparent fiscal culture that underpins Nepal's sovereign economic independence.`
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'combating-under-invoicing-cbms-vat-evasion',
    title: 'Combating Under-Invoicing & VAT Evasion: The Role of Real-Time Electronic Billing (CBMS)',
    subtitle: 'How the Central Billing Monitoring System (CBMS) is transforming indirect tax surveillance and value chain transparency.',
    category: 'VAT & Billing Audits',
    publishedDate: 'July 28, 2026',
    readTime: '8 min read',
    audioDuration: '7:15',
    featured: false,
    views: '3,410',
    likesCount: 194,
    statutoryRef: 'Value Added Tax Act, 2052 & CBMS Integration Directives (IRD)',
    colorTheme: 'emerald',
    iconName: 'Receipt',
    tags: ['VAT Act 2052', 'CBMS', 'Electronic Billing', 'Anti-Evasion', 'Tax Forensics'],
    summary: 'A deep-dive into how real-time fiscal cash register integration and API-level invoice reporting under CBMS are eliminating dual bookkeeping and fortifying input tax credit integrity in Nepal.',
    citation: 'Baral, S. R. (2026). "Combating Under-Invoicing & VAT Evasion: The Role of Real-Time Electronic Billing (CBMS)." IRD Policy Insights Series, 2026(3).',
    keyTakeaways: [
      'CBMS connects merchant point-of-sale software directly to IRD servers, ensuring instantaneous invoice verification.',
      'Input tax credit claims require unbroken, authentic invoice trails; fictitious invoicing is swiftly detected via automated cross-matching algorithms.',
      'Mandatory electronic billing across designated turnover thresholds is the cornerstone of formalizing the retail and wholesale trade ecosystems.'
    ],
    sections: [
      {
        heading: '1. The Structural Challenge of Shadow Transactions in Retail & Wholesale',
        content: `Value Added Tax (VAT), structured on the invoice-credit mechanism under the VAT Act 2052, relies fundamentally on the integrity of the transaction document. For years, the practice of under-invoicing, manual bill manipulation, and informal counter sales hindered accurate revenue collection.

The Inland Revenue Department's rollout of the Central Billing Monitoring System (CBMS) represents a generational leap from post-audit detection to real-time transaction oversight.`
      },
      {
        heading: '2. Technical Architecture & Verification Algorithms',
        content: `Under the approved electronic billing directives, billing software utilized by taxpayers with turnovers exceeding statutory thresholds must be validated and accredited by IRD. Each fiscal transaction generates a unique alphanumeric signature, synced in real-time to the central IRD data repository.

This architecture enables tax officers to conduct instant cross-verifications between buyers' purchase registers and sellers' sales ledgers, identifying anomalies before refund or credit claims are settled.`
      },
      {
        heading: '3. Enforcement Strategy & Future Milestones',
        content: `The path forward requires expanding CBMS coverage beyond departmental stores, hospitality, and large wholesalers into tier-2 commercial municipalities. Simultaneously, consumer incentives—such as instant VAT refund percentages on electronic consumer payments—encourage voluntary taxpayer vigilance at the cash counter.`
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'data-driven-tax-administration-ai-customs-banking-integration',
    title: 'Data-Driven Tax Administration: Integrating IRD, Customs & Financial Intelligence',
    subtitle: 'Leveraging multi-agency data pipelines and predictive anomaly models to dismantle tax evasion networks.',
    category: 'Digital IRD & E-Governance',
    publishedDate: 'June 19, 2026',
    readTime: '7 min read',
    audioDuration: '6:30',
    featured: false,
    views: '2,190',
    likesCount: 162,
    statutoryRef: 'Inland Revenue Department Strategic Reform Plan & PFM Modernization Directives',
    colorTheme: 'cyan',
    iconName: 'Cpu',
    tags: ['E-Governance', 'Big Data', 'Customs ASYCUDA', 'Financial Intelligence Unit', 'Risk-Based Audit'],
    summary: 'Examining the technical and administrative synergies achieved by integrating Inland Revenue data with ASYCUDA Customs import declarations, banking transaction records, and property registries.',
    citation: 'Baral, S. R. (2026). "Data-Driven Tax Administration: Integrating IRD, Customs & Financial Intelligence." Public Financial Management Review, Vol. 8, pp. 45-58.',
    keyTakeaways: [
      'Triangulating Customs declarations (ASYCUDA World) with domestic VAT filings detects import undervaluation at the border.',
      'Automated risk-scoring algorithms replace arbitrary discretionary audit selections with objective, probability-based targets.',
      'Safeguarding taxpayer data privacy and ensuring cryptographic protocol integrity remain paramount throughout digital transformation.'
    ],
    sections: [
      {
        heading: '1. Moving Beyond Siloed Tax Governance',
        content: `Traditional tax administration relied heavily on periodic, manual declarations submitted by taxpayers. In an interconnected economy characterized by digital trade, multi-tier supply chains, and cross-border remittances, departmental silos create blind spots.

Modern tax administration demands systemic integration between the Inland Revenue Department (IRD), the Department of Customs (ASYCUDA World), the Financial Intelligence Unit (FIU) of Nepal Rastra Bank, and Land Revenue (Malpot) offices.`
      },
      {
        heading: '2. Predictive Anomaly Detection in Risk-Based Audits',
        content: `Risk-based audit selection (RBAS) uses statistical outlier algorithms to identify entities whose reported gross profit margins, inventory-to-sales ratios, or withholding ratios deviate substantially from industry benchmarks.

By analyzing customs import values against declared domestic sales, automated flags immediately surface instances of artificial inventory buildup or clandestine off-the-book liquidations.`
      },
      {
        heading: '3. Institutional Integrity & Citizen Trust',
        content: `Digital transparency not only protects public revenue but also eliminates arbitrary administrative harassment. When audit selection is automated and transparent, honest taxpayers enjoy seamless, friction-free compliance, while non-compliant actors face swift, evidence-backed administrative inquiry.`
      }
    ]
  },
  {
    id: 'post-4',
    slug: 'voluntary-compliance-taxpayer-trust-framework',
    title: 'Building Taxpayer Trust: The Pivot from Coercive Enforcement to Voluntary Facilitation',
    subtitle: 'Why institutional transparency, clear administrative guidelines, and dispute mediation drive sustainable public revenue.',
    category: 'Taxpayer Rights & Advisory',
    publishedDate: 'May 04, 2026',
    readTime: '5 min read',
    audioDuration: '4:50',
    featured: false,
    views: '1,950',
    likesCount: 135,
    statutoryRef: 'Taxpayer Charter & Administrative Review Standards (Section 114, 115 ITA 2058)',
    colorTheme: 'indigo',
    iconName: 'Shield',
    tags: ['Taxpayer Rights', 'Administrative Review', 'Voluntary Compliance', 'Public Trust', 'Good Governance'],
    summary: 'A civil servant perspective on why simplifying procedures, publishing transparent tax rulings, and fostering taxpayer respect yield far higher compliance rates than punitive measures alone.',
    citation: 'Baral, S. R. (2026). "Building Taxpayer Trust: The Pivot from Coercive Enforcement to Voluntary Facilitation." Journal of Administrative Law & Public Policy, 2026.',
    keyTakeaways: [
      'Voluntary compliance is maximized when tax laws are unambiguous, filing portals are frictionless, and dispute resolution is swift.',
      'Administrative review procedures under Section 115 provide taxpayers with an accessible, fair channel to contest erroneous assessments before escalating to the Revenue Tribunal.',
      'Tax education and pre-filing advisory desks bridge the knowledge gap for small-and-medium enterprises (SMEs).'
    ],
    sections: [
      {
        heading: '1. The Philosophy of Voluntary Compliance',
        content: `Revenue administration in a constitutional democracy is founded on a social contract between citizens and the state. Taxes are not merely statutory extractions; they represent collective investments in national infrastructure, education, healthcare, and social security.

When tax administration is perceived as opaque or adversarial, compliance costs rise and the informal economy expands. Conversely, transparent guidance and respectful engagement cultivate voluntary compliance.`
      },
      {
        heading: '2. Streamlining Administrative Reviews & Dispute Mediation',
        content: `Under Section 115 of the Income Tax Act, any taxpayer aggrieved by an assessment order possesses the statutory right to file an Application for Administrative Review before the Director General.

Ensuring prompt, objective, and evidence-grounded review at this departmental stage resolves over 70% of bona fide misunderstandings without necessitating costly, multi-year litigation at the Revenue Tribunal or Supreme Court.`
      },
      {
        heading: '3. Empowering Small Taxpayers & Fostering Formalization',
        content: `Small and micro-enterprises (Presumptive and Turnover Tax filers under Section 4(4)) form the backbone of local employment. Providing simplified mobile tax filing, localized orientation clinics, and clear tax deduction tables ensures that formalization is seen not as a burden, but as a gateway to institutional credit and business growth.`
      }
    ]
  },
  {
    id: 'post-5',
    slug: 'transfer-pricing-scrutiny-multinational-enterprises-nepal',
    title: 'Transfer Pricing & Cross-Border Transactions: Emerging Scrutiny for Multinational Enterprises',
    subtitle: 'Applying the Arm’s Length Principle under Section 33 to prevent base erosion and profit shifting (BEPS).',
    category: 'Fiscal Policy & Reforms',
    publishedDate: 'April 11, 2026',
    readTime: '6 min read',
    audioDuration: '6:10',
    featured: false,
    views: '2,670',
    likesCount: 177,
    statutoryRef: 'Nepal Income Tax Act, 2058 (Section 33 - Transfer Pricing) & OECD Guidelines',
    colorTheme: 'amber',
    iconName: 'Globe',
    tags: ['Transfer Pricing', 'Arm\'s Length Principle', 'BEPS', 'Cross-Border', 'Corporate Law'],
    summary: 'An analytical exploration of Section 33 statutory powers empowering tax officers to re-characterize non-arm’s length transactions between associated foreign and domestic entities.',
    citation: 'Baral, S. R. (2026). "Transfer Pricing & Cross-Border Transactions: Emerging Scrutiny for Multinational Enterprises in Nepal." International Fiscal Review.',
    keyTakeaways: [
      'Section 33 grants the tax administration authority to adjust income and expenses between related parties to reflect market conditions.',
      'Management fees, intellectual property royalties, and inter-company loans are primary focal areas for transfer pricing documentation reviews.',
      'Aligning domestic transfer pricing rules with international OECD/UN standards enhances Nepal’s fiscal credibility and prevents double non-taxation.'
    ],
    sections: [
      {
        heading: '1. The Mechanics of Base Erosion in Open Economies',
        content: `As Nepal expands foreign direct investment (FDI) inflows, multinational corporations (MNCs) frequently engage in transactions with foreign parent or sister companies. When inter-company service fees, technical know-how charges, or loan interest rates are inflated above market norms, taxable profits in Nepal are artificially eroded.

Section 33 of the Income Tax Act provides the statutory cornerstone for re-aligning such transactions to the universally accepted "Arm's Length Principle".`
      },
      {
        heading: '2. Methods of Transfer Pricing Assessment',
        content: `In audit proceedings, tax authorities evaluate transactions utilizing standard comparability methods:
1. Comparable Uncontrolled Price (CUP) Method: Direct comparison with prices charged in independent transactions.
2. Resale Price Method (RPM): Evaluating gross margins earned by distributors in comparable open-market settings.
3. Cost Plus Method (CPM) & Transactional Net Margin Method (TNMM): Auditing markups and operating profit ratios against industry benchmarks.

Maintaining contemporaneous transfer pricing documentation and economic justification is indispensable for compliant corporate groups.`
      },
      {
        heading: '3. Enhancing Institutional Capacity in International Taxation',
        content: `To effectively monitor complex cross-border contracts, our revenue administration continues to upskill specialized audit cadres in Double Taxation Avoidance Agreements (DTAA), country-by-country reporting, and beneficial ownership verification.`
      }
    ]
  },
  {
    id: 'post-6',
    slug: 'capital-gains-tax-real-estate-securities-nepal',
    title: 'Capital Gains Taxation in Nepal: Navigating Real Estate & Securities Assessments',
    subtitle: 'Clarifying statutory withholding rates, cost-basis adjustments, and exemptions under Section 95Ka.',
    category: 'Direct Taxation & TDS',
    publishedDate: 'March 02, 2026',
    readTime: '5 min read',
    audioDuration: '5:10',
    featured: false,
    views: '3,120',
    likesCount: 210,
    statutoryRef: 'Income Tax Act 2058 (Section 95Ka, Schedule 1) & Annual Financial Acts',
    colorTheme: 'blue',
    iconName: 'Landmark',
    tags: ['Capital Gains Tax', 'Real Estate', 'NEPSE Securities', 'Cost Basis', 'Withholding'],
    summary: 'A clear guide to calculating and reporting capital gains tax on land, buildings, listed securities, and unlisted corporate equities in accordance with Nepal fiscal laws.',
    citation: 'Baral, S. R. (2026). "Capital Gains Taxation in Nepal: Real Estate & Capital Market Compliance." National Revenue Bulletin, 2026.',
    keyTakeaways: [
      'Real estate gains are categorized based on holding periods (over vs. under 5 years) with tiered withholding rates at the Land Revenue Office.',
      'Securities traded on NEPSE are withheld by DP/broker intermediaries under Section 95Ka as advance tax subject to annual finality rules.',
      'Accurate cost indexation, documented enhancement expenses, and proper PAN registration ensure lawful tax optimization.'
    ],
    sections: [
      {
        heading: '1. Overview of Capital Asset Dispositions in Nepal',
        content: `Capital gains tax (CGT) represents a vital contributor to municipal and federal revenue pools. Under the Income Tax Act 2058, gains arising from the disposal of non-business taxable assets (land and private housing above statutory floor thresholds) and investment securities are subject to withholding at realization.`
      },
      {
        heading: '2. Calculation Methodologies & Holding Period Incentives',
        content: `For individual real estate transactions:
- Ownership exceeding 5 years: Attracts a concessional 5% capital gains withholding rate.
- Ownership under 5 years: Attracts a 7.5% rate to discourage speculative land hoarding.
- Corporate entities: Gains are integrated into net business income and assessed at the standard statutory corporate tax rate (25% or 30% for financial institutions).`
      },
      {
        heading: '3. Compliance Checklist for Property & Equity Disposals',
        content: `Taxpayers are advised to retain all original purchase deeds, municipal building completion certificates, registered brokerage transaction slips, and tax clearance receipts to substantiating cost bases and prevent unwarranted assessment additions during departmental reviews.`
      }
    ]
  }
];
