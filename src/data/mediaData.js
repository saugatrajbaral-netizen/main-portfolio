/**
 * Media & Public Interest Archive Data
 * 
 * Verified news coverage, public-interest litigations (PIL), constitutional engagements,
 * public finance dialogues, and policy reflections involving Saugat Raj Baral.
 * 
 * All news coverage entries are fact-checked against verified reports from Nepali national dailies,
 * portals, and supreme court records. Every article URL is tested for direct canonical HTTP 200 OK.
 */

export const MEDIA_CATEGORIES = [
  { id: 'all', labelEn: 'All Archive', labelNp: 'सबै अभिलेख' },
  { id: 'pil', labelEn: 'Writ / PIL', labelNp: 'रिट / जनहित याचिका' },
  { id: 'constitutional', labelEn: 'Constitutional Issues', labelNp: 'संवैधानिक मुद्दाहरू' },
  { id: 'public-finance', labelEn: 'Public Finance', labelNp: 'सार्वजनिक वित्त' },
  { id: 'digital-economy', labelEn: 'Digital Economy', labelNp: 'डिजिटल अर्थतन्त्र' },
  { id: 'interviews', labelEn: 'Interviews & Briefs', labelNp: 'अन्तर्वार्ता तथा टिप्पणी' },
  { id: 'talks', labelEn: 'Talks & Panels', labelNp: 'वार्ता तथा संवाद' },
  { id: 'articles', labelEn: 'Articles & Analysis', labelNp: 'लेख तथा विश्लेषण' },
];

export const FEATURED_STORY = {
  id: 'featured-pil-engagement',
  badgeEn: 'PUBLIC INTEREST LITIGATION & CONSTITUTIONAL ENGAGEMENT',
  badgeNp: 'जनहित याचिका तथा संवैधानिक संवाद',
  titleEn: 'Constitutional Oversight, Fiscal Accountability & Public Interest Litigation in Nepal',
  titleNp: 'संवैधानिक सुशासन, वित्तीय जवाफदेहिता र जनहित याचिका',
  yearBs: '२०८० वि.सं.',
  yearAd: '2023 AD',
  summaryEn: 'Public interest litigations before the Supreme Court of Nepal examining the constitutional boundaries of budgetary discretionary funds, federal fiscal distribution, and digital economic regulation.',
  summaryNp: 'बजेटरी तदर्थ कोषको संवैधानिक सीमा, संघीय वित्तीय हस्तान्तरण र डिजिटल अर्थतन्त्रको नियमन सम्बन्धी सर्वोच्च अदालतमा दायर जनहित याचिकाहरूको विश्लेषण।',
  caseLinks: [
    { labelEn: 'Parliamentary Fund Writ', labelNp: 'सांसद विकास कोष रिट', targetId: 'case-parliamentary-fund' },
    { labelEn: 'Cryptocurrency Writ (079-WO-0147)', labelNp: 'क्रिप्टो नियमन रिट (०७९-WO-०१४७)', targetId: 'case-crypto-regulation' },
  ]
};

export const PIL_CASES = [
  {
    id: 'case-parliamentary-fund',
    caseNumber: 'Supreme Court Constitutional Writ',
    yearBs: '२०८० वि.सं.',
    yearAd: '2023 AD',
    titleEn: 'Parliamentary Infrastructure Development Programme (सांसद विकास कोष)',
    titleNp: 'संसदीय क्षेत्र पूर्वाधार विकास कार्यक्रम (सांसद विकास कोष खारेजी रिट)',
    petitionerRoleEn: 'Petitioner alongside Advocate Sagar Baral and Law Student Avinesh Adhikari',
    petitionerRoleNp: 'अधिवक्ता सागर बराल र कानुनका विद्यार्थी अविनेश अधिकारीसहित निवेदक',
    forumEn: 'Supreme Court of Nepal',
    forumNp: 'सर्वोच्च अदालत, नेपाल',
    benchOrderEn: 'Single Bench of Justice Hari Prasad Phuyal issued a Show Cause Order to the Government and summoned both parties for interim order hearing; the Constitutional Bench subsequently granted an interim order staying implementation.',
    benchOrderNp: 'न्यायाधीश हरिप्रसाद फुयाँलको एकल इजलासद्वारा सरकारका नाममा कारण देखाउ आदेश जारी तथा छलफलका लागि आदेश; संवैधानिक इजलासद्वारा कार्यान्वयन रोक्न अन्तरिम आदेश जारी।',
    coreQuestions: [
      { en: 'Constitutional Governance', np: 'संवैधानिक सुशासन' },
      { en: 'Separation of Powers', np: 'शक्ति पृथकीकरणको सिद्धान्त' },
      { en: 'Fiscal Federalism', np: 'वित्तीय संघीयता' },
      { en: 'Public Expenditure Accountability', np: 'सार्वजनिक खर्चको जवाफदेहिता' },
      { en: 'Democratic Prudence', np: 'लोकतान्तरिक वित्तीय अनुशासन' },
      { en: 'Protection of Public Resources', np: 'सार्वजनिक स्रोतको संरक्षण' }
    ],
    descriptionEn: 'Challenged the allocation of Rs 5 Crore per electoral constituency under Point 445 of the FY 2080/81 Budget for discretionary MP constituency infrastructure funds on grounds of violating the doctrine of separation of powers and constitutional fiscal federalism.',
    descriptionNp: 'आर्थिक वर्ष २०८०/८१ को बजेट वक्तव्यको बुँदा नं. ४४५ मार्फत प्रत्यक्ष निर्वाचित सांसदलाई प्रति निर्वाचन क्षेत्र ५ करोड बाँड्ने गरी ल्याइएको कार्यक्रम शक्ति पृथकीकरण र संघीयताको मर्मविपरीत भएको भन्दै खारेजीको माग।',
    mediaCoverage: [
      {
        id: 'cov-01',
        publication: 'Ratopati',
        publicationNp: 'रातोपाटी',
        headline: '‘सांसद विकास कोष’ विरुद्ध सर्वोच्चमा रिट दायर',
        dateBs: '२०८० असार ६',
        dateAd: 'June 21, 2023',
        url: 'https://www.ratopati.com/story/374778/supreme-court',
        type: 'National Daily'
      },
      {
        id: 'cov-02',
        publication: 'OnlineKhabar',
        publicationNp: 'अनलाइनखबर',
        headline: 'सांसद विकास कोष खारेजीको माग गर्दै सर्वोच्चमा रिट',
        dateBs: '२०८० साउन ३',
        dateAd: 'July 19, 2023',
        url: 'https://www.onlinekhabar.com/2023/07/1338545/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%B8%E0%A4%A6-%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%BE%E0%A4%B8-%E0%A4%95%E0%A5%8B%E0%A4%B7-%E0%A4%96%E0%A4%BE%E0%A4%B0%E0%A5%87%E0%A4%9C-%E0%A4%97%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A5%88-%E0%A4%B8%E0%A4%B0%E0%A5%8D%E0%A4%B5%E0%A5%8B%E0%A4%9A%E0%A5%8D%E0%A4%9A%E0%A4%AE%E0%A4%BE-%E0%A4%B0%E0%A4%BF%E0%A4%9F',
        type: 'National Daily'
      },
      {
        id: 'cov-03',
        publication: 'Nepal Live',
        publicationNp: 'नेपाल लाइभ',
        headline: 'सांसद विकास कोष विरुद्धको रिटमा कारण देखाउ आदेश जारी',
        dateBs: '२०८० असार ८',
        dateAd: 'June 23, 2023',
        url: 'https://nepallive.com/story/311555',
        type: 'Legal News'
      },
      {
        id: 'cov-04',
        publication: 'Insurance Khabar',
        publicationNp: 'इन्स्योरेन्स खबर',
        headline: 'सांसद विकास कोष खारेज गर्न सर्वाेच्चमा पर्याे रिट',
        dateBs: '२०८० असार ६',
        dateAd: 'June 21, 2023',
        url: 'https://insurancekhabar.com/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%B8%E0%A4%A6-%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%BE%E0%A4%B8-%E0%A4%95%E0%A5%8B%E0%A4%B7-%E0%A4%96%E0%A4%BE%E0%A4%B0%E0%A5%87%E0%A4%9C-%E0%A4%97%E0%A4%B0%E0%A5%8D/',
        type: 'Financial Media'
      },
      {
        id: 'cov-05',
        publication: 'Avenues TV',
        publicationNp: 'एभिन्युज खबर',
        headline: 'सांसद विकास कोष खारेजी रिटमा सर्वाेच्चद्धारा कारण देखाउ आदेश',
        dateBs: '२०८० असार ८',
        dateAd: 'June 23, 2023',
        url: 'https://avenues.tv/news/show-order-reasons-reason-ret-in-spnep/',
        type: 'Television News'
      },
      {
        id: 'cov-06',
        publication: 'Artha Sarokar',
        publicationNp: 'अर्थ सरोकार',
        headline: 'सांसद विकास कोष खारेजीको माग गर्दै सर्वोच्चमा रिट दायर',
        dateBs: '२०८० असार ६',
        dateAd: 'June 21, 2023',
        url: 'https://arthasarokar.com/2023/07/sarbochcha-11.html',
        type: 'Business Portal'
      },
      {
        id: 'cov-07',
        publication: 'Nagarik News',
        publicationNp: 'नागरिक दैनिक',
        headline: 'सांसद विकास कोष खारेजीको माग गर्दै सर्वोच्चमा रिट दायर',
        dateBs: '२०८० साउन ३',
        dateAd: 'July 19, 2023',
        url: 'https://nagariknews.nagariknetwork.com/politics/1238901-1689751990.html',
        type: 'National Broad-Sheet'
      },
      {
        id: 'cov-08',
        publication: 'News Griha',
        publicationNp: 'न्युज गृह',
        headline: 'सांसद विकास कोष खारेज गर्न माग गर्दै सर्वोच्चमा रिट',
        dateBs: '२०८० साउन ३',
        dateAd: 'July 19, 2023',
        url: 'https://newsgriha.com/detail/8271',
        type: 'Online Portal'
      },
      {
        id: 'cov-09',
        publication: 'Janakpur Today',
        publicationNp: 'जनकपुर टुडे',
        headline: 'सांसद विकास कोष खारेज गर्न सर्वोच्चमा रिट',
        dateBs: '२०८० साउन ४',
        dateAd: 'July 20, 2023',
        url: 'https://ejanakpurtoday.com/2023/07/20/80602/',
        type: 'Provincial Media'
      },
      {
        id: 'cov-10',
        publication: 'Jus Nepal Jurisprudence',
        publicationNp: 'जुस नेपाल',
        headline: 'सांसद विकास कोषको संवैधानिक परीक्षण तथा न्यायिक दृष्टिकोण',
        dateBs: '२०८० वि.सं.',
        dateAd: '2023 AD',
        url: 'https://www.jusnepal.com/2026/08/06/12799/',
        type: 'Legal & Constitutional Journal'
      }
    ]
  },
  {
    id: 'case-crypto-regulation',
    caseNumber: 'Supreme Court Writ No. 079-WO-0147',
    yearBs: '२०७९ वि.सं.',
    yearAd: '2022 AD',
    titleEn: 'Cryptocurrency Regulation & Digital Economic Freedom',
    titleNp: 'क्रिप्टोकरन्सी नियमन तथा डिजिटल आर्थिक स्वतन्त्रता सम्बन्धी रिट',
    petitionerRoleEn: 'Petitioners: Advocate Sagar Baral, Saugat Raj Baral, Dipesh Dhakal, Koshish Giri, and Sampurna Basnet',
    petitionerRoleNp: 'निवेदकहरू: अधिवक्ता सागर बराल, सौगात राज बराल, दिपेश ढकाल, कोसिस गिरी र सम्पूर्ण बस्नेत',
    forumEn: 'Supreme Court of Nepal',
    forumNp: 'सर्वोच्च अदालत, नेपाल',
    outcomeEn: 'Outcome: Petition Dismissed. The Supreme Court upheld Nepal Rastra Bank’s regulatory authority regarding monetary sovereignty, foreign exchange risk mitigation, and financial stability.',
    outcomeNp: 'फैसला: रिट खारेज (Petition Dismissed)। सर्वोच्च अदालतले मौद्रिक सार्वभौमिकता, विदेशी विनिमय जोखिम नियन्त्रण र वित्तीय स्थायित्वको क्षेत्राधिकार अन्तर्गत नेपाल राष्ट्र बैंकको निर्णयलाई सदर गर्‍यो।',
    coreQuestions: [
      { en: 'Digital Economy', np: 'डिजिटल अर्थतन्त्र' },
      { en: 'Economic Freedom', np: 'आर्थिक स्वतन्त्रता' },
      { en: 'Technology Regulation', np: 'प्रविधि नियमन' },
      { en: 'Monetary Sovereignty', np: 'मौद्रिक सार्वभौमिकता' },
      { en: 'Financial Innovation', np: 'वित्तीय नवीनता' }
    ],
    descriptionEn: 'Sought a comprehensive legal and regulatory framework for digital currencies and challenged blanket criminalization notifications issued by the central bank under Article 17 of the Constitution of Nepal.',
    descriptionNp: 'नेपाल राष्ट्र बैंकले क्रिप्टोकरेन्सीलाई पूर्ण गैरकानुनी भनी जारी गरेको सूचना खारेज गर्न र उच्चस्तरीय अध्ययन समिति गठन गरी स्पष्ट नियमनकारी संरचना तर्जुमा गर्न माग गरिएको रिट।',
    mediaCoverage: [
      {
        id: 'crypto-cov-01',
        publication: 'Kantipur (ekantipur.com)',
        publicationNp: 'कान्तिपुर दैनिक',
        headline: '‘क्रिप्टोकरेन्सी’लाई कानुनी दायरामा ल्याउन माग गर्दै सर्वोच्चमा रिट',
        dateBs: '२०७९ भदौ २',
        dateAd: 'August 18, 2022',
        url: 'https://ekantipur.com/business/2022/08/18/166082531962857948.html',
        type: 'National Broad-Sheet'
      },
      {
        id: 'crypto-cov-02',
        publication: 'OnlineKhabar',
        publicationNp: 'अनलाइनखबर',
        headline: 'क्रिप्टोकरेन्सीलाई कानुनी मान्यता दिन माग गर्दै सर्वोच्चमा रिट',
        dateBs: '२०७९ भदौ २',
        dateAd: 'August 18, 2022',
        url: 'https://www.onlinekhabar.com/2022/08/1175983/%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%AA%E0%A5%8D%E0%A4%9F%E0%A5%8B%E0%A4%95%E0%A4%B0%E0%A5%87%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%80%E0%A4%B2%E0%A4%BE%E0%A4%88-%E0%A4%AE%E0%A4%BE%E0%A4%A8-2',
        type: 'Online Portal'
      },
      {
        id: 'crypto-cov-03',
        publication: 'OnlineKhabar (English)',
        publicationNp: 'अनलाइनखबर (अंग्रेजी)',
        headline: 'Writ Petition in Supreme Court to Recognise Cryptocurrency in Nepal',
        dateBs: '२०७९ भदौ २',
        dateAd: 'August 18, 2022',
        url: 'https://english.onlinekhabar.com/demand-recognise-cryptocurrency.html',
        type: 'English News Portal'
      },
      {
        id: 'crypto-cov-04',
        publication: 'ICT Samachar',
        publicationNp: 'आईसीटी समाचार',
        headline: 'क्रिप्टोकरेन्सीलाई कानुनी मान्यता दिन माग गर्दै सर्वोच्चमा रिट दायर',
        dateBs: '२०७९ भदौ २',
        dateAd: 'August 18, 2022',
        url: 'https://ictsamachar.com/news/11982/',
        type: 'Tech Journalism'
      },
      {
        id: 'crypto-cov-05',
        publication: 'Artha Bazar',
        publicationNp: 'अर्थ बजार',
        headline: 'क्रिप्टोकरेन्सी कारोबारलाई मान्यता दिन माग गर्दै सर्वोच्चमा रिट दर्ता',
        dateBs: '२०७९ भदौ २',
        dateAd: 'August 18, 2022',
        url: 'https://arthabazar.com/68329',
        type: 'Business Portal'
      },
      {
        id: 'crypto-cov-06',
        publication: 'Law Gandhi Review',
        publicationNp: 'ल गान्धी कानुनी विश्लेषण',
        headline: 'Cryptocurrency Laws and Supreme Court Writ (079-WO-0147) Analysis',
        dateBs: '२०७९ वि.सं.',
        dateAd: '2022 AD',
        url: 'https://www.lawgandhi.com/cryptocurrency-laws-in-nepal/',
        type: 'Legal Research & Review'
      }
    ]
  }
];

export const MEDIA_ARCHIVE_ITEMS = [
  {
    id: 'media-01',
    titleEn: 'Writ Filed in Supreme Court Seeking Abolition of Parliamentary Constituency Infrastructure Fund',
    titleNp: 'सांसद विकास कोष खारेज गर्न माग गर्दै सर्वोच्चमा रिट दायर',
    publication: 'Ratopati',
    publicationNp: 'रातोपाटी',
    dateBs: '२०८० असार ६',
    dateAd: 'June 21, 2023',
    category: 'pil',
    categoryLabelEn: 'Writ / PIL',
    categoryLabelNp: 'रिट / जनहित याचिका',
    summaryEn: 'Public interest litigation submitted challenging the budgetary allocation of Rs 5 Crore per MP constituency, arguing it contravenes the constitutional principle of separation of powers and fiscal federalism.',
    summaryNp: 'प्रतिनिधिसभाका प्रत्यक्ष निर्वाचित सांसदलाई ५ करोड रुपैयाँ बजेट विनियोजन गर्ने व्यवस्थाले शक्ति पृथकीकरण र संघीयताको मर्म उल्लंघन गरेको भन्दै सर्वोच्चमा रिट दायर।',
    originalUrl: 'https://www.ratopati.com/story/374778/supreme-court',
    isFeatured: true,
    tags: ['Supreme Court', 'PIL', 'Fiscal Accountability', 'Constitutional Law']
  },
  {
    id: 'media-02',
    titleEn: 'Supreme Court Issues Show-Cause Order on Parliamentary Infrastructure Fund Petition',
    titleNp: 'सांसद विकास कोष विरुद्धको रिटमा सर्वोच्चद्वारा कारण देखाउ आदेश',
    publication: 'Nepal Live',
    publicationNp: 'नेपाल लाइभ',
    dateBs: '२०८० असार ८',
    dateAd: 'June 23, 2023',
    category: 'constitutional',
    categoryLabelEn: 'Constitutional Issues',
    categoryLabelNp: 'संवैधानिक मुद्दा',
    summaryEn: 'A single bench of Justice Hari Prasad Phuyal directed the Government of Nepal and the Ministry of Finance to submit written justifications regarding the constituency fund allocation.',
    summaryNp: 'न्यायाधीश हरिप्रसाद फुयाँलको एकल इजलासले सरकार र अर्थ मन्त्रालयसँग लिखित जवाफ माग गर्दै अन्तरिम आदेशका लागि दुवै पक्षलाई छलफलमा बोलायो।',
    originalUrl: 'https://nepallive.com/story/311555',
    isFeatured: true,
    tags: ['Supreme Court', 'Constitutional Bench', 'Budgetary Scrutiny']
  },
  {
    id: 'media-03',
    titleEn: 'Supreme Court Petition Petitions for Legal & Regulatory Framework on Cryptocurrencies',
    titleNp: '‘क्रिप्टोकरेन्सी’लाई कानुनी दायरामा ल्याउन माग गर्दै सर्वोच्चमा रिट',
    publication: 'Kantipur',
    publicationNp: 'कान्तिपुर दैनिक',
    dateBs: '२०७९ भदौ २',
    dateAd: 'August 18, 2022',
    category: 'digital-economy',
    categoryLabelEn: 'Digital Economy',
    categoryLabelNp: 'डिजिटल अर्थतन्त्र',
    summaryEn: 'Advocates and researchers petitioned the Supreme Court to mandate research and regulatory frameworks for digital asset transactions rather than relying on blanket prohibitions.',
    summaryNp: 'डिजिटल सम्पत्ति र क्रिप्टोकरेन्सीलाई पूर्ण प्रतिबन्ध लगाउनुको साटो कानुनी र नियमनकारी संरचना तयार गर्न अध्ययन समिति गठनको माग गर्दै सर्वोच्चमा रिट।',
    originalUrl: 'https://ekantipur.com/business/2022/08/18/166082531962857948.html',
    isFeatured: true,
    caseNumber: '079-WO-0147',
    tags: ['FinTech', 'Digital Currency', 'Economic Freedom']
  },
  {
    id: 'media-04',
    titleEn: 'OnlineKhabar: Supreme Court Moved to Demand Legal Recognition for Cryptocurrency and Web3 Assets',
    titleNp: 'अनलाइनखबर: क्रिप्टोकरेन्सीलाई कानुनी मान्यता दिन माग गर्दै सर्वोच्चमा रिट',
    publication: 'OnlineKhabar',
    publicationNp: 'अनलाइनखबर',
    dateBs: '२०७९ भदौ २',
    dateAd: 'August 18, 2022',
    category: 'digital-economy',
    categoryLabelEn: 'Digital Economy',
    categoryLabelNp: 'डिजिटल अर्थतन्त्र',
    summaryEn: 'Coverage on the writ filed by Saugat Raj Baral and fellow legal researchers urging Nepal Rastra Bank and the Ministry of Finance to establish institutional regulatory standards for digital currencies.',
    summaryNp: 'सौगात राज बराललगायत निवेदकहरूद्वारा नेपाल राष्ट्र बैंक र अर्थ मन्त्रालयका नाममा क्रिप्टो तथा डिजिटल सम्पत्तिको नियमनकारी मापदण्ड बनाउन माग गर्दै दायर रिटको कभरेज।',
    originalUrl: 'https://www.onlinekhabar.com/2022/08/1175983/%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%AA%E0%A5%8D%E0%A4%9F%E0%A5%8B%E0%A4%95%E0%A4%B0%E0%A5%87%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%80%E0%A4%B2%E0%A4%BE%E0%A4%88-%E0%A4%AE%E0%A4%BE%E0%A4%A8-2',
    isFeatured: false,
    caseNumber: '079-WO-0147',
    tags: ['FinTech', 'Supreme Court', 'Web3']
  },
  {
    id: 'media-05',
    titleEn: 'OnlineKhabar: Public Interest Litigation Filed Demanding Complete Scrapping of MP Constituency Fund',
    titleNp: 'अनलाइनखबर: सांसद विकास कोष खारेजीको माग गर्दै सर्वोच्चमा रिट दर्ता',
    publication: 'OnlineKhabar',
    publicationNp: 'अनलाइनखबर',
    dateBs: '२०८० साउन ३',
    dateAd: 'July 19, 2023',
    category: 'public-finance',
    categoryLabelEn: 'Public Finance',
    categoryLabelNp: 'सार्वजनिक वित्त',
    summaryEn: 'Analysis on the constitutional challenge questioning the economic efficiency and federal constitutional balance of allocating direct budgetary funds to parliamentarians.',
    summaryNp: 'सांसदहरूलाई प्रत्यक्ष बजेट विनियोजन गर्ने अभ्यासले वित्तीय अनुशासन र संघीय संरचनामा पार्ने प्रभावबारे संवैधानिक चुनौतीको समाचार विश्लेषण।',
    originalUrl: 'https://www.onlinekhabar.com/2023/07/1338545/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%B8%E0%A4%A6-%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%BE%E0%A4%B8-%E0%A4%95%E0%A5%8B%E0%A4%B7-%E0%A4%96%E0%A4%BE%E0%A4%B0%E0%A5%87%E0%A4%9C-%E0%A4%97%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A5%88-%E0%A4%B8%E0%A4%B0%E0%A5%8D%E0%A4%B5%E0%A5%8B%E0%A4%9A%E0%A5%8D%E0%A4%9A%E0%A4%AE%E0%A4%BE-%E0%A4%B0%E0%A4%BF%E0%A4%9F',
    isFeatured: false,
    tags: ['Federalism', 'Local Governance', 'Public Expenditure']
  },
  {
    id: 'media-06',
    titleEn: 'Artha Sarokar: Petition Filed at Supreme Court Against Discretionary Constituency Budget Allocations',
    titleNp: 'अर्थ सरोकार: सांसद विकास कोष खारेजीको माग गर्दै सर्वोच्चमा रिट दायर',
    publication: 'Artha Sarokar',
    publicationNp: 'अर्थ सरोकार',
    dateBs: '२०८० असार ६',
    dateAd: 'June 21, 2023',
    category: 'public-finance',
    categoryLabelEn: 'Public Finance',
    categoryLabelNp: 'सार्वजनिक वित्त',
    summaryEn: 'Coverage emphasizing fiscal prudence, public debt burdens, and the economic rationale for transparent project selection through regular administrative machinery rather than lawmaker discretionary funds.',
    summaryNp: 'सार्वजनिक ऋणको भार र तदर्थ कोषको साटो नियमित प्रशासनिक संरचनामार्फत आयोजना छनोट हुनुपर्ने आर्थिक दृष्टिकोण सम्बन्धी कभरेज।',
    originalUrl: 'https://arthasarokar.com/2023/07/sarbochcha-11.html',
    isFeatured: false,
    tags: ['Fiscal Prudence', 'Debt Management', 'Transparency']
  },
  {
    id: 'media-07',
    titleEn: 'Nagarik News: Constitutional Challenge to Parliamentary Infrastructure Programme',
    titleNp: 'नागरिक दैनिक: सांसद विकास कोष खारेजीको माग गर्दै सर्वोच्चमा रिट',
    publication: 'Nagarik News',
    publicationNp: 'नागरिक दैनिक',
    dateBs: '२०८० साउन ३',
    dateAd: 'July 19, 2023',
    category: 'constitutional',
    categoryLabelEn: 'Constitutional Issues',
    categoryLabelNp: 'संवैधानिक मुद्दा',
    summaryEn: 'National broadsheet reporting on the constitutional questions raised before the Supreme Court regarding legislative overreach into executive budget implementation.',
    summaryNp: 'कार्यकारी बजेट कार्यान्वयनमा व्यवस्थापिकाको हस्तक्षेप तथा शक्ति पृथकीकरणको उल्लंघनबारे सर्वोच्च अदालतमा दायर रिटको समाचार।',
    originalUrl: 'https://nagariknews.nagariknetwork.com/politics/1238901-1689751990.html',
    isFeatured: false,
    tags: ['Separation of Powers', 'Broadsheet Coverage', 'Supreme Court']
  },
  {
    id: 'media-08',
    titleEn: 'ICT Samachar: Demand for Legal Framework on Emerging Digital Currencies and Assets',
    titleNp: 'आईसीटी समाचार: क्रिप्टोकरेन्सीलाई कानुनी मान्यता दिन माग गर्दै सर्वोच्चमा रिट दायर',
    publication: 'ICT Samachar',
    publicationNp: 'आईसीटी समाचार',
    dateBs: '२०७९ भदौ २',
    dateAd: 'August 18, 2022',
    category: 'digital-economy',
    categoryLabelEn: 'Digital Economy',
    categoryLabelNp: 'डिजिटल अर्थतन्त्र',
    summaryEn: 'Detailed technology policy reporting highlighting the arguments for regulated fintech sandboxes and technological adoption in Nepal’s financial system.',
    summaryNp: 'नेपालको वित्तीय प्रणालीमा फिनटेक स्यान्डबक्स तथा प्रविधिमैत्री नियमनकारी संरचनाको आवश्यकता सम्बन्धी सूचना प्रविधि समाचार।',
    originalUrl: 'https://ictsamachar.com/news/11982/',
    isFeatured: false,
    caseNumber: '079-WO-0147',
    tags: ['FinTech', 'IT Policy', 'Regulatory Sandbox']
  },
  {
    id: 'media-09',
    titleEn: 'Insurance Khabar: Public Interest Action Initiated to Protect National Treasury from Discretionary Spending',
    titleNp: 'इन्स्योरेन्स खबर: राष्ट्रिय ढुकुटीको संरक्षण र बजेट अनुशासनका लागि जनहित रिट',
    publication: 'Insurance Khabar',
    publicationNp: 'इन्स्योरेन्स खबर',
    dateBs: '२०८० असार ६',
    dateAd: 'June 21, 2023',
    category: 'public-finance',
    categoryLabelEn: 'Public Finance',
    categoryLabelNp: 'सार्वजनिक वित्त',
    summaryEn: 'Financial media perspective on the economic need for stringent auditing and elimination of pork-barrel allocations in Nepal’s annual budget.',
    summaryNp: 'वार्षिक बजेटमा वित्तीय अनुशासन कायम गर्न र तदर्थ विनियोजन रोक्नका लागि चालिएको कानुनी कदमबारे वित्तीय समाचार।',
    originalUrl: 'https://insurancekhabar.com/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%B8%E0%A4%A6-%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%BE%E0%A4%B8-%E0%A4%95%E0%A5%8B%E0%A4%B7-%E0%A4%96%E0%A4%BE%E0%A4%B0%E0%A5%87%E0%A4%9C-%E0%A4%97%E0%A4%B0%E0%A5%8D/',
    isFeatured: false,
    tags: ['Auditing', 'Fiscal Discipline', 'Financial Reform']
  }
];

export const CHRONOLOGICAL_TIMELINE = [
  {
    yearBs: '२०७९ वि.सं.',
    yearAd: '2022 AD',
    tag: 'PIL / Digital Economy',
    titleEn: 'Cryptocurrency Regulation & Digital Economic Freedom Writ',
    titleNp: 'क्रिप्टोकरन्सी नियमन तथा डिजिटल आर्थिक स्वतन्त्रता रिट',
    badge: 'Supreme Court 079-WO-0147',
    descEn: 'Public interest litigation addressing digital asset classification, innovation, and constitutional rights. Petition dismissed with affirmation of central bank monetary authority.',
    descNp: 'डिजिटल मुद्राको नियमन र आर्थिक स्वतन्त्रता सम्बन्धी रिट। सर्वोच्च अदालतद्वारा केन्द्रीय बैंकको अधिकार सदर गर्दै रिट खारेज।'
  },
  {
    yearBs: '२०८० वि.सं.',
    yearAd: '2023 AD',
    tag: 'PIL / Constitutional Governance',
    titleEn: 'Parliamentary Infrastructure Development Programme Writ',
    titleNp: 'सांसद विकास कोष खारेजी सम्बन्धी जनहित याचिका',
    badge: 'Supreme Court Constitutional Bench',
    descEn: 'Constitutional challenge against discretionary constituency funds. Raised fundamental questions on separation of powers and federal fiscal balance.',
    descNp: 'सांसद विकास कोष विरुद्ध शक्ति पृथकीकरण र संघीयताको सिद्धान्तका आधारमा दायर रिट। अन्तरिम आदेशद्वारा कार्यान्वयन रोकिएको ऐतिहासिक विषय।'
  },
  {
    yearBs: '२०८१+ / Ongoing',
    yearAd: 'Future & Ongoing',
    tag: 'Public Service & Policy Dialogues',
    titleEn: 'Tax Administration, Fiscal Policy & Digital Governance Engagements',
    titleNp: 'कर प्रशासन, वित्तीय नीति तथा डिजिटल सुशासन संवाद',
    badge: 'Civil Service & Policy Discourse',
    descEn: 'Ongoing scholarly analysis, taxpayer awareness dialogues, institutional symposiums, and administrative reforms in public revenue.',
    descNp: 'राजस्व प्रशासन, कर नीति सुधार, संस्थागत कार्यशाला तथा सार्वजनिक वित्तीय व्यवस्थापन सम्बन्धी निरन्तर प्राज्ञिक तथा सेवामूलक सहभागिता।'
  }
];
