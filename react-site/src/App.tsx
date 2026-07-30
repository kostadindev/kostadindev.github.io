import { useMemo, useEffect, useState, useRef, lazy, Suspense } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import News from './components/News';
import CurrentWork from './components/CurrentWork';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
const Globe = lazy(() => import('./components/Globe'));
import Footer from './components/Footer';

function LazyOnVisible({ children, rootMargin = '200px' }: { children: React.ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
}

function App() {
  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#E8590C',
            light: '#F5814A',
            dark: '#C4470A',
          },
          background: {
            default: '#FFFDFB',
            paper: '#ffffff',
          },
          text: {
            primary: '#17181C',
            secondary: '#5C5B54',
          },
          divider: 'rgba(23,24,28,0.10)',
        },
        typography: {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          h1: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
          h2: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
          h3: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, letterSpacing: '-0.015em' },
          h4: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
          h5: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
          h6: { fontWeight: 600 },
          body1: { lineHeight: 1.75, letterSpacing: '0' },
          body2: { lineHeight: 1.7, letterSpacing: '0' },
          button: { fontFamily: '"Space Grotesk", "Inter", sans-serif' },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                letterSpacing: '0',
                borderRadius: 8,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 500,
                borderRadius: 6,
                fontSize: '0.72rem',
                letterSpacing: '0',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 14,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <main>
          <Hero />
          <News />
          <CurrentWork />
          <Publications />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <LazyOnVisible>
            <Suspense fallback={null}>
              <Globe />
            </Suspense>
          </LazyOnVisible>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
