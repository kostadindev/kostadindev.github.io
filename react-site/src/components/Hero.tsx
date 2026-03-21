import { useState } from 'react';
import { Box, Container, Typography, Button, Stack, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { personalInfo } from '../data/content';
import HeroScene from './HeroScene';

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  code: <CodeIcon />,
};

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      }}
    >
      <HeroScene />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack alignItems="center" spacing={3} textAlign="center">
          <Box
            component="img"
            src={personalInfo.avatar}
            alt={personalInfo.name}
            sx={{
              width: 200,
              maxHeight: 280,
              objectFit: 'cover',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              border: '4px solid rgba(255,255,255,0.8)',
            }}
          />

          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: '#1a1a1a',
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                letterSpacing: '-0.01em',
                mb: 1.5,
              }}
            >
              Kostadin Devedzhiev
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.15rem' },
                maxWidth: 480,
                mx: 'auto',
              }}
            >
              {personalInfo.tagline}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
            <Button
              size="large"
              href="#work"
              sx={{
                bgcolor: '#1a1a1a',
                color: '#fff',
                px: 3.5,
                py: 1.2,
                fontSize: '0.9rem',
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
                px: 3.5,
                py: 1.2,
                fontSize: '0.9rem',
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

          <Stack direction="row" spacing={1}>
            {personalInfo.socials.map((social) => (
              <IconButton
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  width: 42,
                  height: 42,
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
            ))}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              component="a"
              href={`mailto:${personalInfo.email}`}
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
              }}
            >
              {personalInfo.email}
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy email'}>
              <IconButton
                onClick={handleCopyEmail}
                size="small"
                sx={{
                  color: copied ? 'success.main' : 'grey.400',
                  '&:hover': { color: copied ? 'success.main' : 'grey.600' },
                }}
              >
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Container>

      <IconButton
        href="#about"
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
