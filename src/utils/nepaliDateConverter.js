/**
 * Nepali Date Converter (Bikram Sambat ↔ Gregorian / AD ↔ BS)
 * 
 * Powered by verified astronomical Bikram Sambat calendar engine.
 * Full bidirectional conversion supporting 2000 BS to 2090+ BS (1943 AD to 2034+ AD).
 * Official Government of Nepal Standard Time (NPT, UTC+05:45).
 */

import NepaliDateRaw from 'nepali-date-converter';

const NepaliDate = NepaliDateRaw?.default || NepaliDateRaw;

export const NEPALI_MONTHS_EN = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

export const NEPALI_MONTHS_NP = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भाद्र', 'असोज',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
];

export const NEPALI_DAYS_EN = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const NEPALI_DAYS_NP = [
  'आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'
];

export const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const GREGORIAN_MONTHS_NP = [
  'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन',
  'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
];

export const toNepaliDigits = (numOrStr) => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(numOrStr).replace(/[0-9]/g, (d) => nepaliDigits[Number(d)]);
};

export const toEnglishDigits = (str) => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  let res = String(str);
  nepaliDigits.forEach((nd, i) => {
    res = res.replaceAll(nd, String(i));
  });
  return res;
};

/**
 * Get total number of days in a specific BS month
 * @param {number} year - e.g. 2083
 * @param {number} month1Indexed - 1 to 12
 */
export const getBsMonthDays = (year, month1Indexed) => {
  try {
    const y = Number(year);
    const m0 = Number(month1Indexed) - 1;
    for (let day = 32; day >= 28; day--) {
      try {
        const nd = new NepaliDate(y, m0, day);
        if (nd.getMonth() === m0 && nd.getDate() === day && nd.getYear() === y) {
          return day;
        }
      } catch (e) {
        // continue search
      }
    }
  } catch (err) {
    // safe fallback
  }
  return 30;
};

/**
 * Convert Gregorian (AD) Date to Bikram Sambat (BS) Date
 * @param {number} adYear - e.g. 2026
 * @param {number} adMonth - 1 to 12
 * @param {number} adDay - 1 to 31
 * @returns {object|null}
 */
export const convertAdToBs = (adYear, adMonth, adDay) => {
  try {
    const y = Number(adYear);
    const m = Number(adMonth);
    const d = Number(adDay);

    const jsDate = new Date(y, m - 1, d);
    const nepDate = new NepaliDate(jsDate);

    const bsYear = nepDate.getYear();
    const bsMonth = nepDate.getMonth() + 1; // 1-indexed
    const bsDay = nepDate.getDate();
    const dayOfWeekIdx = jsDate.getDay();

    const bsMonthNameEn = NEPALI_MONTHS_EN[bsMonth - 1] || 'Bhadra';
    const bsMonthNameNp = NEPALI_MONTHS_NP[bsMonth - 1] || 'भाद्र';
    const dayOfWeekEn = NEPALI_DAYS_EN[dayOfWeekIdx] || 'Sunday';
    const dayOfWeekNp = NEPALI_DAYS_NP[dayOfWeekIdx] || 'आइतबार';
    const adMonthNameEn = GREGORIAN_MONTHS_EN[m - 1] || 'September';
    const adMonthNameNp = GREGORIAN_MONTHS_NP[m - 1] || 'सेप्टेम्बर';

    return {
      bsYear,
      bsMonth,
      bsDay,
      bsMonthNameEn,
      bsMonthNameNp,
      dayOfWeekEn,
      dayOfWeekNp,
      adYear: y,
      adMonth: m,
      adDay: d,
      adMonthNameEn,
      adMonthNameNp,
      formattedBsNp: `${toNepaliDigits(bsDay)} ${bsMonthNameNp} ${toNepaliDigits(bsYear)}`,
      formattedBsEn: `${bsMonthNameEn} ${bsDay}, ${bsYear} BS`,
      formattedAdEn: `${adMonthNameEn} ${d}, ${y}`,
      formattedFullNp: `${dayOfWeekNp}, ${toNepaliDigits(bsDay)} ${bsMonthNameNp} ${toNepaliDigits(bsYear)}`,
      formattedFullEn: `${dayOfWeekEn}, ${adMonthNameEn} ${d}, ${y}`
    };
  } catch (err) {
    return null;
  }
};

/**
 * Convert Bikram Sambat (BS) Date to Gregorian (AD) Date
 * @param {number} bsYear - e.g. 2083
 * @param {number} bsMonth - 1 to 12
 * @param {number} bsDay - 1 to 32
 * @returns {object|null}
 */
export const convertBsToAd = (bsYear, bsMonth, bsDay) => {
  try {
    const y = Number(bsYear);
    const m = Number(bsMonth);
    const d = Number(bsDay);

    const nepDate = new NepaliDate(y, m - 1, d);
    const jsDate = nepDate.toJsDate();

    const adYear = jsDate.getFullYear();
    const adMonth = jsDate.getMonth() + 1;
    const adDay = jsDate.getDate();
    const dayOfWeekIdx = jsDate.getDay();

    const bsMonthNameEn = NEPALI_MONTHS_EN[m - 1] || 'Bhadra';
    const bsMonthNameNp = NEPALI_MONTHS_NP[m - 1] || 'भाद्र';
    const dayOfWeekEn = NEPALI_DAYS_EN[dayOfWeekIdx] || 'Sunday';
    const dayOfWeekNp = NEPALI_DAYS_NP[dayOfWeekIdx] || 'आइतबार';
    const adMonthNameEn = GREGORIAN_MONTHS_EN[adMonth - 1] || 'September';
    const adMonthNameNp = GREGORIAN_MONTHS_NP[adMonth - 1] || 'सेप्टेम्बर';

    return {
      bsYear: y,
      bsMonth: m,
      bsDay: d,
      bsMonthNameEn,
      bsMonthNameNp,
      dayOfWeekEn,
      dayOfWeekNp,
      adYear,
      adMonth,
      adDay,
      adMonthNameEn,
      adMonthNameNp,
      formattedBsNp: `${toNepaliDigits(d)} ${bsMonthNameNp} ${toNepaliDigits(y)}`,
      formattedBsEn: `${bsMonthNameEn} ${d}, ${y} BS`,
      formattedAdEn: `${adMonthNameEn} ${adDay}, ${adYear}`,
      formattedFullNp: `${dayOfWeekNp}, ${toNepaliDigits(d)} ${bsMonthNameNp} ${toNepaliDigits(y)}`,
      formattedFullEn: `${dayOfWeekEn}, ${adMonthNameEn} ${adDay}, ${adYear}`
    };
  } catch (err) {
    return null;
  }
};

/**
 * Get Current Live Date & Time in Nepal Standard Time (UTC+05:45)
 */
export const getLiveNepalDateTime = (is24Hour = false) => {
  const now = new Date();
  // Compute NPT timestamp (UTC + 5 hours 45 mins)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const nptTime = new Date(utc + (3600000 * 5.75));

  const year = nptTime.getFullYear();
  const month = nptTime.getMonth() + 1;
  const day = nptTime.getDate();
  const hours24 = nptTime.getHours();
  const minutes = nptTime.getMinutes();
  const seconds = nptTime.getSeconds();

  const bsConverted = convertAdToBs(year, month, day);

  let formattedTimeStr = '';
  let ampm = '';

  if (is24Hour) {
    formattedTimeStr = `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    ampm = hours24 >= 12 ? 'PM' : 'AM';
    let hours12 = hours24 % 12;
    hours12 = hours12 ? hours12 : 12;
    formattedTimeStr = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  }

  const nepaliAmPm = hours24 >= 12 ? 'अपराह्न' : 'पूर्वाह्न';
  let hours12Np = hours24 % 12;
  hours12Np = hours12Np ? hours12Np : 12;
  const formattedTimeNp = `${toNepaliDigits(String(hours12Np).padStart(2, '0'))}:${toNepaliDigits(String(minutes).padStart(2, '0'))}:${toNepaliDigits(String(seconds).padStart(2, '0'))} ${nepaliAmPm}`;

  return {
    rawDate: nptTime,
    adYear: year,
    adMonth: month,
    adDay: day,
    hours24,
    minutes,
    seconds,
    is24Hour,
    timeStr: formattedTimeStr,
    timeNp: formattedTimeNp,
    bsData: bsConverted
  };
};
