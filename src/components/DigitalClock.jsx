import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import NepaliDateRaw from 'nepali-date-converter';

const NepaliDate = NepaliDateRaw?.default || NepaliDateRaw;

const NEPALI_DAYS_NP = [
  'आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'
];

const NEPALI_MONTHS_NP = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भाद्र', 'असोज',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
];

const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const NEPALI_DAYS_EN = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const toNepaliDigits = (numOrStr) => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(numOrStr).replace(/[0-9]/g, (d) => nepaliDigits[Number(d)]);
};

export default function DigitalClock({ variant = 'compact' }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Time calculations (12-hour format)
  const rawHours = now.getHours();
  const ampm = rawHours >= 12 ? 'PM' : 'AM';
  const nepaliAmPm = rawHours >= 12 ? 'अपराह्न' : 'पूर्वाह्न';

  let hours12 = rawHours % 12;
  hours12 = hours12 ? hours12 : 12;
  const formattedHours = String(hours12).padStart(2, '0');
  const nepaliHours = toNepaliDigits(formattedHours);

  const minutes = String(now.getMinutes()).padStart(2, '0');
  const nepaliMinutes = toNepaliDigits(minutes);

  const seconds = String(now.getSeconds()).padStart(2, '0');
  const nepaliSeconds = toNepaliDigits(seconds);

  // Nepali Date & Day Calculation (Bikram Sambat)
  let nepaliDateStr = '';
  try {
    const nepDate = new NepaliDate(now);
    const bsYear = nepDate.getYear();
    const bsMonthIdx = nepDate.getMonth();
    const bsDay = nepDate.getDate();
    const dayOfWeekIdx = now.getDay();

    const nepaliDay = NEPALI_DAYS_NP[dayOfWeekIdx] || '';
    const nepaliMonth = NEPALI_MONTHS_NP[bsMonthIdx] || '';
    nepaliDateStr = `${nepaliDay}, ${toNepaliDigits(bsDay)} ${nepaliMonth} ${toNepaliDigits(bsYear)}`;
  } catch (e) {
    nepaliDateStr = `${toNepaliDigits(now.getDate())} गते`;
  }

  // English Date & Day Calculation (Gregorian AD)
  const dayOfWeekIdx = now.getDay();
  const englishDay = NEPALI_DAYS_EN[dayOfWeekIdx] || '';
  const englishMonth = GREGORIAN_MONTHS_EN[now.getMonth()] || '';
  const englishDateStr = `${englishDay}, ${now.getDate()} ${englishMonth} ${now.getFullYear()}`;

  if (variant === 'badge') {
    return (
      <div className="digital-clock-clean-badge" title="Live Time (Nepal Standard Time)">
        <div className="clean-badge-inner">
          <Clock size={12} className="clock-icon-live" />
          <span className="clean-badge-nepali">{nepaliDateStr} · {nepaliHours}:{nepaliMinutes} {nepaliAmPm}</span>
          <span className="clean-badge-divider">|</span>
          <span className="clean-badge-en">{englishDateStr} · {formattedHours}:{minutes} {ampm} NST</span>
        </div>
      </div>
    );
  }

  // Compact / Topbar Format: Full Nepali and English Date with Day and Time
  return (
    <div className="digital-clock-clean-topbar" title="नेपाल मानक समय · Nepal Standard Time (UTC+05:45)">
      <span className="live-clock-pulse" aria-hidden="true" />
      
      {/* Nepali Date, Day & Time */}
      <div className="topbar-date-group nepali-group">
        <span className="topbar-date-text">{nepaliDateStr}</span>
        <span className="topbar-time-text">({nepaliHours}:{nepaliMinutes}:{nepaliSeconds} {nepaliAmPm})</span>
      </div>

      <span className="topbar-date-sep" aria-hidden="true">•</span>

      {/* English Date, Day & Time */}
      <div className="topbar-date-group english-group">
        <span className="topbar-date-text">{englishDateStr}</span>
        <span className="topbar-time-text">({formattedHours}:{minutes}:{seconds} {ampm} NST)</span>
      </div>
    </div>
  );
}
