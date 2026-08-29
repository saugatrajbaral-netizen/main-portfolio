import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Expertise from './components/Expertise';
import Focus from './components/Focus';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="site-shell">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Stats />
        <Timeline />
        <Expertise />
        <Focus />
        <Blog />
        <Contact />
      </main>
      <Footer />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
