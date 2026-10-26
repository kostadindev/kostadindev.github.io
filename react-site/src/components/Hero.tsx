import { useState } from 'react';
import { Box, Container, Typography, Button, Stack, IconButton, Tooltip, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import SvgIcon from '@mui/material/SvgIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import { personalInfo } from '../data/content';

const INK = '#17181C';
const ORANGE = '#E8590C';
const HAIRLINE = '#DBD8CF';

const affiliations = [
  { label: 'University', value: 'Cambridge', logo: './images/cambridge-logo.png', link: 'https://www.cam.ac.uk/' },
  { label: 'College', value: "Queens' College", logo: './images/queens-cover.png', link: 'https://www.queens.cam.ac.uk/', title: "Queens'\nCollege" },
  { label: 'Department', value: 'CHIA', logo: './images/chia-cover.png', link: 'https://www.chia.cam.ac.uk/' },
  { label: 'Lab', value: 'TRACE Lab', logo: './images/trace-cover.png', link: 'https://trace-lab.ai/' },
  {
    label: 'Work experience',
    value: 'Stellar Cyber',
    link: 'https://stellarcyber.ai/',
    logo: './images/stellar-cyber-logo.png',
  },
];

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
  code: <CodeIcon fontSize="small" />,
  scholar: <SchoolIcon fontSize="small" />,
  orcid: (
    <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 20 }}>
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
      id="about"
      sx={{
        minHeight: { md: '88vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'var(--paper)',
        pt: { xs: 9, md: 3 },
        pb: { xs: 6, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
            gap: { xs: 4, md: 7 },
            alignItems: 'center',
          }}
        >
          {/* LEFT — identity */}
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h1"
              className="name-resolve"
              sx={{ color: INK, fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.05rem' }, lineHeight: 1.05, mb: 1.5, whiteSpace: { md: 'nowrap' } }}
            >
              Kostadin Devedzhiev
            </Typography>

            <Typography sx={{ fontSize: '1rem', color: 'var(--ink-soft)', mb: 3 }}>
              PhD student, Trustworthy AI Lab, University of Cambridge
            </Typography>

            <Typography variant="body1" sx={{ color: 'var(--ink-soft)', fontSize: '1rem', maxWidth: 520, mb: 2, textWrap: 'pretty' }}>
              I develop orchestration algorithms for human–AI systems, combining task allocation, skill inference and online learning.
              My research focuses on pro-human orchestration: optimising how work is distributed while treating human participation
              as an explicit constraint, not a by-product of maximising output.
            </Typography>

            <Typography variant="body1" sx={{ color: 'var(--ink-soft)', fontSize: '1rem', maxWidth: 520, mb: 3.5, textWrap: 'pretty' }}>
              I'm a PhD student at Cambridge's{' '}
              <Link href="https://www.chia.cam.ac.uk/" target="_blank" rel="noopener" sx={{ color: INK, textDecorationColor: HAIRLINE }}>
                Centre for Human-Inspired AI
              </Link>
              {' '}(CHIA), supervised by{' '}
              <Link href="https://umangsbhatt.github.io/" target="_blank" rel="noopener" sx={{ color: INK, textDecorationColor: HAIRLINE }}>
                Professor Umang Bhatt
              </Link>{' '}
              and{' '}
              <Link href="http://mlg.eng.cam.ac.uk/adrian/" target="_blank" rel="noopener" sx={{ color: INK, textDecorationColor: HAIRLINE }}>
                Professor Adrian Weller
              </Link>
              . Before Cambridge, I was a software engineer at{' '}
              <Link href="https://stellarcyber.ai" target="_blank" rel="noopener" sx={{ color: INK, textDecorationColor: HAIRLINE }}>
                Stellar Cyber
              </Link>
              , where I built AI tools for security analysts.
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ mb: 3.5 }} flexWrap="wrap" useFlexGap>
              <Button
                href="#work"
                sx={{
                  bgcolor: ORANGE, color: '#fff', px: 3, py: 1.1, fontSize: '0.9rem',
                  '&:hover': { bgcolor: 'var(--orange-dark)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                View my work
              </Button>
              <Button
                href={`mailto:${personalInfo.email}`}
                sx={{
                  bgcolor: 'transparent', color: INK, border: '1.5px solid', borderColor: HAIRLINE,
                  px: 3, py: 1.1, fontSize: '0.9rem',
                  '&:hover': { borderColor: ORANGE, color: ORANGE, bgcolor: 'var(--orange-tint)' },
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                Get in touch
              </Button>
            </Stack>

            {/* socials + contact */}
            <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" useFlexGap>
              {personalInfo.socials.map((social) => (
                <Tooltip key={social.name} title={social.name} arrow>
                  <IconButton
                    href={social.url} target="_blank" rel="noopener"
                    sx={{
                      color: 'var(--ink-soft)', width: 36, height: 36, borderRadius: 2,
                      '&:hover': { color: ORANGE, bgcolor: 'var(--orange-tint)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    {iconMap[social.icon]}
                  </IconButton>
                </Tooltip>
              ))}
              {[
                { email: 'kgd26@cam.ac.uk', color: INK },
              ].map(({ email, color }) => (
                <Stack key={email} direction="row" alignItems="center" spacing={0.25}>
                  <Typography
                    component="a"
                    href={`mailto:${email}`}
                    sx={{ fontSize: '0.875rem', color, textDecoration: 'none', '&:hover': { color: ORANGE } }}
                  >
                    {email}
                  </Typography>
                  <Tooltip title={copied === email ? 'Copied!' : 'Copy email'}>
                    <IconButton
                      onClick={() => handleCopyEmail(email)} size="small"
                      sx={{ color: copied === email ? 'success.main' : 'grey.400', '&:hover': { color: ORANGE } }}
                    >
                      {copied === email ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              ))}
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <LocationOnIcon sx={{ fontSize: 15, color: 'var(--ink-soft)' }} />
                <Typography sx={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
                  Cambridge, UK
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* LEFT — headshot */}
          <Box sx={{ display: 'flex', order: -1 }}>
            <Box
              component="img"
              src={personalInfo.avatar}
              alt={personalInfo.name}
              sx={{ width: { xs: 200, md: 260 }, height: { xs: 200, md: 260 }, objectFit: 'cover', objectPosition: 'top', borderRadius: '14px' }}
            />
          </Box>
        </Box>

        {/* Affiliations strip */}
        <Box sx={{ mt: { xs: 4.5, md: 5 }, pt: 3, borderTop: '1px solid', borderColor: HAIRLINE }}>
          <Typography className="mono" sx={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)', mb: 2 }}>
            Affiliations
          </Typography>
          <Stack direction="row" spacing={{ xs: 4, md: 7 }} alignItems="flex-end" flexWrap="wrap" useFlexGap>
            {affiliations.map((a) => (
              <Tooltip key={a.label} title={a.value} arrow>
                <Link
                  href={a.link} target="_blank" rel="noopener" underline="none"
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center', opacity: 0.92, transition: 'all 0.25s', '&:hover': { opacity: 1, transform: 'translateY(-2px)' } }}
                >
                  <Box
                    component="img"
                    src={a.logo}
                    alt={a.value}
                    sx={{ height: { xs: a.title ? 64 : 84, md: a.title ? 92 : 120 }, width: 'auto', maxWidth: 320, objectFit: 'contain' }}
                  />
                  {a.title && (
                    <Typography
                      sx={{
                        mt: 0.6,
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        lineHeight: 1.18,
                        color: INK,
                        whiteSpace: 'pre-line',
                        fontSize: { xs: '0.68rem', md: '0.82rem' },
                      }}
                    >
                      {a.title}
                    </Typography>
                  )}
                  <Typography
                    className="mono"
                    sx={{ mt: 1.25, fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}
                  >
                    {a.label}
                  </Typography>
                </Link>
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
