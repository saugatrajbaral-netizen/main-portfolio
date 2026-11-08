import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AnalyticsTracker from './components/AnalyticsTracker';
import PatrioticBackground from './components/PatrioticBackground';
import { trackEvent } from './utils/analytics';

// Lazy-loaded Modals to ensure zero initial load penalty
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const NationalSymbolsModal = lazy(() => import('./components/NationalSymbolsModal'));

// Lazy-loaded Multi-Page Routes for Maximum Speed & Fast Initial Load
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const CvPage = lazy(() => import('./pages/CvPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TaxpayerEducationPage = lazy(() => import('./pages/TaxpayerEducationPage'));

// Lightweight, Minimalist Page Loading Fallback
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '12px',
      color: 'var(--gov-blue)'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid rgba(0, 56, 147, 0.15)',
        borderTopColor: 'var(--gov-blue)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }} />
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        Loading...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSymbolsOpen, setIsSymbolsOpen] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'np'

  const handleOpenResume = () => {
    setIsResumeOpen(true);
    trackEvent('view_resume_modal');
  };

  const handleOpenSymbols = () => {
    setIsSymbolsOpen(true);
    trackEvent('view_national_symbols');
  };

  const handleSetLang = (newLang) => {
    setLang(newLang);
    trackEvent('toggle_language', { language: newLang });
  };

  // Comprehensive Anti-Download & Anti-Drag Image Protection System
  useEffect(() => {
    const handleContextMenu = (e) => {
      const target = e.target;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.tagName === 'CANVAS' ||
        target.tagName === 'SVG' ||
        target.closest('picture') ||
        target.closest('.profile-img-viewport') ||
        target.closest('.portrait-image-frame') ||
        target.closest('.editorial-portrait-frame') ||
        target.closest('.about-portrait-showcase') ||
        target.closest('.officer-profile-composite') ||
        target.closest('.journey-cover-card') ||
        target.closest('.training-cover-viewport') ||
        target.closest('.exp-lightbox-stage') ||
        target.closest('.training-lightbox-stage') ||
        target.closest('.taxpayer-photo-card') ||
        target.closest('.national-symbols-grid') ||
        target.classList.contains('profile-real-image') ||
        target.classList.contains('portrait-main-img') ||
        target.classList.contains('editorial-portrait-image') ||
        target.classList.contains('photo-img') ||
        target.classList.contains('thumb-img') ||
        target.classList.contains('journey-cover-img') ||
        target.classList.contains('training-cover-img')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e) => {
      const target = e.target;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.tagName === 'CANVAS' ||
        target.closest('picture') ||
        target.closest('img') ||
        target.closest('.profile-img-viewport') ||
        target.closest('.portrait-image-frame') ||
        target.closest('.editorial-portrait-frame') ||
        target.closest('.journey-cover-card') ||
        target.closest('.training-cover-viewport')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Block right-clicks on protected media
    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    // Block image drag-and-drop
    document.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
    };
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AnalyticsTracker />
      <div className="site-shell">
        {/* Subtle Government of Nepal Background Theme (Himalayas, Map, Lattice & Nodes) */}
        <PatrioticBackground />

        {/* Sticky Header with Route Navigation & Live Digital Clock */}
        <Navbar
          onOpenResume={handleOpenResume}
          lang={lang}
          setLang={handleSetLang}
        />

        {/* Route-driven Multi-Page Content with Smooth Suspense Transition */}
        <main className="site-main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    lang={lang}
                    onOpenResume={handleOpenResume}
                    onOpenNationalSymbols={handleOpenSymbols}
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <AboutPage
                    lang={lang}
                    onOpenNationalSymbols={handleOpenSymbols}
                  />
                }
              />
              <Route
                path="/experience"
                element={
                  <ExperiencePage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/education"
                element={
                  <EducationPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/training"
                element={
                  <EducationPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/research"
                element={
                  <ResearchPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/research/:slug"
                element={
                  <ArticleDetailPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/publications"
                element={
                  <PublicationsPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/media"
                element={
                  <MediaPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/cv"
                element={
                  <CvPage
                    lang={lang}
                    onOpenResume={handleOpenResume}
                  />
                }
              />
              <Route
                path="/taxpayer-education"
                element={
                  <TaxpayerEducationPage
                    lang={lang}
                  />
                }
              />
              <Route
                path="/contact"
                element={
                  <ContactPage
                    lang={lang}
                  />
                }
              />
              {/* Fallback route */}
              <Route
                path="*"
                element={
                  <Home
                    lang={lang}
                    onOpenResume={handleOpenResume}
                    onOpenNationalSymbols={handleOpenSymbols}
                  />
                }
              />
            </Routes>
          </Suspense>
        </main>

        {/* Editorial Institutional Footer */}
        <Footer
          onOpenNationalSymbols={handleOpenSymbols}
          lang={lang}
        />

        {/* Interactive Full CV Reader Modal */}
        {isResumeOpen && (
          <Suspense fallback={null}>
            <ResumeModal
              isOpen={isResumeOpen}
              onClose={() => setIsResumeOpen(false)}
              onOpenNationalSymbols={() => {
                setIsResumeOpen(false);
                setIsSymbolsOpen(true);
              }}
              lang={lang}
            />
          </Suspense>
        )}

        {/* National Symbols Civic Modal */}
        {isSymbolsOpen && (
          <Suspense fallback={null}>
            <NationalSymbolsModal
              isOpen={isSymbolsOpen}
              onClose={() => setIsSymbolsOpen(false)}
              lang={lang}
            />
          </Suspense>
        )}
      </div>
    </Router>
  );
}
