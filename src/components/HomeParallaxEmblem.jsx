import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

/**
 * HomeParallaxEmblem
 * Ultra-Smooth Physics-Damped 3D Parallax National Emblem for Homepage.
 * 
 * Architecture:
 * - 60fps/120fps Continuous Linear Interpolation (LERP) Physics Loop
 * - Multi-layer depth parallax (Deep Glow -> Geodetic Ring -> Emblem -> Glare -> Badge)
 * - Dynamic Cursor 3D Perspective Tilt & Lighting Sheen
 * - Smooth Scroll Damping
 * - WCAG Accessibility & Reduced-Motion Safety
 */
export default function HomeParallaxEmblem({ lang = 'en' }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const glowRef = useRef(null);
  const haloRef = useRef(null);
  const glareRef = useRef(null);
  
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Physics vectors
  const target = useRef({ x: 0, y: 0, tiltX: 0, tiltY: 0, scrollY: 0 });
  const current = useRef({ x: 0, y: 0, tiltX: 0, tiltY: 0, scrollY: 0 });
  const rafId = useRef(null);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Smooth Physics Animation Loop
  useEffect(() => {
    if (reduceMotion) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updatePhysics = () => {
      // Linear interpolation with smooth spring damping
      current.current.x = lerp(current.current.x, target.current.x, 0.075);
      current.current.y = lerp(current.current.y, target.current.y, 0.075);
      current.current.tiltX = lerp(current.current.tiltX, target.current.tiltX, 0.075);
      current.current.tiltY = lerp(current.current.tiltY, target.current.tiltY, 0.075);
      current.current.scrollY = lerp(current.current.scrollY, target.current.scrollY, 0.055);

      const { x, y, tiltX, tiltY, scrollY } = current.current;
      const scrollOffset = Math.min(scrollY * 0.12, 65);

      // Direct GPU transform updates for buttery 120fps
      if (stageRef.current) {
        stageRef.current.style.transform = `perspective(1200px) translate3d(${x}px, ${y - scrollOffset}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35 - scrollOffset * 0.4}px, 0)`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${x * 0.6}px, ${y * 0.6 - scrollOffset * 0.7}px, 0) rotate(${scrollY * 0.08}deg)`;
      }

      if (glareRef.current) {
        glareRef.current.style.transform = `translate3d(${-x * 1.4}px, ${-y * 1.4}px, 0) rotate(${tiltY * 3}deg)`;
      }

      rafId.current = requestAnimationFrame(updatePhysics);
    };

    rafId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduceMotion]);

  // Scroll listener
  useEffect(() => {
    if (reduceMotion) return;

    const handleScroll = () => {
      target.current.scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduceMotion]);

  // Mouse move listener with normalized coordinates
  const handleMouseMove = (e) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized offset between -1 and 1
    const normX = (e.clientX - centerX) / (window.innerWidth * 0.45);
    const normY = (e.clientY - centerY) / (window.innerHeight * 0.45);

    // Bounded target values
    target.current.x = Math.max(-28, Math.min(28, normX * 24));
    target.current.y = Math.max(-28, Math.min(28, normY * 24));
    target.current.tiltX = Math.max(-14, Math.min(14, -normY * 16));
    target.current.tiltY = Math.max(-14, Math.min(14, normX * 16));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    target.current.x = 0;
    target.current.y = 0;
    target.current.tiltX = 0;
    target.current.tiltY = 0;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      className={`home-parallax-emblem-wrap ${isHovered ? 'is-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Deep Ambient Radial Glow Halo */}
      <div ref={glowRef} className="parallax-emblem-glow" />

      {/* Rotating Geodetic Halo Ring */}
      <div ref={haloRef} className="parallax-halo-ring" />

      {/* Main 3D Floating Stage */}
      <div ref={stageRef} className="parallax-emblem-stage">
        {/* Emblem Graphic */}
        <div className="parallax-emblem-img-container">
          <img
            src="/nepal-gov-logo.jpg"
            alt="Government of Nepal Official Emblem"
            className="parallax-emblem-img"
            loading="eager"
            decoding="async"
          />

          {/* Dynamic Light Sheen & Specular Glare */}
          <div ref={glareRef} className="parallax-specular-glare" />
        </div>

        {/* Floating Seal Indicator Tag */}
        <div className="parallax-seal-badge">
          <ShieldCheck size={11} className="seal-badge-icon" />
          <span className="seal-badge-text">
            {lang === 'np' ? 'आधिकारिक निशान छाप' : 'Official State Insignia'}
          </span>
          <span className="seal-badge-pulse" />
        </div>
      </div>
    </div>
  );
}
