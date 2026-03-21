import { useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import News from './components/News';
import CurrentWork from './components/CurrentWork';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import TravelMap from './components/TravelMap';
import Footer from './components/Footer';

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
            main: '#d4851f',
            light: '#e89a3c',
            dark: '#b8720f',
          },
          background: {
            default: '#faf9f7',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a1a1a',
            secondary: '#5a5a5a',
          },
        },
        typography: {
          fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
          h1: { fontFamily: '"DM Serif Display", Georgia, serif', fontWeight: 400 },
          h2: { fontFamily: '"DM Serif Display", Georgia, serif', fontWeight: 400 },
          h3: { fontFamily: '"DM Serif Display", Georgia, serif', fontWeight: 400 },
          h4: { fontFamily: '"DM Serif Display", Georgia, serif', fontWeight: 400 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 600 },
          body1: { lineHeight: 1.75, letterSpacing: '0.01em' },
          body2: { lineHeight: 1.7, letterSpacing: '0.01em' },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                letterSpacing: '0.02em',
                borderRadius: 10,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
                borderRadius: 8,
                fontSize: '0.78rem',
                letterSpacing: '0.02em',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
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
          <About />
          <News />
          <CurrentWork />
          <Publications />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <TravelMap />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
