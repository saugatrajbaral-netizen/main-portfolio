import React, { useEffect } from 'react';
import { X, Download, ShieldCheck, Sparkles, Flag, Award } from 'lucide-react';
import NepalEmblem from './NepalEmblem';

export default function NationalSymbolsModal({ isOpen, onClose, lang = 'en' }) {
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

  const symbolsList = [
    {
      title: 'National Flag',
      nepali: 'राष्ट्रिय झण्डा',
      desc: lang === 'np' ? 'चन्द्र र सूर्य अंकित विश्वकै एकमात्र त्रिकोणात्मक राष्ट्रिय झण्डा।' : 'Double-pennant flag with radiant Sun and crescent Moon symbols.',
      icon: '🇳🇵'
    },
    {
      title: 'National Weapon',
      nepali: 'खुकुरी (Khukuri)',
      desc: lang === 'np' ? 'वीरता, स्वाभिमान र राष्ट्रिय गौरवको प्रतीक पारम्परिक हतियार।' : 'Legendary curved blade symbolizing valor, honor, and sovereign courage.',
      icon: '🗡️'
    },
    {
      title: 'National Flower',
      nepali: 'लालीगुराँस (Rhododendron)',
      desc: lang === 'np' ? 'उच्च पहाडी तथा हिमाली भेगमा फुल्ने गाढा रातो राष्ट्रिय फूल।' : 'Vibrant crimson blooms of the Himalayan mountains.',
      icon: '🌺'
    },
    {
      title: 'National Bird',
      nepali: 'डाँफे (Himalayan Monal)',
      desc: lang === 'np' ? 'नौ रङ्गी प्वाँख भएको हिमाली सौन्दर्यको प्रतीक चरा।' : 'Magnificent multi-hued high-altitude pheasant.',
      icon: '🦚'
    },
    {
      title: 'National Emblem',
      nepali: 'निशान छाप (Nishan Chhap)',
      desc: lang === 'np' ? 'सगरमाथा, महिला-पुरुष समानता र राष्ट्रिय आदर्श वाक्य अंकित छाप।' : 'Official seal featuring Mt. Everest, equality handshake, and national motto.',
      icon: '🏔️'
    },
    {
      title: 'National Game',
      nepali: 'भलिबल (Volleyball)',
      desc: lang === 'np' ? 'सातै प्रदेश र भौगोलिक विविधतामा लोकप्रिय घोषित राष्ट्रिय खेल।' : 'Officially declared national sport played across all seven provinces.',
      icon: '🏐'
    },
    {
      title: 'National Animal',
      nepali: 'गाई (Cow)',
      desc: lang === 'np' ? 'धार्मिक, सांस्कृतिक तथा संवैधानिक मान्यता प्राप्त राष्ट्रिय जनावर।' : 'Sacred symbol of gentleness and constitutional emblem of Nepal.',
      icon: '🐄'
    },
    {
      title: 'National Color',
      nepali: 'सिम्रिक (Crimson Red)',
      desc: lang === 'np' ? 'लालीगुराँस र विजयको प्रतिनिधित्व गर्ने गाढा रातो रङ्ग।' : 'Rich vermilion representing victory, vitality, and Rhododendron.',
      icon: '🔴'
    },
    {
      title: 'National Dress',
      nepali: 'दौरा सुरुवाल (Daura Suruwal)',
      desc: lang === 'np' ? 'औपचारिक राजकीय, संवैधानिक तथा सांस्कृतिक पोसाक।' : 'Official traditional formal attire worn on civic and ceremonial occasions.',
      icon: '🥋'
    },
  ];

  return (
    <div className="resume-dialog-backdrop" onClick={onClose}>
      <div
        className="symbols-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="symbols-title"
      >
        {/* Header */}
        <div className="dialog-head symbols-dialog-head">
          <div className="symbols-head-title-wrap">
            <NepalEmblem size={44} variant="full" />
            <div>
              <span className="eyebrow symbols-eyebrow">
                {lang === 'np' ? 'नेपाल सरकार · संवैधानिक पहिचान' : 'Government of Nepal · Constitutional Identity'}
              </span>
              <h2 id="symbols-title" className="symbols-modal-heading">
                {lang === 'np' ? 'नेपालका राष्ट्रिय चिन्हहरू तथा प्रतीक' : 'National Symbols of Nepal (राष्ट्रिय चिन्हहरू)'}
              </h2>
              <div className="symbols-modal-sub">
                {lang === 'np' ? 'संवैधानिक पहिचान, निसान छाप तथा राष्ट्रिय धरोहर' : 'Official State Insignia, Emblems & Constitutional Heritage'}
              </div>
            </div>
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

        {/* Dialog Body */}
        <div className="symbols-modal-content">
          {/* Main Visual Image Card */}
          <div className="symbols-image-panel">
            <div className="symbols-image-wrap">
              <picture className="symbols-picture">
                <source type="image/webp" srcSet="/national-symbols-nepal.webp" />
                <source type="image/jpeg" srcSet="/national-symbols-nepal.jpg" />
                <img
                  src="/national-symbols-nepal.jpg"
                  alt="National symbols of Nepal / नेपालका राष्ट्रिय चिन्हहरू"
                  className="symbols-full-img"
                  width={405}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="symbols-banner-motto">
              <div className="motto-row">
                <strong>{lang === 'np' ? 'राष्ट्रिय गान:' : 'National Anthem:'}</strong> "सयौं थुँगा फूलका हामी एउटै माला नेपाली..."
              </div>
              <div className="motto-row">
                <strong>{lang === 'np' ? 'राष्ट्रिय बाणी:' : 'National Motto:'}</strong> "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी"
              </div>
              <div className="motto-row">
                <strong>{lang === 'np' ? 'सरकारी कामकाजको भाषा:' : 'Official Language:'}</strong> नेपाली (देवनागरी लिपि)
              </div>
            </div>
          </div>

          {/* Quick Fact Grid */}
          <div className="symbols-grid-panel">
            <h3 className="symbols-catalog-heading">
              <ShieldCheck size={18} color="var(--gov-blue)" />
              <span>{lang === 'np' ? 'राष्ट्रिय चिन्हहरूको आधिकारिक विवरण' : 'Official Catalog of National Symbols'}</span>
            </h3>

            <div className="symbols-cards-grid">
              {symbolsList.map((item, idx) => (
                <div key={idx} className="symbol-item-card">
                  <div className="symbol-item-icon">
                    {item.title === 'National Emblem' ? (
                      <NepalEmblem size={24} variant="full" />
                    ) : (
                      item.icon
                    )}
                  </div>
                  <div className="symbol-item-info">
                    <div className="symbol-nep-name">{item.nepali}</div>
                    <div className="symbol-eng-name">{item.title}</div>
                    <div className="symbol-item-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="dialog-actions symbols-dialog-actions">
          <a
            href="/national-symbols-nepal.jpg"
            download="National-Symbols-of-Nepal.jpg"
            className="button button-primary symbols-download-btn"
            style={{ textDecoration: 'none' }}
          >
            <Download size={14} />
            <span>{lang === 'np' ? 'चार्ट डाउनलोड' : 'Download Chart'}</span>
          </a>

          <button
            type="button"
            className="button button-secondary symbols-close-btn"
            onClick={onClose}
          >
            <span>{lang === 'np' ? 'बन्द गर्नुहोस्' : 'Close Window'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
