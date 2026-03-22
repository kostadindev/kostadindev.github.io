import { useState } from 'react';
import { Box, Container, Typography, Button, Stack, IconButton, Tooltip, Link, Grid, Paper, Avatar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import SvgIcon from '@mui/material/SvgIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import { personalInfo } from '../data/content';
// import HeroScene from './HeroScene';

const affiliations = [
  {
    label: 'University',
    value: 'Cambridge',
    logo: 'https://www.cam.ac.uk/sites/default/files/secondary-logo-stacked.png',
    link: 'https://www.cam.ac.uk/',
  },
  {
    label: 'Department',
    value: 'CHIA',
    logo: '/images/chia-cover.png',
    link: 'https://www.chia.cam.ac.uk/',
  },
  {
    label: 'Lab',
    value: 'TRACE Lab',
    logo: '/images/trace-cover.jpeg',
    link: 'https://trace-lab.ai/',
  },
  {
    label: 'Experience',
    value: 'Stellar Cyber',
    link: 'https://stellarcyber.ai/',
    logo: 'data:image/png;base64,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',
  },
];

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  code: <CodeIcon />,
  scholar: <SchoolIcon />,
  orcid: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.238-3.722-3.806-3.722h-2.513z" />
    </SvgIcon>
  ),
};

export default function Hero() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#faf9f7',
        py: { xs: 10, md: 4 },
      }}
    >
      {/* <HeroScene /> */}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          alignItems={{ xs: 'center', md: 'center' }}
        >
          {/* Left: Photo + socials */}
          <Stack alignItems="center" spacing={2} sx={{ flexShrink: 0 }}>
            <Tooltip title={personalInfo.name} arrow>
              <Box
                component="img"
                src={personalInfo.avatar}
                alt={personalInfo.name}
                sx={{
                  width: { xs: 180, md: 200 },
                  maxHeight: { xs: 240, md: 280 },
                  objectFit: 'cover',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  border: '4px solid rgba(255,255,255,0.8)',
                }}
              />
            </Tooltip>

            <Stack direction="row" spacing={1}>
              {personalInfo.socials.map((social) => (
                <Tooltip key={social.name} title={social.name} arrow>
                  <IconButton
                    href={social.url}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      color: 'text.secondary',
                      border: '1px solid',
                      borderColor: 'rgba(0,0,0,0.08)',
                      width: 38,
                      height: 38,
                      '&:hover': {
                        bgcolor: '#1a1a1a',
                        color: 'white',
                        borderColor: '#1a1a1a',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {iconMap[social.icon]}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>

            <Stack alignItems="center" spacing={0.5}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography
                  component="a"
                  href={`mailto:${personalInfo.email}`}
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {personalInfo.email}
                </Typography>
                <Tooltip title={copied === personalInfo.email ? 'Copied!' : 'Copy email'}>
                  <IconButton
                    onClick={() => handleCopyEmail(personalInfo.email)}
                    size="small"
                    sx={{
                      color: copied === personalInfo.email ? 'success.main' : 'grey.400',
                      '&:hover': { color: copied === personalInfo.email ? 'success.main' : 'grey.600' },
                    }}
                  >
                    {copied === personalInfo.email ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography
                  component="a"
                  href="mailto:kgd26@cam.ac.uk"
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  kgd26@cam.ac.uk
                </Typography>
                <Tooltip title={copied === 'kgd26@cam.ac.uk' ? 'Copied!' : 'Copy email'}>
                  <IconButton
                    onClick={() => handleCopyEmail('kgd26@cam.ac.uk')}
                    size="small"
                    sx={{
                      color: copied === 'kgd26@cam.ac.uk' ? 'success.main' : 'grey.400',
                      '&:hover': { color: copied === 'kgd26@cam.ac.uk' ? 'success.main' : 'grey.600' },
                    }}
                  >
                    {copied === 'kgd26@cam.ac.uk' ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  Cambridge, UK
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Right: Name + Bio + Buttons */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.8rem' },
                letterSpacing: '-0.01em',
                mb: 0.5,
              }}
            >
              Kostadin Devedzhiev
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: 'primary.dark',
                mb: 2.5,
                fontSize: { xs: '0.9rem', md: '0.95rem' },
              }}
            >
              {personalInfo.tagline}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              I'm a postgraduate student at the{' '}
              <Link href="https://www.chia.cam.ac.uk/" target="_blank" rel="noopener">
                Centre for Human-Inspired AI (CHIA)
              </Link>
              , University of Cambridge, where I am part of the{' '}
              <Link href="https://trace-lab.ai/" target="_blank" rel="noopener">
                TRACE Lab
              </Link>{' '}
              advised by{' '}
              <Link href="https://umangsbhatt.github.io/" target="_blank" rel="noopener">
                Professor Umang Bhatt
              </Link>
              . My research focuses on <strong>human-AI interaction</strong> — designing
              multi-agent systems where AI agents and humans collaborate under real-world conditions.
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Previously, I worked as a <strong>Software Engineer</strong> at{' '}
              <Link href="https://stellarcyber.ai" target="_blank" rel="noopener">
                Stellar Cyber
              </Link>{' '}
              in San Jose, CA, building AI-driven interfaces for threat hunting and{' '}
              <strong>human-augmented</strong> autonomous cybersecurity operations.
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                size="large"
                href="#work"
                sx={{
                  bgcolor: '#1a1a1a',
                  color: '#fff',
                  px: 3,
                  py: 1,
                  fontSize: '0.85rem',
                  '&:hover': { bgcolor: '#333', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' },
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                View My Work
              </Button>
              <Button
                size="large"
                href={`mailto:${personalInfo.email}`}
                sx={{
                  bgcolor: 'transparent',
                  color: '#1a1a1a',
                  border: '1.5px solid',
                  borderColor: 'rgba(0,0,0,0.15)',
                  px: 3,
                  py: 1,
                  fontSize: '0.85rem',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: 'rgba(212, 133, 31, 0.04)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                Get in Touch
              </Button>
            </Stack>
          </Box>
        </Stack>

        {/* Affiliation cards */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: { xs: 5, md: 6 } }}>
          {affiliations.map((stat) => (
            <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
              <Link href={stat.link} target="_blank" rel="noopener" underline="none">
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    textAlign: 'center',
                    bgcolor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: 'primary.light',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(212, 133, 31, 0.1)',
                    },
                  }}
                >
                  <Stack spacing={1.5} alignItems="center">
                    <Tooltip title={stat.value} arrow>
                      <Box sx={{ width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar
                          src={stat.logo}
                          alt={stat.value}
                          variant="square"
                          sx={{ width: '100%', height: '100%', bgcolor: 'transparent' }}
                          imgProps={{ style: { objectFit: 'contain' } }}
                        />
                      </Box>
                    </Tooltip>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {stat.label}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      <IconButton
        href="#news"
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'grey.400',
          animation: 'bounce 2.5s ease-in-out infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(-8px)' },
          },
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
}
