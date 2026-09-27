import React from 'react';
import NepalEmblem from './NepalEmblem';

/**
 * OfficerProfileFrame
 * 
 * Sophisticated multi-layered Government of Nepal profile frame for Saugat Raj Baral.
 * Layers:
 * - Far Background: Subtle Nepal Map Silhouette & Nepali Dhaka lattice accents
 * - Background: Himalayan Mountain Contour (Sagarmatha Ridge)
 * - Middle: Digital Governance Micro-Network (Citizen ↔ Governance ↔ Digital Services)
 * - Foreground: Authentic real portrait photo with Nepal-red accent border, glass frame, and official caption
 */
export default function OfficerProfileFrame({ 
  name = 'Saugat Raj Baral',
  nepaliName = 'सौगात राज बराल',
  designation = 'Tax Officer | नेपाल सरकार',
  office = 'Ministry of Finance / Inland Revenue',
  lang = 'en'
}) {
  return (
    <div className="officer-profile-composite" aria-label="Official Profile Portrait of Saugat Raj Baral">
      {/* =========================================================================
          LAYER 1: FAR BACKGROUND — SUBTLE NEPAL MAP CONTOUR & HIMALAYAN RIDGELINE
          ========================================================================= */}
      <div className="profile-backdrop-art" aria-hidden="true">
        {/* Himalayan Silhouette Contour Curve (Everest Ridge) */}
        <svg 
          className="art-himalaya-contour" 
          viewBox="0 0 500 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10,220 L 75,175 L 120,195 L 180,120 L 225,150 L 290,65 L 350,140 L 410,95 L 455,160 L 495,220"
            stroke="rgba(0, 56, 147, 0.18)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="himalaya-path-pulse"
          />
          {/* Main Peak Summit Glow */}
          <polygon
            points="290,65 260,110 320,110"
            fill="rgba(0, 56, 147, 0.04)"
            stroke="rgba(220, 20, 60, 0.22)"
            strokeWidth="1"
          />
          {/* Secondary Ridge lines */}
          <path
            d="M 180,120 L 210,165 M 350,140 L 320,180 M 410,95 L 435,145"
            stroke="rgba(0, 31, 63, 0.12)"
            strokeWidth="1"
          />
        </svg>

        {/* Nepal Map Outline Watermark behind frame */}
        <svg
          className="art-nepal-map-trace"
          viewBox="0 0 360 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 40,110 C 60,95 85,100 110,85 C 135,70 160,80 185,65 C 210,75 240,60 270,75 C 300,90 330,105 340,130 C 330,150 300,145 270,160 C 240,175 200,165 170,180 C 130,170 90,175 60,155 C 45,145 40,125 40,110 Z"
            stroke="rgba(0, 56, 147, 0.12)"
            strokeWidth="1.2"
            fill="rgba(0, 56, 147, 0.02)"
          />
        </svg>

        {/* Digital Government Micro-Nodes (Citizen → Government → Digital Tax Administration) */}
        <svg
          className="art-digital-nodes-network"
          viewBox="0 0 420 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Interconnection Grid Lines */}
          <line x1="30" y1="60" x2="110" y2="130" stroke="rgba(0, 56, 147, 0.12)" strokeWidth="1" />
          <line x1="110" y1="130" x2="70" y2="240" stroke="rgba(0, 56, 147, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="390" y1="90" x2="330" y2="160" stroke="rgba(0, 56, 147, 0.12)" strokeWidth="1" />
          <line x1="330" y1="160" x2="370" y2="290" stroke="rgba(0, 56, 147, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="370" y1="290" x2="310" y2="390" stroke="rgba(0, 56, 147, 0.1)" strokeWidth="1" />
          <line x1="70" y1="240" x2="120" y2="360" stroke="rgba(0, 56, 147, 0.1)" strokeWidth="1" />

          {/* Micro-Pulsing Nodes */}
          <circle cx="30" cy="60" r="3" fill="#003893" opacity="0.35" className="node-pulse" />
          <circle cx="110" cy="130" r="2.5" fill="#dc143c" opacity="0.4" className="node-pulse-delayed" />
          <circle cx="70" cy="240" r="2" fill="#003893" opacity="0.3" />
          <circle cx="120" cy="360" r="2.5" fill="#003893" opacity="0.3" />
          <circle cx="390" cy="90" r="3" fill="#dc143c" opacity="0.4" className="node-pulse" />
          <circle cx="330" cy="160" r="2.5" fill="#003893" opacity="0.35" className="node-pulse-delayed" />
          <circle cx="370" cy="290" r="2.5" fill="#003893" opacity="0.3" />
          <circle cx="310" cy="390" r="3" fill="#dc143c" opacity="0.4" className="node-pulse" />
        </svg>

        {/* Minimal Corner Geometric Dhaka Accent (Top-Right) */}
        <div className="profile-corner-dhaka top-right" />
      </div>

      {/* =========================================================================
          LAYER 2: REFINED MULTI-LAYER OFFSET FRAME & RED ACCENT
          ========================================================================= */}
      <div className="profile-frame-container">
        {/* Subtle Outer Atmospheric Halo */}
        <div className="profile-atmospheric-halo" aria-hidden="true" />

        {/* Thin Nepal Crimson Accent Offset Border */}
        <div className="profile-crimson-offset-line" aria-hidden="true" />

        {/* Primary Glass-Like Border Container */}
        <div className="profile-glass-frame">
          {/* Authentic Real Photograph */}
          <div className="profile-img-viewport">
            <picture className="profile-picture-wrap">
              <source type="image/webp" srcSet="/saugat-baral-portrait.webp 640w, /saugat-baral.webp 1024w" />
              <source type="image/jpeg" srcSet="/saugat-baral.jpg" />
              <img
                src="/saugat-baral.jpg"
                alt={`Official portrait of ${name} (${nepaliName})`}
                className="profile-real-image"
                width={640}
                height={800}
                loading="eager"
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
