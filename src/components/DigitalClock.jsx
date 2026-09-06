import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

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

  if (variant === 'badge') {
    return (
      <div className="digital-clock-clean-badge" title="Live Time (Nepal Standard Time)">
        <div className="clean-badge-inner">
          <Clock size={13} className="clock-icon-live" />
          <span className="clean-badge-nepali">{nepaliHours}:{nepaliMinutes}:{nepaliSeconds} {nepaliAmPm}</span>
          <span className="clean-badge-divider">|</span>
          <span className="clean-badge-en">{formattedHours}:{minutes}:{seconds} {ampm} NST</span>
        </div>
      </div>
    );
  }

  // Compact / Topbar Format: ONLY time in Nepali and English
  return (
    <div className="digital-clock-clean-topbar" title="नेपाल मानक समय · Live NST (UTC+5:45)">
      <span className="live-clock-pulse" aria-hidden="true" />
      <span className="clean-clock-nepali">{nepaliHours}:{nepaliMinutes}:{nepaliSeconds} {nepaliAmPm}</span>
      <span className="clean-clock-sep">•</span>
      <span className="clean-clock-en">{formattedHours}:{minutes}:{seconds} {ampm} NST</span>
    </div>
  );
}
