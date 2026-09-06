import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Calendar, ArrowRightLeft, Copy, Check, RotateCcw, Sparkles, ShieldCheck, Info } from 'lucide-react';
import NepalEmblem from './NepalEmblem';
import {
  NEPALI_MONTHS_EN,
  NEPALI_MONTHS_NP,
  GREGORIAN_MONTHS_EN,
  GREGORIAN_MONTHS_NP,
  toNepaliDigits,
  toEnglishDigits,
  getBsMonthDays,
  convertAdToBs,
  convertBsToAd,
  getLiveNepalDateTime
} from '../utils/nepaliDateConverter';

export default function DateTimeConverterUtility({ lang = 'en' }) {
  // Live Clock State
  const [is24Hour, setIs24Hour] = useState(false);
  const [liveData, setLiveData] = useState(() => getLiveNepalDateTime(false));

  // Converter State
  const [direction, setDirection] = useState('AD_TO_BS'); // 'AD_TO_BS' | 'BS_TO_AD'
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Initial AD inputs from current live date
  const [adYear, setAdYear] = useState(2026);
  const [adMonth, setAdMonth] = useState(9); // September (1-indexed)
  const [adDay, setAdDay] = useState(6);

  // Initial BS inputs from current live date
  const [bsYear, setBsYear] = useState(2083);
  const [bsMonth, setBsMonth] = useState(5); // Bhadra (1-indexed)
  const [bsDay, setBsDay] = useState(21);

  // Conversion Result
  const [conversionResult, setConversionResult] = useState(() => convertAdToBs(2026, 9, 6));

  // Ticking live clock (1-second interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveData(getLiveNepalDateTime(is24Hour));
    }, 1000);
    return () => clearInterval(timer);
  }, [is24Hour]);

  // Sync initial inputs to real live time on mount
  useEffect(() => {
    const current = getLiveNepalDateTime(is24Hour);
    setAdYear(current.adYear);
    setAdMonth(current.adMonth);
    setAdDay(current.adDay);
    if (current.bsData) {
      setBsYear(current.bsData.bsYear);
      setBsMonth(current.bsData.bsMonth);
      setBsDay(current.bsData.bsDay);
      setConversionResult(current.bsData);
    }
  }, []);

  // Compute maximum days for selected BS year and month
  const maxBsDays = useMemo(() => {
    return getBsMonthDays(Number(bsYear) || 2083, Number(bsMonth) || 1);
  }, [bsYear, bsMonth]);

  // Compute maximum days for selected AD year and month
  const maxAdDays = useMemo(() => {
    try {
      return new Date(Number(adYear), Number(adMonth), 0).getDate();
    } catch {
      return 31;
    }
  }, [adYear, adMonth]);

  // Auto-clamp BS day if month changes to fewer days
  useEffect(() => {
    if (bsDay > maxBsDays) {
      setBsDay(maxBsDays);
    }
  }, [maxBsDays, bsDay]);

  // Auto-clamp AD day if month changes to fewer days
  useEffect(() => {
    if (adDay > maxAdDays) {
      setAdDay(maxAdDays);
    }
  }, [maxAdDays, adDay]);

  // Real-time automatic conversion when inputs change
  useEffect(() => {
    if (direction === 'AD_TO_BS') {
      const y = Number(adYear);
      const m = Number(adMonth);
      const d = Number(adDay);
      if (y >= 1944 && y <= 2038 && m >= 1 && m <= 12 && d >= 1 && d <= maxAdDays) {
        const result = convertAdToBs(y, m, d);
        if (result) {
          setConversionResult(result);
          setValidationError('');
        }
      }
    } else {
      const y = Number(bsYear);
      const m = Number(bsMonth);
      const d = Number(bsDay);
      if (y >= 2000 && y <= 2095 && m >= 1 && m <= 12 && d >= 1 && d <= maxBsDays) {
        const result = convertBsToAd(y, m, d);
        if (result) {
          setConversionResult(result);
          setValidationError('');
        }
      }
    }
  }, [direction, adYear, adMonth, adDay, bsYear, bsMonth, bsDay, maxAdDays, maxBsDays]);

  // Handle explicit AD -> BS conversion trigger
  const handleConvertAdToBs = (e) => {
    if (e) e.preventDefault();
    setValidationError('');

    const y = Number(adYear);
    const m = Number(adMonth);
    const d = Number(adDay);

    if (!y || !m || !d || d < 1 || d > maxAdDays) {
      setValidationError(lang === 'np' ? 'कृपया मान्य AD मिति प्रविष्ट गर्नुहोस्।' : 'Please select a valid Gregorian (AD) date.');
      return;
    }

    const result = convertAdToBs(y, m, d);
    if (!result) {
      setValidationError(
        lang === 'np'
          ? 'यो मिति रूपान्तरण गर्न सकिएन। समर्थित दायरा: सन् १९४३ देखि २०३८ सम्म।'
          : 'Unable to convert this date. Supported range: 1943 AD to 2038 AD.'
      );
      return;
    }

    setConversionResult(result);
    setBsYear(result.bsYear);
    setBsMonth(result.bsMonth);
    setBsDay(result.bsDay);
  };

  // Handle explicit BS -> AD conversion trigger
  const handleConvertBsToAd = (e) => {
    if (e) e.preventDefault();
    setValidationError('');

    const y = Number(bsYear);
    const m = Number(bsMonth);
    const d = Number(bsDay);

    if (!y || !m || !d || d < 1 || d > maxBsDays) {
      setValidationError(
        lang === 'np'
          ? `कृपया मान्य वि.सं. मिति छान्नुहोस् (यस महिनामा १ देखि ${toNepaliDigits(maxBsDays)} दिन मात्र छन्)।`
          : `Please select a valid BS date (This month has only 1 to ${maxBsDays} days).`
      );
      return;
    }

    const result = convertBsToAd(y, m, d);
    if (!result) {
      setValidationError(
        lang === 'np'
          ? 'यो मिति रूपान्तरण गर्न सकिएन। समर्थित वि.सं. दायरा: २००० देखि २०९५ सम्म।'
          : 'Unable to convert this date. Supported BS range: 2000 BS to 2095 BS.'
      );
      return;
    }

    setConversionResult(result);
    setAdYear(result.adYear);
    setAdMonth(result.adMonth);
    setAdDay(result.adDay);
  };

  // Switch conversion direction
  const handleSwapDirection = () => {
    const newDir = direction === 'AD_TO_BS' ? 'BS_TO_AD' : 'AD_TO_BS';
    setDirection(newDir);
    setValidationError('');
  };

  // Load Today
  const handleLoadToday = () => {
    const current = getLiveNepalDateTime(is24Hour);
    setAdYear(current.adYear);
    setAdMonth(current.adMonth);
    setAdDay(current.adDay);
    if (current.bsData) {
      setBsYear(current.bsData.bsYear);
      setBsMonth(current.bsData.bsMonth);
      setBsDay(current.bsData.bsDay);
      setConversionResult(current.bsData);
    }
    setValidationError('');
  };

  // Quick Preset: Fiscal Year Start (Shrawan 1)
  const handleLoadFiscalYearStart = () => {
    const current = getLiveNepalDateTime(is24Hour);
    const y = current.bsData ? current.bsData.bsYear : 2083;
    setBsYear(y);
    setBsMonth(4); // Shrawan (4th month)
    setBsDay(1);
    setDirection('BS_TO_AD');
    setValidationError('');
  };

  // Quick Preset: Nepali New Year (Baisakh 1)
  const handleLoadNewYear = () => {
    const current = getLiveNepalDateTime(is24Hour);
    const y = current.bsData ? current.bsData.bsYear : 2083;
    setBsYear(y);
    setBsMonth(1); // Baisakh
    setBsDay(1);
    setDirection('BS_TO_AD');
    setValidationError('');
  };

  // Copy Result to Clipboard
  const handleCopyResult = () => {
    if (!conversionResult) return;
    const copyText = `${conversionResult.formattedBsNp} (${conversionResult.formattedBsEn}) — ${conversionResult.formattedAdEn} (${conversionResult.dayOfWeekEn})`;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const bs = liveData.bsData;

  return (
    <section className="datetime-converter-utility-section" aria-label="Nepal Date, Time and Calendar Utility">
      <div className="datetime-utility-card">
        {/* Subtle Decorative Background Watermark */}
        <div className="utility-watermark-emblem" aria-hidden="true">
          <NepalEmblem size={240} variant="full" />
        </div>

        {/* Top Header Strip */}
        <div className="utility-card-header">
          <div className="utility-badge">
            <div className="utility-badge-emblem">
              <NepalEmblem size={22} variant="full" />
            </div>
            <div>
              <span className="utility-badge-text">
                {lang === 'np' ? 'नेपाल मानक समय तथा मिति रूपान्तरण' : 'Nepal Standard Time & Date Utility'}
              </span>
              <span className="utility-badge-sub">
                {lang === 'np' ? 'आधिकारिक समय · द्वैध क्यालेन्डर प्रणाली' : 'Official Time · Dual Calendar Architecture'}
              </span>
            </div>
          </div>

          <div className="clock-format-toggle" role="group" aria-label="Clock Format Toggle">
            <button
              type="button"
              className={`format-toggle-btn ${!is24Hour ? 'active' : ''}`}
              onClick={() => setIs24Hour(false)}
            >
              12-Hour
            </button>
            <button
              type="button"
              className={`format-toggle-btn ${is24Hour ? 'active' : ''}`}
              onClick={() => setIs24Hour(true)}
            >
              24-Hour
            </button>
          </div>
        </div>

        {/* 1. PROMINENT CURRENT DATE & TIME DISPLAY + TODAY IN NEPAL */}
        <div className="live-clock-showcase-panel">
          {/* Main Digital Clock Instrument */}
          <div className="live-clock-main-display" aria-live="off">
            <div className="live-clock-status-bar">
              <span className="live-clock-pulse-dot" aria-hidden="true" />
              <span className="live-clock-status-text">
                {lang === 'np' ? 'प्रत्यक्ष नेपाल मानक समय (Live NST)' : 'LIVE NEPAL STANDARD TIME'}
              </span>
              <span className="live-clock-npt-badge">NPT · UTC+05:45</span>
            </div>

            {/* Large Prominent Numerals */}
            <div className="live-time-large-numeral">
              {liveData.timeStr}
            </div>

            {/* Exact Dual Date Display */}
            <div className="live-dates-container">
              {/* Exact Current Nepali Date (Bikram Sambat) */}
              <div className="live-date-row nepali">
                <span className="date-system-badge np">
                  {lang === 'np' ? 'विक्रम संवत् (BS):' : 'Exact Bikram Sambat Date:'}
                </span>
                <span className="date-value-primary">
                  {bs ? `${bs.dayOfWeekNp}, ${toNepaliDigits(bs.bsDay)} ${bs.bsMonthNameNp} ${toNepaliDigits(bs.bsYear)}` : ''}
                </span>
                {bs && (
                  <span className="date-value-secondary">
                    ({bs.bsMonthNameEn} {bs.bsDay}, {bs.bsYear} BS)
                  </span>
                )}
              </div>

              {/* Exact Current English Date (Gregorian / AD) */}
              <div className="live-date-row english">
                <span className="date-system-badge en">
                  {lang === 'np' ? 'इस्वी संवत् (AD):' : 'Exact Gregorian Date:'}
                </span>
                <span className="date-value-primary">
                  {bs ? `${bs.dayOfWeekEn}, ${GREGORIAN_MONTHS_EN[liveData.adMonth - 1]} ${liveData.adDay}, ${liveData.adYear}` : ''}
                </span>
              </div>
            </div>

            <div className="live-timezone-tag">
              <span>Nepal Standard Time · NPT · UTC+05:45 · Official Government Synchronized</span>
            </div>
          </div>

          {/* Distinctive Contextual "TODAY IN NEPAL" Card */}
          <aside className="today-in-nepal-card" aria-label="Today in Nepal Snapshot">
            <div className="today-stamp-header">
              <span className="today-stamp-flag" aria-hidden="true">🇳🇵</span>
              <span className="today-stamp-title">
                {lang === 'np' ? 'नेपालमा आज' : 'TODAY IN NEPAL'}
              </span>
            </div>

            <div className="today-stamp-content">
              {/* BS Date Highlight */}
              <div className="today-stamp-bs">
                {bs ? `${toNepaliDigits(bs.bsDay)} ${bs.bsMonthNameNp} ${toNepaliDigits(bs.bsYear)}` : '२१ भाद्र २०८३'}
              </div>

              {/* Gregorian Date */}
              <div className="today-stamp-ad">
                {bs ? `${GREGORIAN_MONTHS_EN[liveData.adMonth - 1]} ${liveData.adDay}, ${liveData.adYear}` : 'September 6, 2026'}
              </div>

              {/* Day of Week */}
              <div className="today-stamp-day">
                {bs ? `${bs.dayOfWeekEn} (${bs.dayOfWeekNp})` : 'Sunday (आइतबार)'}
              </div>
            </div>

            <div className="today-stamp-footer">
              <span className="today-live-pulse-indicator" />
              <span>{lang === 'np' ? 'काठमाडौँ मानक समय' : 'Kathmandu Time'}</span>
            </div>
          </aside>
        </div>

        {/* Divider */}
        <div className="utility-section-divider">
          <span className="divider-label">
            {lang === 'np' ? 'AD ↔ BS मिति रूपान्तरण (Date Converter)' : 'AD ↔ BS Date Converter'}
          </span>
        </div>

        {/* 2. DATE CONVERTER INTERFACE */}
        <div className="converter-interactive-body">
          {/* Direction Toggle & Swap Button */}
          <div className="converter-direction-bar">
            <div className="direction-tabs-group">
              <button
                type="button"
                className={`direction-tab-btn ${direction === 'AD_TO_BS' ? 'active' : ''}`}
                onClick={() => {
                  setDirection('AD_TO_BS');
                  setValidationError('');
                }}
              >
                <span>AD → BS</span>
                <span className="tab-sub">{lang === 'np' ? '(अंग्रेजीबाट नेपाली वि.सं.)' : '(Gregorian to Bikram Sambat)'}</span>
              </button>

              <button
                type="button"
                className={`direction-tab-btn ${direction === 'BS_TO_AD' ? 'active' : ''}`}
                onClick={() => {
                  setDirection('BS_TO_AD');
                  setValidationError('');
                }}
              >
                <span>BS → AD</span>
                <span className="tab-sub">{lang === 'np' ? '(नेपाली वि.सं.बाट अंग्रेजी)' : '(Bikram Sambat to Gregorian)'}</span>
              </button>
            </div>

            <div className="converter-top-actions">
              <button
                type="button"
                className="direction-swap-btn"
                onClick={handleSwapDirection}
                title={lang === 'np' ? 'दिशा परिवर्तन गर्नुहोस्' : 'Swap Conversion Direction'}
              >
                <ArrowRightLeft size={15} />
                <span>Swap</span>
              </button>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="converter-validation-alert" role="alert">
              <span>{validationError}</span>
            </div>
          )}

          {/* Form Controls */}
          {direction === 'AD_TO_BS' ? (
            /* AD -> BS Form */
            <form onSubmit={handleConvertAdToBs} className="converter-inputs-form">
              <div className="form-fields-triplet">
                <div className="converter-input-field">
                  <label htmlFor="ad-year-select">
                    {lang === 'np' ? 'वर्ष (AD Year)' : 'Year (AD)'}
                  </label>
                  <input
                    id="ad-year-select"
                    type="number"
                    min="1944"
                    max="2038"
                    value={adYear}
                    onChange={(e) => setAdYear(Number(e.target.value))}
                    className="converter-select-input"
                    required
                  />
                </div>

                <div className="converter-input-field">
                  <label htmlFor="ad-month-select">
                    {lang === 'np' ? 'महिना (AD Month)' : 'Month (AD)'}
                  </label>
                  <select
                    id="ad-month-select"
                    value={adMonth}
                    onChange={(e) => setAdMonth(Number(e.target.value))}
                    className="converter-select-input"
                  >
                    {GREGORIAN_MONTHS_EN.map((m, idx) => (
                      <option key={idx} value={idx + 1}>
                        {m} {lang === 'np' ? `(${GREGORIAN_MONTHS_NP[idx]})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="converter-input-field">
                  <label htmlFor="ad-day-select">
                    {lang === 'np' ? 'दिन (AD Day)' : 'Day (AD)'}
                  </label>
                  <select
                    id="ad-day-select"
                    value={adDay}
                    onChange={(e) => setAdDay(Number(e.target.value))}
                    className="converter-select-input"
                  >
                    {Array.from({ length: maxAdDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="converter-submit-row">
                <button type="submit" className="btn btn-primary converter-submit-btn">
                  <span>{lang === 'np' ? 'वि.सं. मा रूपान्तरण गर्नुहोस् →' : 'Convert to BS →'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary converter-today-btn"
                  onClick={handleLoadToday}
                >
                  <RotateCcw size={14} />
                  <span>{lang === 'np' ? 'आज (Today)' : 'Today'}</span>
                </button>

                <div className="quick-presets-group">
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={handleLoadFiscalYearStart}
                    title="Shrawan 1 (साउन १)"
                  >
                    {lang === 'np' ? 'आ.व. प्रारम्भ (साउन १)' : 'Fiscal Year Start (Shrawan 1)'}
                  </button>
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={handleLoadNewYear}
                    title="Baisakh 1 (बैशाख १)"
                  >
                    {lang === 'np' ? 'नयाँ वर्ष (बैशाख १)' : 'New Year (Baisakh 1)'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* BS -> AD Form */
            <form onSubmit={handleConvertBsToAd} className="converter-inputs-form">
              <div className="form-fields-triplet">
                <div className="converter-input-field">
                  <label htmlFor="bs-year-select">
                    {lang === 'np' ? 'वर्ष (वि.सं.)' : 'Year (BS)'}
                  </label>
                  <input
                    id="bs-year-select"
                    type="number"
                    min="2000"
                    max="2095"
                    value={bsYear}
                    onChange={(e) => setBsYear(Number(e.target.value))}
                    className="converter-select-input"
                    required
                  />
                </div>

                <div className="converter-input-field">
                  <label htmlFor="bs-month-select">
                    {lang === 'np' ? 'महिना (वि.सं.)' : 'Month (BS)'}
                  </label>
                  <select
                    id="bs-month-select"
                    value={bsMonth}
                    onChange={(e) => setBsMonth(Number(e.target.value))}
                    className="converter-select-input"
                  >
                    {NEPALI_MONTHS_EN.map((m, idx) => (
                      <option key={idx} value={idx + 1}>
                        {NEPALI_MONTHS_NP[idx]} ({m})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="converter-input-field">
                  <label htmlFor="bs-day-select">
                    {lang === 'np' ? 'गते (दिन)' : 'Day (BS)'}
                  </label>
                  <select
                    id="bs-day-select"
                    value={bsDay}
                    onChange={(e) => setBsDay(Number(e.target.value))}
                    className="converter-select-input"
                  >
                    {Array.from({ length: maxBsDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d} ({toNepaliDigits(d)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="converter-submit-row">
                <button type="submit" className="btn btn-primary converter-submit-btn">
                  <span>{lang === 'np' ? 'ई.सं. (AD) मा रूपान्तरण गर्नुहोस् →' : 'Convert to AD →'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary converter-today-btn"
                  onClick={handleLoadToday}
                >
                  <RotateCcw size={14} />
                  <span>{lang === 'np' ? 'आज (Today)' : 'Today'}</span>
                </button>

                <div className="quick-presets-group">
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={handleLoadFiscalYearStart}
                    title="Shrawan 1 (साउन १)"
                  >
                    {lang === 'np' ? 'आ.व. प्रारम्भ (साउन १)' : 'Fiscal Year Start (Shrawan 1)'}
                  </button>
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={handleLoadNewYear}
                    title="Baisakh 1 (बैशाख १)"
                  >
                    {lang === 'np' ? 'नयाँ वर्ष (बैशाख १)' : 'New Year (Baisakh 1)'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Conversion Output Result Card */}
          {conversionResult && (
            <div className="converter-result-display-card">
              <div className="result-header-row">
                <span className="result-badge">
                  <Sparkles size={14} className="text-accent" />
                  <span>{lang === 'np' ? 'रूपान्तरित नतिजा (Converted Result)' : 'Converted Date Result'}</span>
                </span>

                <button
                  type="button"
                  className="copy-result-btn"
                  onClick={handleCopyResult}
                  title="Copy official date format to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} color="#16a34a" />
                      <span style={{ color: '#16a34a' }}>{lang === 'np' ? 'कपि भयो!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{lang === 'np' ? 'नतिजा कपि' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="result-main-grid">
                {/* BS Result */}
                <div className="result-unit-box nepali">
                  <div className="unit-label">{lang === 'np' ? 'विक्रम संवत् (Bikram Sambat)' : 'Bikram Sambat (BS)'}</div>
                  <div className="unit-primary-val">{conversionResult.formattedBsNp}</div>
                  <div className="unit-secondary-val">
                    {conversionResult.formattedBsEn} · {conversionResult.dayOfWeekNp}
                  </div>
                </div>

                {/* AD Result */}
                <div className="result-unit-box gregorian">
                  <div className="unit-label">{lang === 'np' ? 'इस्वी संवत् (Gregorian / AD)' : 'Gregorian Date (AD)'}</div>
                  <div className="unit-primary-val">{conversionResult.formattedAdEn}</div>
                  <div className="unit-secondary-val">
                    {conversionResult.dayOfWeekEn} · {conversionResult.adMonthNameNp}
                  </div>
                </div>
              </div>

              {/* Informative footer note for civil service correspondence */}
              <div className="converter-card-note">
                <ShieldCheck size={14} className="note-shield-icon" />
                <span>
                  {lang === 'np'
                    ? 'नेपाल सरकारको आधिकारिक क्यालेन्डर मापदण्ड अनुसार प्रमाणित गणना।'
                    : 'Verified dual-calendar conversion suitable for government documents and administrative records.'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
