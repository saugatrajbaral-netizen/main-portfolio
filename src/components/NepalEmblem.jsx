import React, { useState } from 'react';

/**
 * Official Emblem of Nepal (नेपालको निशान छाप / Coat of Arms of Nepal)
 * High-Definition 1:1 Ratio Official Government of Nepal Seal in PNG format (1000px HD).
 * Features:
 * - Mount Everest (Sagarmatha) with Himalayan Snow Glaciers
 * - White Silhouette Map of Nepal
 * - Gender Equality Handshake (Female hand with red bangles & Male hand)
 * - Rhododendron Garland Wreath (16 Lali Gurans blossoms)
 * - Double-Pennant Flag of Nepal at Crest
 * - Red Ribbon Scroll with Sanskrit Motto: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी"
 */
export default function NepalEmblem({
  className = '',
  style = {},
  variant = 'full',
  size = 120,
  alt = 'Government of Nepal Emblem'
}) {
  const [hasError, setHasError] = useState(false);

  // Variant Filters & Styles
  let filterStyle = {};
  let opacity = 1;

  if (variant === 'watermark') {
    opacity = 0.18;
    filterStyle = { filter: 'grayscale(20%) contrast(90%)' };
  } else if (variant === 'white' || variant === 'mono') {
    opacity = 0.25;
    filterStyle = { filter: 'brightness(0) invert(1)' };
  } else if (variant === 'gold') {
    filterStyle = { filter: 'sepia(100%) saturate(300%) brightness(90%) hue-rotate(5deg)' };
  }

  const combinedStyle = {
    display: 'inline-block',
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    aspectRatio: '1 / 1',
    objectFit: 'contain',
    flexShrink: 0,
    opacity,
    imageRendering: 'auto',
    ...filterStyle,
    ...style
  };

  if (hasError) {
    // Graceful fallback to SVG if the image fails to load
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        width={size}
        height={size}
        className={`nepal-emblem-svg ${className}`}
        style={{ display: 'inline-block', flexShrink: 0, aspectRatio: '1 / 1', ...style }}
        aria-label={alt}
        role="img"
      >
        <defs>
          <linearGradient id="govRibbonGradFallback" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e50914" />
            <stop offset="100%" stopColor="#780000" />
          </linearGradient>
          <linearGradient id="govEverestGradFallback" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        <g>
          <path d="M 180,480 L 320,320 L 400,225 L 480,320 L 620,480 Z" fill="url(#govEverestGradFallback)" />
          <polygon points="400,225 385,255 405,250 415,225" fill="#ffffff" />
          <path d="M 270,470 C 315,460 385,440 520,485 C 555,510 500,540 410,558 C 300,555 255,525 270,470 Z" fill="#ffffff" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="#d90429" strokeWidth="18" />
          <text x="400" y="730" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="bold">
            जननी जन्मभूमिश्च स्वर्गादपि गरीयसी
          </text>
        </g>
      </svg>
    );
  }

  return (
    <img
      src="/nepal-emblem-official.png"
      alt={alt}
      width={size}
      height={size}
      className={`nepal-emblem-img ${className}`}
      style={combinedStyle}
      loading="eager"
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
}
