import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PatrioticBackground — Premium Nepal National Identity & Official Emblem Visual System
 * 
 * Visual Layer Architecture:
 * 1. Base Executive Institutional Canvas (Light/Dark mode adaptive gradient)
 * 2. Subtle Himalayan / Sagarmatha Horizon Atmosphere
 * 3. Precision Topographic Cartography & Coordinate Vectors
 * 4. Authentic High-Resolution National Emblem of Nepal (नेपालको राष्ट्रिय निशान छाप)
 * 5. Soft Atmospheric Lighting, Radial Depth & Text Readability Protective Layer
 */

export default function PatrioticBackground() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Smooth subtle parallax scroll handler
  useEffect(() => {
    if (reduceMotion) return;

    let animationFrameId = null;
    const handleScroll = () => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        animationFrameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion]);

  // Very gentle parallax offsets (max 20px)
  const emblemParallax = reduceMotion ? 0 : Math.min(scrollY * 0.02, 22);
  const himalayaParallax = reduceMotion ? 0 : Math.min(scrollY * 0.035, 30);

  return (
    <div className="gov-emblem-bg-system" aria-hidden="true">
      {/* Layer 1: Master Executive Canvas Gradients */}
      <div className="bg-master-executive-canvas" />

      {/* Layer 2: Subtle Ambient Radial Glows (Himalayan Blue & Crimson Warmth) */}
      <div className="bg-emblem-ambient-radial-top" />
      <div className="bg-emblem-ambient-radial-bottom" />

      {/* Layer 3: Precision Topographic Contours & Geodetic Grid */}
      <div className="bg-cartographic-contour-layer">
        <svg
          className="bg-contour-svg"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Coordinate Grid */}
          <line x1="0" y1="300" x2="1600" y2="300" stroke="#003893" strokeWidth="0.5" strokeDasharray="6,16" opacity="0.35" />
          <line x1="0" y1="600" x2="1600" y2="600" stroke="#003893" strokeWidth="0.5" strokeDasharray="6,16" opacity="0.35" />
          <line x1="400" y1="0" x2="400" y2="900" stroke="#003893" strokeWidth="0.5" strokeDasharray="6,16" opacity="0.35" />
          <line x1="800" y1="0" x2="800" y2="900" stroke="#003893" strokeWidth="0.5" strokeDasharray="6,16" opacity="0.35" />
          <line x1="1200" y1="0" x2="1200" y2="900" stroke="#003893" strokeWidth="0.5" strokeDasharray="6,16" opacity="0.35" />

          {/* Elevation Isobars */}
          <path
            d="M 0,380 C 260,350 520,410 780,360 C 1040,320 1300,390 1600,360"
            fill="none"
            stroke="#003893"
            strokeWidth="0.75"
            opacity="0.4"
          />
          <path
            d="M 0,460 C 220,430 480,490 740,440 C 1000,400 1260,470 1600,430"
            fill="none"
            stroke="#003893"
            strokeWidth="0.75"
            opacity="0.35"
          />
          <path
            d="M 0,540 C 280,510 540,570 800,520 C 1060,480 1320,550 1600,510"
            fill="none"
            stroke="#003893"
            strokeWidth="0.75"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Layer 4: AUTHENTIC NATIONAL EMBLEM OF NEPAL (HIGH-RESOLUTION WATERMARK) */}
      <div
        className="bg-authentic-national-emblem-showcase"
        style={{
          transform: `translate3d(-50%, calc(-50% - ${emblemParallax}px), 0)`
        }}
      >
        <picture className="bg-national-emblem-picture">
          <source type="image/webp" srcSet="/national-emblem-nepal-hd.webp 1024w" />
          <source type="image/png" srcSet="/national-emblem-nepal-hd.png" />
          <img
            src="/national-emblem-nepal-hd.png"
            alt=""
            className="bg-national-emblem-hd-img"
            width={1024}
            height={858}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* Layer 5: Subtle Himalayan Skyline Horizon Silhouette */}
      <div
        className="bg-himalayan-silhouette-layer"
        style={{
          transform: `translate3d(0, -${himalayaParallax}px, 0)`
        }}
      >
        <svg
          className="bg-himalayan-skyline-svg"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distant Peaks */}
          <path
            d="M 0,200 L 110,140 L 220,180 L 350,110 L 480,170 L 620,90 L 740,150 L 860,70 L 980,140 L 1100,100 L 1220,165 L 1340,120 L 1440,170 L 1440,260 L 0,260 Z"
            fill="url(#emblemHimalayaBackGrad)"
          />
          {/* Front Peaks */}
          <path
            d="M 0,220 L 140,170 L 260,200 L 390,140 L 510,190 L 650,125 L 770,170 L 880,105 L 1010,165 L 1140,130 L 1260,190 L 1440,150 L 1440,260 L 0,260 Z"
            fill="url(#emblemHimalayaFrontGrad)"
          />
          <defs>
            <linearGradient id="emblemHimalayaBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#003893" stopOpacity="0.025" />
              <stop offset="100%" stopColor="#001f3f" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="emblemHimalayaFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#001f3f" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#001f3f" stopOpacity="0.07" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Layer 6: Soft Vignette & WCAG Contrast Protector Overlay */}
      <div className="bg-emblem-readability-vignette" />
    </div>
  );
}
