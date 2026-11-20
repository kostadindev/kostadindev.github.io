// Hidden for now (user request, Nov 2026): Technical skills and Beyond work /
// Travel. To bring them back, restore these imports and the two blocks below
// (Globe, Hobbies, TravelMap and LazyOnVisible are in react-site/_hidden and still need porting from MUI).
// import { lazy, Suspense, useEffect, useRef, useState } from 'react';
// import Skills from './components/Skills';
// const Globe = lazy(() => import('./components/Globe'));
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import News from './components/News';
import CurrentWork from './components/CurrentWork';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <Navbar />
      <main>
        <Hero />
        <News />
        <CurrentWork />
        <Publications />
        <Education />
        <Experience />
        <Projects />
        {/* hidden for now (user request, Nov 2026): <Skills /> */}
        {/* hidden for now (user request, Nov 2026):
        <LazyOnVisible>
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
        </LazyOnVisible> */}
      </main>
      <Footer />
    </TooltipProvider>
  );
}

export default App;
