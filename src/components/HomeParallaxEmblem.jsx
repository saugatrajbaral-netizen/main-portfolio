import React, { useState, useEffect, useRef } from 'react';

/**
 * HomeParallaxEmblem
 * Dynamic 3D interactive parallax Nepal Government Emblem for Homepage
 * Features:
 * - Real-time smooth scroll parallax
 * - Interactive cursor 3D tilt & depth response
 * - Ambient radial glow halo (crimson/gold/blue)
 * - Automatic gentle floating micro-animation
 * - Prefers-reduced-motion compliance
 */
export default function HomeParallaxEmblem({ lang = 'en' }) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let animId = null;
    const handleScroll = () => {
      if (animId) return;
      animId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        animId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reduceMotion]);

  const handleMouseMove = (e) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    setCoords({
      x: normX * 18,
      y: normY * 18,
      tiltX: -normY * 12,
      tiltY: normX * 12
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Gentle scroll parallax offset
  const scrollOffset = reduceMotion ? 0 : Math.min(scrollY * 0.12, 60);

  return (
    <div
      ref={containerRef}
      className="home-parallax-emblem-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Outer Atmospheric Aura Glow */}
      <div
        className="parallax-emblem-glow"
        style={{
          transform: `translate3d(${coords.x * 0.5}px, ${coords.y * 0.5 - scrollOffset * 0.5}px, 0)`
        }}
      />

      {/* Main 3D Floating Emblem */}
      <div
        className="parallax-emblem-stage"
        style={{
          transform: reduceMotion
            ? 'none'
            : `perspective(1000px) translate3d(${coords.x}px, ${coords.y - scrollOffset}px, 0) rotateX(${coords.tiltX}deg) rotateY(${coords.tiltY}deg) scale(${isHovered ? 1.04 : 1})`
        }}
      >
        <img
          src="/nepal-gov-logo.jpg"
          alt="Government of Nepal Official Emblem"
          className="parallax-emblem-img"
          loading="eager"
        />

        {/* Shimmering Halo Ring */}
        <div className="parallax-halo-ring" />
      </div>
    </div>
  );
}
