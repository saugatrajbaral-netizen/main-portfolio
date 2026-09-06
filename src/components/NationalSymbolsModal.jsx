import React, { useEffect } from 'react';
import { X, Download, Landmark, ShieldCheck, Flag, Sparkles, ExternalLink } from 'lucide-react';
import NepalEmblem from './NepalEmblem';

export default function NationalSymbolsModal({ isOpen, onClose }) {
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
    { title: 'National Flag', nepali: 'राष्ट्रिय झण्डा', desc: 'Double-pennant flag with radiant Sun and crescent Moon symbols.', icon: '🇳🇵' },
    { title: 'National Weapon', nepali: 'खुकुरी (Khukuri)', desc: 'Legendary curved blade symbolizing valor, honor, and sovereign courage.', icon: '🗡️' },
    { title: 'National Flower', nepali: 'लालीगुराँस (Rhododendron)', desc: 'Vibrant crimson blooms of the Himalayan mountains.', icon: '🌺' },
    { title: 'National Bird', nepali: 'डाँफे (Himalayan Monal)', desc: 'Magnificent multi-hued high-altitude pheasant.', icon: '🦚' },
    { title: 'National Emblem', nepali: 'निशान छाप (Nishan Chhap)', desc: 'Official seal featuring Mt. Everest, equality handshake, and national motto.', icon: '🏔️' },
    { title: 'National Game', nepali: 'भलिबल (Volleyball)', desc: 'Officially declared national sport played across all seven provinces.', icon: '🏐' },
    { title: 'National Animal', nepali: 'गाई (Cow)', desc: 'Sacred symbol of gentleness and constitutional emblem of Nepal.', icon: '🐄' },
    { title: 'National Color', nepali: 'सिम्रिक (Crimson Red)', desc: 'Rich vermilion representing victory, vitality, and Rhododendron.', icon: '🔴' },
    { title: 'National Dress', nepali: 'दौरा सुरुवाल (Daura Suruwal)', desc: 'Official traditional formal attire worn on civic and ceremonial occasions.', icon: '🥋' },
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
        <div className="dialog-head" style={{ borderBottom: '2px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <NepalEmblem size={52} variant="full" />
            <div>
              <span className="eyebrow" style={{ color: 'var(--crimson)' }}>
                Government of Nepal · Constitutional Identity
              </span>
              <h2 id="symbols-title" style={{ margin: '4px 0 2px', fontSize: '24px' }}>
                National Symbols of Nepal (नेपालका राष्ट्रिय चिन्हहरू)
              </h2>
              <div style={{ color: 'var(--slate)', fontSize: '12px', fontFamily: 'var(--app-font-mono)' }}>
                Official State Insignia, Emblems & Constitutional Heritage
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
              <img
                src="/national-symbols-nepal.jpg"
                alt="National symbols of Nepal / नेपालका राष्ट्रिय चिन्हहरू"
                className="symbols-full-img"
              />
            </div>
            <div className="symbols-banner-motto">
              <div className="motto-row">
                <strong>राष्ट्रिय गान:</strong> "सयौं थुँगा फूलका हामी एउटै माला नेपाली..."
              </div>
              <div className="motto-row">
                <strong>राष्ट्रिय बाणी:</strong> "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी"
              </div>
              <div className="motto-row">
                <strong>सरकारी कामकाजी भाषा:</strong> नेपाली (देवनागरी लिपि)
              </div>
            </div>
          </div>

          {/* Quick Fact Grid */}
          <div className="symbols-grid-panel">
            <h3 style={{ fontSize: '16px', color: 'var(--navy)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--gov-blue)" />
              <span>Official Catalog of National Symbols</span>
            </h3>

            <div className="symbols-cards-grid">
              {symbolsList.map((item, idx) => (
                <div key={idx} className="symbol-item-card">
                  <div className="symbol-item-icon">
                    {item.title === 'National Emblem' ? (
                      <NepalEmblem size={26} variant="full" />
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
        <div className="dialog-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <a
            href="/national-symbols-nepal.jpg"
            download="National-Symbols-of-Nepal.jpg"
            className="button button-primary"
            style={{ textDecoration: 'none' }}
          >
            <Download size={14} />
            <span>Download Chart</span>
          </a>

          <button
            type="button"
            className="button button-secondary"
            style={{ color: 'var(--navy)', borderColor: '#cbd5e1' }}
            onClick={onClose}
          >
            <span>Close Window</span>
          </button>
        </div>
      </div>
    </div>
  );
}
