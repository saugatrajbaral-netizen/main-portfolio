import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ResumeModal from './components/ResumeModal';
import NationalSymbolsModal from './components/NationalSymbolsModal';
import PatrioticBackground from './components/PatrioticBackground';

// Multi-Page Routes
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import ResearchPage from './pages/ResearchPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import PublicationsPage from './pages/PublicationsPage';
import MediaPage from './pages/MediaPage';
import CvPage from './pages/CvPage';
import ContactPage from './pages/ContactPage';
import TaxpayerEducationPage from './pages/TaxpayerEducationPage';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSymbolsOpen, setIsSymbolsOpen] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'np'

  // Global Image Protection: Disable right-click & drag on all images
  useEffect(() => {
    const handleContextMenu = (e) => {
      const target = e.target;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.closest('picture') ||
        target.closest('.profile-img-viewport') ||
        target.closest('.portrait-image-frame') ||
        target.closest('.editorial-portrait-frame') ||
        target.closest('.about-portrait-showcase') ||
        target.closest('.officer-profile-composite') ||
        target.classList.contains('profile-real-image') ||
        target.classList.contains('portrait-main-img') ||
        target.classList.contains('editorial-portrait-image') ||
        target.classList.contains('photo-img') ||
        target.classList.contains('thumb-img')
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e) => {
      const target = e.target;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.closest('picture') ||
        target.closest('.profile-img-viewport') ||
        target.closest('.portrait-image-frame') ||
        target.closest('.editorial-portrait-frame')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="site-shell">
        {/* Subtle Government of Nepal Background Theme (Himalayas, Map, Lattice & Nodes) */}
        <PatrioticBackground />

        {/* Sticky Header with Route Navigation & Live Digital Clock */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          lang={lang}
          setLang={setLang}
        />

        {/* Route-driven Multi-Page Content */}
        <main className="site-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  lang={lang}
                  onOpenResume={() => setIsResumeOpen(true)}
                  onOpenNationalSymbols={() => setIsSymbolsOpen(true)}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  lang={lang}
                  onOpenNationalSymbols={() => setIsSymbolsOpen(true)}
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
                  onOpenResume={() => setIsResumeOpen(true)}
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
                  onOpenResume={() => setIsResumeOpen(true)}
                  onOpenNationalSymbols={() => setIsSymbolsOpen(true)}
                />
              }
            />
          </Routes>
        </main>

        {/* Editorial Institutional Footer */}
        <Footer
          onOpenNationalSymbols={() => setIsSymbolsOpen(true)}
          lang={lang}
        />

        {/* Interactive Full CV Reader Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          onOpenNationalSymbols={() => {
            setIsResumeOpen(false);
            setIsSymbolsOpen(true);
          }}
          lang={lang}
        />

        {/* National Symbols Civic Modal */}
        <NationalSymbolsModal
          isOpen={isSymbolsOpen}
          onClose={() => setIsSymbolsOpen(false)}
          lang={lang}
        />
      </div>
    </Router>
  );
}
