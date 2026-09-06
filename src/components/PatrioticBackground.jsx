import React from 'react';

/**
 * PatrioticBackground — Institutional Government of Nepal Background Theme
 * 
 * Layers:
 * 1. Warm-white & deep institutional blue atmospheric gradient
 * 2. Subtle Newari geometric lattice watermark (2-3% opacity)
 * 3. Accurate Nepal Geographic Map silhouette (2-4% opacity)
 * 4. Faint Himalayan Mountain Skyline / Sagarmatha Silhouette (3-7% opacity)
 * 5. Digital Public Service Micro-Network (Digital Nepal data nodes, 2-4% opacity)
 * 6. Official State Emblem Watermark (2-4% opacity)
 * 
 * All elements are fixed/absolute, pointer-events: none, z-index: 0, 
 * completely behind existing UI content.
 */
export default function PatrioticBackground() {
  return (
    <div className="gov-patriotic-bg-system" aria-hidden="true">
      {/* Layer 1: Ambient Mesh & Warm Sun Gradient */}
      <div className="bg-ambient-light-glow" />
      <div className="bg-ambient-blue-depth" />

      {/* Layer 2: Traditional Nepali Geometric Pattern (Mandala / Newari Lattice Watermark) */}
      <div className="bg-nepali-pattern-grid" />

      {/* Layer 3: Nepal Map Outline (Subtle watermark positioned gracefully) */}
      <svg
        className="bg-nepal-map-silhouette"
        viewBox="0 0 1000 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 60,180 C 90,140 140,110 200,95 C 260,80 320,85 370,110 C 420,135 460,115 510,90 C 560,65 620,60 670,80 C 720,100 770,90 820,115 C 870,140 920,170 950,210 C 970,240 950,280 910,310 C 860,345 800,360 740,350 C 680,340 620,365 560,380 C 500,395 440,390 380,370 C 320,350 260,360 200,340 C 140,320 90,290 65,245 C 50,220 50,195 60,180 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="url(#nepalMapGrad)"
        />
        <defs>
          <linearGradient id="nepalMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003893" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#dc143c" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#001f3f" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 4: National Emblem Large-Scale Monochrome Watermark (Top-Right / Off-Screen) */}
      <svg
        className="bg-emblem-large-watermark"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1.2">
          {/* Outer Rhododendron garland ring */}
          <circle cx="400" cy="400" r="340" strokeDasharray="6 8" />
          <circle cx="400" cy="400" r="310" />
          {/* Crest Flag outline */}
          <path d="M 400,100 L 440,160 L 400,160 L 440,230 L 380,230 L 380,90 Z" />
          {/* Mount Everest Sagarmatha peaks */}
          <path d="M 220,440 L 340,280 L 400,350 L 480,260 L 580,440 Z" />
          {/* Himalayan snow contour */}
          <path d="M 260,440 L 340,330 L 370,370 L 480,300 L 540,440" />
          {/* Base ribbon arc */}
          <path d="M 180,520 C 300,590 500,590 620,520 L 600,560 C 490,620 310,620 200,560 Z" />
          {/* Inner spokes / ray patterns */}
          <line x1="400" y1="180" x2="400" y2="250" />
          <line x1="260" y1="260" x2="310" y2="310" />
          <line x1="540" y1="260" x2="490" y2="310" />
        </g>
      </svg>

      {/* Layer 5: Digital Nepal Micro-Network (Abstract Data Lines & Public Governance Interconnects) */}
      <svg
        className="bg-digital-network-grid"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="0.75" opacity="0.6">
          <line x1="120" y1="180" x2="340" y2="280" strokeDasharray="3 4" />
          <line x1="340" y1="280" x2="520" y2="220" />
          <line x1="520" y1="220" x2="720" y2="310" strokeDasharray="2 3" />
          <line x1="720" y1="310" x2="960" y2="190" />
          <line x1="960" y1="190" x2="1180" y2="260" strokeDasharray="4 5" />
          <line x1="1180" y1="260" x2="1340" y2="170" />
          
          <line x1="240" y1="480" x2="440" y2="420" strokeDasharray="3 4" />
          <line x1="440" y1="420" x2="680" y2="520" />
          <line x1="680" y1="520" x2="890" y2="440" strokeDasharray="3 5" />
          <line x1="890" y1="440" x2="1140" y2="530" />
        </g>
        {/* Network Nodes */}
        <g fill="currentColor">
          <circle cx="120" cy="180" r="2.5" />
          <circle cx="340" cy="280" r="3" />
          <circle cx="520" cy="220" r="2" />
          <circle cx="720" cy="310" r="3.5" />
          <circle cx="960" cy="190" r="2.5" />
          <circle cx="1180" cy="260" r="3" />
          <circle cx="1340" cy="170" r="2" />

          <circle cx="240" cy="480" r="2" />
          <circle cx="440" cy="420" r="3" />
          <circle cx="680" cy="520" r="2.5" />
          <circle cx="890" cy="440" r="3" />
          <circle cx="1140" cy="530" r="2" />
        </g>
      </svg>

      {/* Layer 6: Himalayan Mountain Skyline (Sagarmatha / Everest Horizon Silhouette at bottom) */}
      <div className="bg-himalayan-skyline-wrapper">
        <svg
          className="bg-himalayan-skyline-svg"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back Range — Distant High Himalayas */}
          <path
            d="M 0,220 L 90,160 L 180,195 L 290,130 L 410,185 L 530,110 L 640,165 L 720,80 L 810,150 L 930,100 L 1050,170 L 1170,120 L 1290,175 L 1380,140 L 1440,190 L 1440,280 L 0,280 Z"
            fill="url(#himalayaBackGrad)"
          />

          {/* Front Range — Dramatic Himalayan Ridge with Everest (Sagarmatha) Peak */}
          <path
            d="M 0,240 L 120,190 L 220,215 L 340,160 L 460,210 L 590,145 L 700,190 L 780,115 L 860,180 L 990,140 L 1110,205 L 1220,155 L 1340,210 L 1440,180 L 1440,280 L 0,280 Z"
            fill="url(#himalayaFrontGrad)"
          />

          {/* Ridge Contour Lines */}
          <path
            d="M 90,160 L 140,220 M 290,130 L 330,200 M 530,110 L 570,190 M 720,80 L 760,170 M 930,100 L 970,180 M 1170,120 L 1210,190 M 780,115 L 820,200"
            stroke="url(#himalayaRidgeStroke)"
            strokeWidth="1.2"
            opacity="0.5"
          />

          <defs>
            <linearGradient id="himalayaBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#003893" stopOpacity="0.035" />
              <stop offset="100%" stopColor="#001f3f" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="himalayaFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#001f3f" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#001f3f" stopOpacity="0.095" />
            </linearGradient>

            <linearGradient id="himalayaRidgeStroke" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc143c" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#003893" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
