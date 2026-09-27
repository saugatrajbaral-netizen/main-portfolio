import React from 'react';

/**
 * Authentic Crisp SVG United States Flag
 */
export function UsFlagIcon({ size = 15, className = '' }) {
  const width = size;
  const height = Math.round((size * 10) / 16);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7410 3900"
      className={`flag-svg-icon flag-us ${className}`}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        borderRadius: '2px',
        flexShrink: 0,
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.4)'
      }}
    >
      <rect width="7410" height="3900" fill="#b22234" />
      <path
        d="M0,450H7410M0,1050H7410M0,1650H7410M0,2250H7410M0,2850H7410M0,3450H7410"
        stroke="#ffffff"
        strokeWidth="300"
      />
      <rect width="2964" height="2100" fill="#3c3b6e" />
      <g fill="#ffffff">
        <g id="s18">
          <g id="s9">
            <g id="s5">
              <g id="s4">
                <path
                  id="s"
                  d="M247,90 317,307 134,173h226L177,307z"
                />
                <use href="#s" y="420" />
                <use href="#s" y="840" />
                <use href="#s" y="1260" />
              </g>
              <use href="#s" y="1680" />
            </g>
            <use href="#s4" x="247" y="210" />
          </g>
          <use href="#s9" x="494" />
        </g>
        <use href="#s18" x="988" />
        <use href="#s9" x="1976" />
        <use href="#s5" x="2470" />
      </g>
    </svg>
  );
}

/**
 * Authentic Crisp SVG Nepal Double-Pennon National Flag
 */
export function NepalFlagIcon({ size = 16, className = '' }) {
  const height = size;
  const width = Math.round((size * 100) / 122);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 122"
      className={`flag-svg-icon flag-nepal ${className}`}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35))'
      }}
    >
      {/* Deep Blue Outer Border Frame */}
      <polygon
        points="0,0 80,48 34,48 94,122 0,122"
        fill="#003893"
      />
      {/* Crimson Red Inner Double-Pennon */}
      <polygon
        points="6,8 68,45 26,45 80,114 6,114"
        fill="#DC143C"
      />
      {/* Crescent Moon & Sun (Upper Pennon) */}
      <g fill="#FFFFFF">
        <path d="M19,30 C19,23 29,23 29,30 C29,34 19,34 19,30 Z" opacity="0.95" />
        <path d="M17,29 C17,20 31,20 31,29 C28,26 20,26 17,29 Z" />
        <circle cx="24" cy="30" r="3.2" />
        <polygon points="24,24 25.5,27 28.5,26 27,29 30,30 27,31 28.5,34 25.5,33 24,36 22.5,33 19.5,34 21,31 18,30 21,29 19.5,26 22.5,27" />
      </g>
      {/* 12-Rayed Radiant Sun (Lower Pennon) */}
      <g fill="#FFFFFF">
        <circle cx="27" cy="80" r="5" />
        <path d="M27,70 L28.5,75 L33,73 L31,77.5 L36,78.5 L32.5,82 L36.5,85 L32,86.5 L33.5,91 L29,89.5 L27,94 L25,89.5 L20.5,91 L22,86.5 L17.5,85 L21.5,82 L18,78.5 L23,77.5 L21,73 L25.5,75 Z" />
      </g>
    </svg>
  );
}

export default {
  UsFlagIcon,
  NepalFlagIcon
};
