import { Box, Container, Typography, Button, Avatar, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { personalInfo } from '../data/content';
import HeroScene from './HeroScene';

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  code: <CodeIcon />,
  spotify: <Box component="span" sx={{ fontSize: 20 }}>♪</Box>,
};

export default function Hero() {
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
          <Avatar
            src={personalInfo.avatar}
            alt={personalInfo.name}
            sx={{
              width: 220,
              height: 220,
              boxShadow: '0 12px 50px rgba(0, 0, 0, 0.15)',
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
        </Stack>
      </Container>

      <IconButton
        href="#about"
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'grey.400',
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
