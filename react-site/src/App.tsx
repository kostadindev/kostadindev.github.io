import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CurrentWork from './components/CurrentWork';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#e89a3c',
            light: '#f4c76b',
            dark: '#d4851f',
          },
          background: {
            default: mode === 'light' ? '#fafaf8' : '#0a0a0a',
            paper: mode === 'light' ? '#ffffff' : '#111111',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        <main>
          <Hero />
          <About />
          <CurrentWork />
          <Projects />
          <Publications />
          <Education />
          <Skills />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
