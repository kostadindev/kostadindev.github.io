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
        bgcolor: '#fafaf8',
      }}
    >
      <HeroScene />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack alignItems="center" spacing={4} textAlign="center">
          <Box
            component="img"
            src={personalInfo.avatar}
            alt={personalInfo.name}
            sx={{
              width: 240,
              maxHeight: 320,
              objectFit: 'cover',
              borderRadius: 3,
            }}
          />

          <Box>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight={700}
              sx={{ color: 'grey.900' }}
            >
              Hi, I'm{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                {personalInfo.name.split(' ')[0]}
              </Box>
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 400, color: 'grey.600' }}>
              {personalInfo.tagline}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" href="#work">
              View My Work
            </Button>
            <Button
              variant="outlined"
              size="large"
              href={`mailto:${personalInfo.email}`}
              sx={{ borderColor: 'grey.300', color: 'grey.700' }}
            >
              Get In Touch
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
                  bgcolor: 'grey.100',
                  color: 'grey.600',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
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
              variant="body1"
              sx={{
                color: 'grey.700',
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
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'grey.600',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(-10px)' },
          },
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
}
